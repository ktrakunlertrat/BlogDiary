from django.shortcuts import render,redirect
from .models import Post

# Create your views here.
def hello(request):
    return render(request,'index.html')

def read(request):
    #Query Data From Models
    data=Post.objects.all()
    return render(request,'read.html',{'posts':data})

def write(request):
    return render(request,'write.html')

def test(request):
    return render(request,'test.html')

def test2(request):
    return render(request,'test2.html')

def addBlog(request):
    name=request.POST['name']
    description=request.POST['description']
    return render(request,'result.html',{'name':name,'description':description})

def savePost(request):
    if request.method == 'POST':
        name = request.POST['name']
        description = request.POST['description']

        new_Post = Post(name=name, desc=description)
        new_Post.save()

        return redirect('/write')