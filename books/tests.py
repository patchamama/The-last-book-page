from django.contrib.auth.models import User
from .models import Book
from rest_framework import status
from rest_framework.test import APITestCase


class BookListViewTests(APITestCase):
    """
    Testing BookList views with setUp test user
    """
    def setUp(self):
        Book.objects.create(title='test title')
        mandy = User.objects.create_user(
            username='mandy', password='password')

    def test_can_list_all_the_books_not_logged(self):
        response = self.client.get('/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_retrieve_book_detail_not_logged(self):
        response = self.client.get('/books/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'test title')

    def test_logged_in_user_can_create_book(self):
        self.client.login(username='mandy', password='password')
        aldcount = Book.objects.count()
        response = self.client.post('/books/', {'title': 'test title', 'auth' : '1'})
        newcount = Book.objects.count()
        self.assertEqual(newcount, aldcount + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_logged_out_in_user_cant_create_book(self):
        response = self.client.post('/books/', {'title': 'test title', 'auth' : '1'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class BookDetailListViewTests(APITestCase):
    """
    Testing BookDetailList views with setUp test user
    """
    def setUp(self):
        bookobj = Book.objects.create(title='test title')
        mandy = User.objects.create_user(
            username='mandy', password='password')
        susan = User.objects.create_user(
            username='susan', password='password')

    def test_can_retrieve_book_using_valid_id(self):
        response = self.client.get('/books/1/')
        self.assertEqual(response.data['title'], 'test title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_book_using_invalid_id(self):
        response = self.client.get('/books/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_logged_can_update_any_book(self):
        self.client.login(username='mandy', password='password')
        response = self.client.put('/books/1/', {'title': 'new title 1', 'auth': '1'})
        book = Book.objects.filter(pk=1).first()
        self.assertEqual(book.title, 'new title 1')
        self.assertEqual(response.data['updated_by'], 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.client.login(username='susan', password='password')
        response = self.client.put('/books/1/', {'title': 'new title 2', 'auth': '1'})
        book = Book.objects.filter(pk=1).first()
        self.assertEqual(book.title, 'new title 2')
        self.assertEqual(response.data['updated_by'], 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

