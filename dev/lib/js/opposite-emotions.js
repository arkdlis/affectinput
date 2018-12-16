var oppositeEmotionsDefaultConfig = [
  {
    id: 'sad-happy',
    labelLeft: "Sadness",
    labelRight: "Happiness",
  },
  {
    id: 'fear-anger',
    labelLeft: "Fear",
    labelRight: "Anger"
  },
  {
    id: 'disgust-trust',
    labelLeft: "Disgust",
    labelRight: "Trust"
  },
  {
    id: 'anticipation-suprise',
    labelLeft: "Anticipation",
    labelRight: "Suprise"
  }
];

class OppositeEmotions {
  constructor(config) {
    this.config = config || oppositeEmotionsDefaultConfig;
  }
  
  create(rootNode) {
    let root = $(rootNode);
    this.sliders = [];
    this.config.forEach((data) => {
      let group = $('<div class="group">');
      let label = $('<div class="label">');
      let labelLeft = $('<span class="label-left">');
      labelLeft.text(data.labelLeft);
      let labelRight = $('<span class="label-right">');
      labelRight.text(data.labelRight);
      let slider = $('<div>', { id: data.id });

      label.append(labelLeft);
      label.append(labelRight);
      group.append(label);
      group.append(slider);
      this.sliders.push(slider);
      root.append(group);
    });
  }

  initializeSliders() {
    this.sliders.forEach((slider) => {
      let sliderNode = slider.get(0)
      let id = sliderNode.id;
      noUiSlider.create(sliderNode, {
        start: [0],
        connect: true,
        range: {
          'min': [-10, 1],
          '50%': [0, 1],
          'max': [10, 1]
        },
        pips: {
          mode: 'range',
          density: 5,
        }
      });
      sliderNode.noUiSlider.on('change', (result) => {
        if (this.onChangeHandle) {
          this.onChangeHandle({
            id: id,
            value: result
          })
        }
      });
    });
  }

  init(rootNode) {
    this.create(rootNode);
    this.initializeSliders();
  }

  onChange(callback) {
    this.onChangeHandle = callback;
  }
}

