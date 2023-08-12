from django.db import models
from django.contrib.auth.models import User
from comments.models import Comment


class Sticker(models.Model):
    """
    Sticker model, which is related to User and Comment
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    sticker = models.TextField()

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.sticker