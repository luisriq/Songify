
var timerCargarAudio = null;




$("#userInput").keyup(
	function(){
		if(timerCargarAudio != null){
			clearTimeout(timerCargarAudio);
		}
		//TODO: Random 2-5 segs
		//TODO: Mostrar carga
		timerCargarAudio =  setTimeout(nuevoAudio, 2000);
});