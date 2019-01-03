/*
 * Plutchik Wheel jsPsych Plugin
 */

jsPsych.plugins["plutchik-wheel-2"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "plutchik-wheel-2",
    parameters: {
      id: {
        type: jsPsych.plugins.parameterType.INT, 
        default: 0
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<div id="emotion-input"></div>';

    let plutchikWheel = new PlutchikWheel2();
    plutchikWheel.onClick((result) => {
      // end trial
      jsPsych.finishTrial({
        emotion: result
      });
    });
    plutchikWheel.init(window.document.getElementById('emotion-input'));
  };

  return plugin;
})();