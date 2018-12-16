var emotionWheelDefaultConfig = [
  {
    name: "anger",
    color: '#F4A4A5',
    children: [
      {
        name: "hurt",
        children: [
          { name: "devastated", children: [] },
          { name: "embarassed", children: [] },
        ]
      },
      {
        name: "threatened",
        children: [
          { name: "jealous", children: [] },
          { name: "insecure", children: [] },
        ]
      },
      {
        name: "hateful",
        children: [
          { name: "violated", children: [] },
          { name: "resentful", children: [] },
        ]
      },
      {
        name: "mad",
        children: [
          { name: "enraged", children: [] },
          { name: "furious", children: [] },
        ]
      },
      {
        name: "aggressive",
        children: [
          { name: "provoked", children: [] },
          { name: "hostile", children: [] },
        ]
      },
      {
        name: "frustrated",
        children: [
          { name: "infuriated", children: [] },
          { name: "irritated", children: [] },
        ]
      },
      {
        name: "distant",
        children: [
          { name: "withdrawn", children: [] },
          { name: "suspicious", children: [] },
        ]
      },
      {
        name: "critical",
        children: [
          { name: "sceptical", children: [] },
          { name: "sarcastic", children: [] },
        ]
      },
    ]
  },
  {
    name: "disgust",
    color: '#ABD4A6',
    children: [
      {
        name: "disapproval",
        children: [
          { name: "judgmental", children: [] },
          { name: "loathing", children: [] },
        ]
      },
      {
        name: "disappointed",
        children: [
          { name: "repugnant", children: [] },
          { name: "revolted", children: [] },
        ]
      },
      {
        name: "awful",
        children: [
          { name: "revulsion", children: [] },
          { name: "detestable", children: [] },
        ]
      },
      {
        name: "avoidance",
        children: [
          { name: "aversion", children: [] },
          { name: "hesitant", children: [] },
        ]
      },
    ]
  },
  {
    name: "sad",
    color: '#A6BBE2',
    children: [
      {
        name: "guilty",
        children: [
          { name: "remorseful", children: [] },
          { name: "ashamed", children: [] },
        ]
      },
      {
        name: "abandoned",
        children: [
          { name: "ignored", children: [] },
          { name: "victimized", children: [] },
        ]
      },
      {
        name: "despair",
        children: [
          { name: "powerless", children: [] },
          { name: "vulnerable", children: [] },
        ]
      },
      {
        name: "depressed",
        children: [
          { name: "inferior", children: [] },
          { name: "empty", children: [] },
        ]
      },
      {
        name: "lonely",
        children: [
          { name: "abandoned", children: [] },
          { name: "isolated", children: [] },
        ]
      },
      {
        name: "bored",
        children: [
          { name: "apathetic", children: [] },
          { name: "indifferent", children: [] },
        ]
      },
    ]
  },
  {
    name: "happy",
    color: '#F9CFA6',
    children: [
      {
        name: "optimistic",
        children: [
          { name: "inspired", children: [] },
          { name: "open", children: [] },
        ]
      },
      {
        name: "intimate",
        children: [
          { name: "playful", children: [] },
          { name: "sensitive", children: [] },
        ]
      },
      {
        name: "peaceful",
        children: [
          { name: "hopeful", children: [] },
          { name: "loving", children: [] },
        ]
      },
      {
        name: "powerful",
        children: [
          { name: "provocative", children: [] },
          { name: "courageous", children: [] },
        ]
      },
      {
        name: "accepted",
        children: [
          { name: "fulfilled", children: [] },
          { name: "respected", children: [] },
        ]
      },
      {
        name: "proud",
        children: [
          { name: "important", children: [] },
          { name: "confident", children: [] },
        ]
      },
      {
        name: "interested",
        children: [
          { name: "inquisitive", children: [] },
          { name: "amused", children: [] },
        ]
      },
      {
        name: "joyful",
        children: [
          { name: "estatic", children: [] },
          { name: "liberated", children: [] },
        ]
      },
    ]
  },
  {
    name: "suprise",
    color: '#F4F2B9',
    children: [
      {
        name: "excited",
        children: [
          { name: "energetic", children: [] },
          { name: "eager", children: [] },
        ]
      },
      {
        name: "amazed",
        children: [
          { name: "awe", children: [] },
          { name: "astonished", children: [] },
        ]
      },
      {
        name: "confused",
        children: [
          { name: "perplexed", children: [] },
          { name: "disillusioned", children: [] },
        ]
      },
      {
        name: "startled",
        children: [
          { name: "dismayed", children: [] },
          { name: "shocked", children: [] },
        ]
      },
    ]
  },
  {
    name: "fear",
    color: '#EAEAED',
    children: [
      {
        name: "scared",
        children: [
          { name: "frightened", children: [] },
          { name: "terrified", children: [] },
        ]
      },
      {
        name: "anxious",
        children: [
          { name: "overwhelmed", children: [] },
          { name: "worried", children: [] },
        ]
      },
      {
        name: "insecure",
        children: [
          { name: "inadequate", children: [] },
          { name: "inferior", children: [] },
        ]
      },
      {
        name: "submissive",
        children: [
          { name: "worthless", children: [] },
          { name: "insignificant", children: [] },
        ]
      },
      {
        name: "rejected",
        children: [
          { name: "inadequate", children: [] },
          { name: "alienated", children: [] },
        ]
      },
      {
        name: "humiliated",
        children: [
          { name: "ridiculed", children: [] },
          { name: "disrespected", children: [] },
        ]
      },
    ]
  },
];

