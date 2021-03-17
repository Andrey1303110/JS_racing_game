let audios = document.querySelectorAll("audio");
let menu = document.getElementById('menu');
let sound_on = document.getElementById('sound_on');
let sound_off = document.getElementById('sound_off');
let main_theme = document.getElementById('main_theme1');

let UPDATE_TIME = 1000 / 90;
var timer = null;
var canvas = document.getElementById("canvas"); //получем Canvas из DOM
var ctx = canvas.getContext("2d"); //получаем внутренность Canvas для работы с ним

let scale = .2; //масштаб машин

var lowwer = 110;
var upper = 190;

var scoreTimer = [];

setVolume();

document.onload = $("#name_player")[0].value = localStorage.getItem('name');

function setName() {
    var name_player = $("#name_player")[0].value;
    localStorage.setItem('name', `${name_player}`);
    high_score_base.push(`${localStorage.getItem('score')}`);
    if (localStorage.getItem('score') != undefined) {
        $("#score")[0].innerText = localStorage.getItem('score');
        $("#name")[0].innerText = localStorage.getItem('name');
    }
    if (localStorage.getItem('score') == undefined) {
        $("#score")[0].innerText = "0";
    }
    locked_cars();
}

name_player.onkeypress = (e) => {
    keyCode = (window.event) ? e.which : e.keyCode;
    if ((keyCode == 13) && (name_player.value != "")) {
        $("#pervue_start").click();
    }
}

