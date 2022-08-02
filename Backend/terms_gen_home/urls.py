"""terms_gen_home URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt import views as jwt_views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('api/admin/', admin.site.urls),  # admin url
    path('api/users/', include("users.urls")),  # all urls associated with users
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),  # generate login token
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),  # generate refresh token
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),  # verify token
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    # documentation urls
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^api/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
