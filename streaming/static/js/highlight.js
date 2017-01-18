(function($){
	$.fn.mysticEqualizer=function(parametros){
		var self = $(this);

		self.pars=$.extend({
			width:"100%",
			height:"60px",
			maxBarHeight : 100,//30,
			minBarHeight : 3,//15
			barPadding : 2,//space between bars
			barWidth : 2,//width of each bar
			totalBars :100,//total bars to create
			barColor : '#fff',
			fps : 10
		},parametros)
		self.playState = false;
		//crear canvas
		var canvas = $('<canvas width="300" height="100">Your browser does not support the HTML5 canvas tag.</canvas>')[0];
		self.parent().find("canvas").remove();
		$(canvas)
			.height(self.pars.height)
			.width(self.pars.width);

		self.prepend(canvas);
		var ctx = canvas.getContext("2d");
		var bar = [];
		self.play=function(){
			self.playState = true;
			var barHeight = 0;
		  	var x = 0;
		  	var y = 0;
			for(var i=0; i<self.pars.totalBars; i++)
		    {
		      	barHeight = self.pars.minBarHeight;//self.RandomizeHeight();
		      	x = (i + i) * self.pars.barPadding;
		        y = self.ComputeYAxis(barHeight);
		        bar[i]={
		          height: barHeight,
		          buffHeight: barHeight,
		          x: x,
		          y: y
		      	};
		      	self.GrowBar(i);
		    }
		}
		self.stop = function(){
			self.playState = false;
		}
		self.InitBars = function()
		{
		    var barHeight = 0;
		  	var x = 0;
		  	var y = 0;
		  	for(var i=0; i<self.pars.totalBars; i++)
		    {
		      	barHeight = self.pars.minBarHeight;//self.RandomizeHeight();
		      	x = (i + i) * self.pars.barPadding;
		        y = self.ComputeYAxis(barHeight);
		      	bar.push({
		          height: barHeight,
		          buffHeight: barHeight,
		          x: x,
		          y: y
		      	});
		      	self.GrowBar(i);
		    }

		}
		self.ShrinkBar = function(index)
		{
		  	if(bar[index].height > self.pars.minBarHeight)
		   	{
		      	ctx.fillStyle = self.pars.barColor;
		      	ctx.clearRect(bar[index].x, bar[index].y, self.pars.barWidth, bar[index].height);
		      	var decrecimiento = Math.floor(Math.random()*5);
		        bar[index].height-=decrecimiento;
		        if(bar[index].height<self.pars.minBarHeight)
		        	bar[index].height = self.pars.minBarHeight;
		      	bar[index].y = self.ComputeYAxis(bar[index].height);
		        ctx.fillRect(bar[index].x, bar[index].y, self.pars.barWidth, bar[index].height);
		     // 	setTimeout(function() {
	     	
		        requestAnimationFrame(function(){
		      		self.ShrinkBar(index)
		    			})
		    	//	}, 1000 / self.pars.fps);
		    }
		  	else
		    {
		      	var newHeight = self.RandomizeHeight();
		      	while(newHeight==self.pars.minBarHeight)
		        {
		            newHeight = self.RandomizeHeight();
		        }
		      	bar[index].buffHeight = newHeight;
		      	if(self.playState)
		      		self.GrowBar(index);
		    }
		   	
		}
		self.GrowBar = function(index)
		{
		  	if(bar[index].height < bar[index].buffHeight)
		   	{
		      	ctx.fillStyle = self.pars.barColor;
		      	ctx.clearRect(bar[index].x, bar[index].y, self.pars.barWidth, bar[index].height);
		      	var crecimiento = Math.floor(Math.random()*5);
		        bar[index].height+=crecimiento;
		      	bar[index].y = self.ComputeYAxis(bar[index].height);
		        ctx.fillRect(bar[index].x, bar[index].y, self.pars.barWidth, bar[index].height);
		      //	setTimeout(function() {
		      	if(self.playState)
			        requestAnimationFrame(function(){
			            self.GrowBar(index)
			          })
			    else
			    	self.ShrinkBar(index);
		    	//	}, 1000 / fps);
		    }
		  	else
		    {
		      	self.ShrinkBar(index);//shrink it again
		    }
		   
		}
		self.RandomizeHeight = function()//generate random seed number
		{
		  	return Math.floor((Math.random() * self.pars.maxBarHeight) + self.pars.minBarHeight);
		}
		self.ComputeYAxis = function(height)//computes the position of the y
		{
		   return Math.round((self.pars.maxBarHeight - height)/2);
		}
		self.InitBars();
		return self;

	}
})(jQuery)

