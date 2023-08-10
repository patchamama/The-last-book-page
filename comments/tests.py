from django.contrib.auth.models import User
from .models import Comment, Book
from rest_framework import status
from rest_framework.test import APITestCase


class CommentListViewTests(APITestCase):
    """
    Testing CommentList views with setUp test user
    """
    def setUp(self):
        Book.objects.create(title='test title')
        User.objects.create_user(
            username='mandy', password='password')

    def test_can_display_list_of_comments_nonlogged(self):
        response = self.client.get('/comments/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_can_display_comment_added(self):
        userobj = User.objects.get(username='mandy')
        bookobj = Book.objects.get(title='test title')
        Comment.objects.create(owner=userobj, book=bookobj, comment='test comment')

        response = self.client.get('/comments/')
        count = Comment.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['comment'], 'test comment')

    def test_logged_user_can_create_comment(self):
        self.client.login(username="mandy", password='password')
        response = self.client.post('/comments/', {'comment' : 'my comment', 'book' : '1'})
        count = Comment.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_not_logged_user_cant_create_comment(self):
        response = self.client.post('/comments/', {'comment' : 'my comment', 'book' : '1'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CommentDetailListViewTests(APITestCase):
    """
    Testing CommentDetailList views with setUp test user
    """
    def setUp(self):
        bookobj = Book.objects.create(title='test title')
        mandy = User.objects.create_user(
            username='mandy', password='password')
        susan = User.objects.create_user(
            username='susan', password='password')
        Comment.objects.create(
            owner=mandy, book=bookobj, comment='mandy comment')
        Comment.objects.create(
            owner=susan, book=bookobj, comment='susan comment')

    def test_can_retrieve_comment_using_valid_id(self):
        response = self.client.get('/comments/1/')
        self.assertEqual(response.data['comment'], 'mandy comment')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_404_not_found_from_dont_exist_id(self):
        response = self.client.get('/comments/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_comment(self):
        self.client.login(username="mandy", password='password')
        response = self.client.put('/comments/1/', {'comment' : 'my new comment', 'book' : '1'})
        comment = Comment.objects.filter(pk=1).first()
        self.assertEqual(comment.comment, 'my new comment')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_another_users_comment(self):
        self.client.login(username="susan", password='password')
        response = self.client.put('/comments/1/', {'comment' : 'my new comment', 'book' : '1'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)



 