class EmotionWheel {
  constructor(config) {
    this.config = config || emotionWheelDefaultConfig;
  }
  onClick(onclickFun) {
    this.onClickHandler = onclickFun;
  }
  sketch(p) {
    var data = this.config;
    var onClickHandler = this.onClickHandler;    
    var smallScreen = false;
    var canvasWidth = 300;
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
    
    var step = 0;
    var hoverIndex = -1;
    var selectIndex = [0, 0, 0];

    var rootPies = [];
    var pies = [];

    p.setup = function() {
      p.createCanvas(canvasWidth, canvasHeight);

      let tilt = p.radians(-90 - 360/(2*data.length));
      let angle = p.radians(360/data.length);
      let lastAngle = tilt;
      let radius = diameter;

      rootPies = data.map((value, index) => {
        return new Pie(index, value.name, lastAngle + angle*index, lastAngle + angle*(index+1), 
                       canvasWidth/2, canvasWidth/2, radius, value.color, value.children);
      });
      pies = rootPies;
      p.ellipseMode(p.CENTER);
    }

    function mouseInCircle(mouseX, mouseY, x, y, radius) {
      let dpx = Math.pow(mouseX - x, 2);
      let dpy = Math.pow(mouseY - y, 2);
      let rp = Math.pow(radius/2, 2);
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
    
    class Pie {
      constructor(id, label, startAngle, endAngle, x, y, radius, color, children) {
        this.id = id;
        this.label = label;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.children = children;
        this.scale = 1;
        this.hovered = false;
        this.parent = null;
        this.childrenPies = [];
      }
      setScale(scale) {
        this.scale = scale;
      }
      setPosition(x, y) {
        this.x = x;
        this.y = y;
      }
      update(p) {
        this.hovered = mouseInCircle(p.mouseX, p.mouseY, this.x, this.y, this.radius) && 
                       mouseInAngle(p.mouseX, p.mouseY, this.x, this.y, this.startAngle, this.endAngle);
        return this.hovered;
      }
      draw(p) {
        // if (step>0) {
        //   this.scale = 2;
        // } else {
        //   this.scale = 1;
        // }
        if (this.hovered) {
          p.cursor(p.HAND);
        }
        p.fill(this.color);
        if (this.hovered) {
          p.stroke(1);
        } else {
          p.noStroke();
        }
        let radius = this.radius*this.scale + (this.hovered ? 10 : 0);
        let textPlacementAngle = (this.startAngle + this.endAngle)/2;
        let x = this.x - Math.cos(textPlacementAngle)*this.radius*(this.scale-1)/2;
        let y = this.y - Math.sin(textPlacementAngle)*this.radius*(this.scale-1)/2;
        p.arc(x, y, radius, radius, this.startAngle, this.endAngle);
    
        if (step>0) {
          x = this.x + Math.cos(textPlacementAngle)*this.radius*2/5;
          y = this.y + Math.sin(textPlacementAngle)*this.radius*2/5;
        } else {
          x = this.x + Math.cos(textPlacementAngle)*this.radius/3;
          y = this.y + Math.sin(textPlacementAngle)*this.radius/3;
        }
        let textSize = this.hovered ? (smallScreen ? 12 : 18) : (smallScreen ? 10 : 16);
        let textRotation = textPlacementAngle > p.PI/2 ? textPlacementAngle-p.PI : textPlacementAngle;
        textRotation = textRotation > p.PI*3/4 ? textRotation-p.PI : textRotation;
        drawLabels(this.label, x, y, textRotation, textSize);
      }
      getChildrenPies() {
        if (!this.childrenPies.length) {
          let shiftAngle = (this.endAngle + this.startAngle)/2;
          let shiftX = this.x - (step>0 ? 0 : Math.cos(shiftAngle)*this.radius/2);
          let shiftY = this.y - (step>0 ? 0 : Math.sin(shiftAngle)*this.radius/2);

          let expandAngle = p.PI/16;

          let lastAngle = this.startAngle - expandAngle;
          let angle = (this.endAngle - this.startAngle + expandAngle*2)/this.children.length;
          let radius = step>0 ? this.radius : this.radius*1.5;

          this.childrenPies = this.children.map((value, index) => {
            return new Pie(index, value.name, lastAngle + angle*index, lastAngle + angle*(index+1), 
                          shiftX, shiftY, radius, this.color, value.children);
          });
        }
        return this.childrenPies;
      }
    }

    p.mouseClicked = function() {
      if (hoverIndex >= 0) {
        if (step===0) {
          selectIndex[step] = hoverIndex;
          pies = pies[hoverIndex].getChildrenPies();
          step++;
        } else if (step === 1) {
          selectIndex[step] = hoverIndex;
          pies = pies[hoverIndex].getChildrenPies();
          step++;
        } else if (step === 2){
          selectIndex[step] = hoverIndex;
          if (onClickHandler) {
            onClickHandler(data[selectIndex[0]].children[selectIndex[1]].children[selectIndex[2]].name);
          }
        }
      } else {
        step = 0;
        pies = rootPies;
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

    p.draw = function() {
      p.clear();
      p.cursor(p.ARROW);
      hoverIndex = -1;
      pies.forEach((pie, index) => {
        let hovered = pie.update(p);
        if (hovered) {
          hoverIndex = index;
        }
      });
      pies.forEach((pie) => {
        pie.draw(p);
      });
    }
  };

  init(htmlElement) {
    new p5((p)=>this.sketch(p), htmlElement);
  }
}
