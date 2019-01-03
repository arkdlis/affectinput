/*
 * Emoji Affect Button jsPsych Plugin
 */

jsPsych.plugins["emoji-button"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "emoji-button",
    parameters: {
      id: {
        type: jsPsych.plugins.parameterType.INT, 
        default: 0
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    display_element.innerHTML = '<canvas id="emojibutton"></canvas><br>' +
                                '<button id="submit" class="jspsych-btn ui-btn ui-shadow ui-corner-all">Dalej</button>'; 

    var canvas = $('#emojibutton');    
    canvas.emojibutton();
    canvas.on('affectchanged', ( event, affect ) => {
      trial.data = {
        emotion: affect
      };
    });

    $('#submit').on('click', () => {
      jsPsych.finishTrial({
        emotion: trial.data
      });
    });

  };

  return plugin;
})();