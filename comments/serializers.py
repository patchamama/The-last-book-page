from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model
    Adds extra fields when returning a list of Comment instances
    """
    owner = serializers.IntegerField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    book_cover = serializers.ImageField(source='book.cover', read_only=True)
    book_title = serializers.ReadOnlyField(source='book.title')
    book_auth = serializers.ReadOnlyField(source='book.auth')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Comment
        fields = [
            'id', 'owner', 'comment', 'profile_id', 'profile_image',      
            'book', 'book_cover', 'book_title', 'book_auth', 
            'created_on', 'updated_on', 'is_owner', 
        ]

class CommentDetailSerializer(CommentSerializer):
    """
    Serializer for the Comment model used in Detail view
    Book is a read only field so that we dont have to set it on each update
    """
    book = serializers.ReadOnlyField(source='book.id')