let intro_video = $('#intro_video')[0];
let audios = document.querySelectorAll("audio");
let menu = document.getElementById('menu');
let sound_on = document.getElementById('sound_on');
let sound_off = document.getElementById('sound_off');
let main_theme = document.getElementById('main_theme1');

let UPDATE_TIME = 1000 / 75;
var timer = null;
var canvas = document.getElementById("canvas"); //получем Canvas из DOM
var ctx = canvas.getContext("2d"); //получаем внутренность Canvas для работы с ним
var scaleX;
var translateX;
var init_slide;
var user_cash;
var player;
var player2;

var diff;
var xScore;

let scale = 1; //масштаб машин

var lowwer = 114;
var upper = 186;

if (game_type == 'multi') {
    lowwer = 100;
    upper = 200;
}

var scoreTimer = [];
var detach_content = '';

var road_num;
var roads;
var randomRoadList;

var last_i;
var car_image_width;

setVolume();

function setName() {
    var name_player = $("#name_player")[0].value;
    localStorage.setItem('name', `${name_player}`);
    high_score_base.push(`${localStorage.getItem('score')}` * 1);
    nickname.innerText = name_player;
    user_cash = localStorage.getItem('cash');
    balance.innerText = user_cash + '$';
    if (name_player == "master") {
        localStorage.setItem('score', "9999999");
        high_score_base.push(9999999);
    }
    else if (localStorage.getItem('score') != undefined) {
        $("#score")[0].innerText = localStorage.getItem('score');
        $("#name")[0].innerText = localStorage.getItem('name');
    }
    else {
        $("#score")[0].innerText = "0";
    }
    if (high_score_base.includes("null")) {
        high_score_base[high_score_base.indexOf("null")] = "0"
    }
    if (!localStorage.getItem('cash')) localStorage.setItem('cash', 0);
}

name_player.onkeypress = (e) => {
    keyCode = (window.event) ? e.which : e.keyCode;
    if ((keyCode == 13) && (name_player.value != "")) {
        $("#pervue_start").click();
    }
}

function push_high_score() {
    let score = document.getElementById('timer').innerText;
    high_score_base.push(`${score}` * 1);
    high_score_base.sort(function (a, b) { return b - a });
    localStorage.setItem('score', `${high_score_base[0]}`);
    user_cash = Number(user_cash) + Number(score);
    localStorage.setItem('cash', user_cash);
    balance.innerText = user_cash + '$';
    $("#score")[0].innerText = localStorage.getItem('score');
}

