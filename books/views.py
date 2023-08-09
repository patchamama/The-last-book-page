from django.db.models import Count
from rest_framework import generics, filters
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers import BookSerializer


class BookList(generics.ListCreateAPIView):
    """
    List all books.
    No create view as book creation is handled by django signals.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = BookSerializer
    # queryset = Book.objects.all().order_by('auth', 'title')
    queryset = Book.objects.annotate(
        comments_count=Count('comment', distinct=True)
    ).order_by('auth', 'title')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    filterset_fields = [
    ]
    search_fields = [
        'title',
        'auth'
    ]
    ordering_fields = [
        'comments_count'
    ]
    




class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve (any) or update a books if you're authenticate.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Book.objects.all().order_by('auth', 'title')
    serializer_class = BookSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

