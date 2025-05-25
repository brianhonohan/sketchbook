import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js';

let scene, camera, renderer;

let currentBlock;
const gridSize = { x: 6, y: 20, z: 6 };
const blockSize = 1;
const fallSpeed = 0.01;
const lockedBlocks = [];

const BLOCK_OFFSET = blockSize / 2.0;

init();
animate();

function init() {
  let sceneSize = { width: window.innerWidth, height: window.innerHeight };
  // let sceneSize = { width: 500, height: 500 }; // Fixed size for screenshot

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(sceneSize.width, sceneSize.height);
  document.body.appendChild(renderer.domElement);
  
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x292929);

  camera = new THREE.PerspectiveCamera(75, sceneSize.width / sceneSize.height, 0.1, 1000);
  camera.position.set(gridSize.x / 2, gridSize.y * 1.2, gridSize.z / 2);
  camera.lookAt(new THREE.Vector3(gridSize.x / 2, 0, gridSize.z / 2));
  
  
  addGridBorders();
  spawnBlock();

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('keydown', handleKeyDown);
}

function addGridBorders() {
  const material = new THREE.LineBasicMaterial({ color: 0xcccccc });
  const material2 = new THREE.LineBasicMaterial({ color: 0xcc00cc });
  const material3 = new THREE.LineBasicMaterial({ color: 0xcccc00 });

  for (let x = 0; x <= gridSize.x; x += gridSize.x) {
    for (let y = 0; y <= gridSize.y; y++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, 0),
        new THREE.Vector3(x, y, gridSize.z)
      ]);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    }
  }
  // now draw the far side of the grid
  for (let x = 0; x <= gridSize.x; x++) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, 0, 0),
      new THREE.Vector3(x, 0, gridSize.z)
    ]);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }

  for (let z = 0; z <= gridSize.z; z += gridSize.z) {
    for (let y = 0; y <= gridSize.y; y++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, y, z),
        new THREE.Vector3(gridSize.x, y, z)
      ]);
      const line = new THREE.Line(geometry, material2);
      scene.add(line);
    }
  }

  for (let z = 0; z <= gridSize.z; z++) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, z),
      new THREE.Vector3(gridSize.x, 0, z)
    ]);
    const line = new THREE.Line(geometry, material2);
    scene.add(line);
  }

  for (let x = 0; x <= gridSize.x; x++) {
    for (let z = 0; z <= gridSize.z; z += gridSize.z) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0, z),
        new THREE.Vector3(x, gridSize.y, z)
      ]);
      const line = new THREE.Line(geometry, material3);
      scene.add(line);
    }
  }
}

function spawnBlock() {
  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
  const material = new THREE.MeshBasicMaterial({ color: 0x00cc00, wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.floor(gridSize.x/2) - BLOCK_OFFSET, Math.floor(gridSize.y), Math.floor(gridSize.z/2) - BLOCK_OFFSET);
  currentBlock = mesh;
  scene.add(currentBlock);
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  const isShift = event.shiftKey;
  const rotateAmount = isShift ? -Math.PI / 2 : Math.PI / 2;

  switch (key) {
    case 'a': currentBlock.position.x = Math.max(BLOCK_OFFSET, currentBlock.position.x - 1); break;
    case 'd': currentBlock.position.x = Math.min(gridSize.x - BLOCK_OFFSET, currentBlock.position.x + 1); break;
    case 's': currentBlock.position.z = Math.min(gridSize.z - BLOCK_OFFSET, currentBlock.position.z + 1); break;
    case 'w': currentBlock.position.z = Math.max(BLOCK_OFFSET, currentBlock.position.z - 1); break;
    case 'q': currentBlock.rotation.z += rotateAmount; break;
    case 'e': currentBlock.rotation.x += rotateAmount; break;
    case 'r': currentBlock.rotation.y += rotateAmount; break;
    case ' ': dropBlock(); break;
  }
}

function dropBlock() {
  currentBlock.position.y = 0;
  lockBlock();
}

function lockBlock(){
  currentBlock.material.wireframe = false;
  lockedBlocks.push(currentBlock);
  spawnBlock();
}

function animate() {
  requestAnimationFrame(animate);

  if (currentBlock) {
    currentBlock.position.y -= fallSpeed;
    if (currentBlock.position.y <= 0) {
      lockBlock();
    }
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
