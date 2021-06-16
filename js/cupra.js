var icupra = 6;

/*let play3D = setInterval(() => {
    ilc += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (icupra >= 72) {
        icupra = 1;
    }
    else icupra += 1;

    $('#slick-slide290')[0].src = `./images/Cars_main_screen/all_cars/cupra/${icupra}.png`;

}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 3) {
            direction = "left";
            icupra -= 1;
            if (icupra < 1) {
                icupra = 72;
            }
        }
        else if (e.pageX > oldx + 3) {
            direction = "right";
            icupra += 1;
            if (icupra >= 72) {
                icupra = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide290')[0].src = `./images/Cars_main_screen/all_cars/cupra/${icupra}.png`;
        
    }

$('#cupra_1').on('mousemove', mousemovemethod);
