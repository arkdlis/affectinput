var sketch = function(p) {

  var subjectives = [
    'Excited',
    'Delighted',
    'Happy',
    'Content',
    'Relaxed',
    'Calm',
    'Tired',
    'Bored',
    'Depressed',
    'Frustrated',
    'Angry',
    'Tense'
  ];

  var smallScreen = false;

  var canvasWidth = 500;
  if (window.innerWidth < canvasWidth) {
    smallScreen = true;
    canvasWidth = window.innerWidth;
  }
  var canvasHeight = canvasWidth + (smallScreen ? 60 : 100);

  var cursorSize = 16;
  var helpRadius = smallScreen ? 40 : 70;

  var strokeBold = 25;
  var strokeLight = 2;
  var dark;
  var mediumGrey;
  var lightBlue;

  var enableHints = false;

  var padding = {
    x: 10,
    y: 10,
  }

  var position = {
    x: canvasWidth/2,
    y: canvasWidth/2
  };

  var pdragged = false;

  p.setup = function() {
    p.createCanvas(canvasWidth, canvasHeight);

    dark = p.color(29, 29, 29);
    mediumGrey = p.color(173, 173, 173);
    lightBlue = p.color(231, 238, 248);
  }

  function mouseInVASpace(mouseX, mouseY) {
    if (mouseX >= padding.x && mouseX <= canvasWidth - padding.x && 
        mouseY >= padding.y && mouseY <= canvasWidth - padding.y){
      return true;
    }
    return false;
  }

  function mouseInCircle(mouseX, mouseY, x, y, radius) {
    let dpx = Math.pow(mouseX - x, 2);
    let dpy = Math.pow(mouseY - y, 2);
    let rp = Math.pow(radius, 2);
    if (dpx + dpy < rp) {
      return true;
    }
    return false;
  }

  function drawLabels(text, x, y) {
    let backfaceLength = (smallScreen ? 20 : 35)
    p.textSize((smallScreen ? 12 : 16));
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(mediumGrey);
    p.stroke(lightBlue);
    p.strokeWeight(strokeBold);
    p.line(
      x - backfaceLength, y,
      x + backfaceLength, y,
    );
    p.noStroke();
    p.text(text, x, y);
  }

  function drawHints(text, x, y) {
    p.textSize((smallScreen ? 10 : 16));
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(dark);
    p.noStroke();
    p.text(text, x, y);
  }

  p.mouseClicked = function() {
    if (mouseInCircle(p.mouseX, p.mouseY, canvasWidth - helpRadius/2 - padding.x, canvasHeight - helpRadius/2 - padding.y, helpRadius/2)) {
      enableHints = !enableHints;
    }
  }

  p.draw = function() {
    p.clear();
    if (mouseInVASpace(p.mouseX, p.mouseY) || pdragged) {
      p.cursor(p.CROSS);
      if (p.mouseIsPressed) {
        position = {
          x: p.mouseX,
          y: p.mouseY
        };
        pdragged
      }
    } else {
      p.cursor(p.ARROW);
    }
    if (mouseInCircle(p.mouseX, p.mouseY, canvasWidth - helpRadius/2 - padding.x, canvasHeight - helpRadius/2 - padding.y, helpRadius/2)) {
      p.cursor(p.HAND);
    }
    // background circle
    p.noStroke();
    p.fill(lightBlue);
    p.ellipse(canvasWidth/2, canvasWidth/2, canvasWidth - padding.x*2 - 40, canvasWidth - padding.y*2 - 40);
    // axis
    p.stroke(mediumGrey);
    p.strokeWeight(strokeLight);
    p.line(
      canvasWidth/2, padding.y + 10,
      canvasWidth/2, canvasWidth - padding.y -10
    );
    p.line(
      padding.x + 10, canvasWidth/2,
      canvasWidth - padding.x - 10, canvasWidth/2
    );
    // upper arrow
    p.stroke(mediumGrey);
    p.fill(mediumGrey);
    p.triangle(
      canvasWidth/2, padding.y,
      canvasWidth/2 + 5, padding.y + 12,
      canvasWidth/2 - 5, padding.y + 12,
    )
    // lower arrow
    p.triangle(
      canvasWidth/2, canvasWidth - padding.y,
      canvasWidth/2 + 5, canvasWidth - padding.y - 12,
      canvasWidth/2 - 5, canvasWidth - padding.y - 12,
    )
    // left arrow
    p.triangle(
      padding.x, canvasWidth/2,
      padding.x + 12, canvasWidth/2 + 5,
      padding.x + 12, canvasWidth/2 - 5,
    )
    // right arrow
    p.triangle(
      canvasWidth - padding.x, canvasWidth/2,
      canvasWidth - padding.x - 12, canvasWidth/2 + 5,
      canvasWidth - padding.x - 12, canvasWidth/2 - 5,
    )
    // labels
    drawLabels('neutral', canvasWidth/2, canvasWidth/2);
    drawLabels('negative', canvasWidth/5, canvasWidth/2);
    drawLabels('positive', canvasWidth*4/5, canvasWidth/2);
    drawLabels('high', canvasWidth/2, canvasWidth/5);
    drawLabels('low', canvasWidth/2, canvasWidth*4/5);
    // selected position cursor
    p.stroke(dark);
    p.strokeWeight(strokeLight);
    p.line(
      position.x, position.y - cursorSize/2,
      position.x, position.y + cursorSize/2,
    );
    p.line(
      position.x - cursorSize/2, position.y,
      position.x + cursorSize/2, position.y,
    );
    // hints
    if (enableHints) {
      drawHints('AROUSAL', canvasWidth/2 + (smallScreen ? 35 : 50), padding.y + 8);
      drawHints('VALENCE', canvasWidth - (smallScreen ? 20 : 35) - padding.x, canvasWidth/2 - (smallScreen ? 12 : 20));
      let hintsCircleRadius = canvasWidth*3/8;
      let angleTilt = Math.PI/12;
      for(let i = 0; i < subjectives.length; i++) {
        let word = subjectives[i];
        let angle = Math.PI/6*i + angleTilt;
        let x = canvasWidth/2 + Math.cos(angle)*hintsCircleRadius;
        let y = canvasWidth/2 + Math.sin(angle)*hintsCircleRadius;
        drawHints(word, x, y);
      }
    }
    // draw help button
    p.noStroke();
    p.fill(lightBlue);
    p.ellipse(canvasWidth - helpRadius/2 - padding.x, canvasHeight - helpRadius/2 - padding.y, helpRadius, helpRadius);
    p.textSize(helpRadius - 20);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(enableHints ? dark : mediumGrey);
    p.noStroke();
    p.text('?', canvasWidth - helpRadius/2 - padding.x, canvasHeight - helpRadius/2 - padding.y);
  }
};

new p5(sketch, window.document.getElementById('valence-arousal'));