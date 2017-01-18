var timerCargarAudio = null;
var entrada = $("#userInput");
$("#userInput").keyup(
	function(){
		if(timerCargarAudio != null){
			clearTimeout(timerCargarAudio);
		}
		//TODO: Random 2-5 segs
		//TODO: Mostrar carga
		timerCargarAudio =  setTimeout(nuevoAudio, 2000);


		//BUSCAR
		var pk = "wea"
		if(entrada.html().search(pk+"(?!<\/span>)") >= 0){
			//Agregar SPAN
			console.log("->>>")
			var ind1 = entrada.html().search(pk+"(?!<\/span>)")
			var ind2 = ind1 + pk.length
			var a1 = entrada.html().substr(0,ind1) + "<span>"+pk+"</span>&nbsp;" + entrada.html().substr(ind2);
			entrada.html(a1);
			//Cursor

	        var range = document.createRange();
	        range.selectNodeContents(document.getElementById("userInput").childNodes[0], ind1+(("<span>"+pk+"</span>&nbsp;").length+10));
	        range.collapse(false);
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	        sel.addRange(range);

			//entrada.html(entrada.html().replace(pk+"(?!<\/span>)", "<span>"+pk+"</span>"))
		}
});


//Highlight
