// Define the sequence of components
// that define the experiment

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
    new lab.html.Form({
      content: '<form class="form-group d-flex">' +
        '  <select class="form-control d-inline m-2" name="emotion" id="emotion" required>' +
        '    <option value="" disabled selected hidden>How do you feel?</option>' +
        '    <option value="happy">Happy</option>' +
        '    <option value="suprise">Suprise</option>' +
        '    <option value="fear">Fear</option>' +
        '    <option value="anger">Anger</option>' +
        '    <option value="disgust">Disgust</option>' +
        '    <option value="sad">Sad</option>' +
        '  </select>' +
        '  <button class="btn btn-light m-2" type="submit">Save</button>' +
        '</form>'
    })
  ]
})

var experiment = new lab.flow.Sequence({
  content: [
    new lab.html.Screen({
      content: 'Hello!',
      timeout: 1000,
    }),
    new lab.html.Screen({
      content: 'Click to proceed',
      responses: {
        'click': 'A mouse click was recorded',
      }
    }),
    new lab.flow.Loop({
      template: trial,
      templateParameters: [
        { imageUrl: 'img/Angry face 2.jpg', value: 1 },
        { imageUrl: 'img/Animal carcass 3.jpg', value: 2 },
        { imageUrl: 'img/Baby 3.jpg', value: 3 },
        { imageUrl: 'img/Car race 1.jpg', value: 4 },
        { imageUrl: 'img/Cemetery 3.jpg', value: 5 },
        { imageUrl: 'img/Cheerleader 1.jpg', value: 6 },
        { imageUrl: 'img/Cockroach 1.jpg', value: 7 },
        { imageUrl: 'img/Dog 6.jpg', value: 8 },
        { imageUrl: 'img/Explosion 6.jpg', value: 9 },
        { imageUrl: 'img/Hallway 1.jpg', value: 10 },
        { imageUrl: 'img/Hang gliding 1.jpg', value: 11 },
        { imageUrl: 'img/Nude couple 7.jpg', value: 12 },
        { imageUrl: 'img/Police 2.jpg', value: 13 },
        { imageUrl: 'img/Present 1.jpg', value: 14 },
        { imageUrl: 'img/Rafting 3.jpg', value: 15 },
        { imageUrl: 'img/Running away 1.jpg', value: 16 },
        { imageUrl: 'img/Sad face 2.jpg', value: 17 },
        { imageUrl: 'img/Scary face 1.jpg', value: 18 },
        { imageUrl: 'img/Spider 1.jpg', value: 19 },
        { imageUrl: 'img/Sunset 4.jpg', value: 20 },
        { imageUrl: 'img/Thunderstorm 9.jpg', value: 21 },
        { imageUrl: 'img/War 1.jpg', value: 22 },
      ]
    }),
    new lab.html.Screen({
      content: 'Click to finish',
      responses: {
        'click': 'A mouse click was recorded',
      }
    }),
  ],
})

// Collect data in a central data store
experiment.datastore = new lab.data.Store()

// Start the experiment
experiment.run()