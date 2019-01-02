var plutchikWheel2DefaultConfig = [
  {
    name: "ecstasy",
    color: '#FCE954',
    values: ["serenity", "joy", "ecstasy"]
  },
  {
    name: "admiration",
    color: '#35A937',
    values: ["acceptance", "trust", "admiration"]
  },
  {
    name: "terror",
    color: '#0B8136',
    values: ["apprehension", "fear", "terror"]
  },
  {
    name: "amazement",
    color: '#2C83C5',
    values: ["distraction", "suprise", "amazement"]
  },
  {
    name: "grief",
    color: '#1A408F',
    values: ["pensiveness", "sadness", "grief"]
  },
  {
    name: "loathing",
    color: '#9C4795',
    values: ["boredom", "disgust", "loathing"]
  },
  {
    name: "rage",
    color: '#D41319',
    values: ["annoyance", "anger", "rage"]
  },
  {
    name: "vigilance",
    color: '#EF7C16',
    values: ["interest", "anticipation", "vigilance"]
  },
];

class PlutchikWheel2 {
  constructor(config) {
    this.config = config || plutchikWheel2DefaultConfig;
  }
  onClick(onclickFun) {
    this.onClickHandler = onclickFun;
  }
  sketch(p) {
    var onClickHandler = this.onClickHandler;
    var data = this.config;

    var smallScreen = false;

    var canvasWidth = 500;
    if (window.innerWidth < canvasWidth) {
      smallScreen = true;
      canvasWidth = window.innerWidth;
    }
    var canvasHeight = canvasWidth;

    var padding = {
      x: 10,
      y: 10,
    }

    var diameter = canvasWidth - padding.x*2;

    var hoverIndex = -1;
    var valueIndex = 1;

    p.setup = function() {
      p.createCanvas(canvasWidth, canvasHeight);
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

    function mouseInAngle(mouseX, mouseY, x, y, angle1, angle2) {
      let angle = p.atan2(mouseY - y, mouseX - x);
      if (angle < 0 && (angle1 > p.PI || angle2 > p.PI)) {
        angle += 2*p.PI;
      }
      if ( angle > angle1 && angle <= angle2 ) {
        return true;
      }
      return false;
    }

    p.mouseClicked = function() {
      if (hoverIndex >= 0 && onClickHandler) {
        onClickHandler(data[hoverIndex].values[valueIndex-1]);
      }
    }

    function drawLabels(text, x, y, rotation, textSize, horizAlign = p.CENTER, vertAlign = p.CENTER ) {
      p.textSize(textSize);
      p.textAlign(horizAlign, vertAlign);
      p.translate(x, y);
      p.rotate(rotation);
      p.fill(p.color('#000'));
      p.noStroke();
      p.text(text, 0, 0);
      p.resetMatrix();
    }

    // value parameter should be 1, 2 or 3
    function pieChart(diameter, data, value) {
      let tilt = p.radians(-112.5);
      let angle = p.radians(360/data.length);
      let lastAngle = tilt;
      p.colorMode(p.HSL);
      let radius = diameter;
      for (let i = 0; i < data.length; i++) {
        let color = p.color(data[i].color)
        let hue = p.hue(color);
        let saturation = p.saturation(color);
        let lightness = p.lightness(color);
        let isHovered = false;
        let angleTiltedStart = lastAngle + 0.05*(3-value);
        let angleTiltedEnd =  lastAngle + angle - 0.05*(3-value);
        color = p.color(hue, saturation, lightness + (100-lightness)*(1-(value)/3));
        p.fill(color);
        if (valueIndex === value && mouseInAngle(p.mouseX, p.mouseY, canvasWidth/2, canvasHeight/2, angleTiltedStart, angleTiltedEnd)) {
          hoverIndex = i;
          isHovered = true;
          p.stroke(1);
        } else {
          p.noStroke();
        }
        radius = getLayerDiameter(value) + (isHovered ? 10 : 0);
        p.arc(canvasWidth/2, canvasHeight/2, radius, radius, angleTiltedStart, angleTiltedEnd);
        lastAngle += angle;
      }
      tilt = p.radians(-90);
      for(let i = 0; i < data.length; i++) {
        let word = data[i].values[value-1];
        let placementAngle = tilt + angle*i;
        placementAngle = placementAngle < 0 ? placementAngle + 2*p.PI : placementAngle;
        placementAngle = placementAngle > 2*p.PI ? placementAngle - 2*p.PI : placementAngle;
        radius = getLayerDiameter(value)/2 - 20;
        let x = canvasWidth/2 + Math.cos(placementAngle)*radius;
        let y = canvasWidth/2 + Math.sin(placementAngle)*radius;
        let textSize = i===hoverIndex && valueIndex === value ? (smallScreen ? 12 : 16) : (smallScreen ? 10 : 14);
        let textRotation = placementAngle + p.PI/2;
        textRotation = placementAngle < p.PI ? textRotation - p.PI : textRotation;
        drawLabels(word, x, y, textRotation, textSize);
      }
    }

    function getLayerDiameter(layer) {
      return diameter*(1.25 - layer/4);
    }

    p.draw = function() {
      p.clear();
      hoverIndex = -1;
      valueIndex = 0;

      for (let i = 1; i <= 3; i++) {
        let radius = getLayerDiameter(i)/2;
        let inCircle = mouseInCircle(p.mouseX, p.mouseY, canvasWidth/2, canvasHeight/2, radius);
        if (inCircle) {
          valueIndex = i;
        }
      }
      for (let i = 1; i <= 3; i++) {
        pieChart(diameter, data, i);
      }
      
      if (hoverIndex !== -1) {
        p.cursor(p.HAND);
      } else {
        p.cursor(p.ARROW);
      }
    }
  };
  init(htmlElement) {
    new p5((p)=>this.sketch(p), htmlElement);
  }
}
