from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Recipe, Category
from .serializers import RecipeSerializer, CategorySerializer
from django.views.generic import ListView
# from django.views.generic import DetailView
# from .filters import RecipeFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
# from django.db.models.functions import Lower
import unicodedata


class RecipeList(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    lookup_field = 'id'



class RecipesList(ListView):
    model = Recipe
    template_name = 'recipes/recipes_list.html'



class RecipeDetail(RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    lookup_field = 'pk'    



class RecipesByCategory(APIView):
    def get(self, request, slug):
        try:
            category = Category.objects.get(slug=slug)
            recipes = Recipe.objects.filter(category=category)
            data = {
                "category": {
                    "id": category.id,
                    "name": category.name,
                    "slug": category.slug
                },
                "recipes": RecipeSerializer(recipes, many=True).data
            }
            return Response(data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({"error": "Категория не найдена"}, status=status.HTTP_404_NOT_FOUND)



class Categories(ListView):
    model = Category
    template_name = 'recipes/categories.html'

    def category_list(request):
        queryset = Category.objects.all()
        return render(request, 'recipes/categories.html', {'categories': queryset})



class GetCategory(APIView):
    def get(self, request, id):
        p = Recipe.objects.filter(category_id=id).all()
        serializer = RecipeSerializer(p, many=True)
        return Response(serializer.data)


class CategoriesList(APIView):
    model = Category
    template_name = 'recipes/categories_detail.html'

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)



class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ['title', 'instructions'] 

    
# class RecipeSearchView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         query = request.GET.get('search', '')
#         if query:
#             recipes = Recipe.objects.annotate(lower_title=Lower('title')).filter(lower_title__contains=query.lower())
#         else:
#             recipes = Recipe.objects.all()

#         serializer = RecipeSerializer(recipes, many=True)
#         return Response(serializer.data)
    

class RecipeSearchView(APIView):
    def get(self, request):
        query = request.GET.get('search', '').strip()
        if query:
            query_normalized = unicodedata.normalize('NFKD', query).lower()
            recipes = Recipe.objects.all()
            results = []

            for recipe in recipes:
                title_normalized = unicodedata.normalize('NFKD', recipe.title).lower()
                if query_normalized in title_normalized:
                    results.append(recipe)

            serializer = RecipeSerializer(results, many=True)
            return Response(serializer.data)

        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)






