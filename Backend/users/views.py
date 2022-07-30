# from django.shortcuts import render
from rest_framework import generics, permissions

# Create your views here.
from .models import User
from .serializers import GetUserSerializer, GetUserDocumentsSerializer, RegisterUserSerializer
from .permissions import IsOwner, IsUser


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer


class GetUserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsUser]


class DocumentsListAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserDocumentsSerializer
    permission_classes = [permissions.IsAuthenticated]


class UpdateUserDetailAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    lookup_field = 'pk'
    permission_classes = [permissions.IsAuthenticated, IsUser]


