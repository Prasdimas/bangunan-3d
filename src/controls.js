import { updateRotation } from './scene3d.js';

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function add3DListeners(container) {
  container.addEventListener('mousedown', onMouseDown);
  container.addEventListener('mouseup', onMouseUp);
  container.addEventListener('mouseleave', onMouseLeave);
  container.addEventListener('mousemove', onMouseMove);
}

function remove3DListeners(container) {
  container.removeEventListener('mousedown', onMouseDown);
  container.removeEventListener('mouseup', onMouseUp);
  container.removeEventListener('mouseleave', onMouseLeave);
  container.removeEventListener('mousemove', onMouseMove);
}

function onMouseDown(e) {
  isDragging = true;
  previousMousePosition.x = e.clientX;
  previousMousePosition.y = e.clientY;
}
function onMouseUp() {
  isDragging = false;
}
function onMouseLeave() {
  isDragging = false;
}
function onMouseMove(e) {
  if (!isDragging) return;

  const deltaX = e.clientX - previousMousePosition.x;
  const deltaY = e.clientY - previousMousePosition.y;

  updateRotation(deltaX, deltaY);

  previousMousePosition.x = e.clientX;
  previousMousePosition.y = e.clientY;
}

export { add3DListeners, remove3DListeners };
