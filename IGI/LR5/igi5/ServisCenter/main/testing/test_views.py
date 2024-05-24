import pytest
from django.test import Client
from django.urls import reverse
from models import FAQ, Contacts, News, Vacation, Discount, User, Comment, Supplier, Detail, Order, OrderItem, Time
import datetime
import pytz


@pytest.fixture
def client():
    return Client()

@pytest.fixture
def create_user():
    user = User.objects.create(
        login='testuser',
        password='testpassword',
        fullName='Test User',
        IsEmployee=False
    )
    return user

@pytest.fixture
def create_employee():
    user = User.objects.create(
        login='testemployee',
        password='testpassword',
        fullName='Test Employee',
        IsEmployee=True
    )
    return user

@pytest.fixture
def create_supplier():
    supplier = Supplier.objects.create(
        name='Test Supplier',
        email='supplier@example.com',
        phone='1234567890'
    )
    return supplier



@pytest.fixture
def create_order_item(create_order):
    order_item = OrderItem.objects.create(
        OrderId=create_order,
        NameOfDetail='Test Detail',
        Quantity=10,
        Price=50.00
    )
    return order_item

def test_index(client):
    response = client.get(reverse('index'))
    assert response.status_code == 200
    assert 'main/main.html' in [template.name for template in response.templates]

def test_about(client):
    response = client.get(reverse('about'))
    assert response.status_code == 200
    assert 'main/about.html' in [template.name for template in response.templates]

def test_login(client, create_user):
    response = client.post(reverse('login'), {'login': 'testuser', 'password': 'testpassword'})
    assert response.status_code == 302
    assert response.url == reverse('usermain')

def test_login_invalid(client):
    response = client.post(reverse('login'), {'login': 'invaliduser', 'password': 'invalidpassword'})
    assert response.status_code == 200
    assert 'Неправильный логин или пароль' in response.context['messages'][0].message

def test_employee(client, create_employee, create_supplier, create_order, create_order_item):
    client.force_login(create_employee)
    response = client.get(reverse('employee'))
    assert response.status_code == 200
    assert 'main/employee.html' in [template.name for template in response.templates]
    assert 'Test Detail' in response.context['most_ordered_detail']

def test_feedback2(client, create_user):
    client.force_login(create_user)
    response = client.post(reverse('feedback2'), {'comment': 'Test comment', 'mark': 5})
    assert response.status_code == 200
    assert 'main/userfeedback.html' in [template.name for template in response.templates]
    assert Comment.objects.filter(text='Test comment', mark=5).exists()