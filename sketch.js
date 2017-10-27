var worm = [];
var worm2 = [];
var worm3 = [];
var worm4 = [];

var index = 0;

var decrement = .0001;
var increment = .001;

var deg = 0;

var xMov = 1;
var yMov = 1;

var speedX = 1
var y = 0;
var diameter = 20;
var yOff = 0.0;


function setup() {

  createCanvas(1000,1000);
  //println(bubble.x, bubble.y);

}


function mousePressed(){

//  worm.push(new Worm(xMov, yMov, 220, 20, 127, 20));
}  


function draw() {
  background(50);

  var time = 1.0;
  var choice = random(0,4);

  deg+=increment;

  push();
  
  translate(width/2, height/2);


  rotate(deg);
  worm.push(new Worm(xMov, yMov, 220, 20, 127, 20));
  worm2.push(new Worm(xMov*-1, yMov, 20, 20, 20, 60));
  worm3.push(new Worm(xMov*-1, yMov*-1, 220, 20, 127, 20));
  worm4.push(new Worm(xMov, yMov*-1, 20, 20, 20, 60));



   if (choice < 1 ){
        xMov = xMov - 15;
      } else if (choice < 2 ){
        xMov = xMov + 15;
      } else if (choice < 3 ){
        yMov = yMov + 15;
      } else {
        yMov = yMov - 15;
      }

  //print(xMov);


  for (var i = worm.length-1; i >= 0; i--) {
    worm[i].show();
    worm[i].fade();
    worm2[i].show();
    worm2[i].fade();
    worm3[i].show();
    worm3[i].fade();
    worm4[i].show();
    worm4[i].fade();
  }

 //Let's keep these turkeys on the canvas!
  constrain(xMov,-200,200);
  constrain(yMov,-200,200);

  pop();

    //Garbage collection - Removes the first item in the array after array length exceeds 2000
    if (worm.length > 2000){
      worm.splice(0,1); 
    }
    if (worm2.length > 2000){
      worm2.splice(0,1); 
    }
    if (worm3.length > 2000){
      worm3.splice(0,1); 
    }
    if (worm4.length > 2000){
      worm4.splice(0,1); 
    }


}




//Worm Class
function Worm(tempX, tempY, tempR, tempG, tempB, tempdivideSize) {
  /*Data
  float drops;
  float x;
  float y;
  float time;
  float decrement;
  float increment;
  //Size of ellipse is constrained by width/2 and changes with Perlin noise function 
  float n;
  //Opacity of the ellipse is determined by it's size
  float o;
  float xPos;
  float yPos;
  float circleW;

  //color fade variables
  float r;
  float g;
  float b;
  float rspeed;
  float gspeed;
  float bspeed;*/

  //Worm Constructor
    this.drops = 0;
    this.x = random(0, 10);
    this.y = random(0, 10);
    this.time = 0.0;  
    this.decrement = .5;
    this.increment = .01;

    this.o = 255;
    this.circleW = random(0, 100);
    this.xPos = tempX;
    this.yPos = tempY;
    this.r = tempR;
    this.g = tempG;
    this.b = tempB;
    this.rspeed = .25;
    this.gspeed = .25;    
    this.bspeed = .25;
    this.choice = random(0,4);
    this.divideSize = tempdivideSize;
  


  //Functionality (Draw + Grow + Dry)
this.show = function() {
    this.n = noise(this.time)*width;
    noStroke();
    fill(this.r, this.g, this.b, this.o);
    ellipse(this.xPos+this.x, this.yPos+this.y, this.n/this.divideSize, this.n/this.divideSize);

    this.r = this.r + this.rspeed;
    if ((this.r > 254 || this.r < 0 )) {
      this.rspeed = this.rspeed * -1;
    }
    this.g = this.g + this.gspeed;
    if ((this.g > 254 || this.g < 0 )) {
      this.gspeed = this.gspeed * -1;
    }
        this.b = this.b + this.bspeed;
    if ((this.b > 254 || this.b < 0 )) {
      this.bspeed = this.bspeed * -1;
    }
  }

  this.fade = function() {
    //this.o = this.o - this.decrement;
    this.time = this.time + this.increment;
  }

  this.step = function() {
    var choice = random(0,4);

      if (choice > 0 ){
        this.xPos--;
      } else if (choice > 1 ){
        this.xPos++;
      } else if (choice > 2 ){
        this.yPos++;
      } else {
        this.yPos--;
      }
 //print (this.choice);

  constrain(this.xPos, -200, 200);
  constrain(this.yPos, -200, 200);

  }

 print (this.xPos);

  this.isFinished = function(){
    if (this.o<0){
      return true;
    } else {
    return false;

  }
  }
}