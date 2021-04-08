var iLeon = 3;

function play() {
    if (iLeon >= 25) {
        iLeon = 1;
    }
    else iLeon += 1;
    $('#slick-slide00')[0].src = `./images/Cars_main_screen/all_cars/leon/blue/${iLeon}.png`;
    $('#slick-slide01')[0].src = `./images/Cars_main_screen/all_cars/leon/red/${iLeon}.png`;
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
    }

$('#leon_8').on('mousemove', mousemovemethod);
$('#leon_7').on('mousemove', mousemovemethod);
