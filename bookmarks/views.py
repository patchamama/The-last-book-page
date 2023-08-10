from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drf_api_lastpage.permissions import IsOwnerOrReadOnly
from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkList(generics.ListCreateAPIView):
    """
    List all books.
    No create view as book creation is handled by django signals.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Bookmark.objects.all().order_by('owner', 'book')
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
            serializer.save(owner=self.request.user)

class BookmarkDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Bookmarks can be retrieved, update and deleted
    """
    serializer_class = BookmarkSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Bookmark.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)