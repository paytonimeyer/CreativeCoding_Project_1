/***MICROBIAL***/

//Arrays
//Microbe arrays
var microbe = [];
var microbe2 = [];
var microbe3 = [];
var microbe4 = [];
//Line arrays
var burst = [];
var burst2 = [];
//Center mover arrays
var mover = [];
var mover2 = [];
var movercenter = [];
var movercenter2 = [];
//Grid Array + Index Var
var grid = [];
var index = 0;

//Grid Array + Index Var
var tris = [];
var index2 = 0;

//Traveler array
var traveler = [];
var traveler2 = [];

var othertraveler = [];
var othertraveler2 = [];

//Variance variables 
var decrement = .0001;
var increment = .001;
var speedX = 1

//Rotation (used to rotate  all the graphics)
var deg = 0;
var deg2 = 0;
var deg3 = 0;

//Microbe array position 
var xMov = 1;
var yMov = 1;

//Traveler Array position 
var travXPos = 0;
var travYPos = 0;

var travXPos2 = 0;

//Microbe diameter
var diameter = 20;


function setup() {
  //Be somebody - Be as big as the window
  createCanvas(windowWidth,windowHeight);
  //Spotlight Grid Background Setup
  gridOfRects();
  gridOfTris();
}


function draw() {
  background(40);
  bgMicrobes();
  microbialTravelers();
  rotatingMicrobes();

  //Garbage man cometh and taketh out the unneccsary indecies so the program doesn't run slow
  garbageMan();
}

function bgMicrobes() {
  push();  
  spinOppositeSlow(); 
  pushTris();
  pop();
}

//microbial traveler organization
function microbialTravelers() {
  push();  
  spinOpposite(); 
  pushTravelers2();
  pop();
  push();  
  pushTravelers();
  pop();
}

//rotating microbe and grid organization
function rotatingMicrobes() {
  push();
  //SpinMeRightRound
  spin();
  pushEveryClass();
  moveEveryClass(); 
  pop();
}

//Microbe Class
function Microbe(tempX, tempY, tempR, tempG, tempB, tempdivideSize) {
  //Microbe Constructor Variables
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

  //Show, grow and color fade functionality
  this.show = function() {  
    this.n = noise(this.time)*1500;
    noStroke();
    fill(this.r, this.g, this.b, this.o);
    ellipse(this.xPos+this.x, this.yPos+this.y, this.n/this.divideSize, this.n/this.divideSize);

    //color builder - this will constantly change the r, g, b values of each microbe on the canvas
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
    this.time = this.time + this.increment;
  }

  //Random step functionality
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

  // print (this.xPos);
  this.isFinished = function(){
    if (this.o<0){
      return true;
    } else {
      return false;
    }
  }
}


//Moving rect grid background - this is actually a class for just one rectangle with methods.
//I will create the grid with a for loop by passing its location variables into it's constructor. 
function Grid(tempX, tempY, tempO) {
  //x and y positions 
  this.xPos = tempX;
  this.yPos = tempY;

  //opactiy
  this.o = tempO;

  //time for variance in noise
  this.time = 0.0;  
    
  //incrementor 
  this.increment = .01;
    
  //initally each rect will start with a random corner radius
  this.cornerVariance = random(5,50);

  //the speed in which each corner will soften
  this.speedCorner = .5;  

  this.show = function() {  

    this.n = noise(this.time)*width/10;
    this.time = this.time + this.increment;

    noStroke();
    fill(255,255,255,this.o);
    rectMode(CENTER);
    rect(this.xPos, this.yPos, 5+this.n, 5+this.n, this.cornerVariance)

    this.cornerVariance = this.cornerVariance + this.speedCorner;

    if ((this.cornerVariance > 50 || this.cornerVariance < 1 )) {
      this.speedCorner = this.speedCorner * -1;
    }
  }
}


