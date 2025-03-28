import * as THREE from "three";
import imgArr from "./data/imgArr";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load placeholder images as textures
const textureLoader = new THREE.TextureLoader();
const images = [];
const imageCount = 20;

for (let i = 0; i < imageCount; i++) {
  // images.push(textureLoader.load(`https://via.placeholder.com/200?text=${i + 1}`));
  images.push(textureLoader.load(`public/screenshots/${imgArr[i]} `));
}

// Create image planes
const planes = [];
const planeSize = 2;
for (let i = 0; i < imageCount; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: images[i],
    transparent: true,
  });
  const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, -i * 5);
  planes.push(plane);
  scene.add(plane);
}

let currentIndex = 0;
let atImage = true;
let movingSideways = false;
let movingForward = false;
let moveStep = 0;
let moveDirection = 1; // 1 for left, -1 for right

function animate() {
  requestAnimationFrame(animate);

  if (movingSideways) {
    camera.position.x += 0.1 * moveDirection;
    moveStep++;
    if (moveStep >= 50) {
      // Move 50% of image width
      movingSideways = false;
      movingForward = true;
      moveStep = 0;
    }
  } else if (movingForward) {
    camera.position.z -= 0.1;
    moveStep++;
    if (moveStep >= 2500) {
      // Move forward to the next image
      movingForward = false;
      atImage = true;
    }
  }

  renderer.render(scene, camera);
}
animate();

// Move to next image on space key press
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && atImage) {
    atImage = false;
    movingSideways = true;
    moveStep = 0;
    moveDirection *= -1; // Alternate left and right movement
    currentIndex = (currentIndex + 1) % imageCount;
  }
});

// Resize handler
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
