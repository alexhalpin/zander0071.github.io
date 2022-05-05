import './style.css';

import * as THREE from 'three';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { SimplifyModifier } from './node_modules/three/examples/jsm/modifiers/SimplifyModifier.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { ObjectLoader, TorusGeometry } from 'three';
import { Interaction } from './node_modules/three.interaction/src/index.js';

const loader = new OBJLoader();
const simplifier = new SimplifyModifier();
const scene = new THREE.Scene();

$(window).load(function() {
  $("body").removeClass("preload");
});


const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,.1,1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const interact = new Interaction(renderer, scene, camera);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );
//const controls = new OrbitControls( camera, renderer.domElement );
//controls.update();

const wfMaterial = new THREE.MeshStandardMaterial({ color: 0x42b6f5, wireframe: true});
const pinkwfMaterial = new THREE.MeshStandardMaterial({ color: 0xFF75DE, wireframe: true});

var dir = 1;
var pctoggle = true;
var rad = 0;
var afterLoaded = [];

loader.load('pc.obj',(object)=>{
  object.traverse((child)=>{
    if(child instanceof THREE.Mesh){
      child.material = wfMaterial;
      child.geometry.center();
      child.scale.multiplyScalar(3.5);
      console.log(child);
    }
  });
  const pc = object;
  scene.add(pc);
  pc.position.setZ(-300);
  pc.position.setY(-25);
  pc.position.setX(200);
  //pc.rotation.y = -.3;

  const pcFloat = function (){
    let y = Math.sin(.02*rad);
    pc.position.y += .4*y;
    pc.rotation.y += dir*.01;
    rad += 1;
  }

  var listitems = document.querySelectorAll("a");
  const pcClick = function() {
    if(pctoggle){
      listitems.forEach(item => {
        // item.style.fontFamily = "Aroly";
        item.style.color = "black";
        // item.style.letterSpacing = "-10px";
        item.style.webkitTextStrokeWidth = "1px";
        item.style.webkitTextStrokeColor = "rgb(66,182,245)";
        dir = -1;
      });
      pctoggle = false;
    }else{
      listitems.forEach(item => {
        item.style.color = "inherit";
        item.style.fontFamily = "inherit";
        item.style.letterSpacing = "inherit";
        item.style.webkitTextStrokeWidth = "0px";
        dir = 1;
      });
      pctoggle = true;
    }
  }

  pc.on('mousedown', () => {
    pcClick();
  });

  afterLoaded.push(pcFloat);

  loader.load('smallbrain.obj',(object)=>{
    object.traverse((child)=>{
      if(child instanceof THREE.Mesh){
        child.material = pinkwfMaterial;
        child.geometry.center();
        child.scale.multiplyScalar(13);
        console.log(child);
      }
    });
    const brain = object;
    scene.add(brain);
    brain.position.setY(35);
    brain.position.setZ(-50);
    brain.position.setX(0);
    brain.rotation.y = Math.PI / 2;
    pc.add(brain);
  });
});





const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set(0,0,0);

const amblight = new THREE.AmbientLight( 0xffffff );


scene.add( pointLight, amblight );

renderer.render( scene, camera );




function animate() {
  requestAnimationFrame( animate );

  afterLoaded.forEach((func) => {
    func();
  });

  //controls.update();
  renderer.render( scene, camera );
}

animate();
