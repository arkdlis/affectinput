var sliders = [
    document.getElementById('slider-sh'),
    document.getElementById('slider-fa'),
    document.getElementById('slider-dt'),
    document.getElementById('slider-as'),
];

sliders.forEach((slider) => {
    var id = slider.id;
    noUiSlider.create(slider, {
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
    slider.noUiSlider.on('change', function (values) {
        console.log(`change of ${id}`, values);
    }.bind(id));
});

// to remove events
// sliders.forEach((slider) => { slider.noUiSlider.off(); });