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

    if (window.innerWidth > 550) {
        $('#cupra_1').on('mousemove', mousemovemethod);
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
                icupra += 1;
                if (icupra >= 72) {
                    icupra = 1;
                }
            }
            if (rotation.beta < -.731) {
                icupra -= 1;
                if (icupra < 1) {
                    icupra = 72;
                }
            }
            $('#slick-slide290')[0].src = `./images/Cars_main_screen/all_cars/cupra/${icupra}.png`;
        }
    }
