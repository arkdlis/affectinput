class EmotionWheel {
  onClick(onclickFun) {
    this.onClickHandler = onclickFun;
  }
  sketch(p) {
    var onClickHandler = this.onClickHandler;
    // TODO: put data into json
    var data = [
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

    var smallScreen = false;

    var canvasWidth = 300;
    if (window.innerWidth < canvasWidth) {
      smallScreen = true;
      canvasWidth = window.innerWidth;
    }
    var canvasHeight = canvasWidth*2;

    var padding = {
      x: 10,
      y: 10,
    }

    var diameter = canvasWidth - padding.x*2;

    
    var isMouseHovering = false;
    var hoverIndex = -1;

    var step = 0;
    var selectIndex = [0, 0, 0];

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
      if (step===0 && isMouseHovering) {
        selectIndex[step] = hoverIndex;
        step++;
      } else if (step > 0 && hoverIndex < 0) {
        selectIndex[step] = 0;
        step--;
      } else if (step === 2 && isMouseHovering){
        selectIndex[step] = hoverIndex;
        if (onClickHandler) {
          onClickHandler(data[selectIndex[0]].children[selectIndex[1]].children[selectIndex[2]].name);
        }
      } else if (step > 0 && isMouseHovering) {
        selectIndex[step] = hoverIndex;
        step++;
      }
      console.log(step, selectIndex, hoverIndex);
    }

    function drawLabels(text, x, y, textSize, horizAlign = p.CENTER, vertAlign = p.CENTER ) {
      p.textSize(textSize);
      p.textAlign(horizAlign, vertAlign);
      p.fill(p.color('#000'));
      p.noStroke();
      p.text(text, x, y);
    }

    function mouseInRect(mouseX, mouseY, x, y, width, height) {
      if (mouseX > x && mouseX < x+width && mouseY > y && mouseY < y+height) {
        return true;
      }
      return false;
    }

    function drawNode(node) {
      for (let i = 0; i < node.children.length; i++) {
        let item = node.children[i];
        drawLabels(item.name, canvasWidth/2, 90+28*i, (hoverIndex === i ? 20 : 18));
      }
    }

    function pieChart(diameter, data) {
      let tilt = p.radians(-90 - 360/(2*data.length));
      let angle = p.radians(360/data.length);
      let lastAngle = tilt;
      p.colorMode(p.HSL);
      let radius = diameter;
      for (let i = 0; i < data.length; i++) {
        let isHovered = false;
        let color = p.color(data[i].color)
        p.fill(color);
        if (isMouseHovering && mouseInAngle(p.mouseX, p.mouseY, canvasWidth/2, canvasWidth/2, lastAngle, lastAngle + angle)) {
          hoverIndex = i;
          isHovered = true;
          p.stroke(1);
        } else {
          p.noStroke();
        }
        radius = diameter + (isHovered ? 10 : 0);
        p.arc(canvasWidth/2, canvasWidth/2, radius, radius, lastAngle, lastAngle + angle);
        lastAngle += angle;
      }
      tilt = p.radians(-90);
      if (step === 0) {
        for(let i = 0; i < data.length; i++) {
          let word = data[i].name;
          let placementAngle = tilt + angle*i;
          let x = canvasWidth/2 + Math.cos(placementAngle)*diameter/3;
          let y = canvasWidth/2 + Math.sin(placementAngle)*diameter/3;
          let textSize = i===hoverIndex ? (smallScreen ? 12 : 18) : (smallScreen ? 10 : 16);
          drawLabels(word, x, y, textSize);
        }
      }
    }

    p.draw = function() {
      p.clear();
      
      // pie chart
      if (step === 0) {
        isMouseHovering = mouseInCircle(p.mouseX, p.mouseY, canvasWidth/2, canvasWidth/2, diameter/2);
        pieChart(diameter, data);
        if (isMouseHovering) {
          p.cursor(p.HAND);
        } else {
          hoverIndex = -1;
          p.cursor(p.ARROW);
        }
      } else if (step > 0) {
        let rootNode = data[selectIndex[0]];
        let breadcrumb = "> "+rootNode.name;
        if (step == 2) {
          rootNode = rootNode.children[selectIndex[1]];
          breadcrumb += ` > ${rootNode.name}`;
        }
        p.cursor(p.ARROW);
        hoverIndex = -1;
        drawLabels(breadcrumb, padding.x+20, 35, 22, p.LEFT);
        if (mouseInRect(p.mouseX, p.mouseY, padding.x+20, 24, canvasWidth-padding.x+20, 22)) {
          p.cursor(p.HAND);
          hoverIndex = -1;
          isMouseHovering = true;
        }
        for (let i = 0; i < rootNode.children.length; i++) {
          if (mouseInRect(p.mouseX, p.mouseY, canvasWidth/2 - 50, 90+28*i-9, 100, 18)) {
            p.cursor(p.HAND);
            hoverIndex = i;
            isMouseHovering = true;
          }
        }
        drawNode(rootNode);
      }
    }
  };
}

let emotionWheel = new EmotionWheel(3);

// demo
emotionWheel.onClick((value) => {
  alert(value);
});

new p5((p)=>emotionWheel.sketch(p), window.document.getElementById('emotion-wheel'));