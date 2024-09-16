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


# class Cart:
#     def __init__(self):
#         self.items = []

#     def add(self, item, quantity=1):
#         # Логика добавления товара
#         pass

#     def remove(self, item_id):
#         self.items = [item for item in self.items if item.id != item_id]

#     def increase_quantity(self, item_id):
#         for item in self.items:
#             if item.id == item_id:
#                 item.quantity += 1
#                 break

#     def decrease_quantity(self, item_id):
#         for item in self.items:
#             if item.id == item_id and item.quantity > 1:
#                 item.quantity -= 1
#                 break
#         else:
#             self.remove(item_id)  # Удаляем, если количество меньше 1

#     def clear(self):
#         self.items.clear()

#     def get(self, detail_id):
#         for item in self.items:
#             if item['detail_id'] == detail_id:
#                 return item
#         return None


#     def total_quantity(self):
#         return sum(item.quantity for item in self.items)

#     def total_sum(self):
#         return sum(item.price * item.quantity for item in self.items)