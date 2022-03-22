function Ball(m,r,x,y){ 
  this.mass = m;
  this.radius = r;
  
  this.huu = random(100);
  this.sat = 78;
  this.brt = 100;
  
  this.netForce = createVector(0,0);
  this.acc = createVector(0,0);
  this.vel = createVector(0,0);
  this.pos = createVector(x,y);
  
  this.show = function() {
    fill(this.huu,this.sat,this.brt);
    circle(this.pos.x,this.pos.y,2*this.radius);
  }
  
  this.update = function() {
    this.netForce.div(this.mass);
    this.acc.add(this.netForce);
    this.acc.add(gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    this.pos.y = constrain(this.pos.y, this.radius, height-this.radius);
  }
  
  this.applyForce = function (fx,fy) {
    this.netForce = createVector(fx,fy);
  }
  
  this.bounce = function () {
    if((height - this.pos.y) <= (this.radius+1)){
      this.vel.y *= (-1 + this.radius*0.01);
    }
    if(this.pos.y <= (this.radius+1)){
      this.vel.y *= (-1 + this.radius*0.01);
    }
  }
}