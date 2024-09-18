# class Cart:
#     def __init__(self):
#         self.items = []

#     def add(self, order_item):
#         self.items.append(order_item)

#     def clear(self):
#         self.items = []

#     def total_quantity(self):
#         return sum(item['quantity'] for item in self.items)

#     def total_sum(self):
#         return sum(item['price'] * item['quantity'] for item in self.items)

#     def get(self, detail_id):
#         for item in self.items:
#             if item['detail_id'] == detail_id:
#                 return item
#         return None

#     def update(self, order_item):
#         for i, item in enumerate(self.items):
#             if item['detail_id'] == order_item['detail_id']:
#                 self.items[i] = order_item
#                 break

class Cart:
    def __init__(self):
        self.items = []

    def add(self, order_item):
        existing_item = self.get(order_item['detail_id'])
        if existing_item:
            existing_item['quantity'] += 1
            self.update(existing_item)
        else:
            self.items.append(order_item)

    def increment(self, detail_id):
        item = self.get(detail_id)
        if item:
            item['quantity'] += 1
            self.update(item)

    def decrement(self, detail_id):
        item = self.get(detail_id)
        if item and item['quantity'] > 1:
            item['quantity'] -= 1
            self.update(item)
        elif item and item['quantity'] == 1:
            self.remove(detail_id)  # Удаляем, если количество стало 0

    def remove(self, detail_id):
        self.items = [item for item in self.items if item['detail_id'] != detail_id]

    def clear(self):
        self.items = []

    def total_quantity(self):
        return sum(item['quantity'] for item in self.items)

    def total_sum(self):
        return sum(item['price'] * item['quantity'] for item in self.items)

    def get(self, detail_id):
        for item in self.items:
            if item['detail_id'] == detail_id:
                return item
        return None

    def update(self, order_item):
        for i, item in enumerate(self.items):
            if item['detail_id'] == order_item['detail_id']:
                self.items[i] = order_item
                break