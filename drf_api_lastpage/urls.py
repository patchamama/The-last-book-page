from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import logout_route

urlpatterns = [
    # path('', root_route),
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('api/api-auth/', include('rest_framework.urls')),
    path('api/dj-rest-auth/logout/', logout_route),
    path('api/dj-rest-auth/', include('dj_rest_auth.urls')),
    path(
        'api/dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')
    ),
    path('api/', include('profiles.urls')),
    path('api/', include('books.urls')),
    path('api/', include('comments.urls')),
    path('api/', include('likes.urls')),
    path('api/', include('followers.urls')),
    path('api/', include('bookmarks.urls')),
    path('api/', include('stickers.urls')),
]

handler404 = TemplateView.as_view(template_name='index.html')