class Road {
    constructor(image, y) {
        this.x = 0;
        this.y = y;
        this.loaded = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    update(road) {
        this.y += speed; //изображание идёт вниз при каждом новом кадре

        if (this.y > window.innerHeight) //Y не может уйти влево за экран
        {
            this.y = road.y - canvas.height + speed; //новая позиция прописывается на дороге которая ещё вверху экрана
        }
    }
}

class Car {
    constructor(image, x, y, isPlayer, selfSpeed) {
        this.x = x;
        this.y = y;
        this.loaded = false;
        this.dead = false;
        this.isPlayer = isPlayer;
        this.isPolice = false;
        this.selfSpeed = selfSpeed;
        this.turning = false;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    update() {
        if (!this.isPlayer) {
            if (game_type == 'multi' || game_type == 'reverse') {
                if (this.x < 180) {
                    this.y += speed * 1.15 * this.selfSpeed;
                }
                if (this.x > 180) {
                    this.y += speed * .75 * this.selfSpeed;
                }
                if (this.x == 180) {
                    this.y += speed;
                    let src = this.image.src;
                    src = src.slice(-13);
                    if (src == "road_work.png") {
                        if (this.y < canvas.height / 40 && this.y > 0) { road.currentTime = 0; road.play(); }
                    }
                }
            }
            else this.y += speed * .6 * this.selfSpeed;
        }

        if (this.y > canvas.height) {
            this.dead = true;
        }
        if (this.x >= 353) {
            return this.x = 353
        }
        if (this.x <= 12) {
            return this.x = 12
        }
        if (game_type == 'arcade') {
            if (this.x == 181 && !this.isPlayer) {
                if ((this.y < canvas.height) && ((this.y + this.image.height) > 0) && (player.x > 165 && player.x < 195)) {
                    tram.currentTime = 0;
                    tram.play();
                }
            }
        }
    }

    collide(car) {
        var hit = false;

        if (this.y < car.y + (car.image.height * .8) * scale && this.y + (this.image.height * .8) * scale > car.y) //Стокновнение по высоте
        {
            if (this.x + (this.image.width * .8) * scale > car.x && this.x < car.x + (car.image.width * .8) * scale) //Столкновение по ширине
            {
                hit = true;
            }
        }

        return hit;
    }

    move(v, d) {
        if (v == "x") //движение по Х - горизонталь
        {
            d *= moveD;

            this.x += d; //смена позиции

            if (player.image.width < 59) {
                if (player.x <= 27) {
                    return player.x = 27;
                }
                if (player.x + player.image.width * scale >= canvas.width - player.image.width * scale / 2 - 5) {
                    return player.x = (canvas.width - player.image.width * scale / 2 - 5) - player.image.width * scale;
                }
            }
            if (player.image.width >= 59) {
                if (player.x <= 12) {
                    return player.x = 12;
                }
                if (player.x + player.image.width * scale >= canvas.width - 12) {
                    return player.x = (canvas.width - 12) - player.image.width * scale;
                }
            }

            if (game_type == 'multi') {
                if (player2.image.width < 59) {
                    if (player2.x <= 27) {
                        return player2.x = 27;
                    }
                    if (player2.x + player2.image.width * scale >= canvas.width - player2.image.width * scale / 2 - 5) {
                        return player2.x = (canvas.width - player2.image.width * scale / 2 - 5) - player2.image.width * scale;
                    }
                }
                if (player2.image.width >= 59) {
                    if (player2.x <= 12) {
                        return player2.x = 12;
                    }
                    if (player2.x + player2.image.width * scale >= canvas.width - 12) {
                        return player2.x = (canvas.width - 12) - player2.image.width * scale;
                    }
                }
            }

            //не позволяет машине уехать за кран канваса

        }
        else //движение по у - вертикаль
        {
            this.y += d;

            if (this.y + this.image.height * scale > canvas.height) {
                this.y -= d;
            }

            if (this.y < 0) {
                this.y = 0;
            }
        }

    }
}

resize(); //Изменяет размер Canvas при загрузке страницы

setScaleX();
setTranslateX();

window.addEventListener("resize", resize); //Подтягивает размер содержимого Canvas до размеров окна

function setScaleX() {
    if (window.innerWidth < 424) {
        scaleX = window.innerWidth / canvas.width;
    }
    if (window.innerWidth >= 424) {
        scaleX = 1;
    }
}

function setTranslateX() {
    if (window.innerWidth < 424) {
        translateX = 50 / scaleX;
    }
    if (window.innerWidth >= 424) {
        translateX = -50;
    }
}

function setScreen() {
    $("#wrapper").css("transform", "scaleX(" + scaleX + ") translateX(" + translateX + "%)").css("display", "flex");
    $("#menu").css("transform", "scaleY(" + scaleX + ")");
    $("#pause").css("transform", "scaleY(" + scaleX + ")");
    $("#timer").css("transform", "scaleY(" + scaleX + ")");
}

//Заготовка для моб. устройств
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });
name_insert.addEventListener("submit", function (e) { e.preventDefault(); return false; });
intro_video.addEventListener("play", function (e) { e.preventDefault(); return false; });

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Слушатель нажатий на клавиатуру

if (game_type == 'arcade') {
    let road_num = getRandomIntInclusive(1, 3);

    roads =
        [
            new Road(`images/road/road7_${road_num}_railways.webp`, 0),
            new Road(`images/road/road7_${road_num}_railways.webp`, canvas.height)
        ]; //Background в виде дороги

    randomRoadList = ["images/Smooth_models/tram_1.png", "images/Smooth_models/tram_2.png"];
}

else {
    roads =
        [
            new Road("images/road/road7_1.webp", 0),
            new Road("images/road/road7_1.webp", canvas.height)
        ]; //Background в виде дороги

    randomRoadList = ["images/Smooth_models/road_work.png", "images/Smooth_models/road_barrier_2.png", "images/Smooth_models/road_barrier_3.png", "images/Smooth_models/road_barrier_4.png"];
}

let objects = []; //Массив игровых объектов

function setPreloadCars() {
    if (innerWidth > 550) {
        preloadcars();
        $(".music").each(function () {
            this.preload = "auto";
        })
    }
    else if (navigator.connection.downlink > 5 && innerWidth <= 550) {
        preloadcars();
    }
}

