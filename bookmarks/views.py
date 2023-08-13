from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drf_api_lastpage.permissions import IsOwnerOrReadOnly
from .models import Bookmark
from .serializers import BookmarkSerializer, BookmarkDetailSerializer


class BookmarkList(generics.ListCreateAPIView):
    """
    List all bookmarks or if the user is logged-in they have the ability to
    create new boorkmarks. perform_create method associates the bookmark.owner
    with the logged-in user
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.annotate(
        book_count=Count('book', distinct=True),
     ).order_by('owner', 'book')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'book',
    ]
    search_fields = [
    ]
    ordering_fields = [
        'owner',
        'book'
    ]

    def perform_create(self, serializer):
            serializer.save(owner=self.request.user)

class BookmarkDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Bookmarks can be retrieved, update and deleted if is the owner
    """
    serializer_class = BookmarkDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Bookmark.objects.annotate(
        book_count=Count('book', distinct=True),
     ).order_by('owner', 'book')
    filterset_fields = [
            'book',
        ]
    # def perform_update(self, serializer):
    #     serializer.save(owner=self.request.user)