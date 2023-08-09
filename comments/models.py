from django.db import models
from django.contrib.auth.models import User


class Comment(models.Model):
    """
    Comment model with content of comments of books, related to 'owner', i.e. a User instance.
    """
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="comment_book")
    comment = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f"Comment {self.comment} by {self.owner}"