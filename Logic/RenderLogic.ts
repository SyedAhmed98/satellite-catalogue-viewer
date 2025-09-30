import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Parse3le } from './ParsingLogic';
import { SatelliteData } from '../Models/SatelliteData';
import subsetData from '../Assets/2025-09-25_dataset_subset_5.3le?raw';

const scene = new THREE.Scene();
const width = 500;
const height = 500;
const camera = new THREE.OrthographicCamera(
  (window.innerWidth / width) * -1,
  window.innerWidth / width,
  window.innerHeight / height,
  (window.innerHeight / height) * -1,
  1,
  500,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

const wireframeMaterial = new THREE.MeshStandardMaterial({
  wireframe: true,
  opacity: 0.125,
  transparent: true,
  emissive: 0xffffff,
  visible: true,
});

let satelliteData = Parse3le(subsetData);
let satelliteOne: SatelliteData = satelliteData[0];

const circleGeo1 = new THREE.RingGeometry(1.2756, 1.2756, 32, 1);
circleGeo1.rotateY((Math.PI / 180) * 90);
const circle1Material = new THREE.MeshStandardMaterial({
  wireframe: true,
  emissive: 0xff0000,
  visible: true,
});
let circle1 = new THREE.LineLoop(circleGeo1, circle1Material);
scene.add(circle1);

const circleGeo = new THREE.RingGeometry(1.7, 1.7, 32, 1);
circleGeo.rotateX((Math.PI / 180) * 90);
circleGeo.rotateZ((Math.PI / 180) * satelliteOne.Inclination);

let circle = new THREE.LineLoop(circleGeo, wireframeMaterial);
scene.add(circle);

const earthGeo = new THREE.SphereGeometry(1.2756, 32, 16);
let earthMesh = new THREE.Mesh(earthGeo, wireframeMaterial);
scene.add(earthMesh);

const moonGeo = new THREE.SphereGeometry(0.34748, 8, 4);
let moonMesh = new THREE.Mesh(moonGeo, wireframeMaterial);
moonMesh.translateZ(-385);
scene.add(moonMesh);

camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}
