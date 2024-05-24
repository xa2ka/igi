from django.test import TestCase
from django.urls import reverse

class URLTests(TestCase):
    def test_home_page(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

    def test_about_page(self):
        response = self.client.get(reverse('about'))
        self.assertEqual(response.status_code, 200)

    def test_login_page(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)

    def test_news_page(self):
        response = self.client.get(reverse('news'))
        self.assertEqual(response.status_code, 200)

    def test_faq_page(self):
        response = self.client.get(reverse('faq'))
        self.assertEqual(response.status_code, 200)

    def test_contacts_page(self):
        response = self.client.get(reverse('contacts'))
        self.assertEqual(response.status_code, 200)

    def test_policy_page(self):
        response = self.client.get(reverse('policy'))
        self.assertEqual(response.status_code, 200)

    def test_vacancies_page(self):
        response = self.client.get(reverse('vacancies'))
        self.assertEqual(response.status_code, 200)

    def test_feedback_page(self):
        response = self.client.get(reverse('feedback'))
        self.assertEqual(response.status_code, 200)

    def test_registration_page(self):
        response = self.client.get(reverse('registration'))
        self.assertEqual(response.status_code, 200)

    def test_discounts_page(self):
        response = self.client.get(reverse('discounts'))
        self.assertEqual(response.status_code, 200)

    def test_usermain_page(self):
        response = self.client.get(reverse('usermain'))
        self.assertEqual(response.status_code, 200)

    def test_userabout_page(self):
        response = self.client.get(reverse('userabout'))
        self.assertEqual(response.status_code, 200)

    def test_usernews_page(self):
        response = self.client.get(reverse('usernews'))
        self.assertEqual(response.status_code, 200)

    def test_userfaq_page(self):
        response = self.client.get(reverse('userfaq'))
        self.assertEqual(response.status_code, 200)

    def test_usercontacts_page(self):
        response = self.client.get(reverse('usercontacts'))
        self.assertEqual(response.status_code, 200)

    def test_userpolicy_page(self):
        response = self.client.get(reverse('userpolicy'))
        self.assertEqual(response.status_code, 200)

    def test_uservacancies_page(self):
        response = self.client.get(reverse('uservacancies'))
        self.assertEqual(response.status_code, 200)

    def test_userfeedback_page(self):
        response = self.client.get(reverse('userfeedback'))
        self.assertEqual(response.status_code, 200)

    def test_userdiscounts_page(self):
        response = self.client.get(reverse('userdiscounts'))
        self.assertEqual(response.status_code, 200)

    def test_request_page(self):
        response = self.client.get(reverse('request'))
        self.assertEqual(response.status_code, 200)

    def test_time_page(self):
        response = self.client.get(reverse('time'))
        self.assertEqual(response.status_code, 200)

    def test_employee_page(self):
        response = self.client.get(reverse('employee'))
        self.assertEqual(response.status_code, 200)

    def test_orders_page(self):
        response = self.client.get(reverse('orders'))
        self.assertEqual(response.status_code, 200)
