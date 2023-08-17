from django.db import IntegrityError
from rest_framework import serializers
from .models import Bookmark


class BookmarkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Bookmark model
    Adds extra fields when returning a list of Bookmark instances
    """

    owner = serializers.ReadOnlyField(source="owner.username")
    is_owner = serializers.SerializerMethodField()
    book_id = serializers.ReadOnlyField(source="book.id")
    bookmark_id = serializers.ReadOnlyField(source="id")
    bookmark_status = serializers.ReadOnlyField(source="status")
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")
    cover = serializers.ImageField(source="book.cover", read_only=True)
    title = serializers.ReadOnlyField(source="book.title")
    auth = serializers.ReadOnlyField(source="book.auth")
    synopsis = serializers.ReadOnlyField(source="book.synopsis")
    genre = serializers.ReadOnlyField(source="book.genre")
    pages_no = serializers.ReadOnlyField(source="book.pages_no")
    pub_date = serializers.ReadOnlyField(source="book.pub_date")

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    class Meta:
        model = Bookmark
        fields = [
            "id",
            "owner",
            "status",
            "book",
            "cover",
            "is_owner",
            "profile_id",
            "profile_image",
            "book_id",
            "bookmark_id",
            "bookmark_status",
            "title",
            "auth",
            "created_on",
            "synopsis",
            "genre",
            "pages_no",
            "pub_date",
        ]

    def create(self, validated_data):
        """
        If a user tries to bookmark the same multiple times,
        it will throw a duplicate error
        """
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                {"detail": "possible duplication"})


class BookmarkDetailSerializer(BookmarkSerializer):
    """
    Serializer for the Bookmark model used in Detail view
    Book is a read only field so that we dont have to set it on each update
    """

    book = serializers.ReadOnlyField(source="book.id")
