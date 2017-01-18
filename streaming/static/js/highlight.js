(function($){
	$.fn.highlight=function(parametros){
		pars=$.extend({

		},parametros)

		var self = $(this);
		self.css("color","rgba(0,0,0,.5)");
		self.css("background","transparent");
		var padre = self.parent();


		self.contenedor = $("<div></div>");
		self.contenedor.height(self.height());
		self.contenedor.css("padding", "7px");
		self.contenedor.css("width","100%");
		//self.contenedor.css("overflow-x", "hidden");
		padre.prepend(self.contenedor);
		//self.contenedor.css("float", "left");
		

		self.css("margin-top", (-1*(self.height()))+"px");
		self.css("display", "block");
		//padre.prepend();
		self.keyup(function(){
			self.contenedor.html(self.val());
		});
		/*self.keypress(function(ev){
			self.contenedor.html(self.val()+String.fromCharCode(ev.which));

		});*/


		return self;

	}
}(jQuery));




var h = $("input").highlight();
console.log(h)