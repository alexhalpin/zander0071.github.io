const Network = function(_structureArr){
    this.strArr = _structureArr;
    this.numLayers = this.strArr.length;
    
    this.wtsArr = [];  // array of weight arrays
    for(let l=0; l<this.numLayers-1; l++){        //create weight arrays and populate with random
      let wtMat = [];                           //values from -0.5 to 0.5
      for(let r=0; r<this.strArr[l]; r++){
        wtMat.push([]);
        for(let c=0; c<this.strArr[l+1]; c++){
          wtMat[r].push(math.random()-0.5);
        }
      }
      this.wtsArr.push(wtMat);
    }
    
    this.biasArr = [];
    for(let l=0; l<this.numLayers; l++){
      let biasMat = [[]];
      for(let c=0; c<this.strArr[l]; c++){
        biasMat[0].push(math.random()-0.5);
      }
      this.biasArr.push(biasMat);
    }
    
    this.feed = function(_inpArr){
      if(_inpArr.length != this.strArr[0]){      //relies on inputs being row matrix
        try{
          throw 'Wrong Sized Input';
        }catch(e){
          console.error(e);
        }
      }
      let actArr = [];
      actArr.push([_inpArr]);
      
      for(let l=1; l<this.numLayers; l++){
        actArr.push([[]]);
  
        let stimMat = math.add(math.multiply(actArr[l-1],this.wtsArr[l-1]),this.biasArr[l]); //matmul and add bias
  
        for(let n=0; n<stimMat[0].length; n++){
          s = stimMat[0][n];
          actArr[l][0].push(  (1 / (1 + math.exp(-s)))  );
        }
      }
      
      return(actArr);
    }
    
    
    
    this.train = function(_actArr, _tarArr, _lrnRate){
      if(_tarArr.length != this.strArr[this.numLayers-1]){      //relies on inputs being row matrix
        try{
          throw 'Wrong Sized Target';
        }catch(e){
          console.error(e);
        }
      }
      
      let delArr = [];
      for(let l=0; l<this.numLayers; l++){    //initialize delta array layers
        delArr.push([]);
      }
      for(let l=this.numLayers-1; l>0; l--){              //iterate layers from output to first hidden layer
        for(let n=0; n<_actArr[l][0].length; n++){        //for every node in layer
          
          let O = _actArr[l][0][n];                       // activation of the node
          
          if(l==this.numLayers-1){                        // if in output layer
            
            let t = _tarArr[n];                           //target value
            delArr[l].push(  O*(1-O)*(O-t)  );            //calculate delta and add to array
            
          } else {
            
            let sumDW = 0;
            for(let pn=0; pn<_actArr[l+1][0].length; pn++){      //for every node in previous layer (toward output)
              sumDW += delArr[l+1][pn] * this.wtsArr[l][n][pn];  //calculate sum of delta of prev layer node * weight connecting current layer node and previous layer node
            }
            
            delArr[l].push(  O*(1-O)*sumDW  );
            
          }
          
          for(let nn=0; nn<_actArr[l-1][0].length; nn++){                                 //for every node in next layer (towards input)
            this.wtsArr[l-1][nn][n] += -_lrnRate * delArr[l][n] * _actArr[l-1][0][nn];    //update weights
            
          }    
          this.biasArr[l][0][n] += -_lrnRate * delArr[l][n];                            //update biases
        }
      }
      //counter++;
    }
    
  }
