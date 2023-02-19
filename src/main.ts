import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';
import GUI from 'lil-gui';
import { createFloor, createHouse } from './utils';

// stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// debug
const gui = new GUI();

// canvas
const canvas = document.getElementsByClassName('webgl')[0] as HTMLCanvasElement;

// scene
const scene = new THREE.Scene();

// objects

// house
const house = createHouse();
scene.add(house);

// floor
const floor = createFloor();
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// lights
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// resize handler
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer and pixel ration
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// fullscreen handler
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    return canvas.requestFullscreen();
  }
  return document.exitFullscreen();
});

// camera
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
// add size to renderer to avoid pixelated view
renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  // start stats monitoring
  stats.begin();
  // enable damping
  controls.update();
  // render scene
  renderer.render(scene, camera);
  // end of stats monitoring
  stats.end();
  // pass reference to itself to create infinite loop of frames
  window.requestAnimationFrame(animate);
};

animate();
