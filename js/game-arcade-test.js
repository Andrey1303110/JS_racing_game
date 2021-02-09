let eS = document.getElementById('engine_start');

let objectsPre = [];

let playerCarSelect = 0;

let scoreV = [, 33, 25, 15, 10, 5, 3, 1];

let playerStartHeightPos = .76;

var moveD = 6.2;

function clearSlider () {
    if (document.getElementById('slider') != null) {
        document.getElementById('slider').remove();
        document.getElementById('slider-down-leon').remove();
        document.getElementById('slider-down-touareg').remove();
        document.getElementById('slider-down-2008').remove();
        document.getElementById('slider-down-i8').remove();
        document.getElementById('slider-down-tesla').remove();
        document.getElementById('slider-down-xl1').remove();
        document.getElementById('slider-down-truck').remove();
        document.getElementById('slider-down-prius').remove();
    }
}

function clearCarPreloadDOM () { 
    if (document.getElementById('game_cars') != null) { 
        document.getElementById('game_cars').remove(); } 
}

function upSlider() {
    let sliderX = document.getElementsByClassName('your-class slider-down');
    for (let i = 0; i < sliderX.length; i++) { sliderX[i].style.top = '-50%'; }
}

leon_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-leon').style.top = '50%';
}

P2008_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-2008').style.top = '50%';
}

touareg_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-touareg').style.top = '50%';
}

tesla_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-tesla').style.top = '50%';
}

i8_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-i8').style.top = '50%';
}

xl1_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-xl1').style.top = '50%';
}

truck_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-truck').style.top = '50%';
}

prius_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-prius').style.top = '50%';
}

touareg_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-touareg').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Touareg/car_1.png`;
}

touareg_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-touareg').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Touareg/car_2.png`;
}

touareg_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-touareg').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Touareg/car_3.png`;
}

touareg_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-touareg').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Touareg/car_4.png`;
}

touareg_5.onclick = () => {
    eS.play();
    document.getElementById('slider-down-touareg').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Touareg/car_5.png`;
}

i8_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_1.png`;
}

i8_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_2.png`;
}

i8_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_3.png`;
}

i8_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_4.png`;
}

i8_5.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_5.png`;
}

i8_6.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_6.png`;
}

i8_7.onclick = () => {
    eS.play();
    document.getElementById('slider-down-i8').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/i8/car_7.png`;
}

leon_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider-down-leon').remove;
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_1.png`;
}

leon_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_2.png`;
}

leon_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_3.png`;
}

leon_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_4.png`;
}

leon_5.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_5.png`;
}

leon_6.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_6.png`;
}

leon_7.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_7.png`;
}

leon_8.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Leon/car_8.png`;
}

P2008_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_1.png`;
}

P2008_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_2.png`;
}

P2008_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_3.png`;
}

P2008_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_4.png`;
}

P2008_5.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_5.png`;
}

P2008_6.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_6.png`;
}

P2008_7.onclick = () => {
    eS.play();
    document.getElementById('slider-down-2008').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/2008/car_7.png`;
}

tesla_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_1.png`;
}

tesla_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_2.png`;
}

tesla_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_3.png`;
}

tesla_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_4.png`;
}

tesla_5.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_5.png`;
}

tesla_6.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_6.png`;
}

tesla_7.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_7.png`;
}

tesla_8.onclick = () => {
    eS.play();
    document.getElementById('slider-down-tesla').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Tesla/car_8.png`;
}

xl_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-xl1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Xl1/car_1.png`;
}

xl_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-xl1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Xl1/car_2.png`;
}

xl_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-xl1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Xl1/car_3.png`;
}

xl_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-xl1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Xl1/car_4.png`;
}

truck_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-truck').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    returnstartPos();
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Other/car_2.png`;
}

prius_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_1.png`;
}

prius_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_2.png`;
}

prius_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_3.png`;
}

prius_4.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_4.png`;
}

prius_5.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_5.png`;
}

prius_6.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_6.png`;
}

