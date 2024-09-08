from django.db import models


class PickupAddresses(models.Model):
    adress = models.TextField('Адрес пункта самовывоза')
    Workinghours = models.TextField('Время работы')
    
    class Meta:
        verbose_name = 'Пункт самовывоза'
        verbose_name_plural = 'Пункты самовывоза'   


class Contaсts(models.Model):

    image = models.ImageField(upload_to='images', null=True, blank=True)

    full_name = models.TextField('ФИО')
    phone = models.TextField('Номер телефона')
    description = models.TextField('Описание выполняемых работ')

    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Работники'

class FAQ(models.Model):
    question = models.TextField('Вопрос')
    answer = models.TextField('Ответ')
    date = models.DateField('Дата добавления')

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQ'

class News(models.Model):
    title = models.TextField('Заголовок')
    text = models.TextField('Текст')
    image = models.ImageField(upload_to='images', null=True, blank=True)
    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

class Vacancion(models.Model):
    title = models.TextField('Заголовок')
    text = models.TextField('Текст')
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'
       
class Discount(models.Model):
    title = models.TextField('Заголовок')
    text = models.TextField('Текст')
    discount = models.IntegerField('Скидка')
    min_quantity = models.IntegerField('Минимальное количество для скидки')

    class Meta:
        verbose_name = 'Скидка'
        verbose_name_plural = 'Скидки'

class User(models.Model):
    login = models.TextField('Логин')
    password = models.TextField('Пароль')
    fullName = models.TextField('ФИО')
    phone = models.TextField('ФИО')
    IsEmployee = models.BooleanField("Сотрудник/Пользователь", default=False)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Comment(models.Model):
    UserName = models.TextField('ФИО пользователя')
    text = models.TextField('Текст комментария')
    data = models.DateTimeField('Время комментария')
    mark = models.IntegerField('Оценка')

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

#-----------------------------------------------------------------------

class Supplier(models.Model):
    name = models.TextField('Поставщик')
    adress = models.TextField('Адрес')
    phone = models.TextField('Телефон')

    class Meta:
        verbose_name = 'Поставщик'
        verbose_name_plural = 'Поставщики'

from django.db import models

class Partner(models.Model):
    name = models.CharField(max_length=255)  # Используйте CharField для имени
    logo = models.ImageField(upload_to='logos/')  # Поле для загрузки изображения логотипа
    link = models.URLField(max_length=255)  # Поле для ссылки
    class Meta:
        verbose_name = 'Партнер'
        verbose_name_plural = 'Партнеры'


class Detail(models.Model):
    SupplierId = models.IntegerField('Id поставщика')
    name = models.TextField('Деталь')
    article = models.IntegerField('Артикул')
    price = models.IntegerField('Цена')

    class Meta:
        verbose_name = 'Деталь'
        verbose_name_plural = 'Детали'


class Order(models.Model):
    UserId = models.IntegerField('Id пользователя')    
    quantity = models.IntegerField('Количество деталей')
    purchase_date = models.DateTimeField('Дата покупки')
    sum = models.IntegerField('Сумма заказа')    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class OrderItem(models.Model):
    NameOfSupplier = models.TextField('Имя поставщика')
    NameOfDetail = models.TextField('Имя детали')
    OrderId = models.IntegerField('Id заказа')    
    SupplierId = models.IntegerField('Id поставщика')
    DetailId = models.IntegerField('Id детали')
    
    class Meta:
        verbose_name = 'часть заказа'
        verbose_name_plural = 'часть заказов'

       
class Time(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)