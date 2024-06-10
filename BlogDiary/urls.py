from django.contrib import admin
from django.urls import path
from BlogDiary import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.hello),
    path('read',views.read),
    path('write',views.write),
    path('test',views.test),
    path('test2',views.test2),
    path('addForm',views.addBlog),
    path('savePost',views.savePost)
]