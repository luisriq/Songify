from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from random import randint
from django.conf import settings
import os


# Create your views here.

def main(request):
	return render(request,"main.html")



def getFileUrl(request):
	path = settings.MEDIA_ROOT 
	archivos = [f for f in os.listdir(path) if ".mp3" in f]
	return JsonResponse({"url":"/media/"+archivos[randint(0,len(archivos)-1)]})