NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

var config = {
  items: [
    {
      value: "verybad",
      src: "emo1.svg",
      color: "#E4473C"
    },
    {
      value: "bad",
      src: "emo2.svg",
      color: "#E2B036"
    },
    {
      value: "neutral",
      src: "emo3.svg",
      color: "#6A6DA0"
    },
    {
      value: "good",
      src: "emo4.svg",
      color: "#4BB166"
    },
    {
      value: "verygood",
      src: "emo5.svg",
      color: "#6BB12E"
    }
  ]
};

function create(root) {
  var select = $('<select name="emotion-scale"></select>');
  for (var i =0; i < 5; i++) {
    select.append($("<option>", { text: i+1 }))
  }
  root.append(select);

  var container = $("<div>", { class: "emotion-scale-container" });
  for (var j = 0; j < config.items.length; j++) {
    var item = config.items[j];
    appendSvgNode(container, item);
  }
  root.append(container);
}

function appendSvgNode(container, item) {
  jQuery.get(item.src, function (data) {
    var itemDiv = $("<div>", { class: "emotion-scale-item" })
    var $svg = jQuery(data).find('svg');
    $svg = $svg.attr('id', `emotion-${item.value}`);
    $svg = $svg.css('fill', item.color);
    $svg = $svg.removeAttr('xmlns:a');
    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }
    itemDiv.append($svg);
    container.append(itemDiv);
  }, 'xml');
}

function deactivateSelect(select) {
  if (!select.classList.contains('active')) return;
  select.classList.remove('active');
}

function activeSelect(select, selectList) {
  if (select.classList.contains('active')) return;
  selectList.forEach(deactivateSelect);
  select.classList.add('active');
}

function updateValue(select, index) {
  var nativeWidget = select.previousElementSibling;
  var optionList = select.querySelectorAll('.emotion-scale-item');
  nativeWidget.selectedIndex = index;
  highlightItem(select, optionList[index]);
};

function highlightItem(select, item) {
  var itemList = select.querySelectorAll('.emotion-scale-item');
  itemList.forEach(function (other) {
    other.classList.remove('highlight');
  });
  item.classList.add('highlight');
};

function getIndex(select) {
  var nativeWidget = select.previousElementSibling;
  return nativeWidget.selectedIndex;
};

function attachHandlers() {
  var scaleList = document.querySelectorAll(".emotion-scale-container");
  scaleList.forEach(function (scale) {
    var itemList = scale.querySelectorAll('.emotion-scale-item');

    scale.tabIndex = 0;
    scale.previousElementSibling.tabIndex = -1;

    itemList.forEach(function (item, index) {
      item.addEventListener('click', function (event) {
        updateValue(scale, index);
      });
    });
    scale.addEventListener('focus', function (event) {
      activeSelect(scale, scaleList);
    });
    scale.addEventListener('blur', function (event) {
      deactivateSelect(scale);
    });
  });
}

window.addEventListener('load', function () {
  var root = $(".emotion-scale");
  jQuery.ajaxSetup({async:false});
  create(root);
  jQuery.ajaxSetup({async:true});
  attachHandlers();
});
