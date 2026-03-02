from typing import List, Tuple
from order import Order


class OrderService:

    orders: List[Order]

    def __init__(self):
        self.orders = []

    def process_sale(self, order: Order):
        self.orders.append(order)

    def compute_total_revenue(self) -> float:
        total_amounts = [order.amount_total for order in self.orders]
        return sum(total_amounts)

    def compute_avg_order_value(self) -> float:
        return self.compute_total_revenue() / len(self.orders)

    def compute_revenue_per_product(self, top_k: int | None = None) -> dict[str, float]:
        revenue: dict[str, float] = {}
        for order in self.orders:
            for item in order.items:
                if revenue.get(item.id) is None:
                    revenue[item.id] = 0
                item_cost = item.unit_price * item.quantity
                revenue[item.id] += item_cost

        if top_k is not None:

            def by_revenue(item: Tuple[str, float]) -> float:
                return item[1]

            l = list(revenue.items())
            l.sort(key=by_revenue, reverse=True)
            return {product: revenue for (product, revenue) in l[:top_k]}

        return revenue

    def num_orders(self) -> int:
        return len(self.orders)
