var inew_leon = 3;

/*let play3D = setInterval(() => {
    ilc += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (inew_leon >= 23) {
        inew_leon = 1;
    }
    else inew_leon += 1;

    $('#slick-slide280')[0].src = `./images/Cars_main_screen/all_cars/new_leon/red/${inew_leon}.png`;
    $('#slick-slide281')[0].src = `./images/Cars_main_screen/all_cars/new_leon/white/${inew_leon}.png`;

}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            inew_leon -= 1;
            if (inew_leon < 1) {
                inew_leon = 23;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            inew_leon += 1;
            if (inew_leon >= 23) {
                inew_leon = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide280')[0].src = `./images/Cars_main_screen/all_cars/new_leon/red/${inew_leon}.png`;
        $('#slick-slide281')[0].src = `./images/Cars_main_screen/all_cars/new_leon/white/${inew_leon}.png`;
        
    }

$('#new_leon_1').on('mousemove', mousemovemethod);
$('#new_leon_2').on('mousemove', mousemovemethod);
