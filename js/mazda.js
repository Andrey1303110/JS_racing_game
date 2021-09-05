var iMazda = 3;

/*let play3D = setInterval(() => {
    iGolf += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iMazda >= 25) {
        iMazda = 1;
    }
    else iMazda += 1;

    $('#slick-slide260')[0].src = `./images/Cars_main_screen/all_cars/mazda/blue/${iMazda}.png`;
}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iMazda -= 1;
            if (iMazda < 1) {
                iMazda = 24;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iMazda += 1;
            if (iMazda >= 24) {
                iMazda = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide260')[0].src = `./images/Cars_main_screen/all_cars/mazda/blue/${iMazda}.png`;
    }

    if (window.innerWidth > 550) {
        $('#mazda_1').on('mousemove', mousemovemethod);
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
            if (rotation.beta > 1.5) {
                iMazda += 1;
                if (iMazda >= 24) {
                    iMazda = 1;
                }
            }
            if (rotation.beta < -1.5) {
                iMazda -= 1;
                if (iMazda < 1) {
                    iMazda = 24;
                }
            }
            $('#slick-slide260')[0].src = `./images/Cars_main_screen/all_cars/mazda/blue/${iMazda}.png`;
        }
    }
