import { init3D, render3D, resize3D, renderer } from './scene3d.js';
import { add3DListeners, remove3DListeners } from './controls.js';
import { draw2D } from './draw2d.js';

const container = document.getElementById('canvas-container');
let canvas2d, ctx2d;
let mode3D = true;

function setup2D() {
  // Hide 3D canvas (WebGL)
  if (renderer && renderer.domElement) {
    renderer.domElement.style.display = 'none';
    remove3DListeners(container);
  }

  // Create 2D canvas if belum ada dan show
  if (!canvas2d) {
    canvas2d = document.createElement('canvas');
    canvas2d.style.width = '100%';
    canvas2d.style.height = '100%';
    container.appendChild(canvas2d);
  }
  canvas2d.style.display = 'block';

  // Set ukuran canvas 2D
  canvas2d.width = container.clientWidth;
  canvas2d.height = container.clientHeight;

  ctx2d = canvas2d.getContext('2d');
  draw2D(ctx2d, canvas2d.width, canvas2d.height);
}

function setup3D() {
  // Hide 2D canvas jika ada
  if (canvas2d) {
    canvas2d.style.display = 'none';
  }

  // Init 3D jika belum ada dan show
  if (!renderer) {
    init3D(container);
  }
  renderer.domElement.style.display = 'block';

  resize3D(container);
  add3DListeners(container);
  animate();
}

function animate() {
  if (!mode3D) return;
  requestAnimationFrame(animate);
  render3D();
}

window.addEventListener('resize', () => {
  if (mode3D) {
    resize3D(container);
  } else if (canvas2d && canvas2d.style.display !== 'none') {
    canvas2d.width = container.clientWidth;
    canvas2d.height = container.clientHeight;
    draw2D(ctx2d, canvas2d.width, canvas2d.height);
  }
});

document.getElementById('btn2d').addEventListener('click', () => {
  mode3D = false;
  document.getElementById('btn2d').classList.add('active');
  document.getElementById('btn3d').classList.remove('active');
  setup2D();
});

document.getElementById('btn3d').addEventListener('click', () => {
  mode3D = true;
  document.getElementById('btn3d').classList.add('active');
  document.getElementById('btn2d').classList.remove('active');
  setup3D();
});

setup3D();
