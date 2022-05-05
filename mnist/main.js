var cells = [];

var drawBox = new p5(function (p) {
  
    p.setup = function () {
    p.width = document.getElementById('drawBox').clientWidth;
    p.height = document.getElementById('drawBox').clientHeight;
    p.createCanvas(p.width, p.height);
    
    p.cellSize = p.width/28;
    p.gridWidth = p.cellSize*28;
    p.cells = [];
    for(let r=0; r<28; r++){
      p.cells.push([]);
      for(let c=0; c<28; c++){
        p.cells[r].push(new p.cell(p.floor(c*p.cellSize), p.floor(r*p.cellSize), p.cellSize))
      }
    }
    cells = p.cells;
    
    p.clear = new p.button(p.gridWidth/2, (p.height-p.gridWidth)/2+p.gridWidth, 0.2*p.height, 0.50*(p.height-p.gridWidth), "clear", p.clearCells);
  };

  p.draw = function () {
    p.background(0);
    
    if(p.mouseX < p.gridWidth 
       && p.mouseX > 0
       && p.mouseY < p.gridWidth 
       && p.mouseY > 0
       && p.mouseIsPressed){
      p.cx = p.floor(p.mouseX/p.cellSize);
      p.cy = p.floor(p.mouseY/p.cellSize);
      //console.log(p.mouseX,p.mouseY);
      //console.log(p.cx,p.cy);
      p.cells[p.cy][p.cx].c = 255;
    }
    
    for(let row of p.cells){
      for(let cell of row){
        cell.draw();
      }
    }
    
    p.clear.draw();
    p.clear.clicked();
    
    cells = p.cells;
  };
  
  
  p.cell = function (_x,_y,_s){
    this.x = _x;
    this.y = _y;
    this.s = _s;
    this.c = 0;
    
    this.draw = function(){
      p.rectMode(p.CORNER);
      p.strokeWeight(0);
      p.fill(this.c);
      p.rect(this.x, this.y, this.s, this.s);
    }
  }
  
  p.button = function(_x, _y, _w, _h, _text, _callBack){
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.text = _text;
    this.callBack = _callBack;
    
    this.draw = function(){
      p.stroke(255);
      p.fill(0);
      p.rectMode(p.CENTER);
      p.strokeWeight(3);
      p.rect(this.x, this.y, this.w, this.h);
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.strokeWeight(0);
      p.textSize(p.height/18);
      p.text(this.text, this.x, this.y+3);
    }
    
    this.clicked = function(){
      if(p.mouseIsPressed
         && p.mouseX > this.x-this.w/2
         && p.mouseX < this.x+this.w/2
         && p.mouseY > this.y-this.h/2
         && p.mouseY < this.y+this.h/2
        ){
        this.callBack();
      }
    }
  }
  
  p.clearCells = function(){
    for(let row of p.cells){
      for(let cell of row){
        cell.c = 0;
      }
    }
  }
}, 'drawBox');

var graphBox = new p5(function (p) {
  
    p.preload = function() {
      p.mnistbrain = p.loadJSON('./mnistbrain.json');
    };  
  
    p.setup = function () {
      p.brain = new Network([784, 32, 10]);
      
      importNetworkData(p.brain, p.mnistbrain);
      
      p.width = document.getElementById('graphBox').clientWidth;
      p.height = document.getElementById('graphBox').clientHeight;
      p.createCanvas(p.width, p.height);
      
      p.barGraph = new p.graph(10);
  };

  p.draw = function () {
    let inputVector = p.flatten(cells);
    
    p.background(0);

    let nodes = p.brain.feed(inputVector);
    let output = nodes[p.brain.numLayers-1][0];
    p.barGraph.update(output);
    p.barGraph.draw();
  };
  
  p.graph = function(_n){
    this.bars = [];
    let vSpace = p.height/_n; 
    let h = 30;
    let x = 40;
    
    for(let i=0; i<_n; i++){
      let y = (0.5 + i)*vSpace;
      this.bars.push(new p.bar(x, y, h, i));
    }
    
    this.update = function(_arr){
      for(let i=0; i<this.bars.length; i++){
        this.bars[i].val = _arr[i];
      }
    }
    
    this.draw = function(){
      for(let bar of this.bars){
        bar.draw();
      }
    }
  }
  
  p.bar = function(_x, _y, _h, _i){
    this.x = _x;
    this.y = _y;
    this.val = 10;
    this.h = _h;
    this.index = _i;
    this.color = 255;
    
    this.draw = function(){
      p.rectMode(p.CORNER);
      p.fill(this.color);
      p.noStroke();
      p.rect(this.x, this.y-(this.h/2), this.val*250, this.h);
      
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(30);
      p.text(this.index, this.x-15, this.y+2);
    }
  }
  
  p.flatten = function(_arr){
    let vector = [];
    for(let row of _arr){
      for(let cell of row){
        vector.push(p.floor(cell.c/255));
      }
    }
    return(vector);
  }
}, 'graphBox');











