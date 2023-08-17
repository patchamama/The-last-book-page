from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_api_lastpage.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    """
    List all profiles.
    No create view as profile creation is handled by django signals.
    """

    queryset = Profile.objects.annotate(
        comments_count=Count("owner__comment", distinct=True),
        followers_count=Count("owner__followed", distinct=True),
        following_count=Count("owner__following", distinct=True),
    ).order_by("-created_on")
    serializer_class = ProfileSerializer
    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        "owner__following__followed__profile",
    ]
    ordering_fileds = [
        "comments_count",
        "followers_count",
        "following_count",
        "owner__following_created_on",
        "owner_followed_created_on",
    ]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner.
    """

    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        comments_count=Count("owner__comment", distinct=True),
        followers_count=Count("owner__followed", distinct=True),
        following_count=Count("owner__following", distinct=True),
    ).order_by("-created_on")
    serializer_class = ProfileSerializer
