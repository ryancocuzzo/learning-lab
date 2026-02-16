from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Annotated, Optional
from enum import Enum

from order import Order
from order_service import OrderService

class Severity(Enum):
    INFO = "INFO"
    WARN = "WARN"

class Environment(Enum):
    PROD = "prod"
    DEV = "dev"

class LogEnvelope(BaseModel):
    model_config = ConfigDict(extra="allow", populate_by_name=True)
    timestamp: Annotated[datetime, Field(alias='ts')]
    severity: Severity
    service_name: Annotated[str, Field(alias="service.name")]
    environment: Annotated[Environment, Field(alias="env")]
    event_dataset: Annotated[str, Field(alias="event.dataset")]
    event_action: Annotated[str, Field(alias="event.action")]

class LogProcessor:

    os: OrderService

    def __init__(self, os: OrderService):
        self.os = os

    def _route_log(self, raw: dict):
        """Routing by event type"""
        envelope = LogEnvelope.model_validate(raw)
        match (envelope.event_dataset, envelope.event_action):
            # Sale completed log
            case ("pos.sales", "sale_completed"):
                order = Order.model_validate(raw)
                self.os.process_sale(order)

    def process_log(self, raw: dict):
        """Process a log"""
        self._route_log(raw)