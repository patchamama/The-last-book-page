from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    book_id = serializers.ReadOnlyField(source='comment_book.id')
    book_cover = serializers.ReadOnlyField(source='comment_book.cover.image.url')
    book_title = serializers.ReadOnlyField(source='comment_book.title')
    book_auth = serializers.ReadOnlyField(source='comment_book.auth')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner


    class Meta:
        model = Comment
        fields = [
            'id', 'owner', 'comment', 'profile_id', 'profile_image', 
            'book_id', 'book_cover', 'book_title', 'book_auth', 
            'created_on', 'updated_on', 'is_owner', 
        ]
