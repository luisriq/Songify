audioElement = document.createElement('audio');
audioElement.setAttribute('preload', "auto");
audioElement.setAttribute('loop',"loop")

//Cargar nuevo audio
var nuevoAudio = function(){
	$.getJSON(urlFile, function(data){
		//console.log(baseUrl+data["url"]);
		//audioE = document.createElement('audio');
		audioElement.pause();
		audioElement.setAttribute('src', baseUrl+data["url"]);
		audioElement.currentTime = 0;
		audioElement.play();
		console.log(audioElement);
	});
};



//Eventos
audioElement.ontimeupdate = function(){
	$('#time').text(Math.trunc(audioElement.currentTime)+"s");
	//console.log(audioElement.currentTime);
}

//$('#userInput').keyup(nuevoAudio);

//Controles
$('#Random').click(nuevoAudio);

$('#Play').click(function () {
    audioElement.play();
});
$('#Pausa').click(function () {
    audioElement.pause();
});
$('#Parar').click(function () {
	audioElement.currentTime = 0;
    audioElement.pause();
});
$('#Adelantar').click(function () {
	audioElement.currentTime = audioElement.currentTime+15;
});


