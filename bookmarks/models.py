from django.db import models
from django.contrib.auth.models import User
from books.models import Book

STATUS_TYPE = [
    ("Want to read", "Want to read"),
    ("Currently Reading", "Currently Reading"),
    ("Read", "Read"),
    ("To Check", "To Check"),
]


class Bookmark(models.Model):
    """
    Bookmark model which is related to 'owner' and 'books' model.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=25, choices=STATUS_TYPE, default="Want to read"
    )
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_on"]
        unique_together = ["owner", "book"]

    def __str__(self):
        return f"{self.owner} {self.book}"
