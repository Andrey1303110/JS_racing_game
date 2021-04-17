var iCelica = 3;

/*let play3D = setInterval(() => {
    iGolf += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iCelica >= 25) {
        iCelica = 1;
    }
    else iCelica += 1;

    $('#slick-slide250')[0].src = `./images/Cars_main_screen/all_cars/celica/red/${iCelica}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iCelica -= 1;
            if (iCelica < 1) {
                iCelica = 24;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iCelica += 1;
            if (iCelica >= 24) {
                iCelica = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide250')[0].src = `./images/Cars_main_screen/all_cars/celica/red/${iCelica}.png`;
    }

$('#celica_1').on('mousemove', mousemovemethod);
