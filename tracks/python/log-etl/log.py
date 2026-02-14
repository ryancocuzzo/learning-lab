from pydantic import BaseModel, Field
from datetime import datetime
from typing import Annotated, Optional
from enum import Enum

class Severity(Enum):
    INFO = "INFO"
    WARN = "WARN"

class Environment(Enum):
    DEV = "dev"
    PROD = "prod"


class Log(BaseModel):
    # Universal logs
    timestamp: datetime
    severity: Annotated[Severity, Field(alias='sev')]
    service_name: Annotated[str, Field(alias="service.name")]
    environment: Annotated[Environment, Field(alias="env")]
    event_dataset: Annotated[str, Field(alias="event.dataset")]
    event_action: Annotated[str, Field(alias="event.action")]
    

# All of this system's logs have at least this info.
class HalalCartLog(Log):
    event_id: Annotated[str, Field(alias="event.id")]
    cart_id: Annotated[str, Field(alias="cart.id")]
    location_id: Annotated[str, Field(alias="location.id")]
    message: Annotated[str, Field(alias="msg")]

# Some logs in this system have more info. These types of
# logs are outlined below

class HalalOperatorLog(HalalCartLog):
    operator_id: Annotated[str, Field(alias="op.id")]


class HalalPropaneLog(HalalCartLog):
    propane_tank_id: Annotated[str, Field(alias="propane.tank_id")]
    propane_level_pct: Annotated[int, Field(alias="propane.level_pct")]


class HalalGriddleLog(HalalCartLog):
    target_temp_f: Annotated[int, Field(alias="griddle.target_f")]


# TODO: These pydantic models will be replaced with a more pragmatic approach
# of separating log info into "envelopes" and "payloads", which
# are routed to "processors". More to come.