function locked_cars() {
    if (localStorage.getItem('score') < 5500) {
        $("#slider-down-prius").css("opacity", ".5");
        $("#slider-down-prius .slick-list.draggable").css("pointer-events", "none");
        $("#lock_cars").css("z-index", "2");
        $("#slider-down-prius")[0].onclick = () => { main_theme.volume = .35; acces_denied.play(); setTimeout(() => main_theme.volume = 1, 2000) }
        lock_cars.onclick = () => acces_denied.play();
    }
    if (localStorage.getItem('score') >= 5500) {
        $("#lock_cars").css("z-index", "-1");
        $("#slider-down-prius").css("opacity", "1");
        $("#slider-down-prius .slick-list.draggable").css("pointer-events", "auto");
    }
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
    constructor(image, x, y, isPlayer) {
        this.x = x;
        this.y = y;
        this.loaded = false;
        this.dead = false;
        this.isPlayer = isPlayer;

        this.image = new Image();

        var obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
    }

    update() {
        if (!this.isPlayer) {
            this.y += speed * .65;
        }

        if (this.y > canvas.height) {
            this.dead = true;
        }
        if (this.x >= 348) {
            return this.x = 348
        }
        if (this.x <= 12) {
            return this.x = 12
        }
    }

    collide(car) {
        var hit = false;

        if (this.y < car.y + (car.image.height * .75) * scale && this.y + (this.image.height * .75) * scale > car.y) //Стокновнение по высоте
        {
            if (this.x + (this.image.width * .77) * scale > car.x && this.x < car.x + (car.image.width * .77) * scale) //Столкновение по ширине
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

            if (player.image.width < 312) {
                if (player.x <= 27) {
                    return player.x = 27;
                }
                if (player.x + player.image.width * scale >= canvas.width - 17) {
                    return player.x = (canvas.width - 17) - player.image.width * scale;
                }
            }
            if (player.image.width >= 312) {
                if (player.x <= 12) {
                    return player.x = 12;
                }
                if (player.x + player.image.width * scale >= canvas.width - 12) {
                    return player.x = (canvas.width - 12) - player.image.width * scale;
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

window.addEventListener("resize", resize); //Подтягивает размер содержимого Canvas до размеров окна

//Заготовка для моб. устройств
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });
name_insert.addEventListener("submit", function (e) { e.preventDefault(); return false; });
intro_video.addEventListener("play", function (e) { e.preventDefault(); return false; });

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Слушатель нажатий на клавиатуру

let objects = []; //Массив игровых объектов

let roads =
    [
        new Road("images/road/road7_1.jpg", 0),
        new Road("images/road/road7_1.jpg", canvas.height)
    ]; //Background в виде дороги

let cars = function () { // доступ к JSON
    var jsonTemp = null;
    $.ajax({
        'async': false,
        'url': "./js/app.json",
        'success': function (data) {
            jsonTemp = data;
        }
    });
    return jsonTemp;
}();

var player = new Car(cars[playerCarSelect], canvas.width / 2 - 312 * scale / 2, canvas.height * playerStartHeightPos, true); //Машина игрока

let speed = 9.5;

function accelerate() {
    /*setTimeout(() => {return speed = 1}, 200)
    setTimeout(() => {return speed = 2}, 400)
    setTimeout(() => {return speed = 3}, 600)
    setTimeout(() => {return speed = 4}, 800)
    setTimeout(() => {return speed = 5}, 1000)
    setTimeout(() => {return speed = 6}, 1200)
    setTimeout(() => {return speed = 7}, 1400)
    setTimeout(() => {return speed = 8}, 1600)
    setTimeout(() => {return speed = 9.5}, 1800)*/
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let S = getRandomIntInclusive(1, document.getElementsByClassName('music').length);

var diff;
var xScore;
var scoreVnumber;

function upDifficulty() {
    scoreVnumber = 0;
    let interv = 6000;
    let period = interv * 15;
    diff = setInterval(() => { lowwer += 2; upper -= 2; scoreVnumber += 1; console.log(scoreVnumber) }, interv);
    setTimeout(() => { clearInterval(diff) }, period);
}

function start(sec) {
    if (!player.dead) {
        setPosY();
        accelerate();
        document.getElementById('canvas').style.visibility = "visible";
        document.getElementById('slider').style.display = "none";
        clearCarPreloadDOM();
        setTimeout(clearSlider, 500);
        document.getElementById('canvas').style.cursor = 'none';
        document.getElementById('timer').style.opacity = '1';
        main_theme.pause();
        document.getElementById('main_theme' + S).play();
        timer = setInterval(update, UPDATE_TIME); //Количество обновлений игры
        $('#mobile_controls').css('display', 'flex');
        $('#pause').css('opacity', '1').css("z-index", "2");
        $("#message_score").css("opacity", "0").css("z-index", "-1");
        timerScore = setInterval(tick, scoreV[scoreVnumber]);
        if (scoreTimer.length != 0) {
            sec = scoreTimer[scoreTimer.length - 1] * 1;
        }
        else {
            sec = 0;
            clearInterval(diff);
            scoreVnumber = 0;
            lowwer = 110;
            upper = 190;
            upDifficulty();
        }
        function tick() {
            if (scoreTimer.length != 0) {
                $("#timer")[0].innerText = $("#timer")[0].innerText * 1;
                sec++;
                $("#timer")[0].innerText = sec;
            }
            else {
                sec++;
                $("#timer")[0].innerText = sec;
            }
        }
    }
}

function stop() {
    document.getElementById('main_theme' + S).pause();
    clearInterval(timer); //Остановка игры
    timer = null;
    clearInterval(timerScore);
    $('#mobile_controls').css('display', 'none');
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

function update() {
    roads[0].update(roads[1]);
    roads[1].update(roads[0]);

    let carsX = [12, 96, 180, 264, 348];

    var randomCarsSrc = cars[Math.floor(Math.random() * cars.length)];
    var randomCarsX = carsX[Math.floor(Math.random() * carsX.length)];
    var xCars = RandomInteger(lowwer, upper);

    addCars();

    function addCars() {
        if (xCars == 151) {
            objects.push(new Car(randomCarsSrc, randomCarsX, canvas.height * -1, false));
            overlapCars();
            if (lowwer > 140) {
                return lowwer = 136
            }
            if (upper <= 160) {
                return upper = 164
            }
        }
    }

    player.update();

    if (player.dead) {
        stop();
    }

    var isDead = false;

    for (var i = 0; i < objects.length; i++) {
        objects[i].update();

        if (objects[i].dead) {
            isDead = true;
        }
    }

    if (isDead) {
        objects.shift();
    }

    var hit = false;

    for (var i = 0; i < objects.length; i++) {
        hit = player.collide(objects[i]);

        if (hit) {
            let score = document.getElementById('timer').innerText;
            stop();
            document.getElementById("timer").style.opacity = "0";
            document.getElementById('sound').play();
            document.getElementById('main_theme' + S).pause();
            document.getElementById('siren').pause();
            menu.style.top = "30%";
            restart_button.focus();
            high_score_base.push(`${score}`);
            high_score_base.sort(function (a, b) { return b - a });
            localStorage.setItem('score', `${high_score_base[0]}`);
            $("#score")[0].innerText = localStorage.getItem('score');
            player.dead = true;
            document.getElementById('resume_button').classList.add('hide_button');
            $('#pause').css('opacity', '0').css("z-index", "-1");
            showScore();
            return score;
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

    for (var i = 0; i < objects.length; i++) {
        drawCar(objects[i]);
    }
}

function drawCar(car) {
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
            car.image.height * scale
        );
}

function KeyDown(e) {
    if (timer != null) {
        switch (e.keyCode) {
            case 37: //Left
                document.getElementById('sound_wheel_main').play();
                let timerId37 = setInterval(() => {
                    player.move("x", -speed * .15)
                }, 25);
                setTimeout(() => { clearInterval(timerId37); }, 250);
                break;

            case 65: //Left
                document.getElementById('sound_wheel_main').play();
                let timerId65 = setInterval(() => {
                    player.move("x", -speed * .15)
                }, 25);
                setTimeout(() => { clearInterval(timerId65); }, 250);
                break;

            case 39: //Right
                document.getElementById('sound_wheel_main').play();
                let timerId39 = setInterval(() => {
                    player.move("x", speed * .15)
                }, 25);
                setTimeout(() => { clearInterval(timerId39); }, 250);
                break;

            case 68: //Right
                document.getElementById('sound_wheel_main').play();
                let timerId68 = setInterval(() => {
                    player.move("x", speed * .15)
                }, 25);
                setTimeout(() => { clearInterval(timerId68); }, 250);
                break;

            case 38: //Up
                player.move("y", -speed);
                break;

            case 87: //Up
                player.move("y", -speed);
                break;

            case 40: //Down
                player.move("y", speed);
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

function resize() {
    canvas.width = 424;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) {
    let rand = min - 1 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function overlapCars() {
    if (objects.length == 2) {
        if (objects[objects.length - 2].x == objects[objects.length - 1].x) {
            if (objects[objects.length - 2].y - objects[objects.length - 1].y <= objects[objects.length - 2].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
    }
    if (objects.length == 3) {
        if (objects[objects.length - 2].x == objects[objects.length - 1].x) {
            if (objects[objects.length - 2].y - objects[objects.length - 1].y <= objects[objects.length - 2].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
        if (objects[objects.length - 3].x == objects[objects.length - 1].x) {
            if (objects[objects.length - 3].y - objects[objects.length - 1].y <= objects[objects.length - 3].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
    }
    if (objects.length >= 4) {
        if (objects[objects.length - 2].x == objects[objects.length - 1].x) {
            if (objects[objects.length - 2].y - objects[objects.length - 1].y <= objects[objects.length - 2].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
        if (objects[objects.length - 3].x == objects[objects.length - 1].x) {
            if (objects[objects.length - 3].y - objects[objects.length - 1].y <= objects[objects.length - 3].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
        if (objects[objects.length - 4].x == objects[objects.length - 1].x) {
            if (objects[objects.length - 4].y - objects[objects.length - 1].y <= objects[objects.length - 4].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
        if (objects[objects.length - 4].x == objects[objects.length - 2].x) {
            if (objects[objects.length - 4].y - objects[objects.length - 2].y <= objects[objects.length - 4].image.height * scale)  //Стокновнение по высоте 
            {
                objects.pop();
                console.log("с экрана будет удалёна машинка");
            }
        }
    }
}

function restartGame() {
    document.getElementById('timer').style.opacity = "0";
    $("#message_score").css("opacity", "0").css("z-index", "-1");
    if (timer == null || player.dead == true) {
        objects = [];
        player.x = canvas.width / 2 - player.image.width * scale / 2;
        player.y = canvas.height * playerStartHeightPos;
        player.dead = false;
        document.getElementById('canvas').style.height = "0";
        setTimeout(() => { draw(); document.getElementById('canvas').style.height = "100vh"; }, 1000);
        setTimeout(() => { start(); document.getElementById('resume_button').classList.remove('hide_button'); }, 2000);
        scoreTimer.length = 0;
    }
    this.blur();
    menu.style.top = "-50%";
}

restart_button.onclick = restartGame;

function newGameNewCar() {
    let last_slider = sessionStorage.getItem('last down slider');
    if (timer == null || player.dead == true) {
        objects = [];
        player.x = canvas.width / 2 - player.image.width * scale / 2;
        player.y = canvas.height * playerStartHeightPos;
        draw();
        player.dead = false;
        setTimeout(showSlider, 500);
        setTimeout(() => { document.getElementById(`${last_slider}`).style.top = '50%' }, 1000);
        document.getElementById('main_theme1').currentTime = 0;
        document.getElementById('main_theme1').play();
        $("#message_score").css("opacity", "0").css("z-index", "-1");
        scoreTimer.length = 0;
    }
    document.getElementById('timer').style.opacity = "0";
    menu.style.top = "-50%";
    this.blur();
    document.getElementById('canvas').style.visibility = "hidden";
    document.getElementById('slider').style.top = "8%";
    setTimeout(() => { document.getElementById('resume_button').classList.remove('hide_button'); }, 2000);
    locked_cars();
    return S = getRandomIntInclusive(1, document.getElementsByClassName('music').length);
}

garage_button.onclick = newGameNewCar;

function resume() {
    $("#message_score").css("opacity", "0").css("z-index", "-1");
    menu.style.top = "-50%";
    setTimeout(() => { start(); }, 1000);
    this.blur();
}

resume_button.onclick = resume;


pause.onclick = pause_function;

function pause_function() {
    scoreTimer.push($("#timer")[0].innerText);
    menu.style.top = "30%";
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
    setTimeout(() => { $('#pervue').remove(); $('#for_name').remove() }, 2500)
}

pervue_start.onclick = () => {
    if (localStorage.getItem('name') != name_player.value) {
        localStorage.setItem('score', '0');
    }
    setName();
    $('#name_insert').css('opacity', '0').css('z-index', '-1');
    setTimeout(() => { $('#intro_video').css('opacity', '1') }, 1000)
    $(document).ready(function () {
        setTimeout(() => { $('#intro_video')[0].play() }, 1500);
        setTimeout(() => { $('#start_new_game').css('right', '10%').focus() }, 5500);
    });
}

mobile_controls_left.onclick = () => {
    document.getElementById('sound_wheel_main').play();
    let left = setInterval(() => {
        player.move("x", -speed * .15)
    }, 25);
    setTimeout(() => { clearInterval(left); }, 250);
}

mobile_controls_right.onclick = () => {
    document.getElementById('sound_wheel_main').play();
    let right = setInterval(() => {
        player.move("x", speed * .15)
    }, 25);
    setTimeout(() => { clearInterval(right); }, 250);
}

button_question.onclick = () => {
    $("#keyboards_controls").css('opacity', '1').css('z-index', '2');
    setTimeout(() => { $("#keyboards_controls").css('opacity', '0') }, 4000);
    setTimeout(() => { $("#keyboards_controls").css('z-index', '-1') }, 5500)
}

button_top_score[0].onclick = () => {
    $("#high_scores").css('z-index', '1').css('opacity', '1');
    setTimeout(() => { $("#high_scores").css('opacity', '0') }, 3000);
    setTimeout(() => { $("#high_scores").css('z-index', '-1') }, 5500);
}

button_top_score[1].onclick = () => {
    $("#high_scores").css('z-index', '1').css('opacity', '1');
    setTimeout(() => { $("#high_scores").css('opacity', '0') }, 3000);
    setTimeout(() => { $("#high_scores").css('z-index', '-1') }, 5500);
}

function showScore() {
    $("#message_score")[0].innerText = `your score is ` + $("#timer")[0].innerText;
    $("#message_score").css("opacity", "1").css('z-index', '1');
}
