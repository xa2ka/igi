from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='home'),
    path('about', views.about, name='about'),
    path('login', views.login, name='login'),
    path('news', views.news, name='news'),
    path('faq', views.faq, name='faq'),
    path('contacts', views.contacts, name='contacts'),
    path('policy', views.policy, name='policy'),
    path('vacancies', views.vacancies, name='vacancies'),
    path('feedback', views.feedback, name='feedback'),
    path('registration', views.contact_view, name='registration'),
    path('discounts', views.discount, name='discounts'),
    path('usermain', views.index2, name='usermain'),  # Убедитесь, что это нужно
    path('userabout', views.about2, name='userabout'),
    path('usernews', views.news2, name='usernews'),
    path('userfaq', views.faq2, name='userfaq'),
    path('usercontacts', views.contacts2, name='usercontacts'),
    path('userpolicy', views.policy2, name='userpolicy'),
    path('uservacancies', views.vacancies2, name='uservacancies'),
    path('userfeedback', views.feedback2, name='userfeedback'),
    path('userdiscounts', views.discount2, name='userdiscounts'),
    path('request', views.MyRequest, name='request'),
    path('time', views.userTime, name='time'),
    path('employee', views.employee, name='employee'),
    path('orders', views.CheckOrders, name='orders'),
    path('templateproduct/<int:detail_id>/', views.templateproduct, name='templateproduct'), 
    path('add_to_cart/<int:detail_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart_view, name='cart'),
    path('place_order/', views.place_order, name='place_order'),
    path('cart/remove/<int:item_id>', views.cart_remove, name='cart_remove'),
    path('cart/inc/<int:item_id>', views.cart_increment, name='cart_inc'),
    path('cart/dec/<int:item_id>', views.cart_decrement, name='cart_dec'),
    path('fullNews/<int:id>/', views.full_news, name='fullNews'),
    path('poligon/', views.poligon, name='poligon'),
    path('certificate/', views.certificate, name='certificate'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
