var timerCargarAudio = null;
var timerHighlight = null;
var entrada = $("#userInput");

var funHighlight = function () {
	$(".editable span.mark").removeClass('mark');
	var len = $(".editable span").length;
	var i = Math.floor(Math.random()*len);
	$($(".editable span")[i]).addClass('mark');
	var j = Math.floor(Math.random()*5);
	if(j==0&&$($(".editable span")[i]).text().length>3){
		timerCargarAudio =  setTimeout(nuevoAudio, 2000);
	}else{
		timerHighlight =  setTimeout(funHighlight, 500);
	}
}

$("#userInput").keyup(
	function(){
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
		timerHighlight =  setTimeout(funHighlight, 500);
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