prius_7.onclick = () => {
    eS.play();
    document.getElementById('slider-down-prius').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Prius/car_7.png`;
}

prius.onclick = () => {
    eS.play();
    upSlider();
    document.getElementById('timer').style.color = 'aqua';
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    let indexP = 0;
    let policeSrc = `./images/gif/1.png`;

    function changeImageRed() {
        let images = ['1', '6', '1', '11'];
        indexP = (indexP + 1) % (images.length);
        return policeSrc = `./images/gif/${images[indexP]}.png`;
    }
    setInterval(changeImageRed, 100);
    function srcPolice () {
        player.image.src = policeSrc;
    }
    setInterval(srcPolice, 45);
    document.addEventListener('keydown', function (event) {
        if (event.shiftKey) {
            document.getElementById('siren').play();
        }
        if (event.ctrlKey) {
            document.getElementById('sgu').play();
        }
    });
}

function returnStartPos() {
    return player = new Car(cars[playerCarSelect], canvas.width / 2 - 30, canvas.height * .68, true);
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

            //не позволяет машине уехать за кран канваса
            if (this.x <= 15) {
                this.x = 15;
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


let UPDATE_TIME = 1000 / 60;

var timer = null;

var canvas = document.getElementById("canvas"); //получем Canvas из DOM
var ctx = canvas.getContext("2d"); //получаем внутренность Canvas для работы с ним

var scale = .2; //масштаб машин

resize(); //Изменяет размер Canvas при загрузке страницы

window.addEventListener("resize", resize); //Подтягивает размер содержимого Canvas до размеров окна

//Заготовка для моб. устройств
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Слушатель нажатий на клавиатуру

var objects = []; //Массив игровых объектов

var roads =
    [
        new Road("images/road7.jpg", 0),
        new Road("images/road7.jpg", canvas.height)
    ]; //Background в виде дороги

let cars = [
    "images/Smooth models/Leon/car_1.png", //1
    "images/Smooth models/Leon/car_2.png", //2
    "images/Smooth models/Leon/car_3.png", //3
    "images/Smooth models/Leon/car_4.png", //4
    "images/Smooth models/Leon/car_5.png", //5
    "images/Smooth models/Leon/car_6.png", //6
    "images/Smooth models/Leon/car_7.png", //7
    "images/Smooth models/Leon/car_8.png", //8
    "images/Smooth models/Tesla/car_1.png", //9
    "images/Smooth models/Tesla/car_2.png", //10
    "images/Smooth models/Tesla/car_3.png", //11
    "images/Smooth models/Tesla/car_4.png", //12
    "images/Smooth models/Tesla/car_5.png", //13
    "images/Smooth models/Tesla/car_6.png", //14
    "images/Smooth models/Tesla/car_7.png", //15
    "images/Smooth models/Tesla/car_8.png", //16
    "images/Smooth models/i8/car_1.png",    //17
    "images/Smooth models/i8/car_2.png",    //18
    "images/Smooth models/i8/car_3.png",    //19
    "images/Smooth models/i8/car_4.png",    //20
    "images/Smooth models/i8/car_5.png",    //21
    "images/Smooth models/i8/car_6.png",    //22
    "images/Smooth models/i8/car_7.png",    //23
    "images/Smooth models/Touareg/car_1.png", //24
    "images/Smooth models/Touareg/car_2.png", //25
    "images/Smooth models/Touareg/car_3.png", //26
    "images/Smooth models/Touareg/car_4.png", //27
    "images/Smooth models/Touareg/car_5.png", //28
    "images/Smooth models/2008/car_1.png",   //29
    "images/Smooth models/2008/car_2.png",   //30
    "images/Smooth models/2008/car_3.png",   //31
    "images/Smooth models/2008/car_4.png",   //32
    "images/Smooth models/2008/car_5.png",   //33
    "images/Smooth models/2008/car_6.png",   //34
    "images/Smooth models/2008/car_7.png",   //35
    "images/Smooth models/Other/car_1.png",  //36
    "images/Smooth models/Other/car_2.png",  //37
    "images/Smooth models/Other/car_3.png",  //38
    "images/Smooth models/Xl1/car_1.png",    //39
    "images/Smooth models/Xl1/car_2.png",    //40
    "images/Smooth models/Xl1/car_3.png",    //41
    "images/Smooth models/Xl1/car_4.png",    //42
    "images/Smooth models/Prius/car_1.png",    //43
    "images/Smooth models/Prius/car_2.png",
    "images/Smooth models/Prius/car_3.png",
    "images/Smooth models/Prius/car_4.png",
    "images/Smooth models/Prius/car_5.png",
    "images/Smooth models/Prius/car_6.png",
    "images/Smooth models/Prius/car_7.png",
];

var player = new Car(cars[playerCarSelect], canvas.width / 2 - 30, canvas.height * playerStartHeightPos, true); //Машина игрока

var speed = 9.5;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let S = getRandomIntInclusive(1, document.getElementsByClassName('music').length);

function start(sec) {
    if (!player.dead) {
        clearCarPreloadDOM ();
        setTimeout (clearSlider, 500);
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
    timerScore = null;
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
    var xCars = RandomInteger(140, 160);

    /*addCars ();

    function addCars () {
        if (xCars == 150) {
            objects.push(new Car(randomCarsSrc, 14, canvas.height * - 1, false));

        }
    }*/


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
            document.getElementById('sound').play();
            document.getElementById('main_theme' + S).pause();
            document.getElementById('siren').pause();
            alert(`Crash! \nPress F5 for restart \nYour eneared ` + document.getElementById('timer').innerText + `$`);
            player.dead = true;
            /*let question = prompt('Желаете начать заново?');
            if question != 'No' || 'no' || 'Нет' || 'нет' {
            }*/   
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
    if (document.getElementById('timer').innerText != 0) {
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
                if (timer == null) {
                    start();
                }
                else {
                    stop();
                }
                break;
        }
    }
    else false;
}

function resize() {
    canvas.width = 440;
    canvas.height = window.innerHeight;
}

function RandomInteger(min, max) {
    let rand = min - 1 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/*
function overlapCars() {
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

let it = () => {
    setInterval(() => {
        return randomCarsSrc = cars[Math.floor(Math.random() * cars.length)]
    }, 200);
}

let fc = () => {
    setInterval(() => {
        objects.push(new Car(randomCarsSrc, 100, canvas.height * - 1, false))
    }, RandomInteger(1500,5000));
}

fc();

let fs = () => {
    setInterval(() => {
        objects.push(new Car(randomCarsSrc, 14, canvas.height * - 1, false))
    }, RandomInteger(1500,5000));
}

fc();
fs();
it();