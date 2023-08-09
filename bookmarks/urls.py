from django.urls import path
from bookmarks import views

urlpatterns = [
    path('bookmarks/', views.BookmarkList.as_view()),

]