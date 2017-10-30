/***MICROBIAL***/


//Arrays
var microbe = [];
var microbe2 = [];
var microbe3 = [];
var microbe4 = [];
var burst = [];
var burst2 = [];

//Main Variance 
var decrement = .0001;
var increment = .001;
var speedX = 1

//Rotation
var deg = 0;

//Array position 
var xMov = 1;
var yMov = 1;

//Microbe diameter
var diameter = 20;



function setup() {
  createCanvas(1000,1000);
  //println(bubble.x, bubble.y);
}


function draw() {
  background(50);




  var time = 1.0;
  var choice = random(0,4);

  deg+=increment;



  push();

  //set the starting point in the center of the canvas  
  translate(width/2, height/2);


  rotate(deg);



  microbe.push(new Microbe(xMov, yMov, 220, 20, 127, 20));
  microbe2.push(new Microbe(xMov*-1, yMov, 20, 20, 20, 60));
  microbe3.push(new Microbe(xMov*-1, yMov*-1, 220, 20, 127, 20));
  microbe4.push(new Microbe(xMov, yMov*-1, 20, 20, 20, 60));
 
  //Let's keep these turkeys on the canvas!
  xMov = constrain(xMov,-500,500);
  yMov = constrain(yMov,-500,500);


   if (choice < 1 ){
        xMov = xMov - 15;
      } else if (choice < 2 ){
        xMov = xMov + 15;
      } else if (choice < 3 ){
        yMov = yMov + 15;
      } else {
        yMov = yMov - 15;
      }


  burst.push(new Burst(xMov, yMov));
  burst2.push(new Burst(xMov*-1, yMov*-1));
  //Make a line burst under certain conditions
  /*if(xMov > -500 && xMov <500){
    burst.push(new Burst(xMov, yMov));
    burst2.push(new Burst(xMov, yMov*-1));
  }*/

  for (var i = burst.length-1; i >= 0; i--) {
    burst[i].show();
    burst2[i].show();

  }
  //print(xMov);


  grid();

  //Working through the array backwards ensures no indecies are skipped during garbage collection
  for (var i = microbe.length-1; i >= 0; i--) {
    microbe[i].show();
    microbe[i].fade();
    microbe2[i].show();
    microbe2[i].fade();
    microbe3[i].show();
    microbe3[i].fade();
    microbe4[i].show();
    microbe4[i].fade();
  }



  pop();

    //Garbage collection - Removes the first item in the array after array length exceeds 2000
    if (burst.length > 5){
      burst.splice(0,1); 
    }
    if (burst2.length > 5){
      burst2.splice(0,1); 
    }

    if (microbe.length > 1500){
      microbe.splice(0,1); 
    }
    if (microbe2.length > 1500){
      microbe2.splice(0,1); 
    }
    if (microbe3.length > 1500){
      microbe3.splice(0,1); 
    }
    if (microbe4.length > 1500){
      microbe4.splice(0,1); 
    }


}




//Microbe Class
function Microbe(tempX, tempY, tempR, tempG, tempB, tempdivideSize) {
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

  //Microbe Constructor
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



function grid(){


    for (var k = -1000; k < 1000; k = k + 75) {
     for (var l = -1000; l < 1000; l = l + 75){


        var gridVariance2 = 0;
        var opacityVariance = 2;
        //var gv = constrain(gridVariance, 0, 400);

        gridVariance = dist(xMov,yMov, k, l);
        gridVariance2 = dist(xMov*-1,yMov*-1, k, l);
        opacityVariance = dist(k, l, xMov,yMov);

        noStroke();
        fill(255,255,255,constrain(opacityVariance, 0,2.5));
        beginShape();
        vertex(k, l);
        vertex(k+55, l);
        vertex(k+55, l+55);
        vertex(k, l+55);
        endShape(CLOSE);


      //  rectMode(CENTER);
       // noStroke();
       // fill(255,255,255,constrain(opacityVariance, 0,2.5));
       // rect(k,l, constrain(gridVariance, 20,55),constrain(gridVariance, 20,55));


        //rectMode(CENTER);
        //noStroke();
        //fill(255,255,255,constrain(opacityVariance, 0,2.5));
        //rect(k,l, constrain(gridVariance2, 20,55),constrain(gridVariance2, 20,55));


        //beginShape();
        //vertex(k+gridVariance, l);
        //vertex(k+55, l);
        //vertex(k+55, l+55);
        //vertex(k,l+55);
        //endShape(CLOSE);

      }
    }


}


//Line Burst Function
function Burst(tempX, tempY) {

    this.xPos = tempX;
    this.yPos = tempY;

    this.time = 0.0;  
    this.increment = .01;
    this.lineLoc = noise(this.time)*width/10;

  this.show = function() {  


    this.n = noise(this.time)*width/10;
    this.time = this.time + this.increment;

    //line(this.xPos,this.yPos, this.xPos-this.lineLoc+this.n, this.lineLoc+this.n);
    //line(this.xPos,this.yPos, this.xPos-this.lineLoc+this.n-50, this.lineLoc+this.n);
    //line(this.xPos,this.yPos, this.xPos+this.lineLoc+this.n, this.lineLoc+this.n);
    ///line(this.xPos,this.yPos, this.xPos+this.lineLoc+this.n, this.lineLoc+this.n);
    line(this.xPos,this.yPos, this.lineLoc, this.lineLoc);
    line(this.xPos,this.yPos, this.lineLoc, this.lineLoc);



    //this.lineLoc = this.lineLoc + 5;

    //this.lineLoc = constrain(this.lineLoc, -50, 50);


  }

}


