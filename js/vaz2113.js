var iVaz2113 = 3;

/*let play3D = setInterval(() => {
    iVaz2113 += 1
}, 125);
setTimeout(() => { clearInterval(play3D); }, 125*50);*/

function play() {
    if (iVaz2113 >= 25) {
        iVaz2113 = 1;
    }
    else iVaz2113 += 1;

    $('#slick-slide200')[0].src = `./images/Cars_main_screen/all_cars/vaz2113/white/${iVaz2113}.png`;
    $('#slick-slide201')[0].src = `./images/Cars_main_screen/all_cars/vaz2113/black/${iVaz2113}.png`;

}

var direction = "",
    oldx = 0,
    mousemovemethod = function (e) {

        if (e.pageX < oldx - 6) {
            direction = "left";
            iVaz2113 -= 1;
            if (iVaz2113 < 1) {
                iVaz2113 = 25;
            }
        }
        else if (e.pageX > oldx + 6) {
            direction = "right";
            iVaz2113 += 1;
            if (iVaz2113 >= 25) {
                iVaz2113 = 1;
            }
        }
        oldx = e.pageX;
        $('#slick-slide200')[0].src = `./images/Cars_main_screen/all_cars/vaz2113/white/${iVaz2113}.png`;
        $('#slick-slide201')[0].src = `./images/Cars_main_screen/all_cars/vaz2113/black/${iVaz2113}.png`;
    }

if (window.innerWidth > 550) {
    $('#vaz2113_2').on('mousemove', mousemovemethod);
    $('#vaz2113_1').on('mousemove', mousemovemethod);
}

if (window.innerWidth < 550 && selectCar == 'vaz2113') {
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
            iVaz2113 += 1;
            if (iVaz2113 >= 25) {
                iVaz2113 = 1;
            }
        }
        if (rotation.beta < -1.25) {
            iVaz2113 -= 1;
            if (iVaz2113 < 1) {
                iVaz2113 = 25;
            }
        }
        $('#slick-slide200')[0].src = `./images/Cars_main_screen/all_cars/vaz2113/white/${iVaz2113}.png`;
        $('#slick-slide201')[0].src = `./images/Cars_main_screen/all_cars/vaz2113/black/${iVaz2113}.png`;
    }
}
