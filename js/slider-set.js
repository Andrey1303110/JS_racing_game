$(document).ready(function () {
    $('.your-class').slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        initialSlide: 0,
        speed: 600,
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 581,
                settings: {
                    arrows: false,
                }
            },  
        ]
    });
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
        responsive: [
            {
                breakpoint: 581,
                settings: {
                    arrows: false,
                }
            },  
        ]
    });
});