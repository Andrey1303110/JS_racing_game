const speed_to_turn = 57;

var moveD, speed, turn_var;

let eS = document.getElementById('engine_start');

let slides = document.getElementsByClassName("slider-down");
let slider = document.getElementById('slider');

console.log(cars_logos[0]['key']);

function locked_cars(car_name = cars_logos[0]['key']) {
    lock_cars.onclick = () => { main_theme.volume = .35; acces_denied.play(); setTimeout(() => main_theme.volume = 1, 2000) };
    price = cars_params[car_name]['price'];

    if (localStorage.getItem('score') < price) {
        $("#lock_cars").addClass("active_lock");
        document.querySelector("#lock_cars p").innerText = `You may take score ${price} or more!`;
        $(`.slider-down`).css("opacity", ".5");
        $(`.slider-down`).css("pointer-events", "none");
        $("#lock_cars").css("z-index", "3");
    }
    else if (localStorage.getItem('score') >= price) {
        $("#lock_cars").css("z-index", "-1");
        $(`.slider-down`).css("opacity", "1");
        $(`.slider-down`).css("pointer-events", "auto");
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

$(document).ready(function () {
    $(".main_screen_cars_img").click(function () {
        $("#lock_cars").removeClass("active_lock");
        set_slider(this.name);
        locked_cars(this.name);
        set_car_characteristics(this.name);
        returnStartPos();
        $(".main_screen_cars_img[name='r1']").click(function () {
            setTimeout(() => { returnStartPosMoto() }, 1500)
        })
    });
});

function setPosY() {
    if (game_type == 'multi') {
        return () => { player.y = canvas.height - (player.image.height * scale) - 50; player2.y = canvas.height - (player.image.height * scale) - 50; }
    }
    else return player.y = canvas.height - (player.image.height * scale) - 50;
}

var isPolice = false;

$(document).ready(function () {
    $("#slick-slide77").click(function () {
        prius_function();
        return isPolice = true;
    })
    $(".cars_img").click(function () {
        game_start(car_name, car_num);
    });
});

function returnStartPosMoto() {
    player.y = canvas.height * .82;
    if (game_type == 'multi') {
        player.x = (canvas.width / 2) - (176 * scale / 2);
        player2.x = (canvas.width / 2) - (176 * scale / 2);
        player2.y = canvas.height * .82;
    }
    else player.x = (canvas.width / 2) - (33 * scale / 2);
}
function returnStartPos() {
    if (game_type == 'multi') {
        player.x = 262;
        player2.x = 349;
    }
    else player.x = (canvas.width / 2) - (59 * scale / 2);
}

function sgu() {
    if (sessionStorage.getItem('current car') == 'prius_police') {
        document.getElementById('sgu_sound').play();
        for (let i = 0; i < objects.length; i++) {
            if (((player.x - objects[i].x) <= 17) && ((player.x - objects[i].x) >= -17)) {
                if (objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_work.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_2.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_3.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_4.png\">") {
                    if (objects[i].y > 0 && objects[i].y < player.y) {
                        if ((objects[i].x >= 340 && objects[i].x <= canvas.width) || (objects[i].x > 94 && objects[i].x < 98)) {
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
            if (game_type == 'multi') {
                if (((player2.x - objects[i].x) <= 17) && ((player2.x - objects[i].x) >= -17)) {
                    if (objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_work.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_2.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_3.png\">" && objects[i].image.outerHTML != "<img src=\"images/Smooth_models/road_barrier_4.png\">") {
                        if (objects[i].y > 0 && objects[i].y < player2.y) {
                            if ((objects[i].x >= 340 && objects[i].x <= canvas.width) || (objects[i].x > 94 && objects[i].x < 98)) {
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
            }
        }
    }
}

function siren() {
    document.getElementById('siren_sound').play();
}

function prius_function() {
    eS.play();
    document.getElementById('timer').style.color = 'aqua';
    document.getElementById('slider').style.top = '-110%';
    document.getElementById('slider-down').style.top = '-110%';
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
        if (game_type == 'multi') {
            player2.image.src = policeSrc;
        }
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

console.log(cars_logos[0]['key']);

function set_car_characteristics(car_name = cars_logos[0]['key']) {
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

    speed_value = speed / max_speed * 100;
    turn_var_value = min_handling / turn_var * 100;

    document.querySelector('#car_characteristics #speed').style.width = speed_value + '%';
    document.querySelector('#car_characteristics #handling').style.width = turn_var_value + '%';
    document.querySelector('#car_characteristics #price span').textContent = 0;
    live_counter(price, 'price span', 500);
}

function set_car_in_slider(car_name) {
    let img = document.createElement('img');
    img.classList.add("cars_img");
    img.id = car_name + '_' + car_nums[0];
    img.alt = car_name + '_' + car_nums[0];
    img.name = car_name;
    img.src = `./images/Cars_main_screen/all_cars/${car_name}/${cars_colors[0]}/sprite.png`;
    return img;
}

console.log(cars_logos[0]['key']);

function set_slider(car_name = cars_logos[0]['key']) {
    if (document.querySelector('.cars_img')) document.querySelector('.cars_img').remove();
    if (colors.childElementCount) {
        $('#colors div').remove();
    }

    last_i = cars_params[car_name]["init_frame"];

    cars_colors = cars_params[car_name]['colors'];
    car_nums = cars_params[car_name]['car_nums'];

    img = set_car_in_slider(car_name);
    let slider = document.querySelector('.slider-down');
    slider.appendChild(img);

    current_car = sessionStorage.getItem('current car');

    img.onload = function () {
        view3D(car_name, current_car.split('_')[1]);
    };

    for (let i = 0; i < cars_colors.length; i++) {
        let div = document.createElement('div');
        div.dataset['color'] = cars_colors[i];
        div.dataset['car_num'] = car_nums[i];
        div.style.backgroundColor = cars_colors[i];
        colors.appendChild(div);
    }

    $('#colors div').on('click', function () {
        let path = document.querySelector('.cars_img').src.split('/');
        path[path.length - 2] = this.dataset['color'];
        document.querySelector('.cars_img').src = path.join('/');

        let car_name = $('.cars_img')[0].name;
        document.querySelector('.cars_img').alt = `${car_name}_${this.dataset.car_num}`;
        document.querySelector('.cars_img').id = `${car_name}_${this.dataset.car_num}`;
        let frames = cars_params[car_name]["frames"];
        let i = last_i;
        console.log(i);
        if (i <= 0) i = frames - (i * -1);
        let position = car_image_width * - (frames - i) + 'px';
        console.log($('.cars_img'));
        console.log(position);
        $('.cars_img').css('left', position);
        console.log(position);
    });

    $(".cars_img").click(function () {
        game_start(this.name, this.alt);
    });
}
