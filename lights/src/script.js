import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textMaterial = new THREE.MeshStandardMaterial();
// textMaterial.roughness = 0;
// textMaterial.metalness = 0;
// textMaterial.transparent = true;
// textMaterial.opacity = 0.5;
// textMaterial.transmission = 1;
// textMaterial.ior = 1.5;
// textMaterial.thickness = 0.5;

const fontLoader = new FontLoader();
let text;
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();

  //   textMaterial.wireframe = true;
  text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);

// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
// directionalLight.position.set(1, 0.25, 0);
// scene.add(directionalLight);

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
// scene.add(hemisphereLight);
// const pointLight = new THREE.PointLight(0xff9000, 1.5, 10, 2);
// pointLight.position.set(1, -0.5, 1);
// scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
rectAreaLight.position.set(0, 0, 1);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

// const spotLight = new THREE.SpotLight(
//   0x78ff00,
//   4.5,
//   10,
//   Math.PI * 0.1,
//   0.25,
//   1
// );

// spotLight.position.set(0, 0, 0);
// scene.add(spotLight);
// spotLight.target.position.x = -0.75;
// scene.add(spotLight.target);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.1
// );
// scene.add(hemisphereLightHelper);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   0.1
// );
// scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
// scene.add(pointLightHelper);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// window.requestAnimationFrame(() => {
//   spotLightHelper.update();
// });

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
// scene.add(rectAreaLightHelper);

// const helperLight = new THREE.DirectionalLightHelper(directionalLight);

// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
// material.roughness = 1;
// material.metalness = 1;

// // Objects
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
// sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);
// const torus = new THREE.Mesh(
//   new THREE.TorusGeometry(0.3, 0.2, 32, 64),
//   material
// );
// torus.position.x = 1.5;

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
// plane.rotation.x = -Math.PI * 0.5;
// plane.position.y = -0.65;

// scene.add(cube);

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

let parallax = 0;
window.addEventListener("scroll", () => {
  console.log(window.scrollY);

  const parallaxSpeed = Math.PI / 900;
  parallax = window.scrollY * parallaxSpeed;

  text.position.y = parallax;
  rectAreaLight.position.y = parallax;
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
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

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

  // // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 2 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // sphere.rotation.x = 0.15 * elapsedTime;
  // cube.rotation.x = 0.15 * elapsedTime;
  // torus.rotation.x = 0.15 * elapsedTime;
  // rectAreaLight.rotation.x = Math.sin(elapsedTime);
  rectAreaLight.rotation.x = elapsedTime * 2;

  rectAreaLight.position.x = Math.sin(elapsedTime) * 4;
  rectAreaLight.position.y = -Math.sin(elapsedTime * 2) + parallax;
  rectAreaLight.position.z = Math.cos(elapsedTime * 2);
  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
