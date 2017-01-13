console.log("dgmkdgmkmdg")
//Crear capas de imagenes
var back = $("#Background")

for (var i = 12; i >= 0; i--) {
	var img = $("<img style='width:100px;height:100px;position:absolute'></img>");
	console.log(img)
	img.addClass("nota"+(i%3));
	back.append(img);
}


function moverRandom(element){
	
	var mLeft = (Math.random()*3)-1.5;//>0.5 ? 1:0;
	var mTop = (Math.random()*3)-1.5;//>0.5 ? 1:0;

	//element.style.left = (parseInt(element.style.left) + mLeft) + 'px'
	//element.style.top = (parseInt(element.style.top) + mTop) + 'px'
	element.css("top",(parseInt(element.css("top")) + mTop) + 'px')
	element.css("left",(parseInt(element.css("left")) + mLeft) + 'px')


	animate = requestAnimationFrame(function(){moverRandom(element)});
	//animate = setTimeout(function(){moverRandom(element);},500);
}

(function($){
	$.fn.notaB=function(parametros){
		pars=$.extend({
			nivel:0,
			imagen:'urldefecto'
		},parametros)
		console.log(this);
		var maxHorizontal = Math.floor($(window).width()/100);
		var maxVertical = Math.floor($(window).height()/100);
		console.log("Horizontal->"+maxHorizontal);
		console.log("Vertical->"+maxVertical);
		console.log("H->"+$(window).height());
		console.log("W->"+$(window).width());
		for (var i = this.length - 1; i >= 0; i--) {
			this[i].style.top = Math.floor(Math.random()*maxVertical)*100+"px";
			this[i].style.left = Math.floor(Math.random()*maxHorizontal)*100+"px";
			this[i].style.zIndex = pars.nivel;
			this[i].src = pars.imagen;
		}



		return this;
	}
}(jQuery));




var n1 = $(".nota0").notaB({
	nivel:-1,
	imagen:urlImagen
});

var n2 = $(".nota1").notaB({
	nivel:-2,
	imagen:urlImagen
});

var n3 = $(".nota2").notaB({
	nivel:-3,
	imagen:urlImagen
});

/*for (var i = n.length - 1; i >= 0; i--) {
	console.log("-->"+(Math.random()*100)+"px");
	n[i].style.top = Math.random()*1000+"px";
	n[i].style.left = Math.random()*1000+"px";
}*/



//console.log(n)
//moverRandom(n)


