let textArea, button, matrix, tiles, tilesW, matrixFlat;

function setup() {
  createCanvas(400, 400);

  textArea = createElement("textarea");
  textArea.attribute("rows", "10");
  textArea.attribute("cols", "50");

  button = createButton("submit");
  button.mousePressed(parse);
}

function draw() {}

function parse() {
  const content = textArea.value();
  // Split on linefeeds to get rows
  const row_list = content.split("\n");
  // Split rows into cells
  matrix = row_list.map((r) => r.trim().split(/ +/));
  matrixFlat = matrix.flat();
  paintBoard();
  drawPath();
  drawDots();
}

function paintBoard() {
  noStroke();
  tiles = matrix.length;
  tileW = width / tiles;
  for (let i = 0; i < tiles; i++) {
    for (let j = 0; j < tiles; j++) {
      fill((i + j) % 2 == 0 ? 0 : 255);
      square(tileW * i, tileW * j, tileW);
    }
  }
}

function getElemsPos(i) {
  let pos = matrixFlat.findIndex((e) => e == i);
  return [pos % tiles, Math.floor(pos / tiles)];
}

function drawLine(ax, ay, bx, by) {
  stroke("red");
  strokeWeight(4);
  let positions = [ax, ay, bx, by];
  positions = positions.map((p) => p * tileW + tileW / 2);
  line(...positions);
}
function drawPath() {
  totalTiles = tiles * tiles;
  for (let i = 1; i < totalTiles; i++) {
    let [pX, pY] = getElemsPos(i);
    //console.log(pX, pY);
    let [pX2, pY2] = getElemsPos(i + 1);
    drawLine(pX, pY, pX2, pY2);
  }
}

function drawDot(ax, ay, c) {
  stroke(c);
  let positions = [ax, ay];
  positions = positions.map((p) => p * tileW + tileW / 2);
  point(...positions);
}
function drawDots() {
  totalTiles = tiles * tiles;
  strokeWeight(5);
  for (let i = 1; i < totalTiles; i++) {
    let [pX, pY] = getElemsPos(i);
    drawDot(pX, pY, (pX + pY) % 2 == 0 ? 255 : 0);
  }

  strokeWeight(14);
  let [pX, pY] = getElemsPos(1);
  drawDot(pX, pY, "green");

  [pX, pY] = getElemsPos(totalTiles);
  drawDot(pX, pY, "red");
}
