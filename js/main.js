const intro_video = $('#intro_video')[0];
const audios = document.querySelectorAll("audio");
const musics = document.querySelectorAll('.music')
const menu = document.getElementById('menu');
const sound_on = document.getElementById('sound_on');
const sound_off = document.getElementById('sound_off');
const main_theme = document.getElementById('main_theme');

const UPDATE_TIME = 1000 / 90;
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

const scale = 1; //масштаб машин

var lowwer;
var upper;

var scoreTimer = [];
var detach_content = '';

var road_num;
var roads;
var randomRoadList;

var last_i;
var car_image_width;

var isStarted = false;

var maxSpeed;
var minSpeed;

let barrierSize = 82;
let tramSize = 72;

setVolume();

function play_music(number, isRandom) {
    if (!isRandom) number = number;
    else number = getRandomIntInclusive(0, musics.length - 4);
    for (let i = 0; i < musics.length; i++) {
        musics[i].pause();
        musics[i].currentTime = 0;
    }
    musics[number].play();
    singer = musics[number].dataset.singer;
    song_name = musics[number].dataset.name;
    console.log(singer + ' ' + song_name);
}

function setName() {
    var name_player = $("#name_player")[0].value;
    localStorage.setItem('name', `${name_player}`);
    high_score_base.push(`${localStorage.getItem('score')}` * 1);
    nickname.innerText = name_player;
    if (name_player == "master") {
        localStorage.setItem('cash', "9999999");
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
    user_cash = Number(localStorage.getItem('cash'));
    balance.innerText = user_cash;
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
    balance.innerText = user_cash;
    $("#score")[0].innerText = localStorage.getItem('score');
}

function set_cars_nums(car_name) {
    purchased_cars = localStorage.getItem('purchased_cars').split(',');
    if (car_name) purchased_cars.push(car_name);
    if (purchased_cars.indexOf("") >= 0) {
        purchased_cars.splice(purchased_cars.indexOf(""), 1);
    }
    localStorage.setItem('purchased_cars', purchased_cars);
    cars_nums.innerText = `${purchased_cars.length}/${cars_logos.length}`;
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
    constructor(image, x, y, isPlayer, selfSpeed, isNotCar) {
        this.x = x;
        this.y = y;
        this.loaded = false;
        this.dead = false;
        this.isPlayer = isPlayer;
        this.isPolice = false;
        this.selfSpeed = selfSpeed;
        this.turning = false;
        this.isNotCar = isNotCar;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    update() {
        if (!this.isPlayer) {
            if (game_type == 'multi' || game_type == 'reverse') {
                if (this.isNotCar) {
                    this.y += speed;
                    let src = this.image.src.split("/")[this.image.src.split("/").length-1];
                    if (src.includes('work')) {
                        if (this.y < canvas.height / 40 && this.y > 0) { road.currentTime = 0; road.play(); }
                    }
                }
                else {
                    if (this.x < 180) {
                        this.y += speed * 1.15 * this.selfSpeed;
                    }
                    else if (this.x > 180) {
                        this.y += speed * .75 * this.selfSpeed;
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
            if (this.isNotCar) {
                if ((this.y < canvas.height) && ((this.y + this.image.height) > 0) && (player.x > 165 && player.x < 195)) {
                    tram.currentTime = 0;
                    tram.play();
                }
            }
        }
    }

    collide(car) {
        var hit = false;

        if (this.y < car.y + (car.image.height * .75) * scale && this.y + (this.image.height * .75) * scale > car.y) //Стокновнение по высоте
        {
            if (this.x + (this.image.width * .75) * scale > car.x && this.x < car.x + (car.image.width * .75) * scale) //Столкновение по ширине
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
            else if (player.image.width >= 59) {
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
                else if (player2.image.width >= 59) {
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

            else if (this.y < 0) {
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
    else if (window.innerWidth >= 424) {
        scaleX = 1;
    }
}

function setTranslateX() {
    if (window.innerWidth < 424) {
        translateX = 50 / scaleX;
    }
    else if (window.innerWidth >= 424) {
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

function set_road() {
    if (game_type == 'arcade') {
        let road_num = getRandomIntInclusive(1, 3);
    
        roads = [
                new Road(`images/road/road7_${road_num}_railways.webp`, 0),
                new Road(`images/road/road7_${road_num}_railways.webp`, canvas.height)
            ]; //Background в виде дороги
    
        randomRoadList = ["images/Smooth_models/tram_1.png", "images/Smooth_models/tram_2.png"];
    }
    
    else {
        roads = [
                new Road("images/road/road7_1.webp", 0),
                new Road("images/road/road7_1.webp", canvas.height)
            ]; //Background в виде дороги
    
        randomRoadList = ["images/Smooth_models/road_objects/road_barrier_1.png", "images/Smooth_models/road_objects/road_barrier_2.png", "images/Smooth_models/road_objects/road_barrier_3.png", "images/Smooth_models/road_objects/road_work_1.png", "images/Smooth_models/road_objects/road_work_2.png", "images/Smooth_models/road_objects/road_work_3.png"];
    }
}

function set_player(selectedCar = playerCarSelect) {
    player = new Car(cars[selectedCar], 262, canvas.height * playerStartHeightPos, true); //Машина игрока
    if (game_type == 'multi') {
        player2 = new Car(cars[selectedCar], 349, canvas.height * playerStartHeightPos, true); //Машина второго игрока
    }
}

let objects = []; //Массив игровых объектов

function setPreloadCars() {
    if (innerWidth > 550) {
        preloadcars();
        $(musics).each(function () {
            this.preload = "auto";
        })
    }
    else if (navigator.connection.downlink > 5 && innerWidth <= 550) {
        preloadcars();
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function upDifficulty() {
    let interv = 6000;
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
        play_music(0, true);
        timer = setInterval(update, UPDATE_TIME); //Количество обновлений игры
        $('#mobile_controls').css('display', 'flex').css("z-index", "1");
        $('#pause').css('opacity', '1').css("z-index", "2");
        $("#message_score").css("opacity", "0").css("z-index", "-1");
        if ($(".slick-slider").length) detach_content = $(".slick-slider").detach();
        timerScore = setInterval(tick, UPDATE_TIME*2);
        if (scoreTimer.length != 0) {
            sec = scoreTimer[scoreTimer.length - 1] * 1;
        }
        else if (scoreTimer.length == 0) {
            sec = 0;
            clearInterval(diff);
            if (game_type == 'multi') {
                lowwer = 100;
                upper = 200;
            }
            else {
                lowwer = 106;
                upper = 194;
            }
            upDifficulty();
        }
        if (sessionStorage.getItem('last down slider') == 'slider-down-camry') {
            play_music(9, false);
        }
        else if (sessionStorage.getItem('last down slider') == 'slider-down-panamera') {
            play_music(10, false);
        }
        else if (sessionStorage.getItem('last down slider') == 'slider-down-land_cruiser') {
            play_music(11, false);
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
                $("#timer")[0].innerText = Number($("#timer")[0].innerText);
            }
            if (game_type == 'reverse') {
                sec = Math.round(sec + speed / 5);
            }
            else {
                sec = Math.round(sec + speed / 10);
            }
            $("#timer")[0].innerText = sec;
        }
    }
}

function stop() {
    for (let i = 0; i < musics.length; i++) {
        musics[i].pause();
    }
    for (let i = 1; i < document.getElementsByClassName('sfx').length; i++) {
        document.getElementsByClassName('sfx')[i].pause();
        document.getElementsByClassName('sfx')[i].currentTime = 0;
    }
    clearInterval(timer); //Остановка игры
    timer = null;
    clearInterval(timerScore);
    isStarted = false;
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
        var allCarsX = [12, 96, 180, 264, 348];
    }
    else { var allCarsX = [12, 96, (canvas.width/2) - barrierSize/2, 264, 348]; }

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
            objects.push(new Car(randomCarsSrc, randomCarsX, canvas.height * -1, false, selfSpeed, false));
            if (lowwer > 140) {
                return lowwer = 138
            }
            if (upper <= 160) {
                return upper = 162
            }
        }
        if (game_type == 'reverse' || game_type == 'multi') {
            if (xCars == 150 && (Math.random() >= .5) ) {
                let randomRoadBarrier = randomRoadList[Math.floor(Math.random() * randomRoadList.length)];
                position = allCarsX[2];
                objects.push(new Car(randomRoadBarrier, position, canvas.height * -1, false, 0, true));
            }
        }
        else {
            if ((xCars == 150) && (objects.filter(objects => objects.x == (canvas.width/2) - tramSize/2).length == 0)) {
                let selfSpeed = randomInteger(11, 13) / 10;
                let randomRoadBarrier = randomRoadList[Math.floor(Math.random() * randomRoadList.length)];
                objects.push(new Car(randomRoadBarrier, (canvas.width/2) - tramSize/2, canvas.height * -1, false, selfSpeed, true));
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
                    filter_x[i].y = filter_x[i].y - filter_x[i-1].image.height * scale;
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
    direction == 'left' ? coefficient = -1 : coefficient = 1;
    if (object == player || object == player2) document.getElementById(`sound_wheel_${direction}`).play();

    if (!object.turning) {
        let x = 0; 
        let one_move = (canvas.width - 4) / 5;
        let turn = setInterval(() => {
            object.move("x", one_move/100 * coefficient * 1.5);
            x++;
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
                    //player.move("y", -speed);
                    if (speed >= maxSpeed) return
                    else speed += car_speed/10;
                    break;

                case 87: //Up
                    //player.move("y", -speed);
                    if (speed >= maxSpeed) return
                    else speed += car_speed/10;
                    break;

                case 40: //Down
                    //player.move("y", speed);
                    if (speed <= minSpeed) return
                    else speed -= car_speed/10;
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
                    //player.move("y", speed);
                    if (speed <= minSpeed) return
                    else speed -= car_speed/10;
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
    if (!isStarted) {
        isStarted = true;
        set_road();
        set_player(playerCarSelect);
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
            else {
                car_number = getRandomIntInclusive(1, car_count);
                if (car_number == car_num.split("_")[1]) {
                    car_number = getRandomIntInclusive(1, car_count);
                }
            }
            let str = car_num;
            str = str.slice(0, -1);
            player2.image.src = `./images/Smooth_models/${str}${car_number}.png`;
        }
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
        play_music(0, false);
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
    play_music(0, false);
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
        localStorage.setItem('purchased_cars', []);
        localStorage.setItem('score', '0');
        localStorage.setItem('cash', '0');
    }
    if (!sessionStorage.getItem('last down slider')) {
        sessionStorage.setItem('last down slider', `slider-down-${cars_logos[0]['key']}`);
    }
    if (!sessionStorage.getItem('current car')) {
        sessionStorage.setItem('current car', `${cars_logos[0]['key']}_1`);
    }
    (!sessionStorage.getItem('last down slider')) ? last_slider = sessionStorage.getItem('last down slider', `slider-down-${cars_logos[0]['key']}`) : last_slider = sessionStorage.getItem('last down slider');
    car_name = last_slider.split('-')[last_slider.split('-').length - 1];
    for (let i = 0; i < cars_logos.length; i++) {
        if (cars_logos[i].key == car_name) init_slide = i; 
    }
    $('.up_slider').slick('slickGoTo', init_slide);
    setName();
    set_cars_nums(false);
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
    setTimeout(() => { live_counter(score, 'score_count', '+') }, 750);
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
        $('#game_cars').append('<img src=images/Smooth_models/tram_1.png>');
        $('#game_cars').append('<img src=images/Smooth_models/tram_2.png>');
        $('#game_cars').append('<img src=images/road/road7_1_railways.webp>');
        $('#game_cars').append('<img src=images/road/road7_2_railways.webp>');
        $('#game_cars').append('<img src=images/road/road7_3_railways.webp>');

        $('#game_cars').append('<img src=images/Smooth_models/road_objects/road_barrier_1.png>');
        $('#game_cars').append('<img src=images/Smooth_models/road_objects/road_barrier_2.png>');
        $('#game_cars').append('<img src=images/Smooth_models/road_objects/road_barrier_3.png>');
        $('#game_cars').append('<img src=images/Smooth_models/road_objects/road_work_1.png>');
        $('#game_cars').append('<img src=images/Smooth_models/road_objects/road_work_2.png>');
        $('#game_cars').append('<img src=images/Smooth_models/road_objects/road_work_3.png>');
    })
}

setPreloadCars();

$(document).ready(function () {
    $("#name_player")[0].value = localStorage.getItem('name');
})

function live_counter(last_number, target_id, direction) {
    let frame = 1000 / 60
    let all_time = 1500;
    let count = all_time / frame;
    let target = document.querySelector(`#${target_id}`);
    let one_iteration_value = Math.round(last_number / count);
    if (direction == '-') one_iteration_value = Math.round((Number(target.textContent) - Number(last_number)) / count)
    let i = 0;

    let counter = setInterval(() => {
        if (direction == '+') {
            target.textContent = Number(target.textContent) + Number(one_iteration_value);
        }
        else if (direction == '-') {
            target.textContent = Number(target.textContent) - Number(one_iteration_value);
        }
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

const speed_to_turn = 57;

var moveD, speed, turn_var;

let eS = document.getElementById('engine_start');

function locked_cars(car_name = cars_logos[0]['key']) {
    if (document.querySelector("#car_buy img")) document.querySelector("#car_buy img").remove();
    purchased_cars = localStorage.getItem('purchased_cars').split(',');
    
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
            img.src = "images/icons/car_key.png";
            document.querySelector("#car_buy").append(img);
            img.addEventListener('click', function(){
                user_cash = Number(localStorage.getItem('cash'));
                user_cash = user_cash - Number(this.dataset['price']);
                live_counter(user_cash, 'balance', '-');
                localStorage.setItem('cash', user_cash);
                set_cars_nums(car_name);
                unlock();
            }, false);
        }
    }

    speed = cars_params[car_name]['speed'];
    //moveD = speed_to_turn / speed;
    moveD = 6.75; 
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
            if (((player.x - objects[i].x) <= 17) && ((player.x - objects[i].x) >= -17) && (!objects[i].isNotCar)) {
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
            if (game_type == 'multi') {
                if (((player2.x - objects[i].x) <= 17) && ((player2.x - objects[i].x) >= -17 && (!objects[i].isNotCar))) {
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

    maxSpeed = car_speed;
    minSpeed = min_speed * .8;
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
    cars_codeColors = cars_params[car_name]['codeColors'];
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
        div.style.backgroundColor = cars_codeColors[i];
        colors.appendChild(div);
    }

    $('#colors div').on('click', function () {
        let path = document.querySelector('.cars_img').src.split('/');
        if (path[path.length - 2] == this.dataset['color']) return;
        else {
            path[path.length - 2] = this.dataset['color'];

            $('.cars_img').fadeOut(925).promise().done(function(){
                $('.cars_img').attr("src", path.join('/'));
                $('.cars_img').fadeIn(925);
            });
            spray.play();

            let car_name = $('.cars_img')[0].name;
            document.querySelector('.cars_img').alt = `${car_name}_${this.dataset.car_num}`;
            document.querySelector('.cars_img').id = `${car_name}_${this.dataset.car_num}`;
            document.querySelector('.cars_img').dataset['is_police'] = this.dataset.is_police
            let frames = cars_params[car_name]["frames"];
            let i = last_i;
            window.innerWidth <= 570 ? scale_cof = window.innerWidth / 570 : scale_cof = 1;
            if (i <= 0) i = frames - (i * -1);
            let position = scale_cof * car_image_width * - (frames - i) + 'px';
            $('.cars_img').css('left', position);
        }
    });

    $(".cars_img").click(function () {
        car_name = this.name;
        alt = this.alt;
        is_police = this.dataset.is_police;
        is_police == 'true' ? is_police = true : is_police = false;
        $("#game_types").addClass('active');
        $("#game_types #close").on("click", function(){
            $("#game_types").removeClass('active');
        })
        $(".game_types-select").on("click", function(){
            game_type = this.dataset['game_type'];
            if (game_type) {
                game_start(car_name, alt, is_police);
                $("#game_types").removeClass('active');
                $(".game_types-select").off("click");
            }
        })
    });
}

