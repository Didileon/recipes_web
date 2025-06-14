from rest_framework import serializers
from .models import Recipe, Category


class RecipeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field='name'
    )
    
    class Meta:
        model = Recipe
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
