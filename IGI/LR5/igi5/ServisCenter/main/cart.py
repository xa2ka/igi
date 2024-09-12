# cart.py
class Cart:
    def __init__(self):
        self.items = []

    def add(self, order_item):
        self.items.append(order_item)

    def clear(self):
        self.items = []

    def total_quantity(self):
        return sum(item['quantity'] for item in self.items)

    def total_sum(self):
        return sum(item['price'] * item['quantity'] for item in self.items)