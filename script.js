import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', (event) => {
  (size.width = window.innerWidth),
    (size.height = window.innerHeight),
    (camera.aspect = size.width / size.height);
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / size.width - 0.5;
  cursor.y = -(event.clientY / size.height - 0.5);
});

const textureLoader = new THREE.TextureLoader();
const landTexture = textureLoader.load('/static/textures/land.png');
const soilTexture = textureLoader.load('/static/textures/soil.jpeg');
const minecraftTexture = textureLoader.load('/static/textures/minecraft.png');

landTexture.colorSpace = THREE.SRGBColorSpace;
soilTexture.colorSpace = THREE.SRGBColorSpace;
minecraftTexture.colorSpace = THREE.SRGBColorSpace;

landTexture.magFilter = THREE.NearestFilter;
soilTexture.magFilter = THREE.NearestFilter;
minecraftTexture.magFilter = THREE.NearestFilter;

const canvas = document.querySelector('canvas#webgl');

const scene = new THREE.Scene();

const cube = new THREE.BoxGeometry(1, 1, 1);
const octa = new THREE.OctahedronGeometry(1, 0);
const sphere = new THREE.SphereGeometry(1, 32, 32);
const cone = new THREE.ConeGeometry(1, 1, 32);
const donut = new THREE.TorusGeometry(1, 0.35, 32, 100);

const landMaterial = new THREE.MeshBasicMaterial({
  map: landTexture,
});

const soilMaterial = new THREE.MeshBasicMaterial({
  map: soilTexture,
});

const minecraftMaterial = new THREE.MeshBasicMaterial({
  map: minecraftTexture,
});

const boxMesh = new THREE.Mesh(cube, landMaterial);
const donutMesh = new THREE.Mesh(donut, landMaterial);
const sphereMesh = new THREE.Mesh(sphere, soilMaterial);
const coneMesh = new THREE.Mesh(cone, minecraftMaterial);
const octaMesh = new THREE.Mesh(octa, minecraftMaterial);
const octa2Mesh = new THREE.Mesh(octa, minecraftMaterial);

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

boxMesh.position.set(0, 0, 0);
coneMesh.position.set(0, 2, 0);
octaMesh.position.set(2, 0, 0);
donutMesh.position.set(0, 0, -4);
octa2Mesh.position.set(-2, 0, 0);
sphereMesh.position.set(0, -2, 0);

donutMesh.rotation.x = 2;

camera.position.set(0, 0, 6);

scene.add(boxMesh);
scene.add(octaMesh);
scene.add(octa2Mesh);
scene.add(coneMesh);
scene.add(sphereMesh);
scene.add(donutMesh);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(size.width, size.height);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
