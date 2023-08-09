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
    queryset = Book.objects.all().order_by('auth', 'title')
    serializer_class = BookSerializer




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

