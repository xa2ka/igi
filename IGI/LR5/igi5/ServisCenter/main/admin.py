from django.contrib import admin
from .models import Supplier,Detail,Order,OrderItem, FAQ, Contacts, News, Vacancion, Discount, User, Comment,PickupAddresses,Partner,Company,CompanyHistory

admin.site.register(FAQ)
admin.site.register(Contacts)
admin.site.register(News)
admin.site.register(Vacancion)
admin.site.register(Discount)
admin.site.register(User)
admin.site.register(Supplier)
admin.site.register(Detail)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Comment)
admin.site.register(PickupAddresses)
admin.site.register(Partner)
admin.site.register(Company)
admin.site.register(CompanyHistory)
