var genevaWheelDefaultConfig = [
  {
    name: "pride",
    color: '#fb6abb',
  },
  {
    name: "elation",
    color: '#f79901',
  },
  {
    name: "joy",
    color: '#e3ff15',
  },
  {
    name: "satisfaction",
    color: '#94fe00',
  },
  {
    name: "relief",
    color: '#85ff00',
  },
  {
    name: "hope",
    color: '#309800',
  },
  {
    name: "interest",
    color: '#1e6600',
  },
  {
    name: "surprise",
    color: '#209b36',
  },
  {
    name: "sadness",
    color: '#4189ff',
  },
  {
    name: "fear",
    color: '#2041ff',
  },
  {
    name: "shame",
    color: '#010ddf',
  },
  {
    name: "guilt",
    color: '#00016e',
  },
  {
    name: "envy",
    color: '#5b7ff8',
  },
  {
    name: "disgust",
    color: '#c060ff',
  },
  {
    name: "contempt",
    color: '#ec1000',
  },
  {
    name: "anger",
    color: '#f30d01',
  },
];

class GenevaWheel {
  constructor(inputValue, config) {
    this.inputValue = inputValue;
    this.config = config || genevaWheelDefaultConfig;
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

    var radius = (canvasWidth - padding.x*2)/2;

    var isHovered = false;
    var lastHoveredValue = {
      label: "",
      value: 0,
    };

    var buttons = [];

    p.setup = function() {
      p.createCanvas(canvasWidth, canvasHeight);

      let angle = p.radians(360/data.length);
      let tilt = -p.PI/2 + angle/2;
      for(let i = 0; i < data.length; i++) {
        let placementAngle = tilt + angle*i;
        let r = canvasWidth*18/500;
        let p = r;
        for (let value = 1; value <= 4; value++) {
          let x = canvasWidth/2 + Math.cos(placementAngle)*(3*r);
          let y = canvasWidth/2 + Math.sin(placementAngle)*(3*r);
          buttons.push(new CircleButton(i, data[i].name, value, x, y, p, data[i].color));
          r = r*1.42;
          p = p*1.4;
        }
      }
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

    function drawLabels(text, x, y, textSize, textAlign = p.CENTER) {
      p.textSize(textSize);
      p.textAlign(textAlign, p.CENTER);
      p.fill(p.color('#000'));
      p.noStroke();
      p.text(text, x, y);
    }

    class CircleButton {
      constructor(id, label, value, x, y, radius, color) {
        this.id = id;
        this.label = label;
        this.value = value;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.hovered = false;
      }
      update(p) {
        this.hovered = mouseInCircle(p.mouseX, p.mouseY, this.x, this.y, this.radius/2);
        if (this.hovered) {
          isHovered = true;
          lastHoveredValue = {
            label: this.label,
            value: this.value,
          };
        }
        return this.hovered;
      }
      draw(p) {
        if (this.hovered) {
          p.cursor(p.HAND);
        }
        if (this.hovered) {
          p.stroke(1);
        } else {
          p.noStroke();
        }
        p.fill(this.color);
        p.ellipseMode(p.CENTER);
        p.ellipse(this.x, this.y, this.radius);
      }
    }

    p.mouseClicked = function() {
      if (isHovered && onClickHandler) {
        onClickHandler(lastHoveredValue);
      }
    }

    p.draw = function() {
      // reset previous state
      p.clear();
      p.cursor(p.ARROW);
      isHovered = false;

      // update and draw clickable circles
      buttons.forEach(button => {
        button.update(p);
        button.draw(p);
      });

      // buttons in middle of circle
      if (mouseInCircle(p.mouseX, p.mouseY, canvasWidth/2, canvasWidth/2, 32)) {
        p.cursor(p.HAND);
        isHovered = true;
        lastHoveredValue = {
          label: p.mouseY > canvasWidth/2 ? 'other' : 'neutral',
          value: 0
        }
      }

      if (isHovered && lastHoveredValue.label === 'other') {
        p.stroke(1);
      } else {
        p.noStroke();
      }
      p.fill(p.color('#ddd'));
      p.arc(canvasWidth/2, canvasWidth/2+2, 60, 60, 0, p.PI);
      drawLabels('other', canvasWidth/2, canvasWidth/2+16, 14);

      if (isHovered && lastHoveredValue.label === 'neutral') {
        p.stroke(1);
      } else {
        p.noStroke();
      }
      p.fill(p.color('#ddd'));
      p.arc(canvasWidth/2, canvasWidth/2-2, 60, 60, p.PI, 2*p.PI);
      drawLabels('neutral', canvasWidth/2, canvasWidth/2-12, 14);



      //draw labels
      let angle = p.radians(360/data.length);
      let tilt = -p.PI/2 + angle/2;
      for(let i = 0; i < data.length; i++) {
        let placementAngle = tilt + angle*i;
        let x = canvasWidth/2 + Math.cos(placementAngle)*radius*0.85;
        let y = canvasWidth/2 + Math.sin(placementAngle)*radius*0.85;
        drawLabels(data[i].name, x, y, 14);
      }
    }
  };
  init(htmlElement) {
    new p5((p)=>this.sketch(p), htmlElement);
  }
}
