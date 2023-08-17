from rest_framework import serializers
from .models import Profile
from followers.models import Follower


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    def get_following_id(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed=obj.owner).first()
            return following.id if following else None
        return None

    def validate_image(self, value):
        """
        Image validation function
        """
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("Image size larger than 2MB!")
        if value.image.height > 4096:
            raise serializers.ValidationError(
                "Image height larger than 4096px!")
        if value.image.width > 4096:
            raise serializers.ValidationError(
                "Image width larger than 4096px!")
        return value

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    class Meta:
        model = Profile
        fields = [
            "id",
            "owner",
            "created_on",
            "updated_on",
            "name",
            "image",
            "date_of_birth",
            "language",
            "is_owner",
            "following_id",
            "comments_count",
            "followers_count",
            "following_count",
        ]
