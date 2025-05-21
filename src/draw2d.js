function draw2D(ctx2d, width, height) {
  ctx2d.clearRect(0, 0, width, height);

  const centerY = height / 2;

  // Kotak (square)
  ctx2d.fillStyle = '#156289';
  const boxSize = 100;
  const boxX = width / 6 - boxSize / 2;
  const boxY = centerY - boxSize / 2;
  ctx2d.fillRect(boxX, boxY, boxSize, boxSize);

  ctx2d.strokeStyle = '#000';
  ctx2d.lineWidth = 2;
  ctx2d.strokeRect(boxX, boxY, boxSize, boxSize);
  ctx2d.fillStyle = 'black';
  ctx2d.font = '18px Arial';
  ctx2d.fillText('Kotak', boxX + boxSize / 4, boxY + boxSize + 70);

  // Tabung (cylinder) - two ellipses + rectangle connecting them (side view)
  ctx2d.fillStyle = '#156289';
  const cylX = width / 2;
  const cylHeight = 120;
  const cylRadiusX = 50;
  const cylRadiusY = 20;
  // top ellipse
  ctx2d.beginPath();
  ctx2d.ellipse(cylX, centerY - cylHeight / 2, cylRadiusX, cylRadiusY, 0, 0, Math.PI * 2);
  ctx2d.fill();
  ctx2d.stroke();

  // bottom ellipse (only bottom half)
  ctx2d.beginPath();
  ctx2d.ellipse(cylX, centerY + cylHeight / 2, cylRadiusX, cylRadiusY, 0, 0, Math.PI);
  ctx2d.fill();
  ctx2d.stroke();

  // body rectangle
  ctx2d.beginPath();
  ctx2d.moveTo(cylX - cylRadiusX, centerY - cylHeight / 2);
  ctx2d.lineTo(cylX - cylRadiusX, centerY + cylHeight / 2);
  ctx2d.lineTo(cylX + cylRadiusX, centerY + cylHeight / 2);
  ctx2d.lineTo(cylX + cylRadiusX, centerY - cylHeight / 2);
  ctx2d.closePath();
  ctx2d.fill();
  ctx2d.stroke();

  ctx2d.fillStyle = 'black';
  ctx2d.fillText('Tabung', cylX - 25, centerY + cylHeight / 2 + 50);

  // Kerucut (cone)
  ctx2d.fillStyle = '#156289';
  const coneX = (width / 6) * 5;
  const coneHeight = 120;
  const coneBaseRadius = 50;

  // base ellipse (bottom)
  ctx2d.beginPath();
  ctx2d.ellipse(coneX, centerY + coneHeight / 2, coneBaseRadius, 20, 0, 0, Math.PI * 2);
  ctx2d.fill();
  ctx2d.stroke();

  // cone shape (triangle)
  ctx2d.beginPath();
  ctx2d.moveTo(coneX - coneBaseRadius, centerY + coneHeight / 2);
  ctx2d.lineTo(coneX + coneBaseRadius, centerY + coneHeight / 2);
  ctx2d.lineTo(coneX, centerY - coneHeight / 2);
  ctx2d.closePath();
  ctx2d.fill();
  ctx2d.stroke();

  ctx2d.fillStyle = 'black';
  ctx2d.fillText('Kerucut', coneX - 30, centerY + coneHeight / 2 + 50);
}

export { draw2D };