if (game_type == 'arcade') {
    player = new Car(cars[playerCarSelect], canvas.width / 2 - 59 * scale / 2, canvas.height * playerStartHeightPos, true); //Машина игрока

}
else {
    player = new Car(cars[playerCarSelect], 262, canvas.height * playerStartHeightPos, true); //Машина игрока
    if (game_type == 'multi') {
        player2 = new Car(cars[playerCarSelect], 349, canvas.height * playerStartHeightPos, true);
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let S = getRandomIntInclusive(1, document.getElementsByClassName('music').length - 3);

function upDifficulty() {
    let interv = 6500;
    let period = interv * 12;
    diff = setInterval(() => { lowwer += 2; upper -= 2; console.log(lowwer) }, interv);
    setTimeout(() => { clearInterval(diff) }, period);
}

function start(sec) {
    if (!player.dead || !player2.dead) {
        $("#wrapper").css('display', 'flex');
        setPosY();
        document.getElementById('canvas').style.visibility = "visible";
        document.getElementById('canvas').style.cursor = 'none';
        document.getElementById('timer').style.opacity = '1';
        main_theme.pause();
        document.getElementById('main_theme' + S).play();
        timer = setInterval(update, UPDATE_TIME); //Количество обновлений игры
        $('#mobile_controls').css('display', 'flex').css("z-index", "1");
        $('#pause').css('opacity', '1').css("z-index", "2");
        $("#message_score").css("opacity", "0").css("z-index", "-1");
        if ($(".slick-slider").length) detach_content = $(".slick-slider").detach();
        timerScore = setInterval(tick, UPDATE_TIME);
        if (scoreTimer.length != 0) {
            sec = scoreTimer[scoreTimer.length - 1] * 1;
        }
        if (scoreTimer.length == 0) {
            sec = 0;
            clearInterval(diff);
            if (game_type == 'arcade') {
                lowwer = 112;
                upper = 188;
            }
            else {
                lowwer = 108;
                upper = 192;
            }
            upDifficulty();
        }
        if (sessionStorage.getItem('last down slider') == 'slider-down-camry') {
            for (let i = 0; i < document.getElementsByClassName('music').length; i++) {
                document.getElementsByClassName('music')[i].pause()
            }
            document.getElementById('main_theme' + 10).play();
        }
        else if (sessionStorage.getItem('last down slider') == 'slider-down-panamera') {
            for (let i = 0; i < document.getElementsByClassName('music').length; i++) {
                document.getElementsByClassName('music')[i].pause()
            }
            document.getElementById('main_theme' + 11).play();
        }
        else if (sessionStorage.getItem('last down slider') == 'slider-down-land_cruiser') {
            for (let i = 0; i < document.getElementsByClassName('music').length; i++) {
                document.getElementsByClassName('music')[i].pause()
            }
            document.getElementById('main_theme' + 12).play();
        }
        if (player.isPolice && window.innerWidth < 1024) {
            $("#button_special_signals").css("display", "flex");
        }
        else if (player.isPolice) {
            $("#button_special_signals").css("display", "none");
        }
        if (window.innerWidth > 1024) {
            $('#mobile_controls').css('display', 'none');
            $("#button_special_signals").css("display", "none");
        }
        function tick() {
            if (scoreTimer.length != 0) {
                $("#timer")[0].innerText = $("#timer")[0].innerText * 1;
            }
            sec = Math.round(sec + speed / 10);
            $("#timer")[0].innerText = sec;
        }
    }
}

function stop() {
    for (let i = 0; i < document.getElementsByClassName('music').length; i++) {
        document.getElementsByClassName('music')[i].pause()
    }
    for (let i = 1; i < document.getElementsByClassName('sfx').length; i++) {
        document.getElementsByClassName('sfx')[i].pause()
    }
    clearInterval(timer); //Остановка игры
    timer = null;
    clearInterval(timerScore);
    $('#mobile_controls').css('display', 'none');
    $("#button_special_signals").css("display", "none");
    clearInterval(diff);
}

/*function clearLevel() {
    document.getElementById('main_theme' + S).pause();
    alert (`Level cleared! You eneared + document.getElementById('timer').innerText + $`)
    clearInterval(timer); //Остановка игры
    timer = null;
    clearInterval(timerScore);
    timerScore = null;
} */

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return rand;
}

function update() {
    roads[0].update(roads[1]);
    roads[1].update(roads[0]);

    let carsX = [12, 96, 264, 348];
    if (game_type == 'arcade') {
        var tramX = 181;
        var allCarsX = [12, 96, tramX, 264, 348];
    }
    else { var allCarsX = [12, 96, 180, 264, 348]; }

    var randomCarsSrc = cars[Math.floor(Math.random() * cars.length)];
    if (game_type == 'reverse' || game_type == 'multi') var randomCars_reverse_Src = cars_reverse[Math.floor(Math.random() * cars.length)];
    var randomCarsX = carsX[Math.floor(Math.random() * carsX.length)];
    var xCars = RandomInteger(lowwer, upper);

    addCars();

    function addCars() {
        if (xCars == 151) {
            if (game_type == 'reverse' || game_type == 'multi') {
                if (randomCarsX < 180) {
                    randomCarsSrc = randomCars_reverse_Src;
                }
                var selfSpeed = randomInteger(8.5, 10.5) / 10;
            }
            else { var selfSpeed = randomInteger(7, 11) / 10; }
            objects.push(new Car(randomCarsSrc, randomCarsX, canvas.height * -1, false, selfSpeed));
            if (lowwer > 140) {
                return lowwer = 138
            }
            if (upper <= 160) {
                return upper = 162
            }
        }
        if (game_type == 'reverse' || game_type == 'multi') {
            if (xCars == 149) {
                let randomRoadBarrier = randomRoadList[Math.floor(Math.random() * randomRoadList.length)];
                objects.push(new Car(randomRoadBarrier, 180, canvas.height * -1, false));
            }
        }
        else {
            if ((xCars == 150) && (objects.filter(objects => objects.x == tramX).length == 0)) {
                let selfSpeed = randomInteger(11, 13) / 10;
                let randomRoadBarrier = randomRoadList[Math.floor(Math.random() * randomRoadList.length)];
                objects.push(new Car(randomRoadBarrier, tramX, canvas.height * -1, false, selfSpeed));
            }
        }
    }

    for (let i = 0; i < objects.length; i++) {
        for (let j = 0; j < objects.length; j++) {
            if (objects[i].x == objects[j].x && (objects[j].selfSpeed < objects[i].selfSpeed)) {
                if (objects[j].y + objects[j].image.height * scale + objects[j].image.height * scale / 2 > objects[i].y && (objects[i].y > 0 && objects[j].y > 0)) {
                    objects[j].selfSpeed = objects[i].selfSpeed;
                }
            }
        }
    }

    for (let q = 0; q < allCarsX.length; q++) {
        let filter_x = objects.filter(objects => objects.x == allCarsX[q]);
        if (filter_x.length >= 2) {
            for (let i = 1; i < filter_x.length; i++) {
                if (filter_x[i].y + filter_x[i].image.height * scale > filter_x[i - 1].y) {
                    filter_x[i].y = filter_x[i].y - filter_x[i].image.height * scale;
                }
            }
        }
    }

    player.update();
    if (game_type == 'multi') player2.update();

    if (player.dead || (player2 && player2.dead)) {
        stop();
    }

    var isDead = false;

    for (var i = 0; i < objects.length; i++) {
        objects[i].update();

        if (game_type == 'reverse' || game_type == 'multi') {
            if (objects[i].y > canvas.height * 2) {
                if (objects[i].dead) {
                    isDead = true;
                }
            }
        }
        else {
            if (objects[i].dead) {
                isDead = true;
            }
        }
    }

    if (isDead && objects[0].y > canvas.height) {
        objects.shift();
    }

    var hit = false;

    for (var i = 0; i < objects.length; i++) {
        hit = player.collide(objects[i]);

        if (hit) {
            stop();
            document.getElementById("timer").style.opacity = "0";
            document.getElementById('sound').play();
            for (let i = 0; i < document.getElementsByClassName('music').length; i++) {
                document.getElementsByClassName('music')[i].pause()
            }
            document.getElementById('siren_sound').pause();
            menu.style.top = "23%";
            restart_button.focus();
            push_high_score();
            player.dead = true;
            document.getElementById('resume_button').classList.add('hide_button');
            $('#pause').css('opacity', '0').css("z-index", "-1");
            showScore();
            return score;
        }
    }
    if (game_type == 'multi') {
        for (var i = 0; i < objects.length; i++) {
            hit = player2.collide(objects[i]);

            if (hit) {
                stop();
                document.getElementById("timer").style.opacity = "0";
                document.getElementById('sound').play();
                for (let i = 0; i < document.getElementsByClassName('music').length; i++) {
                    document.getElementsByClassName('music')[i].pause()
                }
                document.getElementById('siren_sound').pause();
                menu.style.top = "23%";
                restart_button.focus();
                push_high_score();
                player2.dead = true;
                document.getElementById('resume_button').classList.add('hide_button');
                $('#pause').css('opacity', '0').css("z-index", "-1");
                showScore();
                return score;
            }
        }
    }
    draw();
}

let high_score_base = [];

function draw() //Функция для прорисовки
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Очистка окна canvas

    for (var i = 0; i < roads.length; i++) {
        ctx.drawImage
            (
                roads[i].image, //картинка дороги
                0, //Первая координата X на дороге
                0, //Первая координата Y на дороге
                roads[i].image.width, //Последняя координата Х на дороге
                roads[i].image.height, //Последняя координата Y на дороге
                roads[i].x, //координата X на canvas (картинка дороги)
                roads[i].y, //координата Y на canvas (картинка дороги)
                canvas.width, //Ширина окна canvas
                canvas.height //Высота окна canvas
            );
    }

    drawCar(player);
    if (game_type == 'multi') drawCar(player2);

    for (var i = 0; i < objects.length; i++) {
        drawCar(objects[i]);
    }
}

