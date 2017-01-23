var timerCargarAudio = null;
var timerHighlight = null;
var entrada = $("#userInput");
var indices = []
var vuelta = 4;
var j_sentimientos = [
  {
    "sentimiento": "Triste",
    "palabras": [
      "triste",
      "pena",
      "tristeza",
      "temeroso"
    ]
  },
  {
    "sentimiento": "Duda",
    "palabras": [
      "pensativo",
      "melancolico",
      "melancólico"
    ]
  },
  {
    "sentimiento": "Chistoso",
    "palabras": [
      "gracioso",
      "entretenido"
    ]
  },
  {
    "sentimiento": "Ira",
    "palabras": [
      "ira",
      "irritado",
      "molesto",
      "desagradable",
      "desagrado",
      "mal",
      "enojado",
      "enojada"
    ]
  },
  {
    "sentimiento": "Feliz",
    "subsentimientos": [
      "buen dia",
      "carrete",
      "vacaciones"
    ],
    "palabras": [
      "feliz",
      "alegria",
      "alegría",
      "emoción",
      "emocion",
      "alegre",
      "emocionado",
      "emocionada",
      "alegres",
      "contento",
      "viva"
    ]
  },
  {
    "sentimiento": "Buen dia",
    "palabras": [
      "nacimiento",
      "nacer",
      "bonito",
      "bello",
      "bella",
      "emoción",
      "emocion"
    ]
  },
  {
    "sentimiento": "Carrete",
    "palabras": [
      "carrete",
      "fiesta",
      "carreteamos",
      "carreteando",
      "entretenido",
      "entretención",
      "entretencion"
    ]
  },
  {
    "sentimiento": "Vacaciones",
    "palabras": [
      "vacaciones",
      "vacacionar",
      "verano",
      "viaje",
      "emociones"
    ]
  }
]
var funGetSentimientosIndex = function(Palabras){
	var indexes = [];

	for (var i = 0; i < j_sentimientos.length; i++) {

		var palabrasEncontradas = [];
		for (var j = 0; j < Palabras.length; j++) {
			Palabras[j]
			if(Palabras[j].toLocaleLowerCase()=="buen"&&Palabras[j+1]=="día"){
				Palabras[j]="Buen día";
				Palabras[j].splice(j+1, 1);
			}
			if(j_sentimientos[i].palabras.indexOf(Palabras[j])>-1){
				palabrasEncontradas.push(Palabras[j]);
				if(j_sentimientos[i].subsentimientos){
					k = [j]
					for (var _k = 0; _k < Palabras.length; _k++) {
						if(_k==j)continue;
						__k = j_sentimientos[i].subsentimientos.indexOf(Palabras[_k].toLocaleLowerCase());
						if(__k>=0){
							k.push(_k);
						}
					}
					indexes.push(k);	
				}else{
					indexes.push([j])
				}
			}
			
		}
		
	}
	return indexes;
}
var funHighlight = function () {
	console.log(vuelta,indices);
	$(".editable span.mark").removeClass('mark').addClass("nMrk");

	var len = $(".editable span").length;
	var i = Math.floor(Math.random()*len);
	while(indices.indexOf(i)!=-1)
		i = Math.floor(Math.random()*len);
	
	
	
	if(vuelta==0){
		$(".editable span.mark").removeClass('mark').addClass("nMrk");
		for (var i = 0; i < indices.length; i++) {
			$($(".editable span")[indices[i]]).addClass('mark').removeClass('nMrk');
		}
		timerCargarAudio =  setTimeout(nuevoAudio, 2000);
	}else{
		vuelta--;
		$($(".editable span")[i]).addClass('mark').removeClass('nMrk');
		timerHighlight =  setTimeout(funHighlight, 500);
	}
}

$("#userInput").keyup(

	function(){
		indices=[]
		vuelta = 5;
		pause();
		if(timerCargarAudio != null){
			clearTimeout(timerCargarAudio);
		}
		//TODO: Random 2-5 segs
		//TODO: Mostrar carga
		

		//BUSCAR
		
		if(timerHighlight != null){
			clearTimeout(timerHighlight);
		}
		var a = $(".editable span").map(function(){
               return $.trim($(this).text());
            }).get();
		var ar = funGetSentimientosIndex(a);
		if(ar.length>0){
			ar.sort(function(a, b) {
				return b.length-a.length;
			});
			indices=ar[0];
		}
		timerHighlight =  setTimeout(funHighlight, 500);
});


