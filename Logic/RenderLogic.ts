import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Parse3le } from './ParsingLogic';
import { SatelliteData } from '../Models/SatelliteData';
import subsetData from '../Assets/2025-09-25_dataset_subset_5.3le?raw';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  3.5,
  7.5,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

const wireframeMaterial = new THREE.MeshDepthMaterial({
  wireframe: true,
  opacity: 1,
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
// const ellipsePoints = new THREE.EllipseCurve(
//   0,      // ax
//   0,      // aY
//   1.5,    // xRadius
//   1.5,    // yRadius
//   0,      // aStartAngle
//   2 * Math.PI, // aEndAngle
//   false,  // aClockwise
//   0,      // aRotation
// ).getPoints(100);
// const circleGeo = new THREE.BufferGeometry().setFromPoints(ellipsePoints);
circleGeo.rotateX((Math.PI / 180) * 90);
circleGeo.rotateZ((Math.PI / 180) * satelliteOne.Inclination);

let circle = new THREE.LineLoop(circleGeo, wireframeMaterial);
scene.add(circle);

const sphereGeo = new THREE.SphereGeometry(1.2756, 32, 16);
let sphere = new THREE.Mesh(sphereGeo, wireframeMaterial);
scene.add(sphere);

camera.position.z = 5.5;
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}