function gridOfRects() {
  //For loop to turn my rect object into a grid
  for (var k = -975; k < 1025; k = k + 75) {
    for (var l = -975; l < 1025; l = l + 75){

      var opacityVariance = 2;
      var opacityVarianceInverse = 0;

      gridVariance = dist(xMov,yMov, k, l);
      opacityVariance = dist(0,0, k*.6, l*.6);

      constrain(opacityVariance, 0, 255);

      //Remapping the spotlight so its light in the middle and dark outside(this took forever to figure out lol)
      var m = map(opacityVariance, 0, 255, 255, 0);

      grid[index++] = new Grid(k, l, m/8);
    }
  }
}

function Tris() {
  //x and y positions 
  this.xPos = random(-500,500);
  this.yPos = random(-500,500);
  this.speed = 1;

  //time for variance in noise
  this.time = 0.0;  
    
  //incrementor 
  this.increment = .01;
    
  this.show = function() {  

    this.n = noise(this.time)*width/200;
    this.time = this.time + this.increment;

    noStroke();
    fill(15,15,15);
    rectMode(CENTER);
    rect(this.xPos, this.yPos, this.n, this.n)
  }
  this.move = function() {  

  //this.xPos += random(-this.speed,this.speed);
  }
}

function gridOfTris() {
  //For loop to turn my rect object into a grid
  for (var i=0; i<200; i++) {
    tris.push(new Tris());
  }
}

function pushTris() {
  for (var i = tris.length-1; i >= 0; i--) {
    tris[i].show();
    tris[i].move();
  }  
}

//Line Burst Function - draws lines that start at the center and end at movX movY position 
//This will make the growing microbes appear as though they are being created by the lines
function Burst(tempX, tempY) {
  //X and Y coordinates - will be shared with microbe's 
  this.xPos = tempX;
  this.yPos = tempY;

  this.show = function() {  
    //draw the lines 
    line(this.xPos, this.yPos, 0, 0);
  }
}

//Spray ellipses that will originate from the center of the canvas and move toward the the microbes as they are drawn
function Mover(tempX, tempY) {
  //Spray variables
  this.position = createVector(this.xPos,this.yPos);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topspeed = 15;

  //X and Y coordinates 
  this.xPos = tempX;
  this.yPos = tempY;

  //spray opacity 
  this.o = 10;

  this.update = function() {
    // Compute a vector that points from position to mouse
    var follow = createVector(this.xPos,this.yPos);
    this.acceleration = p5.Vector.sub(follow,this.position);
    // Set magnitude of acceleration
    this.acceleration.setMag(0.2);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  };

  this.display = function() {
    noStroke();
    fill(255,255,255,this.o);
    ellipse(this.position.x, this.position.y, 10, 10);
  };
}


//Center black blobs (large) that are the origin of the rest of the microbes
function MoverCenter(tempX, tempY) {

  //variables for black blob
  this.position = createVector(random(-10,10),random(-10,10));
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topspeed = 15;
  this.xPos = tempX;
  this.yPos = tempY;
  this.o = 255;
  this.diameter = 15;
  this.s = second();
  this.mag = 2;

  this.update = function() {
    // Compute a vector that points from position to mouse
    var follow = createVector(this.xPos,this.yPos);
    this.acceleration = p5.Vector.sub(follow,this.position);
    // Set magnitude of acceleration
    this.acceleration.setMag(this.mag);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);

    //if (this.s % 3 > 1){
      //this.topspeed = this.topspeed - 3;
      //this.mag = this.mag - .5;
    //}

  };

  this.display = function() {
    noStroke();
    fill(0,0,0,this.o);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);

    //when seconds modulo 5 rema
    if (this.s % 5){
     // this.diameter = this.diameter + 5;
    }

  };
}


