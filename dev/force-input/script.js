var sketch = function(p) {

  var canvasWidth = 400;

  if (window.innerWidth < 400) {
    canvasWidth = window.innerWidth;
  }

  var canvasHeight = 60;

  var strokeBold = 35;
  var strokeRoot = 20;
  var strokeSpring = 5;
  var strokeLight = 5;
  var darkGrey;
  var mediumGrey;
  var lightGrey;

  var springPadding = 40;
  var enableSpring = true;

  var padding = {
    x: 10,
    y: 10,
  }

  var barWidth = canvasWidth - 2*padding.x - strokeBold;
  var handleWidth = 20;

  var position = springPadding;
  var lastPosition = position;
  var velocity = 0;
  var acceleration = 0;

  var springFactor = 0.15;
  var frictionFactor = 0.22;

  var pdragged = false;

  p.setup = function() {
    p.createCanvas(canvasWidth, canvasHeight);

    darkGrey = p.color(190, 190, 190);
    mediumGrey = p.color(220, 220, 220);
    lightGrey = p.color(235, 235, 235);
  }

  function clampPosition(position) {
    if (position < springPadding) {
      return springPadding;
    }
    if (position > barWidth - handleWidth) {
      return barWidth - handleWidth;
    }
    return position;
  }

  function mouseOnHandle(mouseX, mouseY, position) {
    if (mouseX >= position + padding.x && mouseX <= position + padding.x + handleWidth + strokeBold &&
      mouseY >= padding.y && mouseY <= padding.y + strokeBold) {
      return true;
    }
    return false;
  }

  function drawSpring(position, steps) {
    rootX = padding.x + strokeRoot/2;
    rootY = padding.y;
    let stepWidth = position/steps;
    // root
    p.stroke(mediumGrey);
    p.strokeWeight(strokeRoot);
    p.line(
      rootX, rootY + strokeRoot/2, 
      rootX, rootY + strokeBold - strokeRoot/2
    );
    // spring
    p.stroke(mediumGrey);
    p.strokeWeight(strokeSpring);
    for (let i = 0; i < steps; i++) {
      let x = rootX + stepWidth*i;
      let y = i%2 ? rootY + strokeSpring/2 : rootY + strokeBold - strokeSpring/2;
      let nx = rootX + stepWidth*(i+1);
      let ny = (i+1)%2 ? rootY + strokeSpring/2 : rootY + strokeBold - strokeSpring/2;
      p.line(
        x, y, 
        nx, ny
      );
    }
  }

  p.draw = function() {
    p.clear();
    if (mouseOnHandle(p.mouseX, p.mouseY, position) || pdragged) {
      p.cursor(p.HAND);
      if (p.mouseIsPressed) {
        pdragged = true;
        position = clampPosition(p.mouseX - padding.x - strokeBold/2 - handleWidth/2);
      } else {
        lastPosition = pdragged ? position : lastPosition;
        pdragged = false;
      }
    } else {
      p.cursor(p.ARROW);
      pdragged = false;
    }
    if (!p.mouseIsPressed) {
      acceleration = -springFactor*(position - springPadding);
      velocity += acceleration - frictionFactor*velocity;
      if (position < 0) {
        position = 0;
        velocity = -velocity;
      }
      if (velocity < 0.5 && Math.abs(position) < 1) {
        acceleration = 0;
        velocity = 0;
      }
      position += velocity;
    } else {
      acceleration = 0;
      velocity = 0;
    }
    // last position
    p.fill(lightGrey);
    p.strokeWeight(0);
    p.triangle(
      strokeBold/2 + padding.x + springPadding + handleWidth/2, padding.y + strokeBold,
      strokeBold/2 + padding.x + springPadding + handleWidth/2 + 4, padding.y + strokeBold + 9,
      strokeBold/2 + padding.x + springPadding + handleWidth/2 - 4, padding.y + strokeBold + 9
    );
    p.fill(darkGrey);
    p.strokeWeight(0);
    p.triangle(
      strokeBold/2 + padding.x + lastPosition + handleWidth/2, padding.y + strokeBold,
      strokeBold/2 + padding.x + lastPosition + handleWidth/2 + 4, padding.y + strokeBold + 9,
      strokeBold/2 + padding.x + lastPosition + handleWidth/2 - 4, padding.y + strokeBold + 9
    );
    //bar
    p.stroke(lightGrey);
    p.strokeWeight(strokeBold);
    p.line(
      strokeBold/2 + padding.x, strokeBold/2 + padding.y, 
      canvasWidth - padding.x - strokeBold/2, strokeBold/2 + padding.y
    );
    // spring
    if (enableSpring) {
      drawSpring(position, 8)
    }
    // handle
    p.stroke(darkGrey);
    p.strokeWeight(strokeBold);
    p.line(
      strokeBold/2 + padding.x + position, strokeBold/2 + padding.y, 
      strokeBold/2 + padding.x + position + handleWidth, strokeBold/2 + padding.y
    );
    p.stroke(lightGrey);
    p.strokeWeight(strokeLight);
    p.line(
      strokeBold/2 + padding.x + position + handleWidth/2, strokeLight/2 + padding.y + strokeBold/5, 
      strokeBold/2 + padding.x + position + handleWidth/2, padding.y + strokeBold - strokeLight/2 - strokeBold/5
    );
    p.line(
      strokeBold/2 + padding.x + position, strokeLight/2 + padding.y + strokeBold/5, 
      strokeBold/2 + padding.x + position, padding.y + strokeBold - strokeLight/2 - strokeBold/5
    );
    p.line(
      strokeBold/2 + padding.x + position + handleWidth, strokeLight/2 + padding.y + strokeBold/5, 
      strokeBold/2 + padding.x + position + handleWidth, padding.y + strokeBold - strokeLight/2 - strokeBold/5
    );
  }
};

new p5(sketch, window.document.getElementById('force-input'));