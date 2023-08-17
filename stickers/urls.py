from django.urls import path
from stickers import views

urlpatterns = [
    path('stickers/', views.StickerList.as_view()),
    path('stickers/<int:pk>/', views.StickerDetail.as_view()),
]
