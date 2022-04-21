const speed_to_turn = 57;

var moveD, speed, turn_var;

let eS = document.getElementById('engine_start');

let slides = document.getElementsByClassName("slider-down");
let slider = document.getElementById('slider');

function locked_cars(car_name = cars_logos[0]['key']) {
    if (document.querySelector("#car_buy img")) document.querySelector("#car_buy img").remove();
    purchased_cars = localStorage.getItem('purchased_cars').split(',');
    console.log(purchased_cars);
    
    price = cars_params[car_name]['price'];

    function set_lock() {
        document.querySelector("#lock_cars").classList.add("active_lock");
        document.querySelector(`.slider-down`).style.opacity = ".25";
        document.querySelector(`.slider-down`).style.pointerEvents = "none";
        document.querySelector("#lock_cars").style.zIndex = "3";
    }

    function unlock() {
        document.querySelector("#lock_cars").style.zIndex = "-1";
        document.querySelector(`.slider-down`).style.opacity = "1";
        document.querySelector(`.slider-down`).style.pointerEvents = "auto";
    }
    
    if (purchased_cars.includes(car_name)) {
        unlock();
    }
    else {
        set_lock();
        if (localStorage.getItem('cash') < price) {
            lock_cars.onclick = () => { main_theme.volume = .35; acces_denied.play(); setTimeout(() => main_theme.volume = 1, 2000) };
            document.querySelector("#lock_cars p").innerText = `You may take cash ${price}$ or more!`;
            document.querySelector("#lock_cars").style.background = "";
        }
        else if (localStorage.getItem('cash') >= price) {
            lock_cars.onclick = () => { main_theme.volume = .35; buying.play(); setTimeout(() => main_theme.volume = 1, 1200) };
            document.querySelector("#lock_cars p").innerText = `You can buy this car for price - ${price}$`;
            document.querySelector("#lock_cars").style.background = "url()";
            let img = document.createElement('img');
            img.dataset['price'] = price;
            img.src = "../images/icons/car_key.png";
            document.querySelector("#car_buy").append(img);
            img.addEventListener('click', function(){
                user_cash = Number(localStorage.getItem('cash'));
                user_cash = user_cash - Number(this.dataset['price']);
                live_counter(user_cash, 'balance', '-');
                localStorage.setItem('cash', user_cash);
                //balance.innerText = user_cash + '$';
                set_cars_nums(car_name);
                unlock();
            }, false);
            //document.querySelector("#lock_cars").style.background = "url(../images/icons/car_key.png) bottom no-repeat";
            //document.querySelector("#lock_cars").style.backgroundSize = "215px";
        }
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
    $("#lock_cars").click(function (){

    });
});

function setPosY() {
    if (game_type == 'multi') {
        return () => { player.y = canvas.height - (player.image.height * scale) - 50; player2.y = canvas.height - (player.image.height * scale) - 50; }
    }
    else return player.y = canvas.height - (player.image.height * scale) - 50;
}

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
    if (player.isPolice) {
        document.getElementById('sgu_sound').play();
        for (let i = 0; i < objects.length; i++) {
            if (((player.x - objects[i].x) <= 17) && ((player.x - objects[i].x) >= -17) && (objects[i].x != 181)) {
                if (objects[i].y > 0 && objects[i].y < player.y) {
                    if ((objects[i].x >= 340 && objects[i].x <= canvas.width) || (objects[i].x > 94 && objects[i].x < 98)) {
                        objects[i].selfSpeed = 1.15;
                        console.log('turning');
                        turn_car('left', objects[i], speed)
                    }
                    else if (objects[i].x < 340 && objects[i].x >= 0) {
                        objects[i].selfSpeed = 1.15;
                        console.log('turning');
                        turn_car('right', objects[i], speed)
                    }
                }
            }
            if (game_type == 'multi') {
                if (((player2.x - objects[i].x) <= 17) && ((player2.x - objects[i].x) >= -17 && (objects[i].x != 181))) {
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

function siren() {
    if (player.isPolice) document.getElementById('siren_sound').play();
}

function police_function(car_name) {
    eS.play();
    document.getElementById('timer').style.color = 'aqua';

    let indexP = 0;
    let images;
    let src = `images/Smooth_models/${car_name}_police/1.png`;
    player.image.src = src;

    function changeImageRed() {
        if (!player.isPolice) {
            clearInterval(flasher);
        }
        else if (player.isPolice) {
            if (car_name == 'prius') {
                images = ['1', '6', '1', '12'];
            }
            else if (car_name == 'uaz') {
                images = ['1', '2', '3', '4', '5', '6', '7'];
            }
    
            indexP = (indexP + 1) % (images.length);
            src = `images/Smooth_models/${car_name}_police/${images[indexP]}.png`;
        }
        player.image.src = src;
        if (game_type == 'multi') {
            player2.image.src = src;
        }
    }

    flasher = setInterval(changeImageRed, 60);


}

document.addEventListener('keydown', function (event) {
    if (event.shiftKey) {
        siren();
    }
    if (event.ctrlKey) {
        sgu();
    }
});

$("#siren")[0].onclick = siren;
$("#sgu")[0].onclick = sgu;

function set_car_characteristics(car_name = cars_logos[0]['key']) {
    car_speed = cars_params[car_name]['speed'];
    car_turn_var = cars_params[car_name]['turn_var'];
    car_price = cars_params[car_name]['price'];

    let speeds = [];
    let handings = [];
    for (let prop in cars_params) {
        speeds.push(cars_params[prop]['speed']);
        handings.push(cars_params[prop]['turn_var']);
    }
    let max_speed = Math.max(...speeds);
    let min_speed = Math.min(...speeds);
    let min_handling = Math.min(...handings);
    let max_handling = Math.max(...handings);

    speed_value = (car_speed - min_speed) / (max_speed - min_speed) * 100;
    turn_var_value = (max_handling - car_turn_var) / (max_handling - min_handling) * 100;

    document.querySelector('#car_characteristics #speed').style.width = speed_value + '%';
    document.querySelector('#car_characteristics #handling').style.width = turn_var_value + '%';
    document.querySelector('#car_characteristics #price span').textContent = 0;
    live_counter(car_price, 'price span', '+');
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

function set_slider(car_name = cars_logos[0]['key']) {
    if (document.querySelector('.cars_img')) document.querySelector('.cars_img').remove();
    if (colors.childElementCount) {
        $('#colors div').remove();
    }

    last_i = cars_params[car_name]["init_frame"];

    cars_colors = cars_params[car_name]['colors'];
    car_nums = cars_params[car_name]['car_nums'];
    is_police = cars_params[car_name]['is_police'];
    police_car_num = cars_params[car_name]['police_car_num'];

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
        if (is_police && (car_nums[i] == police_car_num)) {
            div.dataset['is_police'] = is_police;
        }
        else {
            div.dataset['is_police'] = false;
        }
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
        document.querySelector('.cars_img').dataset['is_police'] = this.dataset.is_police
        let frames = cars_params[car_name]["frames"];
        let i = last_i;
        if (i <= 0) i = frames - (i * -1);
        let position = car_image_width * - (frames - i) + 'px';
        $('.cars_img').css('left', position);
    });

    $(".cars_img").click(function () {
        this.dataset.is_police == 'true' ? is_police = true : is_police = false;
        game_start(this.name, this.alt, is_police);
    });
}
