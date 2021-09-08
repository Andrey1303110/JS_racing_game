var iCamry = 3;

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

    if (window.innerWidth > 550) {
        $('#camry_1').on('mousemove', mousemovemethod);
    }

    if (window.innerWidth < 550 && selectCar == 'camry') {
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
            if (rotation.beta > 1.25) {
                iCamry += 1;
                if (iCamry >= 24) {
                    iCamry = 1;
                }
            }
            if (rotation.beta < -1.25) {
                iCamry -= 1;
                if (iCamry < 1) {
                    iCamry = 24;
                }
            }
            $('#slick-slide240')[0].src = `./images/Cars_main_screen/all_cars/camry/black/${iCamry}.png`;
        }
    }
