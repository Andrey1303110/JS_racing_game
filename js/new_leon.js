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

if (window.innerWidth > 550) {
    $('#new_leon_1').on('mousemove', mousemovemethod);
    $('#new_leon_2').on('mousemove', mousemovemethod);
}

if (window.innerWidth < 550) {
    if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {

        let lastReadingTimestamp;
        let accelerometer = new LinearAccelerationSensor();
        accelerometer.addEventListener('reading', e => {
          if (lastReadingTimestamp) {
            intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
          }
          lastReadingTimestamp = accelerometer.timestamp
          accelerationHandler(accelerometer, 'moAccel');
        });
        accelerometer.start();
        
        if ('GravitySensor' in window) {
          let gravity = new GravitySensor();
          gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
          gravity.start();
        }
        
        let gyroscope = new Gyroscope();
        gyroscope.addEventListener('reading', e => rotationHandler({
          alpha: gyroscope.x,
          beta: gyroscope.y,
          gamma: gyroscope.z
        }));
        gyroscope.start();
        
    } else if ('DeviceMotionEvent' in window) {
    
    var onDeviceMotion = function (eventData) {
        accelerationHandler(eventData.acceleration, 'moAccel');
        accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
        rotationHandler(eventData.rotationRate);
        intervalHandler(eventData.interval);
    }
    
    window.addEventListener('devicemotion', onDeviceMotion, false);
    }
    
    function rotationHandler(rotation) {
        if (rotation.beta > .731) {
            inew_leon += 1;
            if (inew_leon >= 23) {
                inew_leon = 1;
            }
        }
        if (rotation.beta < -.731) {
            inew_leon -= 1;
            if (inew_leon < 1) {
                inew_leon = 23;
            }
        }
        $('#slick-slide280')[0].src = `./images/Cars_main_screen/all_cars/new_leon/red/${inew_leon}.png`;
        $('#slick-slide281')[0].src = `./images/Cars_main_screen/all_cars/new_leon/white/${inew_leon}.png`;
    }
}
