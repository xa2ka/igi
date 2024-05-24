import pytest
from django.test import Client
from models import PickupAddresses, Contaсts, FAQ, News, Vacancion, Discount, User, Comment, Supplier, Detail, Order, OrderItem, Time

# Тесты для PickupAddresses
@pytest.mark.django_db
def test_pickup_addresses_create():
    PickupAddresses.objects.create(adress='Адрес 1', Workinghours='10:00 - 20:00')
    assert PickupAddresses.objects.count() == 1

# Тесты для Contaсts
@pytest.mark.django_db
def test_contacts_create():
    Contaсts.objects.create(
        full_name='Иванов Иван Иванович',
        phone='123456789',
        description='Менеджер по продажам'
    )
    assert Contaсts.objects.count() == 1

# Тесты для FAQ
@pytest.mark.django_db
def test_faq_create():
    FAQ.objects.create(
        question='Как сделать заказ?',
        answer='Для оформления заказа нужно...',
        date='2023-05-23'
    )
    assert FAQ.objects.count() == 1

# Тесты для News
@pytest.mark.django_db
def test_news_create():
    News.objects.create(
        title='Новое поступление деталей',
        text='Мы получили новую партию деталей'
    )
    assert News.objects.count() == 1

# Тесты для Vacancion
@pytest.mark.django_db
def test_vacancion_create():
    Vacancion.objects.create(
        title='Вакансия менеджера по продажам',
        text='Требуется менеджер по продажам с опытом работы'
    )
    assert Vacancion.objects.count() == 1

# Тесты для Discount
@pytest.mark.django_db
def test_discount_create():
    Discount.objects.create(
        title='Скидка на детали',
        text='При покупке от 10 деталей скидка 10%',
        discount=10,
        min_quantity=10
    )
    assert Discount.objects.count() == 1

# Тесты для User
@pytest.mark.django_db
def test_user_create():
    User.objects.create(
        login='user1',
        password='password1',
        fullName='Иванов Иван Иванович',
        phone='123456789',
        IsEmployee=False
    )
    assert User.objects.count() == 1

# Тесты для Comment
@pytest.mark.django_db
def test_comment_create():
    Comment.objects.create(
        UserName='Иванов Иван Иванович',
        text='Хороший сервис!',
        data='2023-05-23 10:00:00',
        mark=5
    )
    assert Comment.objects.count() == 1

# Тесты для Supplier
@pytest.mark.django_db
def test_supplier_create():
    Supplier.objects.create(
        name='Поставщик 1',
        adress='Адрес поставщика 1',
        phone='987654321'
    )
    assert Supplier.objects.count() == 1

# Тесты для Detail
@pytest.mark.django_db
def test_detail_create():
    Detail.objects.create(
        SupplierId=1,
        name='Деталь 1',
        article=123456,
        price=100
    )
    assert Detail.objects.count() == 1

# Тесты для Order
@pytest.mark.django_db
def test_order_create():
    Order.objects.create(
        UserId=1,
        quantity=5,
        purchase_date='2023-05-23 10:00:00',
        sum=500
    )
    assert Order.objects.count() == 1

# Тесты для OrderItem
@pytest.mark.django_db
def test_order_item_create():
    OrderItem.objects.create(
        NameOfSupplier='Поставщик 1',
        NameOfDetail='Деталь 1',
        OrderId=1,
        SupplierId=1,
        DetailId=1
    )
    assert OrderItem.objects.count() == 1

# Тесты для Time
@pytest.mark.django_db
def test_time_create():
    Time.objects.create(name='Test Time')
    assert Time.objects.count() == 1