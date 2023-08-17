from django.db import IntegrityError
from rest_framework import serializers
from likes.models import Like


class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model
    The create method handles the unique constraint on 'owner' and 'comment'
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    comment_text = serializers.ReadOnlyField(source='comment.comment')

    class Meta:
        model = Like
        fields = ['id', 'created_on', 'owner', 'comment', 'comment_text']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
