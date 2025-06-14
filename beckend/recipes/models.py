from django.db import models
from django.urls import reverse


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('categories_detail', kwargs={'slug': self.slug})



class RecipeFilter(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Фильтр'
        verbose_name_plural = 'Фильтры'
        ordering = ["id"]



class Recipe(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    subject = models.CharField(max_length=200, verbose_name="Описание")
    description = models.TextField(verbose_name="Продукты")
    category = models.ForeignKey(Category, related_name='recipes', on_delete=models.CASCADE, verbose_name="Категория")
    image = models.ImageField(upload_to='recipe_images/', null=True, blank=True, verbose_name="Фото")
    slug = models.SlugField(max_length=50)
    instructions = models.TextField(verbose_name="Как готовить", blank=True, null=True) 


    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('recipe-detail', kwargs={'pk': self.pk})



