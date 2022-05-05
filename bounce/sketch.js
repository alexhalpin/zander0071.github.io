var balls = [];
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB,100,100,100);
  noStroke();
  
  gravity = createVector(0, 0.3);
}

function draw() {
  background(50,20,100);
  // cnv.mousePressed(() => balls.push(new Ball(1, constrain(randomGaussian(10,10),5,100), mouseX, mouseY)));

  if(mouseIsPressed){
   balls.push(new Ball(1, constrain(randomGaussian(20,5),1,100), mouseX, mouseY)); 
  }



  for (let ball of balls) {
    if(keyIsDown(LEFT_ARROW)&!keyIsDown(RIGHT_ARROW)){
      ball.applyForce(-0.8,0);
    }
    if(keyIsDown(RIGHT_ARROW)&!keyIsDown(LEFT_ARROW)){
      ball.applyForce(0.8,0);
    }
    ball.update();
    ball.bounce();
    ball.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(keyCode === 32){
    gravity.mult(-1);
  }
}
