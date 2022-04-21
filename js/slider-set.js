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

$(document).ready(function () {
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
});