function drawCar(car) {
    if (window.innerWidth < 424) {
        ctx.drawImage
            (
                car.image,
                0,
                0,
                car.image.width,
                car.image.height,
                car.x,
                car.y,
                car.image.width * scale,
                car.image.height * scale * window.innerWidth / canvas.width,
            );
    }
    if (window.innerWidth >= 424) {
        ctx.drawImage
            (
                car.image,
                0,
                0,
                car.image.width,
                car.image.height,
                car.x,
                car.y,
                car.image.width * scale,
                car.image.height * scale,
            );
    }
}

function turn_car(direction, object, speed) {
    let coefficient;
    console.log(coefficient);
    console.log(turn_var);
    direction == 'left' ? coefficient = -1 : coefficient = 1;
    if (object == player || object == player2) document.getElementById(`sound_wheel_${direction}`).play();

    if (!object.turning) {
        let x = 0; 
        let turn = setInterval(() => {
            object.move("x", speed * .15 * coefficient);
            x ++;
            object.turning = true;
            if (x >= 10) {
                clearInterval(turn);
                object.turning = false;
            }
        }, turn_var);
    }
}

function KeyDown(e) {
    if (timer != null) {
        if (game_type == 'multi') {
            switch (e.keyCode) {
                case 37: //Left
                    turn_car('left', player, speed);
                    break;

                case 65: //Left
                    turn_car('left', player2, speed);
                    break;

                case 39: //Right
                    turn_car('right', player, speed);
                    break;

                case 68: //Right
                    turn_car('right', player2, speed);
                    break;

                case 38: //Up
                    player.move("y", -speed);
                    break;

                case 87: //Up
                    player2.move("y", -speed);
                    break;

                case 40: //Down
                    player.move("y", speed);
                    if (sessionStorage.getItem('current car') == 'passat_1') {
                        if (player.image.src != './images/Smooth_models/' + sessionStorage.getItem('current car') + 's' + '.png') {
                            player.image.src = './images/Smooth_models/' + sessionStorage.getItem('current car') + 's' + '.png';
                            setTimeout(() => { player.image.src = './images/Smooth_models/' + sessionStorage.getItem('current car') + '.png' }, 250)
                        }
                        else {
                            return;
                        }
                    }
                    break;

                case 83: //Down
                    player2.move("y", speed);
                    break;

                case 81: //Left-Up
                    document.getElementById('sound_wheel_left_up').play();
                    let timerId81 = setInterval(() => {
                        player2.move("x", -speed * .15), player2.move("y", -speed * .25)
                    }, 25);
                    setTimeout(() => { clearInterval(timerId81); }, 250);
                    break;

                case 69: //Right-Up
                    document.getElementById('sound_wheel_right_up').play();
                    let timerId69 = setInterval(() => {
                        player2.move("x", speed * .15), player2.move("y", -speed * .25)
                    }, 25);
                    setTimeout(() => { clearInterval(timerId69); }, 250);
                    break;

                case 32: //Space
                    pause_function();
            }
        }
        else {
            switch (e.keyCode) {
                case 37: //Left
                    turn_car('left', player, speed);
                    break;

                case 65: //left
                    turn_car('left', player, speed);
                    break;

                case 39: //Right
                    turn_car('right', player, speed);
                    break;

                case 68: //Right
                    turn_car('right', player, speed);
                    break;

                case 38: //Up
                    player.move("y", -speed);
                    break;

                case 87: //Up
                    player.move("y", -speed);
                    break;

                case 40: //Down
                    player.move("y", speed);
                    if (sessionStorage.getItem('current car') == 'passat_1') {
                        if (player.image.src != './images/Smooth_models/' + sessionStorage.getItem('current car') + 's' + '.png') {
                            player.image.src = './images/Smooth_models/' + sessionStorage.getItem('current car') + 's' + '.png';
                            setTimeout(() => { player.image.src = './images/Smooth_models/' + sessionStorage.getItem('current car') + '.png' }, 250)
                        }
                        else {
                            return;
                        }
                    }
                    break;

                case 83: //Down
                    player.move("y", speed);
                    break;

                case 81: //Left-Up
                    document.getElementById('sound_wheel_left_up').play();
                    let timerId81 = setInterval(() => {
                        player.move("x", -speed * .15), player.move("y", -speed * .25)
                    }, 25);
                    setTimeout(() => { clearInterval(timerId81); }, 250);
                    break;

                case 69: //Right-Up
                    document.getElementById('sound_wheel_right_up').play();
                    let timerId69 = setInterval(() => {
                        player.move("x", speed * .15), player.move("y", -speed * .25)
                    }, 25);
                    setTimeout(() => { clearInterval(timerId69); }, 250);
                    break;

                case 32: //Space
                    pause_function();
            }
        }
    }
}

