const speed_to_turn = 57;

var moveD, speed, turn_var;

let eS = document.getElementById('engine_start');

let slides = document.getElementsByClassName("slider-down");
let slider = document.getElementById('slider');

let playerCarSelect = 0;
let selectCar = 'leon';

let playerStartHeightPos = .7;

function locked_cars(car_name = 'leon') {
    lock_cars.onclick = () => { main_theme.volume = .35; acces_denied.play(); setTimeout(() => main_theme.volume = 1, 2000) };
    price = cars_params[car_name]['price'];

    if (localStorage.getItem('score') < price) {
        $("#lock_cars").addClass("active_lock");
        document.querySelector("#lock_cars p").innerText = `You may take score ${price} or more!`;
        $(`#slider-down-${car_name}`).css("opacity", ".5");
        $(`#slider-down-${car_name} .slick-list.draggable`).css("pointer-events", "none");
        $("#lock_cars").css("z-index", "2");
    }
    else if (localStorage.getItem('score') >= price) {
        $("#lock_cars").css("z-index", "-1");
        $(`#slider-down-${car_name}`).css("opacity", "1");
        $(`#slider-down-${car_name} .slick-list.draggable`).css("pointer-events", "auto");
    }

    speed = cars_params[car_name]['speed'];
    moveD = speed_to_turn / speed;
    turn_var = cars_params[car_name]['turn_var'];
}

function clearSlider() {
    detach_content = $(".slick-slider").detach();
}

function showSlider() {
    detach_content.appendTo('body');
}

function clearCarPreloadDOM() {
    $(document).ready(function () {
        if (document.getElementById('for_name') != null) {
            document.getElementById('for_name').remove();
        }
        if (document.getElementById('pervue') != null) {
            document.getElementById('pervue').remove();
        }
    })
}

$(document).ready(function () {
    $(".slider-down").on("beforeChange", function () { spray.play() });
    $(".up_slider").on("beforeChange", function () { car_select.play(); });
});


function upSlider() {
    let sliderX = document.getElementsByClassName('slider-down');
    for (let i = 0; i < sliderX.length; i++) { sliderX[i].style.top = '-110%'; }
}

$(document).ready(function () {
    $(".main_screen_cars_img").click(function () {
        car_rotate(this.name);
        $("#lock_cars").removeClass("active_lock");
        locked_cars(this.name);
        set_car_characteristics(this.name);
        upSlider();
        returnStartPos();
        document.getElementById(`slider-down-${this.name}`).style.top = '42%';
        $(".main_screen_cars_img[name='cbr']").click(function () {
            setTimeout(() => { returnStartPosMoto() }, 1500)
        })
    });
});

function setPosY() {
    return () => { player.y = canvas.height - (player.image.height * scale) - 50; player2.y = canvas.height - (player.image.height * scale) - 50; }
}

var isPolice = false;

$(document).ready(function () {
    $("#slick-slide77").click(function () {
        prius_function();
        return isPolice = true;
    })
    $(".cars_img").click(function () {
        setScreen();
        isPolice = false;
        eS.play();
        $(`#slider-down-${this.name}`)[0].style.top = '-110%';
        document.getElementById('slider').style.top = '-110%';
        document.getElementById('timer').style.color = 'orange';
        setTimeout(start, 500);
        sessionStorage.setItem('last down slider', document.getElementById(`slider-down-${this.name}`).id);
        sessionStorage.setItem('current car', this.alt);
        player.image.src = `./images/Smooth_models/${this.alt}.png`;
        document.getElementById('car_characteristics').style.bottom = '-35%';
        let car_count = document.querySelectorAll(`#slider-down-${this.name}`)[0].children[1].children[0].childElementCount;
        let car_number = getRandomIntInclusive(1, car_count);
        let str = this.alt;
        str = str.slice(0, -1);
        player2.image.src = `./images/Smooth_models/${str}${car_number}.png`;
        if (this.alt == "bmw_x5_1") player2.image.src = `./images/Smooth_models/bmw_x5_3.png`;
        else if (this.alt == "celica_1") player2.image.src = `./images/Smooth_models/celica_2.png`;
        else if (this.alt == "golf_1") player2.image.src = `./images/Smooth_models/golf_2.png`;
        else if (this.alt == "mazda_1") player2.image.src = `./images/Smooth_models/mazda_2.png`;
        else if (this.alt == "superb_1") player2.image.src = `./images/Smooth_models/superb_2.png`;
        else if (this.alt == "camry_1") player2.image.src = `./images/Smooth_models/camry_2.png`;
        else if (this.alt == "passat_1") player2.image.src = `./images/Smooth_models/passat_2.png`;
        else if (this.alt == "cupra_1") player2.image.src = `./images/Smooth_models/cupra_2.png`;
    });
});

