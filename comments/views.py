from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_api_lastpage.permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer, CommentDetailSerializer


class CommentList(generics.ListCreateAPIView):
    """
    List all comments.
    No create view as comment creation is handled by django signals.
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all().order_by('-created_on')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.annotate(
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_on')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',  # user feed
        'likes__owner__profile',            # user liked comments
        'owner__profile',                   # user comments
    ]
    search_fields = [
        'owner__username',
    ]
    ordering_fields = [
        'likes_count',
        'likes__created_on',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a comment, or update or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.annotate(
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_on')