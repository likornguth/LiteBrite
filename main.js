import * as THREE from 'three';
import { EllipseCurve } from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
//import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
//import { AxesHelper } from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );
var obs = new THREE.Group();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const width = 60;
const height = 50;
const intensity = 75;

var settings = {
    bulb0: 0x000,
    bulb1: 0xFF0000,
    bulb2: 0x80daeb,
    bulb3: 0xFFFF00,
    bulb4: 0xFFFFFF,
    bulb5:0x000,
    brightness:100,
    ambient: 0,
    point1: true,
    point2: true,
    point3: true
}
const rectLight = new THREE.RectAreaLight(
    0xF6E7D2,
    settings.brightness,
    width,
    height,
);
//const helper = new RectAreaLightHelper( rectLight );
//rectLight.add(helper);
//scene.add(rectLight);

obs.add(rectLight);
const pt1 = new THREE.PointLight( 0xCBC3E3, 10, 500 );
pt1.position.set( 30, 50, 5 );
pt1.lookAt(12,20,0);
obs.add( pt1 );
const pt2 = new THREE.PointLight( 0xCBC3E3, 10, 1000 );
pt2.position.set( 0, 50, 5 );
pt2.lookAt(12,20,0);
obs.add( pt2 );
const pt3 = new THREE.PointLight(0xCBC3E3, 10, 500);
pt3.position.set( 60, 50, 5 );
pt3.lookAt(12,20,0);
obs.add( pt3 );

const pt4 = new THREE.DirectionalLight( 0xCBC3E3, 1 );
pt4.position.set( 25,100,-70 );
pt4.rotation.y -= Math.PI/2;
obs.add( pt4 );
//const dhelper = new THREE.DirectionalLightHelper( pt4, 5 );
//scene.add( dhelper );


const light = new THREE.AmbientLight( 0xF6E7D2 ); // soft white light
light.position.z = -25;
light.position.y = 5;
light.intensity = 0;
obs.add( light );

const w=288; 
const h = 256;


//const { parse } = require("csv-parse");
//const fs = require("fs");
//const path = "src/Mickey Mouse - Sheet1.csv";
const mickey = [0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,0,0,0,0,0,1,4,3,0,0,2,0,0,0,0,0,0,2,2,2,0,1,2,1,0,2,2,0,0,0,0,0,0,2,2,0,0,1,1,4,1,1,1,3,0,2,0,0,0,0,0,0,0,0,2,2,0,3,3,0,2,0,0,0,0,0,0,0,0,2,2,0,0,1,3,3,1,4,1,0,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,2,0,0,0,0,0,0,0,0,0,2,2,0,0,3,0,3,3,3,0,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,2,0,1,3,3,
    3,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1,4,1,
    3,3,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,3,1,1,
    1,4,0,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,0,3,4,1,
    1,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,3,1,1,
    1,4,1,0,2,0,0,0,0,0,0,0,0,2,2,2,0,0,2,2,2,0,0,0,0,0,0,0,0,0,2,0,1,1,4,1,
    3,3,1,0,2,0,0,0,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,2,0,1,1,3,3,
    3,0,3,4,0,2,2,0,0,0,0,2,4,4,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,0,3,4,3,0,3,
    3,3,1,1,0,0,2,2,0,0,2,4,4,4,0,0,4,0,0,4,2,2,2,0,0,2,2,2,2,0,3,1,1,3,3,
    1,4,1,4,1,0,0,0,2,0,0,4,4,4,0,0,4,4,0,0,4,4,2,0,0,2,0,0,0,0,4,1,4,1,4,1,
    1,1,3,3,1,3,0,2,0,0,4,4,4,4,0,2,4,0,2,4,4,4,2,0,0,2,0,3,3,1,1,3,3,1,1,
    3,4,3,0,3,2,0,2,0,0,0,4,4,4,0,0,4,4,0,0,4,4,2,0,0,0,2,0,0,3,4,3,0,3,4,3,
    1,1,3,3,1,0,2,0,0,0,4,4,4,4,0,0,2,0,0,4,4,4,2,0,0,0,2,0,3,1,1,3,3,1,1,
    1,4,1,4,1,0,2,0,0,0,0,4,2,2,0,0,2,2,0,0,2,2,2,0,0,0,2,2,0,1,4,1,4,1,4,1,
    3,3,1,1,3,0,2,0,4,4,4,4,2,2,2,2,2,2,2,2,4,4,4,4,0,0,2,0,1,3,3,1,1,3,3,
    3,0,3,1,3,0,2,0,4,4,4,4,4,4,0,0,0,0,4,4,4,4,4,4,4,4,0,2,0,3,0,3,4,3,0,3,
    3,3,1,1,3,0,2,4,4,0,0,4,4,0,0,0,2,0,4,4,4,0,0,4,4,4,0,0,0,3,3,1,1,3,3,
    1,4,1,4,1,1,0,4,4,0,0,4,4,4,0,0,2,0,4,4,4,4,0,0,4,4,4,0,0,1,4,1,4,1,4,1,
    1,1,3,3,1,1,0,4,4,4,0,4,4,4,4,4,4,4,4,4,4,0,4,4,4,4,0,0,3,1,1,3,3,1,1,
    3,4,3,0,3,4,3,0,2,2,4,0,4,4,4,4,4,4,4,4,4,0,4,4,4,4,0,0,0,3,4,3,0,3,4,3,
    1,1,3,3,1,1,3,0,2,2,4,0,0,4,4,4,4,4,4,0,0,4,4,4,2,2,0,3,3,1,1,3,3,1,1,
    1,4,1,4,1,4,1,1,0,2,2,2,4,0,0,0,0,0,0,0,0,4,2,2,2,2,0,1,4,1,4,1,4,1,4,1,
    3,3,1,1,3,3,1,1,0,0,2,2,4,0,1,1,0,1,1,0,4,2,2,2,0,0,3,1,1,3,3,1,1,3,3,
    3,0,3,4,3,0,3,4,3,0,0,0,2,4,1,1,1,1,1,1,4,2,2,0,0,3,0,3,4,3,0,3,4,3,0,3,
    3,3,1,1,3,3,1,1,3,3,0,0,0,4,4,1,1,1,1,4,2,0,0,0,1,3,3,1,1,3,3,1,1,3,3,
    1,4,1,4,1,4,1,4,1,4,1,3,0,0,4,4,4,4,4,4,2,0,0,3,4,1,4,1,4,1,4,1,4,1,4,1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
fetch('src/Mickey Mouse - Sheet1.csv')
    .then(response =>response.text())
    .then(text => {
        data = Papa.parse(text).data;

        for (var i = 0; i < data.length; i++) {
            mickey.push((int)(data[i]));
          }      
        mickey = mickey.reverse();
    });





const boardshape = new THREE.Shape();
camera.position.z = 50;
camera.position.x = w/10;
camera.position.y = h/10+2;
boardshape.moveTo( w+10, h+10 );
boardshape.lineTo(w+10,h+10);
boardshape.lineTo(w+10,0-20);
boardshape.lineTo(0-10,0-20);
boardshape.lineTo(0-10,h+10);

const extrudeSettings = { 
	depth: .3, 
	bevelEnabled: true, 
	bevelSegments: 2, 
	steps: 2, 
	bevelSize: 1, 
	bevelThickness: .15 
};





const hdrEquirect = new RGBELoader().load(
    "./src/empty_warehouse_01_2k.hdr",  
    () => { 
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
    }
  );
const geometry1 = new THREE.IcosahedronGeometry(1, 15);
const material1 = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0.0,
    transmission: 1,
    thickness:1,
    envMap: hdrEquirect,
    color: 0x000,
  });
