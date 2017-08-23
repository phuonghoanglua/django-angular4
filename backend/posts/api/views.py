from django.db.models import Q
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,)
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from posts.models import Post
from .serializers import (
    PostCreateUpdateSerializer,
    PostDetailSerializer,
    PostListSerializer)
from rest_framework_jwt.utils import jwt_decode_handler


class ResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class PostDetailUpdateAPIView(viewsets.GenericViewSet,
                              RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateUpdateSerializer
    lookup_field = 'id'
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        # email send_email

    def get_serializer_class(self):
        if self.request.method.lower() == 'get':
            return PostDetailSerializer
        return super(PostDetailUpdateAPIView, self).get_serializer_class()


class PostListCreateAPIView(viewsets.GenericViewSet,
                            ListCreateAPIView):
    serializer_class = PostListSerializer
    queryset = Post.objects.all()
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = ResultsSetPagination

    def get_serializer_class(self):
        if self.request.method.lower() == 'post':
            return PostCreateUpdateSerializer
        return super(PostListCreateAPIView, self).get_serializer_class()

    def get_queryset(self, *args, **kwargs):
        queryset_list = Post.objects.all()  # filter(user=self.request.user)
        query = self.request.GET.get('q', None)
        if query:
            queryset_list = queryset_list.filter(
                Q(title__icontains=query) |
                Q(content__icontains=query) |
                Q(user__first_name__icontains=query) |
                Q(user__last_name__icontains=query)).distinct()
        return queryset_list

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.user = self.request.user
        instance.save()
