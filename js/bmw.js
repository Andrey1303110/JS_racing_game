var iBmw = 32;

function playBmw() {
    if (iBmw >= 35) {
        iBmw = 1;
    }
    else iBmw += 1;
    $('#slick-slide182')[0].src = `./images/Cars_main_screen/all_cars/bmw/${iBmw}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 2.5) {
            direction = "left";
            iBmw -= 1;
            if (iBmw < 1) {
                iBmw = 35;
            }
        }
        else if (e.pageX > oldx + 2.5) {
            direction = "right";
            iBmw += 1;
            if (iBmw >= 35) {
                iBmw = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide182')[0].src = `./images/Cars_main_screen/all_cars/bmw/${iBmw}.png`;
    }

$('#bmw_x5_3').on('mousemove', mousemovemethod);
