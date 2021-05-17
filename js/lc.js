var ilc = 3;

/*let play3D = setInterval(() => {
    ilc += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (ilc >= 25) {
        ilc = 1;
    }
    else ilc += 1;

    $('#slick-slide270')[0].src = `./images/Cars_main_screen/all_cars/lc/black/${ilc}.png`;
    $('#slick-slide271')[0].src = `./images/Cars_main_screen/all_cars/lc/violet/${ilc}.png`;

}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            ilc -= 1;
            if (ilc < 1) {
                ilc = 25;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            ilc += 1;
            if (ilc >= 25) {
                ilc = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide270')[0].src = `./images/Cars_main_screen/all_cars/lc/white/${ilc}.png`;
        $('#slick-slide271')[0].src = `./images/Cars_main_screen/all_cars/lc/black/${ilc}.png`;
    }

$('#lc_2').on('mousemove', mousemovemethod);
$('#lc_1').on('mousemove', mousemovemethod);
