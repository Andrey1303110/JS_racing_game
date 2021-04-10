var iGolf = 3;

/*let play3D = setInterval(() => {
    iGolf += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iGolf >= 25) {
        iGolf = 1;
    }
    else iGolf += 1;

    $('#slick-slide210')[0].src = `./images/Cars_main_screen/all_cars/golf/blue/${iGolf}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iGolf -= 1;
            if (iGolf < 1) {
                iGolf = 24;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iGolf += 1;
            if (iGolf >= 24) {
                iGolf = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide210')[0].src = `./images/Cars_main_screen/all_cars/golf/blue/${iGolf}.png`;
    }

$('#golf_1').on('mousemove', mousemovemethod);
