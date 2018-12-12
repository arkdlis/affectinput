class PlutchikWheel {
  constructor(inputValue) {
    this.inputValue = inputValue;
  }
  setValue(value) {
    this.inputValue = value;
  }
  getValue() {
    return this.inputValue;
  }
  onClick(onclickFun) {
    this.onClickHandler = onclickFun;
  }
  sketch(p) {
    var getSliderValue = () => this.getValue();
    var onClickHandler = this.onClickHandler;
    var data = [
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

    var inCircle = false;
    var hoverIndex = -1;
    var selectIndex = 0;

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
      if (inCircle && onClickHandler) {
        selectIndex = hoverIndex;
        onClickHandler(data[selectIndex].values[getSliderValue()-1]);
      }
    }

    function drawLabels(text, x, y, textSize) {
      p.textSize(textSize);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(p.color('#000'));
      p.noStroke();
      p.text(text, x, y);
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
        color = p.color(hue, saturation, lightness + (100-lightness)*(1-(value)/3));
        p.fill(color);
        if (inCircle && mouseInAngle(p.mouseX, p.mouseY, canvasWidth/2, canvasHeight/2, lastAngle, lastAngle + angle)) {
          hoverIndex = i;
          isHovered = true;
          p.stroke(1);
        } else {
          p.noStroke();
        }
        radius = diameter*(0.7 + 0.3*(value)/3) + (isHovered ? 10 : 0);
        p.arc(canvasWidth/2, canvasHeight/2, radius, radius, lastAngle, lastAngle + angle);
        lastAngle += angle;
      }
      tilt = p.radians(-90);
      for(let i = 0; i < data.length; i++) {
        let word = data[i].values[value-1];
        let placementAngle = tilt + angle*i;
        radius = diameter*(0.7 + 0.3*(value)/3);
        let x = canvasWidth/2 + Math.cos(placementAngle)*radius/3;
        let y = canvasWidth/2 + Math.sin(placementAngle)*radius/3;
        let textSize = i===hoverIndex ? (smallScreen ? 12 : 18) : (smallScreen ? 10 : 16);
        drawLabels(word, x, y, textSize);
      }
    }

    p.draw = function() {
      p.clear();
      let radius = diameter*(0.7 + 0.3*(getSliderValue())/3)/2;
      inCircle = mouseInCircle(p.mouseX, p.mouseY, canvasWidth/2, canvasHeight/2, radius);

      // pie chart
      pieChart(diameter, data, getSliderValue());
      if (inCircle) {
        p.cursor(p.HAND);
      } else {
        hoverIndex = -1;
        p.cursor(p.ARROW);
      }
    }
  };
  init(htmlElement) {
    new p5((p)=>this.sketch(p), htmlElement);
  }
}
