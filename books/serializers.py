from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    comments_count = serializers.ReadOnlyField()
    bookmarks_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError('Image size larger than 2MB!')
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        return value

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'auth', 'pub_date', 'publisher', 'pages_no', 
            'isbn', 'lang_orig', 'lang', 'translators', 'genre', 
            'synopsis', 'cover', 'created_by', 'updated_by', 'created_on', 
            'updated_on', 'comments_count', 'bookmarks_count',
        ]

    

 