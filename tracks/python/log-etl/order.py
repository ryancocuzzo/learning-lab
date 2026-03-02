from typing import Annotated, List

from pydantic import ConfigDict, Field, BaseModel


class OrderItem(BaseModel):
    id: Annotated[
        str, Field(alias="sku")
    ]  # the SKUs in these logs are just plaintext names. we'll treat as IDs.
    quantity: Annotated[int, Field(alias="qty")]
    unit_price: float


class Order(BaseModel):
    event_id: Annotated[str, Field(alias="event.id")]
    cart_id: Annotated[str, Field(alias="cart.id")]
    location_id: Annotated[str, Field(alias="location.id")]
    order_id: Annotated[str, Field(alias="order.id")]
    payment_method: Annotated[str, Field(alias="payment.method")]
    currency: str
    amount_total: Annotated[float, Field(alias="amount.total")]
    items: List[OrderItem]

    model_config = ConfigDict(extra="allow", populate_by_name=True)
