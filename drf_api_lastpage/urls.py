from django.contrib import admin
from django.urls import path, include
from .views import root_route, logout_route

urlpatterns = [
    path('', root_route),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/logout/', logout_route),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path(
        'dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')
    ),
    path('', include('profiles.urls')),
    path('', include('books.urls')),
    path('', include('comments.urls')),
    path('', include('likes.urls')),
    path('', include('followers.urls')),
    path('', include('bookmarks.urls')),
    path('', include('stickers.urls')),
]
