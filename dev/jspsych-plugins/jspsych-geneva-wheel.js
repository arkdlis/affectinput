/*
 * Geneva Wheel jsPsych Plugin
 */

jsPsych.plugins["geneva-wheel"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "geneva-wheel",
    parameters: {
      id: {
        type: jsPsych.plugins.parameterType.INT, 
        default: 0
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<div id="emotion-input"></div>';

    let genevaWheel = new GenevaWheel();
    genevaWheel.onClick((result) => {
      // end trial
      jsPsych.finishTrial({
        emotion: result.label + " - " + result.value
      });
    });
    genevaWheel.init(window.document.getElementById('emotion-input'));
  };

  return plugin;
})();