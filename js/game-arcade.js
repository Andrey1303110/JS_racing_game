var playerScore = document.getElementById('timer').innerText;

function init() {
    sec = 0;
    setInterval(tick, 33);
}

function tick() {
    sec++;
    document.getElementById("timer").
        childNodes[0].nodeValue = sec;
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

    Update(road) {
        this.y += speed;//изображание идёт вниз при каждом новом кадре

        if (this.y > window.innerHeight) //y не может уйти влево за экран
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

    Update() {
        if (!this.isPlayer) {
            this.y += speed;
        }

        if (this.y > canvas.height) {
            this.dead = true;
        }
    }

    Collide(car) {
        var hit = false;

        if (this.y < car.y + (car.image.height * .75) * scale && this.y + (this.image.height * .75) * scale > car.y) //If there is collision by y
        {
            if (this.x + (this.image.width * .8) * scale > car.x && this.x < car.x + (car.image.width * .8) * scale) //If there is collision by x
            {
                hit = true;
            }
        }

        return hit;
    }

    Move(v, d) {
        if (v == "x") //движение по Х - горизонталь
        {
            d *= 8.8;

            this.x += d; //смена позиции

            //не позволяет машине уехать за кран канваса
            if (this.x <= 14) {
                this.x = 14;
            }
            if (this.x >= 366) {
                this.x = 366;
            }
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


const UPDATE_TIME = 1000 / 55;

var timer = null;

var canvas = document.getElementById("canvas"); //получем Canvas из DOM
var ctx = canvas.getContext("2d"); //получаем внутренность Canvas для работы с ним

var scale = 0.2; //масштаб машин

Resize(); //Изменяет размер Canvas при загрузке страницы

window.addEventListener("resize", Resize); //Подтягивает размер содержимого Canvas до размеров окна

//Заготовка для моб. устройств
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Слушатель нажатий на клавиатуру

var objects = []; //Массив игровых объектов

var roads =
    [
        new Road("images/road7.jpg", 0),
        new Road("images/road7.jpg", canvas.height)
    ]; //Background в виде дороги

let player = new Car("images/car_player_leon_new.png", canvas.width / 2 - 30, canvas.height * .77, true); //Машина игрока


var speed = 10;

Start();


function Start() {
    if (!player.dead) {
        timer = setInterval(Update, UPDATE_TIME); //Количество обновлений игры
    }

}

function Stop() {
    clearInterval(timer); //Остановка игры
    timer = null;
}

function Update() {
    roads[0].Update(roads[1]);
    roads[1].Update(roads[0]);

    let cars = [
        "images/Smooth models/Leon/car_1.png",
        "images/Smooth models/Leon/car_2.png",
        "images/Smooth models/Leon/car_3.png",
        "images/Smooth models/Leon/car_4.png",
        "images/Smooth models/Leon/car_5.png",
        "images/Smooth models/Leon/car_6.png",
        "images/Smooth models/Leon/car_7.png",
        "images/Smooth models/Tesla/car_1.png",
        "images/Smooth models/Tesla/car_2.png",
        "images/Smooth models/Tesla/car_3.png",
        "images/Smooth models/Tesla/car_4.png",
        "images/Smooth models/Tesla/car_5.png",
        "images/Smooth models/Tesla/car_6.png",
        "images/Smooth models/Tesla/car_7.png",
        "images/Smooth models/i8/car_1.png",
        "images/Smooth models/i8/car_2.png",
        "images/Smooth models/i8/car_3.png",
        "images/Smooth models/i8/car_4.png",
        "images/Smooth models/i8/car_5.png",
        "images/Smooth models/i8/car_6.png",
        "images/Smooth models/i8/car_7.png",
        "images/Smooth models/Touareg/car_1.png",
        "images/Smooth models/Touareg/car_2.png",
        "images/Smooth models/Touareg/car_3.png",
        "images/Smooth models/Touareg/car_4.png",
        "images/Smooth models/Touareg/car_5.png",
        "images/Smooth models/2008/car_1.png",
        "images/Smooth models/2008/car_2.png",
        "images/Smooth models/2008/car_3.png",
        "images/Smooth models/2008/car_4.png",
        "images/Smooth models/2008/car_5.png",
        "images/Smooth models/2008/car_6.png",
        "images/Smooth models/2008/car_7.png",
        "images/Smooth models/Other/car_1.png",
        "images/Smooth models/Other/car_2.png",
        "images/Smooth models/Other/car_3.png",
    ];

    let randomCarsSrc = cars[Math.floor(Math.random() * cars.length)];

    if (RandomInteger(151, 350) == 199) //создание машины
    {
        objects.push(new Car(randomCarsSrc, 14, (canvas.height - 100) * -1, false));
    }

    if (RandomInteger(351, 550) == 399) //создание машины
    {
        objects.push(new Car(randomCarsSrc, 100, (canvas.height - 100) * -1, false));
    }

    if (RandomInteger(551, 750) == 599) //создание машины
    {
        objects.push(new Car(randomCarsSrc, 189, (canvas.height - 100) * -1, false));
    }

    if (RandomInteger(751, 950) == 799) //создание машины
    {
        objects.push(new Car(randomCarsSrc, 278, (canvas.height - 100) * -1, false));
    }

    if (RandomInteger(951, 1150) == 999) //создание машины
    {
        objects.push(new Car(randomCarsSrc, 366, (canvas.height - 100) * -1, false));
    }

    player.Update();

    if (player.dead) {
        alert(`Crash! \nPress F5 for restart \nYour score is ` + document.getElementById('timer').innerText);
        Stop();
    }

    var isDead = false;

    for (var i = 0; i < objects.length; i++) {
        objects[i].Update();

        if (objects[i].dead) {
            isDead = true;
        }
    }

    if (isDead) {
        objects.shift();
    }

    var hit = false;

    for (var i = 0; i < objects.length; i++) {
        hit = player.Collide(objects[i]);

        if (hit) {
            document.getElementById('sound').play();
            Stop();
            player.dead = true;
            alert(`Crash! \nPress F5 for restart \nYour score is ` + document.getElementById('timer').innerText);
            /*let question = prompt('Желаете начать заново?');
            if question != 'No' || 'no' || 'Нет' || 'нет' {
            }*/
        }
    }

    Draw();
}

function Draw() //Функция для прорисовки
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
                canvas.height, //Высота окна canvas
            );
    }

    DrawCar(player);

    for (var i = 0; i < objects.length; i++) {
        DrawCar(objects[i]);
    }
}

function DrawCar(car) {
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
    switch (e.keyCode) {
        case 37: //Left
            document.getElementById('sound_wheel_left').play();
            let timerId37 = setInterval(() => {
                player.Move("x", -speed * .1)
            }, 25);
            setTimeout(() => { clearInterval(timerId37); }, 250);
            break;

        case 65: //Left
            document.getElementById('sound_wheel_left').play();
            let timerId65 = setInterval(() => {
                player.Move("x", -speed * .1)
            }, 25);
            setTimeout(() => { clearInterval(timerId65); }, 250);
            break;

        case 39: //Right
            document.getElementById('sound_wheel_right').play();
            let timerId39 = setInterval(() => {
                player.Move("x", speed * .1)
            }, 25);
            setTimeout(() => { clearInterval(timerId39); }, 250);
            break;

        case 68: //Right
            document.getElementById('sound_wheel_right').play();
            let timerId68 = setInterval(() => {
                player.Move("x", speed * .1)
            }, 25);
            setTimeout(() => { clearInterval(timerId68); }, 250);
            break;

        case 38: //Up
            player.Move("y", -speed);
            break;

        case 87: //Up
            player.Move("y", -speed);
            break;

        case 40: //Down
            player.Move("y", speed);
            break;

        case 83: //Down
            player.Move("y", speed);
            break;

        case 81: //Left-Up
            document.getElementById('sound_wheel_left_up').play();
            let timerId81 = setInterval(() => {
                player.Move("x", -speed * .05), player.Move("y", -speed * .5)
            }, 25);
            setTimeout(() => { clearInterval(timerId81); }, 500);
            break;

        case 69: //Right-Up
            document.getElementById('sound_wheel_right_up').play();
            let timerId69 = setInterval(() => {
                player.Move("x", speed * .05), player.Move("y", -speed * .5)
            }, 25);
            setTimeout(() => { clearInterval(timerId69); }, 500);
            break;

        case 32: //Space
            if (timer == null) {
                Start();
            }
            else {
                Stop();
            }
            break;
    }
}

function Resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) {
    let rand = min - 1 + Math.random() * (max - min + 1);
    return Math.round(rand);
}



