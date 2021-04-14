var iCamry = 3;

/*let play3D = setInterval(() => {
    iGolf += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iCamry >= 25) {
        iCamry = 1;
    }
    else iCamry += 1;

    $('#slick-slide240')[0].src = `./images/Cars_main_screen/all_cars/camry/black/${iCamry}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iCamry -= 1;
            if (iCamry < 1) {
                iCamry = 24;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iCamry += 1;
            if (iCamry >= 24) {
                iCamry = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide240')[0].src = `./images/Cars_main_screen/all_cars/camry/black/${iCamry}.png`;
    }

$('#camry_1').on('mousemove', mousemovemethod);