//Center black blobs (small/faster) that are the origin of the rest of the microbes
function MoverCenter2(tempX, tempY) {

  this.position = createVector(random(-10,10),random(-10,10));
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topspeed = 85;
  this.xPos = tempX;
  this.yPos = tempY;
  this.o = 255;

  this.update = function() {
   
    // Compute a vector that points from position to mouse
    var follow = createVector(this.xPos,this.yPos);
    this.acceleration = p5.Vector.sub(follow,this.position);
   
    // Set magnitude of acceleration
    this.acceleration.setMag(3);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  };

  this.display = function() {
    noStroke();
    fill(0,0,0,this.o);
    ellipse(this.position.x, this.position.y, 5, 5);
  };


}

function spin() {
  deg+=increment;
  translate(width/2, height/2);
  rotate(deg);
}
function spinOpposite() {
  deg2-=increment;
  translate(width/2, height/2);
  rotate(deg2);
}
function spinOppositeSlow() {
  deg2-=decrement;
  translate(width/2, height/2);
  rotate(deg2);
}

//Microbe Traveler Class
function Traveler(tempX, tempWidthNoise, tempShade) {
  //Microbe Constructor Variables
  this.xPos = tempX;
  //this.yPos = tempY;
  this.s = second();
  this.wn = tempWidthNoise;

  this.shade = tempShade;

  this.time = 0.0;  
  this.increment = .005;

  //Show, grow and color fade functionality
  this.show = function() {  
    this.n = noise(this.time)*height;
    this.time = this.time + this.increment;

    noStroke();
    fill(this.shade);
    ellipse(this.xPos, this.n, 2+this.n/this.wn, 2+this.n/this.wn);

    this.xPos = this.xPos + 2;
    //this.yPos = this.yPos + this.n;
  }
}

//Microbe Traveler Class
function Traveler2(tempX, tempWidthNoise, tempShade) {
  //Microbe Constructor Variables
  this.xPos = tempX;
  //this.yPos = tempY;
  this.s = second();
  this.wn = tempWidthNoise;

  this.shade = tempShade;

  this.time = 0.0;  
  this.increment = .005;

  //Show, grow and color fade functionality
  this.show = function() {
    this.n = noise(this.time)*height/1.5;
    this.time = this.time + this.increment;

    noStroke();
    fill(this.shade);
    ellipse(this.xPos, this.n, 2+this.n/this.wn, 2+this.n/this.wn);

    this.xPos = this.xPos - 5;
    //this.yPos = this.yPos + this.n;
    constrain(this.n, 0, height);
  }
}

//Push Traveler Class Function - continuously pushes new travelers under certain time conditions. 
function pushTravelers2() {
  //background(0);
  this.s = second();

  //create travelers when seconds are between 10 and 25
  if(s>30 && s<50){
    if(this.s%3){
      othertraveler.push(new Traveler2(travXPos2+width,15,25));
    }    

    if(this.s%5){
      othertraveler2.push(new Traveler2(travXPos2+width,500,5));
    }    

  }


  for (var i = othertraveler.length-1; i >= 0; i--) {
    othertraveler[i].show();
  }  
  for (var i = othertraveler2.length-1; i >= 0; i--) {
    othertraveler2[i].show();
  }  
}

//Push Traveler Class Function - continuously pushes new travelers under certain time conditions. 
function pushTravelers() {
  //background(0);
  this.s = second();

  //create travelers when seconds are between 10 and 25
  if(s>10 && s<25){
    if(this.s%3){
      traveler.push(new Traveler(travXPos,50,255));
    }
    
    if(this.s%5){
      traveler2.push(new Traveler(travXPos,200,200));
    }
  }

  for (var i = traveler.length-1; i >= 0; i--) {
    traveler[i].show();
  }
  
  for (var i = traveler2.length-1; i >= 0; i--) {
    traveler2[i].show();
  }

  

}

