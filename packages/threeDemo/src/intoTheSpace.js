import * as THREE from "three";

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

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 1000;
const positions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 200; // X position
  positions[i + 1] = (Math.random() - 0.5) * 200; // Y position
  positions[i + 2] = Math.random() * -200; // Z position (negative to appear in front)
}

starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const positions = starsGeometry.attributes.position.array;
  for (let i = 2; i < positions.length; i += 3) {
    positions[i] += 0.5; // Move stars toward camera

    // Reset stars cyclically
    if (positions[i] > 5) {
      positions[i] = -195;
    }
  }
  starsGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

/*
import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 1000;
const positions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 200; // X position
    positions[i + 1] = (Math.random() - 0.5) * 200; // Y position
    positions[i + 2] = Math.random() * -200; // Z position (negative to appear in front)
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const positions = starsGeometry.attributes.position.array;
    for (let i = 2; i < positions.length; i += 3) {
        positions[i] += 0.5; // Move stars toward camera
        
        // Reset stars cyclically
        if (positions[i] > 5) {
            positions[i] = -195;
        }
    }
    starsGeometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
*/
