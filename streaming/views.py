from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from random import randint
from django.conf import settings
import os
import hashlib
import reconocedor
from RangeFileReader import RangedFileResponse

# Create your views here.

def main(request):
	return render(request,"main.html")

#FROM: http://www.guguncube.com/3237/python-string-to-number-hash
def string2numeric_hash(text):
    return int(hashlib.md5(text).hexdigest()[:8], 16)
#V1
def getFileUrl(request):
	path = settings.MEDIA_ROOT 
	palabra = request.GET["palabra"]
	archivos = [f for f in os.listdir(path) if (".mp3" in f or ".wav" in f)]
	indice = string2numeric_hash(palabra)%len(archivos)
	archivoSeleccionado = ""
	if(palabra == ""):
		archivoSeleccionado = archivos[randint(0,len(archivos)-1)]
	else:
		archivoSeleccionado = archivos[indice]
	print(archivoSeleccionado)
	if("wav" in archivoSeleccionado[-4:]):
		return JsonResponse({"url":"/mediaProxyWav/"+archivoSeleccionado})
	else:
		return JsonResponse({"url":"/media/"+archivoSeleccionado})

def analizarFrase(request):
	palabra = request.GET["frase"]
	rec = reconocedor.reconocerPalabras(palabra)
	
	if(rec == None):
		archivos = [f for f in os.listdir(settings.MEDIA_ROOT) if (".mp3" in f or ".wav" in f)]
		return JsonResponse({"url":preProcesamientoURL(archivos[randint(0,len(archivos)-1)])})
	return JsonResponse({"url":preProcesamientoURL(rec["sentimiento"].cancion), "palabras":list(set(rec["palabras"]))})
def preProcesamientoURL(archivo):
	if("wav" in archivo[-4:]):
		return "/mediaProxyWav/"+archivo
	else:
		return "/mediaProxyWav/"+archivo
def mediaStreaming(request, archivo):
	print("ARCHIVO:  ",archivo)
	response = HttpResponse(content_type = "audio/x-wav", status=206)
	response['Content-Disposition'] = "attachment; filename=%s" %("Duda.wav")
	response['Accept-Ranges'] = 'bytes'
	response['X-Accel-Redirect'] = settings.MEDIA_URL + '/' + "Duda.wav"
	response['X-Accel-Buffering'] = 'no'
	return response

#RangedFileResponse para servir archivos wav - mp3 - safari y moviles
#From https://github.com/wearespindle/django-ranged-fileresponse
def mediaProxyWav(request, archivo):
	filename = settings.MEDIA_ROOT+"/"+archivo
	contentType = 'audio/wav'
	if("mp3" in archivo[:-4]):
		contentType = 'audio/mp3'
	response = RangedFileResponse(request, open(filename, 'r'), content_type=contentType)
	response['Content-Disposition'] = 'attachment; filename="%s"' % archivo
	return response