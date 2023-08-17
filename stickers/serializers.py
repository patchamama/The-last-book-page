from rest_framework import serializers
from .models import Sticker


class StickerSerializer(serializers.ModelSerializer):
    """
    Sticker serializer class converts to JSON
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")

    def get_is_owner(self, obj):
        """
        Checks if the requested user is the owner of the sticker
        """
        request = self.context["request"]
        return request.user == obj.owner

    class Meta:
        """
        Specify fields from sticker model
        """

        model = Sticker
        fields = [
            "id",
            "owner",
            "is_owner",
            "profile_id",
            "profile_image",
            "comment",
            "created_on",
            "updated_on",
            "content",
        ]


class StickerDetailSerializer(StickerSerializer):
    """
    Serializer used for referencing the Comment Id which
    the sticker is associated with
    """

    comment = serializers.ReadOnlyField(source="comment.id")
