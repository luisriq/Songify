from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from random import randint
from django.conf import settings
import os
import hashlib

# Create your views here.

def main(request):
	return render(request,"main.html")

#FROM: http://www.guguncube.com/3237/python-string-to-number-hash
def string2numeric_hash(text):
    return int(hashlib.md5(text).hexdigest()[:8], 16)
 
def getFileUrl(request):
	path = settings.MEDIA_ROOT 
	palabra = request.GET["palabra"]
	archivos = [f for f in os.listdir(path) if ".mp3" in f]
	indice = string2numeric_hash(palabra)%len(archivos)
	if(palabra == ""):
		return JsonResponse({"url":"/media/"+archivos[randint(0,len(archivos)-1)]})
	return JsonResponse({"url":"/media/"+archivos[indice]})