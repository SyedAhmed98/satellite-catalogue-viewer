import * as THREE from 'three';
import { GLTFLoader } from 'three/addons';
import { Color } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  3,
  10
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const wireframeMaterial = new THREE.MeshDepthMaterial({
  wireframe: true,
  opacity: 1,
  visible: true,
  side: THREE.FrontSide
});

const earthMaterial = new THREE.MeshDepthMaterial({
  opacity: 1,
  visible: true,
  side: THREE.FrontSide
});

const loader = new GLTFLoader();
loader.load(
  '../assets/Earth_v1.glb',
  function (gltf) {
    let model = gltf.scene;
    model.traverse((obj) => {
      if (obj.name === 'Earth') {
        let earthObj = obj;
        earthObj.material = earthMaterial;
        scene.add(earthObj);

        // let wireframeObj = obj;
        // wireframeObj.material = wireframeMaterial;
        // scene.add(wireframeObj);
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

camera.position.z = 5;

function animate() {
  scene.traverse((c)=> {
    if (c instanceof THREE.Mesh) {
      c.rotateY(Math.PI / 3240);
    }
  })

  renderer.render(scene, camera);
}
