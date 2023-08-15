
from rest_framework import serializers
from .models import Book
from bookmarks.models import Bookmark


class BookSerializer(serializers.ModelSerializer):
    """
    Book serializer class inheriting from ModelSerializer
    """
    comments_count = serializers.ReadOnlyField()
    bookmark_id = serializers.SerializerMethodField()
    bookmarks_count = serializers.ReadOnlyField()

    def get_bookmark_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            bookmark = Bookmark.objects.filter(
                owner=user, book=obj
            ).first()
            return bookmark.id if bookmark else None
        return None

    def validate_image(self, value):
        """
        Image validation function
        """
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
            'updated_on', 'comments_count', 'bookmark_id', 'bookmarks_count',
        ]

    

 