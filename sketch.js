var speedX = 1
var r = 0;
var diameter = 50;


function setup() {

	createCanvas(1000,1000);
	background(153);

}
	
function draw() {

	fill(255);
	noStroke();
	ellipse(width/2 , r+ random(1,3), diameter, diameter);

	r = r + speedX;
	diameter = diameter - .05;

}