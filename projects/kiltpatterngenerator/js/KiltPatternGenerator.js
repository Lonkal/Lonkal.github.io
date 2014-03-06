//Constants
var DEFAULT_FPS = 30;
var SQUARE_MODE = "SQUARE";
var CIRCLE_MODE = "CIRCLE";

//Default mode is circle
var mode = CIRCLE_MODE;

//Canvas vars
var canvasWidth;
var canvasHeight;
var canvas;
var canvas2D;

//Animation vars
var isStopped = true;
var speed=0;
var FPS=0;
var refreshIntervalId;
var animating = false;

//Data objs
var balls;
var squares;

//Etc
var isFilled = false;
var thickness = 1;
var numberOfShapes = 0;

function Ball(	initColor, initRadius, 
		initCenterX, initCenterY,
		initXinc, initYinc)
{
	this.color = initColor;
	this.radius = initRadius;
	this.centerX = initCenterX;
	this.centerY = initCenterY;
	this.xInc = initXinc;
	this.yInc = initYinc;
};

function Square (initColor, initX, initY, length, initXinc, initYinc)
{
	this.color = initColor;
	this.startX = initX;
	this.startY = initY;
	this.length = length;
	this.xInc = initXinc;
	this.yInc = initYinc;
};

function thicknessChanged() {
    thickness = parseInt($('#thickness').val() , 10);	
};

function modeChanged() {
	selectedmode = document.getElementById("mode").value;
	if(selectedmode == "Circle"){	
		mode = CIRCLE_MODE;
		//Change circle to square coordinates
		for(var i = 0; i < balls.length; i++){
			balls[i].centerX = squares[i].startX + balls[i].radius;
			balls[i].centerY = squares[i].startY + balls[i].radius;
			balls[i].xInc = squares[i].xInc;
			balls[i].yInc = squares[i].yInc;
		}
	} else {
		mode = SQUARE_MODE;
		for(var i = 0; i < squares.length; i++){
			squares[i].startX = balls[i].centerX - balls[i].radius;
			squares[i].startY = balls[i].centerY - balls[i].radius;
			squares[i].xInc = balls[i].xInc;
			squares[i].yInc = balls[i].yInc;
		}		
	}
};

function toggleFilled(){
	if(isFilled == false)
		 isFilled = true;
	else
		isFilled=false;
};

function startAnimation()
{
	if(animating) {
		//It already started, so we back out...
		return;
	} else if (FPS == 0) {
		FPS = DEFAULT_FPS;	
	}

	speed =  1000/FPS;	
	animating = true;
	$('#fps').text(FPS.toString());

	refreshIntervalId = setInterval(step, speed);
	
};

function stopAnimation()
{
	if(FPS <= 0) {
		//It stopped already, so back out
		return;
	}

	animating = false;
	clearInterval(refreshIntervalId);	
};

function slowDownAnimation(){
	
	if(FPS <= 1){
		//No less than 1
		return;
	}
	FPS--;
	speed = 1000/FPS;
	$('#fps').text(FPS.toString());
	
	if(animating){
		clearInterval(refreshIntervalId);
		refreshIntervalId = setInterval(step,speed);
	}

};

function speedUpAnimation()
{
	if(FPS >= 100) {
		//No more than 100
		return;
	}
	
	FPS++; //increase FPS
	speed = 1000/FPS; //recalc speed
	$('#fps').text(FPS.toString());

	//clear the interval then reset to higher one if it is animating
	if(animating) {
		clearInterval(refreshIntervalId);
		refreshIntervalId = setInterval(step,speed);
	}

};


function clearCanvas()
{	
	canvas2D.clearRect(0, 0, canvas.width, canvas.height);
	
	//Reset stats
	numberOfShapes = 0;
	
	$('#numShapes').text(numberOfShapes.toString());
};

function init()
{
	balls = new Array();
	balls[0] = new Ball("#990099", 30,  30,  30,  10,  10);
	balls[1] = new Ball("#999900", 30, 530,  30, -10,  10);
	balls[2] = new Ball("#009999", 30, 120, 220, -10, -10);
	balls[3] = new Ball("#991122", 30, 530, 400,  10, -10);
	balls[4] = new Ball("#229911", 30, 330, 120, -10, -10);
	balls[5] = new Ball("#112299", 30, 700, 650,  10,  10);
	
	squares = new Array();
	//The X,Y,incs will be changed later on...
	squares[0] = new Square("#990099", 30,  30, 60, 10, 10);
	squares[1] = new Square("#999900", 400, 300, 60, -10, 10);
	squares[2] = new Square("#009999", 15, 120, 60, -10, 10);
	squares[3] = new Square("#991122", 800, 530, 60, 10, 10);
	squares[4] = new Square("#229911", 213, 456, 60, -10, -10);
	squares[5] = new Square("#112299", 487, 830, 60, 10, -10);
	
	canvasWidth = 1280;
	canvasHeight = 720;
	canvas = document.getElementById("myCanvas");
	canvas2D = canvas.getContext("2d");
};

function updateCircles()
{
	for (var i = 0; i < balls.length; i++)
	{
		var ball = balls[i];
		ball.centerX += ball.xInc;
		ball.centerY += ball.yInc;
		if ((ball.centerX - ball.radius) <= 0) ball.xInc *= -1;
		if ((ball.centerX + ball.radius) >= canvasWidth) ball.xInc *= -1;
		if ((ball.centerY - ball.radius) <= 0) ball.yInc *= -1;
		if ((ball.centerY + ball.radius) >= canvasHeight) ball.yInc *= -1;
	}
};

function renderCircles()
{
	for (var i = 0; i < balls.length; i++)
	{
		var ball = balls[i];
		canvas2D.strokeStyle = ball.color;
		
		canvas2D.beginPath();  
		canvas2D.arc(ball.centerX,ball.centerY,ball.radius,0,2*Math.PI);
		
		if(isFilled == true){
			canvas2D.fillStyle = ball.color;
			canvas2D.fill();
		}

		canvas2D.lineWidth = thickness;
		canvas2D.stroke();
		
		numberOfShapes++;
		$('#numShapes').text(numberOfShapes.toString());	
	}
};

function updateSquares() {
	for (var i = 0; i < squares.length; i++)
	{
		var square = squares[i];
		square.startX += square.xInc;
		square.startY += square.yInc;
		if (square.startX <= 0) square.xInc *= -1;
		if (square.startX >= canvasWidth) square.xInc *= -1;
		if (square.startY <= 0) square.yInc *= -1;
		if (square.startY >= canvasHeight) square.yInc *= -1;
	}
};

function renderSquares(){
	for (var i= 0; i < squares.length; i++){
		var square = squares[i];
		canvas2D.strokeStyle = square.color;
		
		canvas2D.beginPath();
		canvas2D.rect(square.startX, square.startY, square.length, square.length);
		
		if(isFilled == true){
			canvas2D.fillStyle = square.color;
			canvas2D.fill();
		}

		canvas2D.lineWidth = thickness;
		canvas2D.stroke();
		
		numberOfShapes++;
		$('#numShapes').text(numberOfShapes.toString());
	}
};

function step()
{
	if(mode == CIRCLE_MODE){
		updateCircles();
		renderCircles();
	}else if (mode == SQUARE_MODE){
		updateSquares();
		renderSquares();
	}
	//Can add more modes...
};
