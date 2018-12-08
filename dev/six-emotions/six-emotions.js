NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

  
var config = {
  items: [
    {
      value: "happy",
      src: "m_happy.svg",
    },
    {
      value: "suprise",
      src: "m_suprise.svg",
    },
    {
      value: "fear",
      src: "m_fear.svg",
    },
    {
      value: "anger",
      src: "m_anger.svg",
    },
    {
      value: "disgust",
      src: "m_disgust.svg",
    },
    {
      value: "sad",
      src: "m_sad.svg",
    }
  ]
};

class SixEmotions {

  create(root) {
    var select = $('<select name="six-emotions"></select>');
    for (var i =0; i < 6; i++) {
      select.append($("<option>", { text: i+1 }))
    }
    root.append(select);

    var container = $("<div>", { class: "six-emotions-container" });
    for (var j = 0; j < config.items.length; j++) {
      var item = config.items[j];
      this.appendSvgNode(container, item);
    }
    root.append(container);
  }

  appendSvgNode(container, item) {
    jQuery.get(item.src, function (data) {
      var itemDiv = $("<div>", { class: "six-emotions-item" })
      var svg = jQuery(data).find('svg');
      svg = svg.attr('id', `emotion-${item.value}`);
      svg = svg.css('fill', item.color);
      svg = svg.removeAttr('xmlns:a');
      if (!svg.attr('viewBox') && svg.attr('height') && svg.attr('width')) {
        svg.attr('viewBox', '0 0 ' + svg.attr('height') + ' ' + svg.attr('width'))
      }
      itemDiv.append(svg);
      itemDiv.append($(`<div class="six-emotions-label">${item.value}</div>`));
      container.append(itemDiv);
    }, 'xml');
  }

  deactivateSelect(select) {
    if (!select.classList.contains('active')) return;
    select.classList.remove('active');
  }

  activeSelect(select, selectList) {
    if (select.classList.contains('active')) return;
    selectList.forEach(deactivateSelect);
    select.classList.add('active');
  }

  updateValue(select, index) {
    var nativeWidget = select.previousElementSibling;
    var optionList = select.querySelectorAll('.six-emotions-item');
    nativeWidget.selectedIndex = index;
    this.highlightItem(select, optionList[index]);
    if (this.onChangeHandle) {
      this.onChangeHandle(config.items[index].value);
    }
  };

  highlightItem(select, item) {
    var itemList = select.querySelectorAll('.six-emotions-item');
    itemList.forEach(function (other) {
      other.classList.remove('highlight');
    });
    item.classList.add('highlight');
  };

  getIndex(select) {
    var nativeWidget = select.previousElementSibling;
    return nativeWidget.selectedIndex;
  };

  attachHandlers(element) {
    var scaleList = element.querySelectorAll(".six-emotions-container");
    scaleList.forEach(function (scale) {
      var itemList = scale.querySelectorAll('.six-emotions-item');

      scale.tabIndex = 0;
      scale.previousElementSibling.tabIndex = -1;

      itemList.forEach(function (item, index) {
        item.addEventListener('click', function (event) {
          this.updateValue(scale, index);
        }.bind(this));
      }.bind(this));
      scale.addEventListener('focus', function (event) {
        this.activeSelect(scale, scaleList);
      }.bind(this));
      scale.addEventListener('blur', function (event) {
        this.deactivateSelect(scale);
      }.bind(this));
    }.bind(this));
  }

  init(element) {
    var root = $(element);
    jQuery.ajaxSetup({async:false});
    this.create(root);
    jQuery.ajaxSetup({async:true});
    this.attachHandlers(element);
  }

  onChange(callback) {
    this.onChangeHandle = callback;
  }
  onClick(callback) {
    this.onChangeHandle = callback;
  }
}
