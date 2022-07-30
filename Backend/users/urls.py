from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserListAPIView.as_view()),
    path('register/', views.UserCreateAPIView.as_view()),
    path('<int:pk>/documents/', views.DocumentsListAPIView.as_view()),
    path('<int:pk>/', views.GetUserDetailAPIView.as_view()),
    path('<int:pk>/update-profile/', views.UpdateUserDetailAPIView.as_view())
]
