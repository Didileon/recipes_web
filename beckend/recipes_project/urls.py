from django.contrib import admin
from django.urls import path, include
from core.views import index

# from rest_framework import permissions
from rest_framework.permissions import IsAdminUser
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from recipes.views import RecipeList, RecipeDetail, GetCategory, RecipesList, CategoriesList, RecipesByCategory
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from recipes.views import RecipeViewSet, CategoryViewSet
from recipes.views import RecipeSearchView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



schema_view = get_schema_view(
   openapi.Info(
       title="My Recipe API",
       default_version='v1',
       description="API for managing recipes",
       terms_of_service="https://www.google.com/policies/terms/",
       contact=openapi.Contact(email="contact@myrecipeapi.local"),
       license=openapi.License(name="BSD License"),
   ),
   public=True,
#    permission_classes=(permissions.AllowAny,),
    permission_classes=(IsAdminUser,),
)

# Создаём router один раз и регистрируем всё
router = DefaultRouter()
router.register(r'recipes', RecipeViewSet, basename='recipe')
router.register(r'categories', CategoryViewSet, basename='category')


urlpatterns = [
    
    path('admin/', admin.site.urls),
    path("", index, name="index"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/recipes_list/', RecipeList.as_view(), name='recipe-list'),
    path('api/recipes_detail/<int:pk>/', RecipeDetail.as_view(), name='recipe-detail'),
    path('recipes/recipes_list/', RecipesList.as_view(), name='recipes_list'),
    path('category/<slug:slug>/', RecipesByCategory.as_view(), name='category-detail'),
    path('recipes/categories/', CategoriesList.as_view(), name='categories-list'),
    path('recipes/categories_detail/', CategoriesList.as_view(), name='categories_detail'),
    path('api/categories_by_id/<int:id>/', GetCategory.as_view()),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('api/recipe-search/', RecipeSearchView.as_view(), name='recipe-search'),
    
    # Подключаем router
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


