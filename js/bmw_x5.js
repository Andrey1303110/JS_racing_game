var iBmw = 33;

function play() {
    if (iBmw >= 35) {
        iBmw = 1;
    }
    else iBmw += 1;
    $('#slick-slide180')[0].src = `./images/Cars_main_screen/all_cars/bmw/${iBmw}.png`;
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
        $('#slick-slide180')[0].src = `./images/Cars_main_screen/all_cars/bmw/${iBmw}.png`;
    }

    if (window.innerWidth > 550) {
        $('#bmw_x5_1').on('mousemove', mousemovemethod);
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
                iBmw += 1;
                if (iBmw >= 35) {
                    iBmw = 1;
                }
            }
            if (rotation.beta < -.731) {
                iBmw -= 1;
                if (iBmw < 1) {
                    iBmw = 35;
                }
            }
            $('#slick-slide180')[0].src = `./images/Cars_main_screen/all_cars/bmw/${iBmw}.png`;
        }
    }