function returnStartPosMoto() {
    player.x = (canvas.width / 2) - (176 * scale / 2);
    player.y = canvas.height * .82;
    player2.x = (canvas.width / 2) - (176 * scale / 2);
    player2.y = canvas.height * .82;
}
function returnStartPos() {
    player.x = 262;
    player2.x = 349;
}

function sgu() {
    if (sessionStorage.getItem('current car') == 'prius_police') {
        document.getElementById('sgu_sound').play();
        for (let i = 0; i < objects.length; i++) {
            if (((player.x - objects[i].x) <= 17) && ((player.x - objects[i].x) >= -17)) {
                if (objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_work.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_2.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_3.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_4.png\">") {
                    if (objects[i].y > 0 && objects[i].y < player.y) {
                        if ( (objects[i].x >= 340 && objects[i].x <= canvas.width) || (objects[i].x > 94 && objects[i].x < 98) ) {
                            objects[i].selfSpeed = 1.15;
                            turn_car('left', objects[i], speed)
                        }
                        else if (objects[i].x < 340 && objects[i].x >= 0) {
                            objects[i].selfSpeed = 1.15;
                            turn_car('right', objects[i], speed)
                        }
                    }
                }
            }
            if (((player2.x - objects[i].x) <= 17) && ((player2.x - objects[i].x) >= -17)) {
                if (objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_work.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_2.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_3.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_4.png\">") {
                    if (objects[i].y > 0 && objects[i].y < player2.y) {
                        if (objects[i].x >= 340 && objects[i].x <= canvas.width) {
                            let move = setInterval(() => {
                                objects[i].x -= 8.3
                            }, 35);
                            setTimeout(() => { clearInterval(move); }, 350);
                            objects[i].selfSpeed = 1.15
                        }
                        if (objects[i].x < 340 && objects[i].x >= 0) {
                            let move = setInterval(() => {
                                objects[i].x += 8.3
                            }, 35);
                            setTimeout(() => { clearInterval(move); }, 350);
                            objects[i].selfSpeed = 1.15
                        }
                    }
                }
            }
        }
    }
}

function siren() {
    document.getElementById('siren_sound').play();
}

function prius_function() {
    eS.play();
    upSlider();
    document.getElementById('timer').style.color = 'aqua';
    document.getElementById('slider').style.top = '-110%';
    document.getElementById('car_characteristics').style.bottom = '-35%';
    sessionStorage.setItem('last down slider', 'slider-down-prius');
    sessionStorage.setItem('current car', 'prius_police');
    setTimeout(start, 500);
    let indexP = 0;
    let policeSrc = `./images/gif/1.png`;

    setInterval(changeImageRed, 100);
    function changeImageRed() {
        if (!isPolice) {
            return "";
        }

        let images = ['1', '6', '1', '12'];
        indexP = (indexP + 1) % (images.length);
        return policeSrc = `./images/gif/${images[indexP]}.png`;
    }

    setInterval(srcPolice, 40);
    function srcPolice() {
        if (!isPolice) {
            return;
        }

        player.image.src = policeSrc;
        player2.image.src = policeSrc;
    }

    document.addEventListener('keydown', function (event) {
        if (event.shiftKey) {
            if (sessionStorage.getItem('current car') == 'prius_police') {
                siren();
            }
        }
        if (event.ctrlKey) {
            sgu();
        }
    });
}

$("#siren")[0].onclick = siren;
$("#sgu")[0].onclick = sgu;

function set_car_characteristics(car_name = 'leon') {
    speed = cars_params[car_name]['speed'];
    turn_var = cars_params[car_name]['turn_var'];
    price = cars_params[car_name]['price'];

    let speeds = [];
    for (let prop in cars_params) {
        speeds.push(cars_params[prop]['speed']);
    }
    let max_speed = Math.max(...speeds);

    let handings = [];
    for (let prop in cars_params) {
        handings.push(cars_params[prop]['turn_var']);
    }
    let min_handling = Math.min(...handings);
    let max_handling = Math.max(...handings);

    speed_value = speed/max_speed * 100;
    turn_var_value = min_handling/turn_var * 100;

    document.querySelector('#car_characteristics #speed').style.width = speed_value + '%';
    document.querySelector('#car_characteristics #handling').style.width = turn_var_value + '%';
    document.querySelector('#car_characteristics #price span').textContent = 0;
    live_counter(price, 'price span', 500);
}
