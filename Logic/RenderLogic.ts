import * as THREE from 'three';
import { GLTFLoader } from 'three/addons';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  2.5,
  10,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const wireframeMaterial = new THREE.MeshDepthMaterial({
  wireframe: true,
  opacity: 1,
  visible: true,
  side: THREE.FrontSide,
});

const circleGeo = new THREE.RingGeometry(1.25, 1.25, 32, 1);
circleGeo.rotateX((Math.PI / 180) * 90);
let circle = new THREE.LineLoop(circleGeo, wireframeMaterial);
scene.add(circle);

const loader = new GLTFLoader();
loader.load(
  '../assets/Earth_v1.glb',
  function (gltf) {
    let model = gltf.scene;
    model.traverse((obj) => {
      if (obj.name === 'Earth') {
        let wireframeObj = obj;
        wireframeObj.material = wireframeMaterial;
        scene.add(wireframeObj);
      }
    });
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error(error);
  },
);

camera.position.z = 4;
controls.update()

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}
