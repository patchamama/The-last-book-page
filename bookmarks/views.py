from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from drf_api_lastpage.permissions import IsOwnerOrReadOnly
from .models import Bookmark
from .serializers import BookmarkSerializer


class BookmarkList(generics.ListCreateAPIView):
    """
    List all bookmarks or if the user is logged-in they have the ability to
    create new boorkmarks. perform_create method associates the bookmark.owner
    with the logged-in user
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Bookmark.objects.all().order_by('owner', 'book')
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
            serializer.save(owner=self.request.user)

class BookmarkDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Bookmarks can be retrieved, update and deleted if is the owner
    """
    serializer_class = BookmarkSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Bookmark.objects.all()

    # def perform_update(self, serializer):
    #     serializer.save(owner=self.request.user)