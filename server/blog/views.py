from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from .models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        article = self.get_object()
        user = self.request.user
        if article.author != user and not user.is_staff:
            raise PermissionDenied("You can only edit your own articles.")
        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user
        if instance.author != user and not user.is_staff:
            raise PermissionDenied("You can only delete your own articles.")
        instance.delete()

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        article = get_object_or_404(Article, pk=pk)
        comments = Comment.objects.filter(article=article)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        comment = self.get_object()
        user = self.request.user
        if comment.author != user and not user.is_staff:
            raise PermissionDenied("You can only edit your own comments.")
        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user
        if instance.author != user and not user.is_staff:
            raise PermissionDenied("You can only delete your own comments.")
        instance.delete()


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
