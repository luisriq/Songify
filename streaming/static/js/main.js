
var equalizador = $("#bars").mysticEqualizer({height:"40px"});

audioElement = document.createElement('audio');

audioElement.setAttribute('preload', "auto");
audioElement.setAttribute('loop',"loop");
audioElement.setAttribute('controls',"true");
var audioSource = document.createElement('source');
audioElement.append(audioSource)

//Para auto play en moviles
$("#userInput").click(function(){
	if(audioSource.src == ""){
		//Dummy audio
		audioSource.src = "dummyAudio"
		audioElement.load();
	}
});

//Controles 
var play = function(){
	audioElement.play();
	equalizador.play();
	$('#Play').text("pause_circle_outline")
}

var pause = function(){
	audioElement.pause();
	equalizador.stop();
	$('#Play').text("play_circle_outline")
}

//Cargar nuevo audio
var nuevoAudio = function(){
	var pa = $(".editable").first().text();
	$.getJSON(urlAnalizador,{frase:pa==null?"":pa},function(data){
		//console.log(baseUrl+data["url"]);
		//audioE = document.createElement('audio');
		//TODO: MArcar las palabras encontradas
		//console.log("PALABRAS ENCONTRADAS->>" + data["palabras"])
		pause();
		audioSource.setAttribute('src', baseUrl+data["url"]);
		//audioSource.setAttribute('type', "audio/x-wav");

		audioElement.currentTime = 0;
		audioElement.load();
		play();

		$(".reproductor").removeClass("hide");
		

		//console.log(audioElement);
	});
};



//Eventos - Reproductor
$("#progreso").hide();
audioElement.addEventListener("loadedmetadata", function(_event) {
		//console.log("Se cargo la metadata:"+audioElement.duration);
		//$("#progreso").attr("max",Math.trunc(audioElement.duration));
		$("#progreso").css("width", "0%");
		$("#progreso").show();
		//document.getElementsByTagName("body")[0].removeChild(audio);
	});
audioElement.ontimeupdate = function(){
	$('#time').text( Math.trunc(audioElement.currentTime) +"/"+Math.trunc(audioElement.duration)+"s");
	//$("#progreso").attr("value",Math.trunc(audioElement.currentTime));
	$("#progreso").css("width", (Math.ceil(100*audioElement.currentTime/audioElement.duration))+"%");
		
	//console.log(audioElement.currentTime);
}

//$('#userInput').keyup(nuevoAudio);

//Controles
$('#Random').click(nuevoAudio);
$('#Play').click(function () {
	if($('#Play').text() == "pause_circle_outline"){
    	pause();
	}else{
		play();
	}
});
/*$('#Pausa').click(function () {
    audioElement.pause();
});
$('#Parar').click(function () {
	audioElement.currentTime = 0;
    audioElement.pause();
});
$('#Adelantar').click(function () {
	audioElement.currentTime = (audioElement.currentTime+15.0);
});*/
 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
     


