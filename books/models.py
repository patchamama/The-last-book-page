from django.db import models
from django.contrib.auth.models import User
from drf_api_lastpage.globals import LANGUAGES

class Book(models.Model):
    """
    Book model with content of books
    default image set so that we can always reference image.url.
    """

    title = models.CharField(max_length=150, unique=False)
    auth = models.CharField(max_length=150, unique=False)
    pub_date = models.DateTimeField(blank=True, null=True)
    publisher = models.CharField(max_length=100, unique=False, blank=True)
    pages_no = models.IntegerField(default=0)
    isbn = models.CharField(max_length=13, unique=False, blank=True)
    lang_orig = models.CharField(max_length=50, choices=LANGUAGES, blank=True)
    lang = models.CharField(max_length=50, choices=LANGUAGES, blank=True)
    translators = models.CharField(max_length=200, unique=False, blank=True)
    genre = models.TextField(blank=True)
    synopsis = models.TextField(blank=True)
    cover = models.ImageField(
        upload_to='images/', default='../No_image_available.svg_t2xrtz.png')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="book_createdby", blank=True, null=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="book_updatedby", blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f'{self.id} {self.title} - {self.auth}'

    