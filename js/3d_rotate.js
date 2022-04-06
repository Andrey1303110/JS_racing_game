var frame_num = 1;

function car_rotate(car_name = 'leon') {
    car = cars_params[car_name];

    if (car["is_3d"]) {
        frame_num = car["init_frame"];
        last_frame = car["frames"];
        colors = car["colors"];
        slides = car["slides"];

        console.log(frame_num);
        console.log(last_frame);
        console.log(colors);
        console.log(slides);
        console.log(car_name);
    
        var direction = "",
        oldx = 0,
        mousemovemethod = function (e) {
    
            if (e.pageX < oldx - 6) {
                direction = "left";
                frame_num -= 1;
                if (frame_num < 1) {
                    frame_num = last_frame;
                }
            }
            else if (e.pageX > oldx + 6) {
                direction = "right";
                frame_num += 1;
                if (frame_num >= last_frame) {
                    frame_num = 1;
                }
            }
            oldx = e.pageX;
            for (let k = 0; k < slides.length; k++) {
                $(`#slick-slide${slides[k]}`)[0].src = `./images/Cars_main_screen/all_cars/${car_name}/${colors[k]}/${frame_num}.png`;
            }
        }
    
        if (window.innerWidth > 550) {
            $('.cars_img').off('mousemove');
            $(`.cars_img[name="${car_name}"]`).on('mousemove', mousemovemethod);
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
                    frame_num += 1;
                    if (frame_num >= last_frame) {
                        frame_num = 1;
                    }
                }
                if (rotation.beta < -.731) {
                    frame_num -= 1;
                    if (frame_num < 1) {
                        frame_num = last_frame;
                    }
                }
    
                for (let l = 0; l < slides.length; l++) {
                    $(`#slick-slide${slides[l]}`)[0].src = `./images/Cars_main_screen/all_cars/${car_name}/${colors[l]}/${frame_num}.png`;
                }
            }
        }
    }
}