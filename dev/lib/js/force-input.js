class ForceInput {
  sketch(p) {
    var onChangeHandle = this.onChangeHandle;

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
      let rootX = padding.x + strokeRoot/2;
      let rootY = padding.y;
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

    function calculateValue() {
      let x = lastPosition - springPadding;
      let fullscale = canvasWidth - strokeBold - padding.x*2 - springPadding - springPadding/2;
      return x/fullscale;
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
      if (!pdragged) {
        acceleration = -springFactor*(position - springPadding);
        velocity += acceleration - frictionFactor*velocity;
        if (position < 0) {
          position = 1;
          velocity = -velocity;
        }
        if (Math.abs(velocity) < 0.05 && Math.abs(position - springPadding) < 1) {
          // call onchange callback
          if (onChangeHandle && velocity !== 0) {
            onChangeHandle(calculateValue());
          }
          position = springPadding
          velocity = 0;
          acceleration = 0;
        }
        position += velocity;
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
  }
  init(htmlElement) {
    new p5((p)=>this.sketch(p), htmlElement);
  }
  onChange(callback) {
    this.onChangeHandle = callback;
  }
}
