import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.set(1024, 1024);
// directionalLight.shadow.camera.far = 15;
// directionalLight.shadow.camera.left = -7;
// directionalLight.shadow.camera.top = 7;
// directionalLight.shadow.camera.right = 7;
// directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(0, 0, 3);
// scene.add(directionalLight);
// const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
// directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

// Material
const material = new THREE.MeshStandardMaterial({
  color: "#444444",
  metalness: 1,
  roughness: 1,
});
const materiall = new THREE.MeshBasicMaterial({});
/**
 * Models
 */
const gltfLoader = new GLTFLoader();

let model = null;

gltfLoader.load(
  "/axe/Fire.gltf",
  (gltf) => {
    console.log("gltf", gltf);
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.z = -Math.PI * 0.5;
    model = gltf.scene;
    // 전체 씬을 추가
    scene.add(gltf.scene);
  },
  (progress) => {
    console.log("progress");
    console.log(progress);
  },
  (error) => {
    console.log("error");
    console.log(error);
  }
);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(25, 25, 25), materiall);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -1;
// scene.add(floor);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (model) {
    // model.rotation.z = Math.sin(elapsedTime);
  }
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
