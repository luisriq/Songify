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
var helper = {
    // highlight: regex replacer function
    highlight: function (match, word, offset, string){
        return '<span>' + word + '</span>';
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
        el.innerHTML = el.innerHTML.replace(/<span[\s\S]*?>([\s\S]*?)<\/span>/g,"$1");
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
          $this.html("");
        }
      }
    });
    return $this;
  }
})(jQuery)
$(document).ready(function(){
	$(".editable").mysticInput();
});