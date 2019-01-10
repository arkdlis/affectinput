/*
 * Valence-Arousal jsPsych Plugin
 */

jsPsych.plugins["valence-arousal"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "valence-arousal",
    parameters: {
      id: {
        type: jsPsych.plugins.parameterType.INT, 
        default: 0
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<div id="emotion-input"></div>';

    let valenceArousal = new ValenceArousal();
    valenceArousal.onChange((result) => {
      // end trial
      jsPsych.finishTrial({
        valence: result.valence,
        arousal: result.arousal
      });
    });
    valenceArousal.init(window.document.getElementById('emotion-input'));
  };

  return plugin;
})();