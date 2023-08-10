from django.db import IntegrityError
from rest_framework import serializers
from .models import Bookmark


class BookmarkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Bookmark model
    Adds extra fields when returning a list of Bookmark instances
    """

    # owner = serializers.ReadOnlyField(source='owner.id')
    # owner = serializers.PrimaryKeyRelatedField(read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    book_cover = serializers.ImageField(source='book.cover', read_only=True)
    book_title = serializers.ReadOnlyField(source='book.title')
    book_auth = serializers.ReadOnlyField(source='book.auth')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Bookmark
        fields = [
            'id', 'owner', 'status', 'book', 'book_cover', 
            'book_title', 'book_auth', 'created_on', 'is_owner'
        ]
        

    def create(self, validated_data):
        """
        If a user tries to bookmark the same post multiple times,
        it will throw a duplicate error
        """
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplication'
            })