#!/bin/python3
# Created by Cherry

from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField)
from chat_module.chat_module_serializer import UserSerializer\
    as UserDetailSerializer
from comments.api.serializers import CommentSerializer
from comments.models import Comment
from posts.models import Post


class PostCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'publish']


class PostDetailSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    html = SerializerMethodField()
    comments = SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'title',
                  'slug', 'content', 'html', 'publish',
                  'comments']

    @staticmethod
    def get_html(obj):
        return obj.get_markdown()

    @staticmethod
    def get_comments(obj):
        c_qs = Comment.objects.filter_by_instance(obj)
        comments = CommentSerializer(c_qs, many=True).data
        return comments


class PostListSerializer(ModelSerializer):
    url = HyperlinkedIdentityField(
        view_name='posts-detail',
        lookup_field='id')
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'url', 'user', 'title', 'content', 'publish']
