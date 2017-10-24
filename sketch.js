var speedX = 1
var y = 0;
var diameter = 20;
var r = 15;
var g = 40;
var b = 134;
var o = 255;

var rspeed = .10;
var gspeed = .05;
var bspeed = .25;

var dspeed = .05;

var yOff = 0.0;

function setup() {

	createCanvas(1000,1000);
	background(215);

}
	
function draw() {
	yOff = yOff - .005;
	var n = noise(yOff) * width;
	var n2 = noise(yOff) * width;

	fill(r, g, b, o);
	noStroke();
	ellipse(n2 - 2, y, diameter, diameter);

	fill(r, g, b, o);
	noStroke();
	ellipse(n - 1, y, diameter, diameter);

	y = y + speedX;

	diameter = diameter + dspeed;
	if (( diameter>100 || diameter<0 )) {
    dspeed = dspeed * -1;
 	}
	//o = o - .5;


  r = r + rspeed;
  if (( r>254 || r<0 )) {
    rspeed = rspeed * -1;
  }

  g = g + gspeed;
  if (( g>254 || g<0 )) {
    gspeed = gspeed * -1;
  }

  b = b + bspeed;
  if (( b>254 || b<0 )) {
    bspeed = bspeed * -1;
  }

  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);

  if (y > 1000 ){
  	y= 0;

  }

}