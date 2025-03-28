import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(100, 100);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff, 1);
// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("logo.png", (tex) => {
  tex.premultiplyAlpha = true;
  tex.needsUpdate = true;
});

// Cube dimensions
const width = 2;
const height = 2;
const depth = 0.00000001; //width; //width * 0.1;

const geometry = new THREE.BoxGeometry(width, height, depth);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Rotation speed (one full rotation in 5 seconds)
const rotationSpeed = (2 * Math.PI) / 2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += rotationSpeed * (1 / 60); // Approximate 60 FPS
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
