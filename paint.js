;( function( global ) {

    'use strict';

    /* Init "new" main object with helper method: init */
    const Paint = function( color, size ){
        return new Paint.init( color, size );
    }

    /* Hidden within the scope of the IIFE and never directly accesible */
    const tools = ['pencil', 'rubber'];
    
    /* 
        Prototype holds methods (to save memory space) 
        'this' refers to the calling object at execution time
    */
    Paint.prototype = {
        setTool : function( tool ){
            this.validate( tool );
            this.tool = tool;
        },
        validate: function( tool ){
            if( -1 === tools.indexOf( tool ) ){
                throw "Invalid tool";
            }
        },
        onmousedown: function (e){
			this.action = true;
			if( tools[0] === this.tool ){
				this.ctx.moveTo( e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop );
			}
		},
		onmouseup: function(){
			this.action = false;
			this.ctx.beginPath();
		},
		onmousemove: function(e){
			if ( this.action ) {
				if ( tools[0] === this.tool ) {
					this.ctx.lineTo( e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop );
					this.ctx.lineWidth = this.toolSize;
					this.ctx.strokeStyle = this.color;
					this.ctx.stroke();
				}
				else if( tools[1] === this.tool){
					this.ctx.beginPath();
					this.ctx.clearRect( e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, this.toolSize * 2, this.toolSize * 2 );
				}
			}
		},
		onmouseout: function(){
			this.action = false;
		}
    }

    /* Main object is created here, allowing us to 'new' an object without calling 'new' */
    Paint.init = function( color, size ){

        const self = this;

        /* Set defaults */
        self.tool = tools[0];
        self.action = false;
        self.toolSize = size || 15;
        self.color = color || '#29aae3';
        
        /* Setup canvas */
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", global.innerWidth);
        canvas.setAttribute("height", global.innerHeight);
        canvas.onmousedown = Paint.prototype.onmousedown.bind(self);
        canvas.onmouseup = Paint.prototype.onmouseup.bind(self);
        canvas.onmousemove = Paint.prototype.onmousemove.bind(self);
        canvas.onmouseout = Paint.prototype.onmouseout.bind(self);

        /* Init context to draw into canvas */
        self.ctx = canvas.getContext("2d");

        /* Init canvas into DOM */
        document.body.appendChild( canvas );
        self.canvas = canvas;
    }

    /* Allow to add methods to main object but using Paint as more readable for code */
    Paint.init.prototype = Paint.prototype;

    /* Attach our Paint to the global object, and provide a shorthand '$P' */
    global.Paint = global.$P = Paint;

}( window ) );