const material2 = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0.0,
    transmission: 1,
    thickness:1,
    envMap: hdrEquirect,
    color: 0xFF0000,
  });
const material3 = new THREE.MeshPhysicalMaterial({
metalness: 0,  
roughness: 0.0,
transmission: 1,
thickness:1,
envMap: hdrEquirect,
color: 0x80daeb,
});

const material4 = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0.0,
    transmission: 1,
    thickness:1,
    envMap: hdrEquirect,
    color: 0xFFFF00,
});
const material5 = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0.0,
    transmission: 1,
    thickness:1,
    envMap: hdrEquirect,
    color: 0xFFFFFF,
});

// material Array
const mtls = [material1,material2,material3, material4, material5];
var ax = 0, ay = 0;
var ct=0;
for(var i = h/8-2; i>=0; i--){
    // for each row
    for(var j = 0; j<((w/8-1)+(1-i%2)); j++){
        // for each column
        const newmesh = new THREE.Mesh(geometry1, mtls[mickey[ct]]);
        newmesh.scale.x = 0.6;
        newmesh.scale.y = 0.6;
        newmesh.scale.z = 0.6;
        if(i%2==0){
            newmesh.position.x = 1.6*j+1.25;
        }
        else{
            newmesh.position.x = 1.6*j+1.8;
        }
        newmesh.position.y = 1.6*i+1.8;
        newmesh.position.z = .5;
        obs.add(newmesh);
        
        if(i%2==0){
            boardshape.holes.push(new THREE.EllipseCurve(
                ax+5,  ay+8,            // ax, aY
                2.5, 2.5,           // xRadius, yRadius
                0,  2 * Math.PI,  // aStartAngle, aEndAngle
            
            ));
        }
        else{
        
            boardshape.holes.push(new THREE.EllipseCurve(
                ax+8,  ay+8,            // ax, aY
                2.5, 2.5,           // xRadius, yRadius
                0,  2 * Math.PI,  // aStartAngle, aEndAngle
            
            ));
        }
        ax = ax+8;
        ct++;
        
    }
    ax = 0;
    ay+=8;
}