//Highlight
var helper = {
	// highlight: regex replacer function
	highlight: function (match, word, offset, string){
		return '<span class="nMrk">' + word + '</span>';
	},
	
	// keyIsAvailable
	keyIsAvailable: function(e){
		return e.keyCode == 32 || (e.keyCode > 47 && e.keyCode < 91 && !e.ctrlKey && !e.shiftKey && !e.altKey);
	},
	
	// keyIsDelete
	keyIsDelete: function(e){
		return e.keyCode == 8 || e.keyCode == 46;
	},
	
	// saveSelection
	saveSelection: function(containerEl) {
		var charIndex = 0, start = 0, end = 0, foundStart = false, stop = {};
		var sel = rangy.getSelection(), range;
	
		function traverseTextNodes(node, range) {
			if (node.nodeType == 3) {
				if (!foundStart && node == range.startContainer) {
					start = charIndex + range.startOffset;
					foundStart = true;
				}
				if (foundStart && node == range.endContainer) {
					end = charIndex + range.endOffset;
					throw stop;
				}
				charIndex += node.length;
			} else {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					traverseTextNodes(node.childNodes[i], range);
				}
			}
		}
		
		if (sel.rangeCount) {
			try {
				traverseTextNodes(containerEl, sel.getRangeAt(0));
			} catch (ex) {
				if (ex != stop) {
					throw ex;
				}
			}
		}
	
		return {
			start: start,
			end: end
		};
	},
	
	// restoreSelection
	restoreSelection: function(containerEl, savedSel) {
		var charIndex = 0, range = rangy.createRange(), foundStart = false, stop = {};
		range.collapseToPoint(containerEl, 0);
		
		function traverseTextNodes(node) {
			if (node.nodeType == 3) {
				var nextCharIndex = charIndex + node.length;
				if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
					range.setStart(node, savedSel.start - charIndex);
					foundStart = true;
				}
				if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
					range.setEnd(node, savedSel.end - charIndex);
					throw stop;
				}
				charIndex = nextCharIndex;
			} else {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					traverseTextNodes(node.childNodes[i]);
				}
			}
		}
		
		try {
			traverseTextNodes(containerEl);
		} catch (ex) {
			if (ex == stop) {
				rangy.getSelection().setSingleRange(range);
			} else {
				throw ex;
			}
		}
	},
	
	// formatText
	formatText: function (el) {
		var savedSel = helper.saveSelection(el);
		el.innerHTML = el.innerHTML.replace(/<span[^>]*?>([\s\S]*?)<\/span>/g,"$1");
		el.innerHTML = el.innerHTML.replace(/(&nbsp;)/g, "\t");
		el.innerHTML = el.innerHTML.replace(/([^\s\t\n]+)/g, helper.highlight);
			el.innerHTML = el.innerHTML.replace(/(\t)/g, "&nbsp;");
		// Restore the original selection
		helper.restoreSelection(el, savedSel);
	}
};
// main codes
(function($){
	$.fn.mysticInput=function(){
	// cache vars
	var $this = $(this)
	, defaultText = $this.text()
	, typedClass = "typed"
	, usernameClass = "username"
	, usernameExistClass = "exist"
	;

	// bind events
	$this
	  .data("defaultText", defaultText)
	  .on({

	  // empty if content is default
	  focus: function(){
		if($this.text() == defaultText){
		  $this.html("").addClass(typedClass);
		}
	  },

	  // fill default if content is empty
	  blur: function(){
		if($this.text() == "")
		  $this.html(defaultText).removeClass(typedClass);
	  },

	  // point

	  keyup: function(e){                    

		// format if key is valid
		if(helper.keyIsAvailable(e)){
		  helper.formatText($this[0]);
		}

		// delete blank html elements
		if(helper.keyIsDelete && $this.text()=="") {
		  rangy.removeMarkers(rangy.saveSelection());
		  $this.html("");
		}
	  },
	  keypress:function (e) {
		var sel = rangy.getSelection();
		if(sel.isBackwards()){
			if(sel.getRangeAt(0).startContainer!=sel.getRangeAt(0).endContainer){
				var selText = sel.getRangeAt(0).toString();
				var startText = $(sel.getRangeAt(0).startContainer).text();
				var endText = $(sel.getRangeAt(0).endContainer).text();
				var i = 0;
				for (i = 0; i < startText.length; i++) {
					if(selText.indexOf(startText.substr(i))==0)
						break;
				}
				startText=startText.substr(0,i)
				j = 0;
				for (j = 0; j < selText.length; j++) {
					if(endText.indexOf(selText.substr(j))==0)
						break;
				}
				endText = endText.substr(selText.length-j);
				if((startText+endText).length==0){
					$this.html("");
					rangy.removeMarkers(sel);
				}
			}
		}
	  }
	});
	return $this;
  }
})(jQuery)
$(document).ready(function(){
	$(".editable").mysticInput();
});