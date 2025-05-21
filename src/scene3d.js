import * as THREE from 'three';

let scene, camera, renderer;
let cube, cylinder, cone;
let cubeEdges, cylinderEdges, coneEdges;

function init3D(container) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 8);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const material = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
  cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
    material
  );
  cone = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2, 32), material);

  cube.position.x = -3;
  cylinder.position.x = 0;
  cone.position.x = 3;

  scene.add(cube, cylinder, cone);

  function addEdges(mesh) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x000000 })
    );
    line.position.copy(mesh.position);
    line.rotation.copy(mesh.rotation);
    return line;
  }

  cubeEdges = addEdges(cube);
  cylinderEdges = addEdges(cylinder);
  coneEdges = addEdges(cone);
  scene.add(cubeEdges, cylinderEdges, coneEdges);
}

function render3D() {
  renderer.render(scene, camera);
}

function resize3D(container) {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function updateRotation(deltaX, deltaY) {
  const rotationSpeed = 0.005;
  cube.rotation.y += deltaX * rotationSpeed;
  cube.rotation.x += deltaY * rotationSpeed;

  cylinder.rotation.y += deltaX * rotationSpeed;
  cylinder.rotation.x += deltaY * rotationSpeed;

  cone.rotation.y += deltaX * rotationSpeed;
  cone.rotation.x += deltaY * rotationSpeed;

  cubeEdges.rotation.copy(cube.rotation);
  cylinderEdges.rotation.copy(cylinder.rotation);
  coneEdges.rotation.copy(cone.rotation);
}

export {
  init3D,
  render3D,
  resize3D,
  updateRotation,
  renderer,
};
