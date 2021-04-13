var iSuperb = 3;

/*let play3D = setInterval(() => {
    iSuperb += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iSuperb >= 25) {
        iSuperb = 1;
    }
    else iSuperb += 1;

    $('#slick-slide220')[0].src = `./images/Cars_main_screen/all_cars/superb/green/${iSuperb}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iSuperb -= 1;
            if (iSuperb < 1) {
                iSuperb = 24;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iSuperb += 1;
            if (iSuperb >= 24) {
                iSuperb = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide220')[0].src = `./images/Cars_main_screen/all_cars/superb/green/${iSuperb}.png`;
    }

$('#superb_1').on('mousemove', mousemovemethod);
