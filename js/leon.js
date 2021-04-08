var iLeon = 3;

/*let play3D = setInterval(() => {
    iLeon += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iLeon >= 25) {
        iLeon = 1;
    }
    else iLeon += 1;

    $('#slick-slide00')[0].src = `./images/Cars_main_screen/all_cars/leon/blue/${iLeon}.png`;
    $('#slick-slide01')[0].src = `./images/Cars_main_screen/all_cars/leon/red/${iLeon}.png`;
    $('#slick-slide02')[0].src = `./images/Cars_main_screen/all_cars/leon/white/${iLeon}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iLeon -= 1;
            if (iLeon < 1) {
                iLeon = 25;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iLeon += 1;
            if (iLeon >= 25) {
                iLeon = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide00')[0].src = `./images/Cars_main_screen/all_cars/leon/blue/${iLeon}.png`;
        $('#slick-slide01')[0].src = `./images/Cars_main_screen/all_cars/leon/red/${iLeon}.png`;
        $('#slick-slide02')[0].src = `./images/Cars_main_screen/all_cars/leon/white/${iLeon}.png`;
    }

$('#leon_8').on('mousemove', mousemovemethod);
$('#leon_7').on('mousemove', mousemovemethod);
$('#leon_1').on('mousemove', mousemovemethod);
