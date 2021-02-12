let audios = document.querySelectorAll("audio");
let menu = document.getElementById('menu');
let sound_on = document.getElementById('sound_on');
let sound_off = document.getElementById('sound_off');

let UPDATE_TIME = 1000 / 60;
var timer = null;
var canvas = document.getElementById("canvas"); //получем Canvas из DOM
var ctx = canvas.getContext("2d"); //получаем внутренность Canvas для работы с ним

let scale = .2; //масштаб машин


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
            this.y += speed;
        }

        if (this.y > canvas.height) {
            this.dead = true;
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
                if (player.x < 27) {
                    return player.x = 27;
                }
                if (player.x + player.image.width * scale > 415) {
                    return player.x = 415 - player.image.width * scale;
                }
            }
            if (player.image.width >= 312) {
                if (player.x <= 12) {
                    return player.x = 15;
                }
                if (player.x + player.image.width * scale > 428) {
                    return player.x = 428 - player.image.width * scale;
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

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Слушатель нажатий на клавиатуру

let objects = []; //Массив игровых объектов

let roads =
    [
        new Road("images/road7.jpg", 0),
        new Road("images/road7.jpg", canvas.height)
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

var speed = 9.5;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let S = getRandomIntInclusive(1, document.getElementsByClassName('music').length);

function start(sec) {
    if (!player.dead) {
        document.getElementById('canvas').style.visibility = "visible";
        document.getElementById('slider').style.display = "none";
        clearCarPreloadDOM();
        setTimeout(clearSlider, 500);
        document.getElementById('canvas').style.cursor = 'none';
        document.getElementById('timer').style.opacity = '1';
        document.getElementById('main_theme1').pause();
        document.getElementById('main_theme' + S).play();
        timer = setInterval(update, UPDATE_TIME); //Количество обновлений игры
        sec = 0;
        timerScore = setInterval(tick, scoreV[1]);
        function tick() {
            sec++;
            document.getElementById("timer").
                childNodes[0].nodeValue = sec;
        }
    }
}

function stop() {
    document.getElementById('main_theme' + S).pause();
    clearInterval(timer); //Остановка игры
    timer = null;
    clearInterval(timerScore);
    selectVolume();
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

    let carsX = [14, 100, 189, 278, 366];

    var randomCarsSrc = cars[Math.floor(Math.random() * cars.length)];
    var randomCarsX = carsX[Math.floor(Math.random() * carsX.length)];
    var xCars = RandomInteger(125, 185);

    addCars();

    function addCars() {
        if (xCars == 151) {
            objects.push(new Car(randomCarsSrc, randomCarsX, canvas.height * -1, false))
            /*for (let i = 1; i < objects[objects.length]; i++) {
                if (((objects[objects.length - 1].x == (objects[objects.length - i].x)) || ((objects[objects.length - 1].y) > ((objects[objects.length - i].y) - (objects[objects.length - 1].image.height))))) {
                    objects[objects.length - 1].dead = true;
                }
            }*/
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
            stop();
            document.getElementById("timer").style.opacity = "0";
            document.getElementById('sound').play();
            document.getElementById('main_theme' + S).pause();
            document.getElementById('siren').pause();
            menu.style.top = "30%";
            //alert(`Crash! \nPress F5 for restart \nYour eneared ` + document.getElementById('timer').innerText + `$`);
            player.dead = true;
            document.getElementById('resume_button').classList.add('hide_button');
        }
    }
    draw();
}

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
                stop();
                menu.style.top = "30%";
                break;
            case 75: //K
                if (document.getElementById('main_theme' + S).volume == 1) {
                    for (let i = 0; i < audios.length; i++) {
                        audios[i].volume = 0;
                    }
                }
                break;
            case 76: //L
                if (document.getElementById('main_theme' + S).volume == 0) {
                    for (let i = 0; i < audios.length; i++) {
                        audios[i].volume = 1;
                    }
                }
                break;
        }
    }
}

function resize() {
    canvas.width = 440;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) {
    let rand = min - 1 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/*function overlapCars() {
    for (let i = 1; i <= objects.length; i++) {
        if (objects[objects.length-i].x == objects[objects.length-1].x) {
            for (let i = 1; i <= objects.length; i++) {
                if ((objects[objects.length-i].y - (objects[objects.length-1].y) <= (objects[objects.length-i].image.height * scale)))  //Стокновнение по высоте
                    {
                objects.pop();
                console.log("с экрана будет удалён " + objects[objects.length-1].image.src + "X = " + objects[objects.length-1].x)
                }
            }    
        }
}   } 
*/

function restartGame() {
    document.getElementById('timer').style.opacity = "0";
    if (timer == null || player.dead == true) {
        objects = [];
        player.x = canvas.width / 2 - player.image.width * scale / 2;
        player.y = canvas.height * playerStartHeightPos;
        player.dead = false;
        document.getElementById('canvas').style.height = "0";
        setTimeout(() => { draw() }, 1000);
        setTimeout(() => { start() }, 2000);
        setTimeout(() => { document.getElementById('canvas').style.height = "100vh"; }, 1000);
        setTimeout(() => { document.getElementById('resume_button').classList.remove('hide_button'); }, 2000);
    }
    this.blur();
    menu.style.top = "-50%";
}

restart_button.onclick = restartGame;

function newGameNewCar() {
    if (timer == null || player.dead == true) {
        objects = [];
        player.x = canvas.width / 2 - player.image.width * scale / 2;
        player.y = canvas.height * playerStartHeightPos;
        draw();
        player.dead = false;
        showSlider();
        document.getElementById('main_theme1').currentTime = 0;
        document.getElementById('main_theme1').play();
    }
    menu.style.top = "-50%";
    this.blur();
    document.getElementById('canvas').style.visibility = "hidden";
    document.getElementById('slider').style.top = "8%";
    setTimeout(() => { document.getElementById('resume_button').classList.remove('hide_button'); }, 2000);
    return S = getRandomIntInclusive(1, document.getElementsByClassName('music').length);
}

garage_button.onclick = newGameNewCar;

function resume() {
    menu.style.top = "-50%";
    start();
    this.blur();
}

resume_button.onclick = resume;

function selectVolume() {
    if (document.getElementById('main_theme' + S).volume == 1) {
        sound_on.style.opacity = '1';
        sound_off.style.opacity = '.5';
    }
    if ((document.getElementById('main_theme' + S).volume == 0)) {
        sound_on.style.opacity = '.5';
        sound_off.style.opacity = '1';
    }
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

function setVolume () {
    let vol = localStorage.getItem('volume');
    if (vol == 1) {
        document.getElementById('main_theme1').play();
    }
    else {
        for (let i = 0; i < audios.length; i++) {
            audios[i].volume = 0;
        }
    }
}

setVolume();
localStorage.setItem('volume', 1);


