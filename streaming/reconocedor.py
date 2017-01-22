import json
import unicodedata

class Sentimiento:
	def __init__(self, palabras, sentimiento, cancion = "", subsentimientos = []):
		self.palabras = palabras
		self.sentimiento = sentimiento
		self.cancion = cancion
		#Vector con subsentimientos relacionados
		self.subsentimientos = subsentimientos
		self.metaSentimiento = False
	@staticmethod
	def fromJson(sentimientosJson):
		sentimientos = []
		for s in sentimientosJson:
			if(not "subsentimientos" in s):
				sentimientos.append(Sentimiento(s["palabras"], s["sentimiento"], cancion = s["cancion"]))
			else:
				sentimiento = Sentimiento(s["palabras"], s["sentimiento"], cancion = s["cancion"])
				sentimiento.metaSentimiento = True
				for sub in sentimientosJson:
					if(sub["sentimiento"] in s["subsentimientos"]):
						sentimiento.subsentimientos.append(Sentimiento(sub["palabras"], sub["sentimiento"], cancion = sub["cancion"]))
				sentimientos.append(sentimiento)
		return sentimientos

#Funcion devuelve un vector de palabras y el la ruta de la cancion correspondiente
def reconocerPalabras(frase):
	#Abrir diccionario
	sentimientos = Sentimiento.fromJson(json.load(open("streaming/sentimientos.json")))
	metaSentimiento = None
	palabrasMetaSentimiento = []
	#frase = unicodedata.normalize("NFKD",frase.lower()).encode("ascii", "ignore")
	frase = frase.lower()
	for s in sentimientos:
		palabrasEncontradas = [w for w in s.palabras if w.lower() in frase]
		print("Palabras ",palabrasEncontradas)
		print("Frase ",frase)
		if(len(palabrasEncontradas) != 0):
			if(s.metaSentimiento):
				#Seguir buscando subsentimientos
				metaSentimiento = s
				palabrasMetaSentimiento = palabrasEncontradas
			#TODO: Mezclar ambas sentencias
			elif((s.metaSentimiento == False) and metaSentimiento != None):
				return {"palabras":palabrasEncontradas+palabrasMetaSentimiento, "sentimiento":s, "metasentimiento":metaSentimiento}
			else:
				#Retornar palabras encontradas y sentimiento
				return {"palabras":palabrasEncontradas, "sentimiento":s}
	if(metaSentimiento != None):
		return {"palabras":palabrasMetaSentimiento, "sentimiento":metaSentimiento}
	return None
if __name__ == '__main__':
	reconocerPalabras("")
	