//Push Every Class Function - continuously pushes new classes building on the array endlessly
function pushEveryClass() {
  //line bursts
  burst.push(new Burst(xMov, yMov));
  burst2.push(new Burst(xMov*-1, yMov*-1));

  //microbe classes - two colorful and two black and white moving in a mirrored pattern
  microbe.push(new Microbe(xMov, yMov, 220, 20, 127, 20));
  microbe2.push(new Microbe(xMov*-1, yMov, 20, 20, 20, 60));
  microbe3.push(new Microbe(xMov*-1, yMov*-1, 220, 20, 127, 20));
  microbe4.push(new Microbe(xMov, yMov*-1, 20, 20, 20, 60));

  //spray to follow the microbe as it grows
  mover.push(new Mover(xMov, yMov)); 
  mover2.push(new Mover(xMov*-1, yMov*-1)); 

  //
  movercenter2.push(new MoverCenter2(0, 0)); 
  movercenter.push(new MoverCenter(0, 0)); 

  //Let's keep these turkeys on the canvas!
  xMov = constrain(xMov,-500,500);
  yMov = constrain(yMov,-500,500);

  //dice variabale is rolled every frame the result will inform the direction of the microbes
  var choice = random(0,4);

   if (choice < 1 ){
        xMov = xMov - 15;
      } else if (choice < 2 ){
        xMov = xMov + 15;
      } else if (choice < 3 ){
        yMov = yMov + 15;
      } else {
        yMov = yMov - 15;
      }
}


//Move Every Class Function - makes sure every instance of every class runs 
//through its functions during its lifespan on the canvas
function moveEveryClass() {
  //Working through the array backwards ensures no indecies are skipped during garbage collection

  for (var i = burst.length-1; i >= 0; i--) {
    burst[i].show();
  }

  for (var i = burst2.length-1; i >= 0; i--) {
    burst2[i].show();
  }

  for (var i = grid.length-1; i >= 0; i--) {
    grid[i].show();
  }

  for (var i = mover.length-1; i >= 0; i--) {
    mover[i].display();
    mover[i].update();
  }

  for (var i = mover2.length-1; i >= 0; i--) {
    mover2[i].display();
    mover2[i].update();
  }

  for (var i = movercenter2.length-1; i >= 0; i--) {
    movercenter2[i].display();
    movercenter2[i].update();
  }

  for (var i = movercenter.length-1; i >= 0; i--) {
    movercenter[i].display();
    movercenter[i].update();
  }

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
}


//Garbage man cometh and taketh out the unneccsary indecies so the program doesn't run slow
function garbageMan() {
  //Constrain lines to 15 at a time
  if (burst.length > 15){
    burst.splice(0,1); 
  }
  //Constrain lines to 15 at a time
  if (burst2.length > 15){
    burst2.splice(0,1); 
  }
  //Constrain microbes to 1000 at a time
  if (microbe.length > 1000){
    microbe.splice(0,1); 
  }
  //Constrain microbes to 1000 at a time
  if (microbe2.length > 1000){
    microbe2.splice(0,1); 
  }
  //Constrain microbes to 1000 at a time
  if (microbe3.length > 1000){
    microbe3.splice(0,1); 
  }
  //Constrain microbes to 1000 at a time
  if (microbe4.length > 1000){
    microbe4.splice(0,1); 
  }
  //Constrain spray movers to 300 at a time
  if (mover.length > 300){
    mover.splice(0,1); 
  }
  //Constrain spray movers to 300 at a time
  if (mover2.length > 300){
    mover2.splice(0,1); 
  }
  //Constrain center movers to 20 at a time
  if (movercenter.length > 20){
    movercenter.splice(0,1); 
  }
  //Constrain center movers to 20 at a time
  if (movercenter2.length > 20){
    movercenter2.splice(0,1); 
  }
  //Constrain center movers to 20 at a time
  if (traveler.length > 800){
    traveler.splice(0,1); 
  }
    //Constrain center movers to 20 at a time
  if (traveler2.length > 800){
    traveler2.splice(0,1); 
  }  

  //Constrain center movers to 20 at a time
  if (othertraveler.length > 800){
    othertraveler.splice(0,1); 
  }  
    //Constrain center movers to 20 at a time
  if (othertraveler2.length > 800){
    othertraveler2.splice(0,1); 
  }  
}
