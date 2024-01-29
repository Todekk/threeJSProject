import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the car model
const loader = new GLTFLoader();
let carModel, houseModel;

loader.load('./models/McLaren.glb', (gltf) => {
  carModel = gltf.scene;
  scene.add(carModel);
  // Adjust the size of the car
  carModel.position.y = -0.2;
  carModel.scale.set(9.5, 9.5, 9.5); // Adjust scale factors as needed
});

loader.load('./models/House.glb', (gltf) => {
  houseModel = gltf.scene;
  // Adjust the size of the platform
  houseModel.scale.set(0.5, 0.5, 0.5); // Adjust scale factors as needed
  // Adjust the position of the platform
  houseModel.position.y = -0.5; // Adjust the height position as needed
  scene.add(houseModel);
});

// Set up camera position
const cameraRadius = 5;
let cameraAngle = 0;

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Handle window resize
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Handle keydown events
window.addEventListener('keydown', (event) => {
  if (event.key === 'e' || event.key === 'E') {
    // Move the car forward
    if (carModel) {
      const speed = 0.5; // Adjust the speed as needed
      const forwardVector = new THREE.Vector3(0, 0, +speed);
      carModel.position.add(forwardVector);
    }
  }
});

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  carModel.rotation.y = 1;
  // Rotate the camera around the car
  camera.position.x = cameraRadius * Math.sin(cameraAngle);
  camera.position.z = cameraRadius * Math.cos(cameraAngle);
  camera.lookAt(carModel.position);

  // Update the angle for the next frame
  cameraAngle += 0.01;

  renderer.render(scene, camera);
};

animate();