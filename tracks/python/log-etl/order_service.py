from order import Order

class OrderService:

    def __init__(self):
        pass

    def process_sale(self, order: Order):
        print("Order service is processing", order)