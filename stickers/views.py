from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions
from drf_api_lastpage.permissions import IsOwnerOrReadOnly
from .models import Sticker
from .serializers import StickerSerializer, StickerDetailSerializer


class StickerList(generics.ListCreateAPIView):
    """
    List stickers and create a sticker if a user is logged-in
    """

    serializer_class = StickerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Sticker.objects.all()
    filter_backends = [DjangoFilterBackend]

    filterset_fields = ["comment"]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class StickerDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Stickers can be retrieved, updated, and deleted
    """

    serializer_class = StickerDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Sticker.objects.all()
