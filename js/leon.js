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

    if (window.innerWidth > 550) {
        $('#leon_8').on('mousemove', mousemovemethod);
        $('#leon_7').on('mousemove', mousemovemethod);
        $('#leon_1').on('mousemove', mousemovemethod);
    }

    if (window.innerWidth < 550 && selectCar == 'leon') {
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
                iLeon += 1;
                if (iLeon >= 25) {
                    iLeon = 1;
                }
            }
            if (rotation.beta < -1.25) {
                iLeon -= 1;
                if (iLeon < 1) {
                    iLeon = 25;
                }
            }
            $('#slick-slide00')[0].src = `./images/Cars_main_screen/all_cars/leon/blue/${iLeon}.png`;
            $('#slick-slide01')[0].src = `./images/Cars_main_screen/all_cars/leon/red/${iLeon}.png`;
            $('#slick-slide02')[0].src = `./images/Cars_main_screen/all_cars/leon/white/${iLeon}.png`;
        }
    }
