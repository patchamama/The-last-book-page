from django.db.models import Count
from rest_framework import generics, filters
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers import BookSerializer


class BookList(generics.ListCreateAPIView):
    """
    List all books or if the user is logged-in they have the ability to
    create new books. perform_create method associates the book.created_by
    with the logged-in user
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = BookSerializer
    # queryset = Book.objects.all().order_by('auth', 'title')
    queryset = Book.objects.annotate(
        comments_count=Count('comment', distinct=True),
        bookmarks_count=Count('bookmark', distinct=True)
    ).order_by('auth', 'title')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    filterset_fields = [
    ]
    search_fields = [
        'title',
        'auth',
        'genre'
    ]
    ordering_fields = [
        'comments_count',
        'bookmarks_count'
    ]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve or update books if you're authenticate.
    perform_update method associates the book.updated_by
    with the logged-in user
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    # queryset = Book.objects.all().order_by('auth', 'title')
    serializer_class = BookSerializer
    queryset = Book.objects.annotate(
        comments_count=Count('comment', distinct=True),
        bookmarks_count=Count('bookmark', distinct=True)
    ).order_by('auth', 'title')

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

