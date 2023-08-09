from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'auth', 'pub_date', 'publisher', 'pages_no', 
            'isbn', 'lang_orig', 'lang', 'translators', 'genre', 
            'synopsis', 'cover', 'created_by', 'updated_by', 'created_on', 
            'updated_on',
        ]

    

 