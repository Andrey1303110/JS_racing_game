var iMazda = 3;

/*let play3D = setInterval(() => {
    iGolf += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iMazda >= 25) {
        iMazda = 1;
    }
    else iMazda += 1;

    $('#slick-slide260')[0].src = `./images/Cars_main_screen/all_cars/mazda/blue/${iMazda}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iMazda -= 1;
            if (iMazda < 1) {
                iMazda = 24;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iMazda += 1;
            if (iMazda >= 24) {
                iMazda = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide260')[0].src = `./images/Cars_main_screen/all_cars/mazda/blue/${iMazda}.png`;
    }

$('#mazda_1').on('mousemove', mousemovemethod);
