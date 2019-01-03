/*
 * Emotion Wheel jsPsych Plugin
 */

jsPsych.plugins["emotion-wheel"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "emotion-wheel",
    parameters: {
      id: {
        type: jsPsych.plugins.parameterType.INT, 
        default: 0
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<div id="emotion-input"></div>';

    let emotionWheel = new EmotionWheel();
    emotionWheel.onClick((result) => {
      // end trial
      jsPsych.finishTrial({
        emotion: result
      });
    });
    emotionWheel.init(window.document.getElementById('emotion-input'));
  };

  return plugin;
})();