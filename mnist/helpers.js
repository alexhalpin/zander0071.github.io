const rint = function (_max) {
  return math.floor(math.random() * _max);
};

const MSEcost = function (_actArr, _tarArr) {
  let sum = 0;
  let OL = _actArr.length - 1; //last layer index
  let n = _actArr[OL][0].length; //number of outputs/targets
  for (let y = 0; y < n; y++) {
    let act = _actArr[OL][0][y];
    let tar = _tarArr[y];
    sum += (act - tar) ** 2;
  }
  return sum / n;
};

const importNetworkData = function (_network, _object){
  
    let str = _object.strArr;
    let nl = _object.numLayers;
    let wts = _object.wtsArr;
    let bias = _object.biasArr;

    _network.strArr = str;
    _network.numLayers = nl;
    _network.wtsArr = wts;
    _network.biasArr = bias;
}