function resize() {
    canvas.width = 424;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) {
    let rand = min - 1 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function game_start(car_name, car_num, is_police) {
    console.log(is_police);
    player.isPolice = is_police;
    if (is_police) {
        police_function(car_name);
    }
    setScreen();
    eS.play();
    document.querySelector('.slider-down').style.top = '-110%';
    document.querySelector('#slider').style.top = '-110%';
    document.querySelector('#status_bar').style.top = '-110%';
    document.querySelector('#timer').style.color = 'orange';
    setTimeout(start, 500);
    sessionStorage.setItem('last down slider', `slider-down-${car_name}`);
    sessionStorage.setItem('current car', car_num);
    document.querySelector('#car_characteristics').style.bottom = '-35%';
    player.image.src = `./images/Smooth_models/${car_num}.png`;
    if (game_type == 'multi') {
        let car_count = cars_params[car_name]["car_nums"].length;
        if (car_count == 2) car_number = 2;
        else car_number = getRandomIntInclusive(1, car_count);
        let str = car_num;
        str = str.slice(0, -1);
        player2.image.src = `./images/Smooth_models/${str}${car_number}.png`;
    }
}

function restartGame() {
    document.getElementById('timer').style.opacity = "0";
    $("#message_score").css("opacity", "0").css("z-index", "-1");
    if (timer == null || (player.dead == true || (player2 && player2.dead))) {
        objects = [];
        player.x = canvas.width / 2 - player.image.width * scale / 2;
        player.y = canvas.height * playerStartHeightPos;
        player.dead = false;
        if (game_type == 'multi') {
            player.x = 262;
            player2.x = 353;
            player2.y = canvas.height * playerStartHeightPos;
            player2.dead = false;
        }
        document.getElementById('canvas').style.height = "0";
        setTimeout(() => { draw(); document.getElementById('canvas').style.height = "100%"; }, 1000);
        setTimeout(() => { start(); document.getElementById('resume_button').classList.remove('hide_button'); }, 2000);
        scoreTimer.length = 0;
    }
    this.blur();
    menu.style.top = "-70%";
}

restart_button.onclick = restartGame;

function newGameNewCar() {
    if (player.isPolice && flasher) clearInterval(flasher);
    $("#wrapper").css('display', 'none');
    if (timer == null || (player.dead == true || (player2 && player2.dead))) {
        objects = [];
        player.x = canvas.width / 2 - player.image.width * scale / 2;
        player.y = canvas.height * playerStartHeightPos;
        draw();
        player.dead = false;
        if (game_type == 'multi') {
            player.x = 262;
            player2.x = 349;
            player2.y = canvas.height * playerStartHeightPos;
            player2.dead = false;
        }
        detach_content.appendTo('body');
        document.querySelector('#status_bar').style.top = '0%';
        document.querySelector('.slider-down').style.top = '42%';
        document.querySelector('#main_theme1').currentTime = 0;
        document.querySelector('#main_theme1').play();
        $("#message_score").css("opacity", "0").css("z-index", "-1");
        scoreTimer.length = 0;
    }
    document.querySelector('#timer').style.opacity = "0";
    menu.style.top = "-70%";
    this.blur();
    document.querySelector('#canvas').style.visibility = "hidden";
    document.querySelector('#slider').style.top = status_bar.clientHeight + 'px';
    document.querySelector('#car_characteristics').style.bottom = '0%';
    setTimeout(() => { document.querySelector('#resume_button').classList.remove('hide_button'); }, 2000);
    return S = getRandomIntInclusive(1, document.getElementsByClassName('music').length);
}

garage_button.onclick = newGameNewCar;

function resume() {
    $("#message_score").css("opacity", "0").css("z-index", "-1");
    menu.style.top = "-70%";
    setTimeout(() => { start(); }, 1000);
    this.blur();
}

resume_button.onclick = resume;

pause.onclick = pause_function;

function pause_function() {
    scoreTimer.push($("#timer")[0].innerText);
    menu.style.top = "23%";
    $("#resume_button").focus()
    stop();
    $('#pause').css('opacity', '0').css("z-index", "-1");
}


sound_on.onclick = () => {
    localStorage.setItem('volume', 1);
    sound_on.style.opacity = '1';
    sound_off.style.opacity = '.5';
    for (let i = 0; i < audios.length; i++) {
        audios[i].volume = 1;
    }
}

sound_off.onclick = () => {
    localStorage.setItem('volume', 0);
    sound_on.style.opacity = '.5';
    sound_off.style.opacity = '1';
    for (let i = 0; i < audios.length; i++) {
        audios[i].volume = 0;
    }
}

function setVolume() {
    let vol = localStorage.getItem('volume');
    if (vol == 1) {
        sound_on.style.opacity = '1';
        sound_off.style.opacity = '.5';
        for (let i = 0; i < audios.length; i++) {
            audios[i].volume = 1;
            sound_wheel_right.volume = .35;
            sound_wheel_left.volume = .35;
            if (game_type == 'arcade') tram.volume = .25;
            else road.volume = .75;
        }
    }
    if (vol == 0) {
        sound_on.style.opacity = '.5';
        sound_off.style.opacity = '1';
        for (let i = 0; i < audios.length; i++) {
            audios[i].volume = 0;
        }
    }
    else {
        localStorage.setItem('volume', 1);
    }
}

start_new_game.onclick = () => {
    $('#pervue').css('opacity', '0').css('z-index', '-1')
    main_theme.play();
    last_slider = sessionStorage.getItem('last down slider');
    current_car = sessionStorage.getItem('current car');
    car_name = last_slider.split('-')[last_slider.split('-').length - 1];
    locked_cars(car_name);
    view3D(car_name, current_car.split('_')[1]);
    setTimeout(() => { $('#pervue').remove(); $('#for_name').remove(); }, 2500);
}

pervue_start.onclick = () => {
    document.documentElement.requestFullscreen();
    if (localStorage.getItem('name') != name_player.value) {
        localStorage.setItem('score', '0');
    }
    if (!sessionStorage.getItem('last down slider')) {
        sessionStorage.setItem('last down slider', `slider-down-${cars_logos[0]['key']}`);
    }
    if (!sessionStorage.getItem('current car')) {
        sessionStorage.setItem('current car', `${cars_logos[0]['key']}_1`);
    }
    setName();
    $('#name_insert').css('opacity', '0').css('z-index', '-1');
    setTimeout(() => { $('#intro_video').css('opacity', '1') }, 1000);
    setTimeout(() => { intro_video.currentTime = 0.01, intro_video.play() }, 1500);
    intro_video.ontimeupdate = () => { if (intro_video.currentTime > 4) { $('#start_new_game').css('right', '10%').focus() }; };
    last_slider = sessionStorage.getItem('last down slider');
    car_name = last_slider.split('-')[last_slider.split('-').length - 1];
    set_slider(car_name);
    set_car_characteristics(car_name);
}

$('#mobile_controls_right').click(function () {
    turn_car('right', player, speed);
});

$('#mobile_controls_left').click(function () {
    turn_car('left', player, speed);
});

button_question.onclick = () => {
    $("#keyboards_controls").css('opacity', '1').css('z-index', '3');
    setTimeout(() => { $("#keyboards_controls").css('opacity', '0').css('z-index', '-1') }, 4500);
}

button_top_score[0].onclick = () => {
    $("#high_scores").css('opacity', '1').css("display", "block");
    setTimeout(() => { $("#high_scores").css('opacity', '0').css("display", "none") }, 2500);
}

button_top_score[1].onclick = () => {
    $("#high_scores").css('opacity', '1').css("display", "block");
    setTimeout(() => { $("#high_scores").css('opacity', '0').css("display", "none") }, 2500);
}

function showScore() {
    document.querySelector('#score_count').textContent = 0;
    $("#message_score").css("opacity", "1").css('z-index', '2');
    let score = Number($("#timer")[0].innerText);
    setTimeout(() => { live_counter(score, 'score_count', 500) }, 750);
}

function preloadcars() {
    $(document).ready(function () {
        for (let i = 0; i < cars.length; i++) {
            $('#game_cars').append('<img src=' + cars[i] + '>');
            $('#game_cars').append('<img src=' + cars_reverse[i] + '>');
        }
        for (var car in cars_params) {
            if (cars_params[car]["is_3d"]) {
                for (let i = 0; i < cars_params[car]["colors"].length; i++) {
                    let image = new Image();
                    image.src = `images/Cars_main_screen/all_cars/${car}/${cars_params[car]["colors"][i]}/sprite.png`;
                    $('#game_cars').append(`<img src="${image.src}">`);
                }
            }
        }
        $('#game_cars').append('<img src=images/road/road7_1.webp>');
        if (game_type == 'arcade') {
            $('#game_cars').append('<img src=images/Smooth_models/tram_1.png>');
            $('#game_cars').append('<img src=images/Smooth_models/tram_2.png>');
            $('#game_cars').append('<img src=images/road/road7_1_railways.webp>');
            $('#game_cars').append('<img src=images/road/road7_2_railways.webp>');
            $('#game_cars').append('<img src=images/road/road7_3_railways.webp>');
        }
    })
}

setPreloadCars();

$(document).ready(function () {
    $("#name_player")[0].value = localStorage.getItem('name');
})

function live_counter(last_number, target_id) {
    let frame = 1000 / 60
    let all_time = 1500;
    let count = all_time / frame;
    let one_iteration_value = Math.round(last_number / count);
    let target = document.querySelector(`#${target_id}`);
    let i = 0;
    let counter = setInterval(() => {
        target.textContent = Number(target.textContent) + Number(one_iteration_value);
        if (i >= count) {
            clearInterval(counter);
            target.textContent = last_number;
        }
    }, frame);
    setTimeout(() => {
        clearInterval(counter);
        target.textContent = last_number;
    }, all_time);
}

function view3D(car_name = cars_logos[0]['key'], car_num = 8) {
    let is_rotating = false;
    let rotating;
    let init_value = cars_params[car_name]["init_frame"];
    let frames = cars_params[car_name]["frames"];
    car_image_width = $('.cars_img')[0].naturalWidth / frames;
    car_image_height = $('.cars_img')[0].naturalHeight;
    num.min = (frames - 1) * -1;
    num.max = frames;
    num.value = init_value;

    if (!last_i) last_i = init_value;

    window.innerWidth <= 570 ? scale_cof = window.innerWidth / 570 : scale_cof = 1;

    $('.slider-down').css('width', car_image_width * scale_cof);

    $('.cars_img').css('height', car_image_height * scale_cof);
    $('.cars_img').css('width', 'auto');
    $('.cars_img').css('left', ((car_image_width * scale_cof) * -(frames - last_i)) + 'px');

    $('#num').on('input', function () {
        let i = this.value;
        if (i <= 0) i = frames - (i * -1);
        $('.cars_img').css('left', ((car_image_width * scale_cof) * -(frames - i)) + 'px');
        last_i = i;
    });

    /*
    $('#num').on('mouseleave', function(){
        if (!is_rotating && last_i != frames && last_i != 1) {
            let i = last_i;
            is_rotating = true;
            rotating = setInterval(() => {
                i--;
                for (let k = 0; k < car_nums.length; k++) {
                    $('.cars_img').css('left', (width * - (frames - last_i)) + 'px');
                }
                last_i = i;
            }, 1000/30);
            setTimeout(()=>{
                clearInterval(rotating);
            }, 1000/30*(last_i));
        }
        return;
    });
    

    $('#num').on('mouseenter', function(){
        if (is_rotating) {
            is_rotating = false;
            clearInterval(rotating);
        }
    });
    */
}
