const random = new lab.util.Random();

const images = random.shuffle([
  { imageUrl: '../../img/Angry face 2.jpg', value: 1 },
  { imageUrl: '../../img/Animal carcass 3.jpg', value: 2 },
  { imageUrl: '../../img/Baby 3.jpg', value: 3 },
  { imageUrl: '../../img/Car race 1.jpg', value: 4 },
  { imageUrl: '../../img/Cemetery 3.jpg', value: 5 },
  { imageUrl: '../../img/Cheerleader 1.jpg', value: 6 },
  { imageUrl: '../../img/Cockroach 1.jpg', value: 7 },
  { imageUrl: '../../img/Dog 6.jpg', value: 8 },
  { imageUrl: '../../img/Explosion 6.jpg', value: 9 },
  { imageUrl: '../../img/Hallway 1.jpg', value: 10 },
  { imageUrl: '../../img/Hang gliding 1.jpg', value: 11 },
  { imageUrl: '../../img/Nude couple 7.jpg', value: 12 },
  { imageUrl: '../../img/Police 2.jpg', value: 13 },
  { imageUrl: '../../img/Present 1.jpg', value: 14 },
  { imageUrl: '../../img/Rafting 3.jpg', value: 15 },
  { imageUrl: '../../img/Running away 1.jpg', value: 16 },
  { imageUrl: '../../img/Sad face 2.jpg', value: 17 },
  { imageUrl: '../../img/Scary face 1.jpg', value: 18 },
  { imageUrl: '../../img/Spider 1.jpg', value: 19 },
  { imageUrl: '../../img/Sunset 4.jpg', value: 20 },
  { imageUrl: '../../img/Thunderstorm 9.jpg', value: 21 },
  { imageUrl: '../../img/War 1.jpg', value: 22 },
]).slice(0, 8);

const trial = new lab.flow.Sequence({
  content: [
    new lab.html.Screen({
      content: '.',
      timeout: 500,
    }),
    new lab.html.Screen({
      content: '<img class="img-fluid" src="${ parameters.imageUrl }">',
      timeout: 2000,
    }),
    new lab.html.Screen({
      content: 
      '  <canvas id="emojibutton"></canvas>' + 
      '  <br><br>' + 
      '  <div class="row">' + 
      '    <button id="submit" class="btn btn-light m-2 mx-auto">Dalej</button>' + 
      '  </div>',
      messageHandlers: {
        'run': function() {
          var canvas = $('#emojibutton');    
          canvas.emojibutton();
          canvas.on('affectchanged', ( event, affect ) => {
            experiment.datastore.set({
              'imageUrl': this.parent.options.parameters.imageUrl,
              'pleasure': affect.pleasure,
              'arousal': affect.arousal,
              'dominance': affect.dominance
            });
          });
        },
        'end': () => {
          experiment.datastore.commit();
          experiment.datastore.show();
        }
      },
      responses: {
        'click button#submit': 'submit',
      }
    }),
  ]
});

var experiment = new lab.flow.Sequence({
  content: [
    new lab.html.Screen({
      content: "Cześć!",
      timeout: 1000,
    }),
    new lab.html.Screen({
      content: 'Kliknij, by kontynuować',
      responses: {
        'click': 'A mouse click was recorded',
      }
    }),
    new lab.html.Screen({
      content: '<p>Zobaczysz teraz kilka różnych obrazków jeden po drugim.</p>' +
               '<p>Po każdym z nich zostaniesz poproszony o określenie swojej emocji.</p>' +
               '<br><p class="text-center">Kliknij, by kontynuować.</p>',
      responses: {
        'click': 'A mouse click was recorded',
      }
    }),
    new lab.flow.Loop({
      template: trial,
      templateParameters: images
    }),
    new lab.html.Screen({
      content: 'Kliknij, by zakończyć i zapisać wyniki',
      responses: {
        'click': 'A mouse click was recorded',
      }
    }),
  ],
})

var elem = document.documentElement;



// Collect data in a central data store
experiment.datastore = new lab.data.Store();
var started = false;
elem.addEventListener('click', () => {
  if (!started) {
    started = true;
    // openFullscreen();
  }
});

experiment.on('end', () => {
  // closeFullscreen();
  experiment.datastore.download();
});

// Start the experiment
experiment.run();



/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
