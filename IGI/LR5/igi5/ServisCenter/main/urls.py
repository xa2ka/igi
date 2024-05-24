from django.urls import path, include
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
    path('usermain', views.index2, name='usermain'),
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
    path('usermain', views.get_cat_fact, name='usermain'),
    path('employee', views.employee, name='employee'),
    path('orders', views.CheckOrders, name='orders')
] 

