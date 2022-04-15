$(document).ready(function () {
    /*
    $('.slider-down').slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        initialSlide: 0,
        speed: 2150,
        fade: true,
        cssEase: 'cubic-bezier(1,-0.07,.6,.53)',
        responsive: [
            {
                breakpoint: 581,
                settings: {
                    arrows: false,
                }
            },  
        ]
    });
    */
});

var cars_logos = [];
var init_slide = 1;

$(document).ready(function () {
    for (let key in cars_params) {
        cars_logos.push({
            key: key,
            value: cars_params[key]['price']
        });
    }

    cars_logos = cars_logos.sort((a, b) => (a.value > b.value) ? 1 : -1);
    console.log(cars_logos);

    for (let i = 0; i < cars_logos.length; i++) {
        let name = cars_logos[i]['key'];
        let img = document.createElement('img');
        img.classList.add("main_screen_cars_img");
        img.name = name;
        img.src = `./images/Cars_main_screen/logo/${name}_logo.png`;
        slider.appendChild(img);
        if (i === 0) img.autofocus = true;
    }
});

$(document).ready(function () {
    $('.up_slider').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        initialSlide: 0,
        speed: 900,
        cssEase: 'linear',
    });

    last_slider = sessionStorage.getItem('last down slider');
    car_name = last_slider.split('-')[last_slider.split('-').length - 1];
    for (let i = 0; i < cars_logos.length; i++) {
        if (cars_logos[i].key == car_name) init_slide = i; 
    }
    $('.up_slider').slick('slickGoTo', init_slide);
});