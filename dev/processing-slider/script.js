var canvasWidth = 400;
var canvasHeight = 50;

var strokeBold = 35;
var strokeLight = 5;
var darkGrey;
var lightGrey;

var padding = {
  x: 10,
  y: 10,
}

var barWidth = canvasWidth - 2*padding.x - strokeBold;
var handleWidth = 20;

var position = 0;
var pdragged = false;

function clampPosition(position) {
  if (position < 0) {
    return 0;
  }
  if (position > barWidth - handleWidth) {
    return barWidth - handleWidth;
  }
  return position;
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  darkGrey = color(200, 200, 200);
  lightGrey = color(225, 225, 225);
}

function mouseOnHandle(mouseX, mouseY, position) {
  if (mouseX >= position + padding.x && mouseX <= position + padding.x + handleWidth + strokeBold &&
    mouseY >= padding.y && mouseY <= padding.y + strokeBold) {
    return true;
  }
  return false;
}

function draw() {
  if (mouseOnHandle(mouseX, mouseY, position) || pdragged) {
    cursor(HAND);
    if (mouseIsPressed) {
      pdragged = true;
      position = clampPosition(mouseX - padding.x - strokeBold/2 - handleWidth/2);
    } else {
      pdragged = false;
    }
  } else {
    cursor(ARROW);
    pdragged = false;
  }
  //bar
  stroke(lightGrey);
  strokeWeight(strokeBold);
  line(
    strokeBold/2 + padding.x, strokeBold/2 + padding.y, 
    canvasWidth - padding.x - strokeBold/2, strokeBold/2 + padding.y
  );
  // handle
  stroke(darkGrey);
  strokeWeight(strokeBold);
  line(
    strokeBold/2 + padding.x + position, strokeBold/2 + padding.y, 
    strokeBold/2 + padding.x + position + handleWidth, strokeBold/2 + padding.y
  );
  stroke(lightGrey);
  strokeWeight(strokeLight);
  line(
    strokeBold/2 + padding.x + position + handleWidth/2, strokeLight/2 + padding.y + strokeBold/5, 
    strokeBold/2 + padding.x + position + handleWidth/2, padding.y + strokeBold - strokeLight/2 - strokeBold/5
  );
  line(
    strokeBold/2 + padding.x + position, strokeLight/2 + padding.y + strokeBold/5, 
    strokeBold/2 + padding.x + position, padding.y + strokeBold - strokeLight/2 - strokeBold/5
  );
  line(
    strokeBold/2 + padding.x + position + handleWidth, strokeLight/2 + padding.y + strokeBold/5, 
    strokeBold/2 + padding.x + position + handleWidth, padding.y + strokeBold - strokeLight/2 - strokeBold/5
  );
}