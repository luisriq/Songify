$(document).ready(function(){
	$('body').jKit();
});
console.log("dgmkdgmkmdg")
//Crear capas de imagenes
var back = $("#Background")

//Gausiana
function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    var res = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    if(res <0){
    	return -1*res;
    }
    return res;
}

for (var i = 24; i >= 0; i--) {

	var img = $("<img style='width:126px;height:200px;position:relative;'></img>");
	console.log(img)
	img.addClass("nota"+(2-i%3));
	var container = $("<div style='position:absolute;' data-jkit='[parallax:strength="+((i%3)*.5+1)+";axis="+(((i%3)==1)?"-both":"both")+"]'>")
	console.log(container);
	container.append(img);
	container.addClass("parent"+(i%3));
	back.append(container);
}

//Unused
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
			size:1,
			imagen:'urldefecto'
		},parametros)
		console.log(this);
		this.css("height",(parseInt(this.css("height"))*pars.size) + 'px')
		this.css("width",(parseInt(this.css("width"))*pars.size) + 'px')
		this.css("z-index",-pars.nivel)
		this.css("opacity",.8-(3-pars.nivel)*.2)
		
		var maxHorizontal = Math.floor($(window).width()/parseInt(this.css("width")));
		var maxVertical = Math.floor($(window).height()/parseInt(this.css("height")));
		console.log("Horizontal->"+maxHorizontal);
		console.log("Vertical->"+maxVertical);
		console.log("H->"+$(window).height());
		console.log("W->"+$(window).width());
		//this[i].parentElement.style.zIndex = -pars.nivel;
		var casilla = function(x, y, mh, mv){
			var wW = $(window).width();
			var wH = $(window).height();
			return {
				'absX_0':Math.floor(x*wW/mh),
				'absY_0':Math.floor(y*wH/mv),
				'ocupado':false
			};
		}
		var arreglo = []
		for (var i = 0; i < maxHorizontal; i++) {
			arreglo.push([]);
			for (var j = 0; j < maxVertical; j++) {
				arreglo[i].push(casilla(i,j,maxHorizontal,maxVertical));
			}
		}
		console.log(arreglo);
		//var posiciones = 
		

		for (var i = this.length - 1; i >= 0; i--) {
			this[i].src = urlImagenes[Math.floor(Math.random()*2.99)];
			var ry;
			var rx;
			while(true){
				ry = Math.floor(Math.random()*maxVertical);
				rx = Math.floor(Math.random()*maxHorizontal);
				if(!arreglo[rx][ry].ocupado){
					arreglo[rx][ry].ocupado = true;
					break;
				}
				
			}
			var offsetX = Math.floor(Math.random()*Math.abs($(window).width()/maxHorizontal - parseInt(this.css("width"))));
			var offsetY = Math.floor(Math.random()*Math.abs($(window).height()/maxVertical - parseInt(this.css("height"))));
			this[i].parentElement.style.top = Math.ceil(arreglo[rx][ry].absY_0 + offsetY)+"px";
			this[i].parentElement.style.left = Math.ceil(arreglo[rx][ry].absX_0 + offsetX)+"px";//Math.floor(Math.random()*maxHorizontal)*parseInt(this.css("width"))+"px";
			//Random en la casilla
			
			//this[i].style.height = pars.nivel*this[i].style.height;
			//this[i].style.width = pars.nivel*this[i].style.width;
			
		}



		return this;
	}
}(jQuery));




var n1 = $(".nota0").notaB({
	size:.5,
	nivel:1,
	imagen:urlImagen1
});

var n2 = $(".nota1").notaB({
	size:.7,
	nivel:2,
	imagen:urlImagen2
});

var n3 = $(".nota2").notaB({
	size:1,
	nivel:3,
	imagen:urlImagen3
});

/*for (var i = n.length - 1; i >= 0; i--) {
	console.log("-->"+(Math.random()*100)+"px");
	n[i].style.top = Math.random()*1000+"px";
	n[i].style.left = Math.random()*1000+"px";
}*/



//console.log(n)
//moverRandom(n)