//spare bulbs
const mesh1 = new THREE.Mesh(geometry1, material4);
mesh1.position.x +=2;
mesh1.position.y = -25;
mesh1.position.z +=2;
mesh1.castShadow = true;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geometry1, material2);
mesh2.position.x +=6;
mesh2.position.y = -25;
mesh2.position.z +=4;
mesh2.castShadow = true;
scene.add(mesh2);
const mesh3 = new THREE.Mesh(geometry1, material3);
mesh3.position.x -=20;
mesh3.position.y = -25;
mesh3.position.z +=1.5;
mesh3.castShadow = true;
scene.add(mesh3);

// 
const geometry = new THREE.ExtrudeGeometry( boardshape, extrudeSettings );
const material = new THREE.MeshStandardMaterial( { color: 0xA9A9A9, roughness:0.1, } );

const mesh = new THREE.Mesh( geometry, material );
mesh.castShadow = true;

//mesh.add(groundmesh);
mesh.scale.x = 0.2;
mesh.scale.y = 0.2;

const texture = new THREE.TextureLoader().load('src/Screenshot 2023-11-03 at 9.07.59 PM.png' ); 
// immediately use the texture for material creation 
const desktxt = new THREE.TextureLoader().load("src/desktexture.jpeg");
const txtmat2 = new THREE.MeshBasicMaterial( { map:texture } );
//const walltxt = new THREE.TextureLoader().load('src/blackwall.jpeg');
const txtgeom = new THREE.PlaneGeometry( 50, 15 );
const txtmat = new THREE.MeshStandardMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

const plane = new THREE.Mesh( txtgeom, txtmat2 );
plane.position.x = 150;
plane.position.y = -8;
plane.position.z = .5;

mesh.add( plane );
obs.add(mesh);

const fl = new THREE.PlaneGeometry(400,300,2);
//const flmat = new THREE.MeshStandardMaterial( { map:desktxt, side: THREE.DoubleSide } );
//flmat.metalness = 0.9;
// const wall = new THREE.PlaneGeometry(200,150,2);
const wallmat = new THREE.MeshStandardMaterial({color:0xc0c0c0, side:THREE.DoubleSide });
wallmat.metalness = 0.9;
// const wallmesh = new THREE.Mesh(wall, wallmat);
// wallmesh.receiveShadow = true;
//const leftwall = new THREE.Mesh(wall,flmat);
//obs.rotation.x -= Math.PI/32;
// leftwall.position.x = -30;
// leftwall.position.y = 55;
// leftwall.position.z = -20;
// wallmesh.position.x = 32;
// wallmesh.position.y = 55;
// wallmesh.position.z = -100;
//obs.add(wallmesh);
//obs.position.y+=4;
//obs.position.z-=2;
const flmesh = new THREE.Mesh(fl, wallmat);
flmesh.rotation.z += Math.PI/2;
flmesh.rotation.x -= Math.PI/2;
flmesh.position.x = 30;
flmesh.position.y = -.75;
flmesh.position.z = 25;
flmesh.receiveShadow = true;
scene.add(flmesh);
//flmesh.rotation.x += Math.PI;
//renderer.render(scene, camera);
//rectLight.lookAt(camera.position);
//rectLight.position = mesh.position;
rectLight.position.x= mesh.position.x + 0.1*w;
rectLight.position.y = mesh.position.y + 0.1*h;
rectLight.position.z = mesh.position.z -5;
rectLight.rotation.x = Math.PI-mesh.rotation.x;




//scene.position.x = -w/2;
flmesh.position.y -= 25;
//obs.lookAt(camera.position);
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.y = -10;
camera.position.x =0;
camera.position.z = 35;
obs.position.x = -28.5;
obs.position.y -= 22;
obs.position.z = 0;
obs.lookAt(0,camera.position.y-10,camera.position.x+w,camera.position.z);
camera.rotation.y = Math.PI;
controls.update();


const stats = new Stats();
document.body.appendChild(stats.dom);
const gui = new GUI();


const lightsettings = gui.addFolder('Brite-Lite Settings');
lightsettings.addColor(settings, 'bulb1');
lightsettings.addColor(settings, 'bulb2');
lightsettings.addColor(settings, 'bulb3');
lightsettings.addColor(settings, 'bulb4');
lightsettings.addColor(settings, 'bulb5');
lightsettings.add(settings, 'brightness', 1, 500);

const scenelights = gui.addFolder('Scene Lighting');
scenelights.add(settings, 'ambient', 0,1);
scenelights.add(settings, 'point1');
scenelights.add(settings, 'point2');
scenelights.add(settings, 'point3');


lightsettings.open();
scenelights.open();

scene.add(obs);
function animate() {
	requestAnimationFrame( animate );
    rectLight.intensity = settings.brightness;
    light.intensity = settings.ambient;
    pt1.visible = settings.point1;
    pt2.visible= settings.point2;
    pt3.visible = settings.point3;
    material1.color.set(settings.bulb5);
    material2.color.set(settings.bulb1);
    material3.color.set(settings.bulb2);
    material4.color.set(settings.bulb3);
    material5.color.set(settings.bulb4);
    controls.update();
	renderer.render( scene, camera );
    stats.update();
}

animate();