let eS = document.getElementById('engine_start');

let playerCarSelect = 0;

let scoreV = [, 33, 25, 15, 10, 5, 3, 1];

let playerStartHeightPos = .76;

var moveD = 6.2;

function clearSlider () {
        document.getElementById('slider').style.display = "none";
        document.getElementById('slider-down-leon').style.display = "none";
        document.getElementById('slider-down-touareg').style.display = "none";
        document.getElementById('slider-down-2008').style.display = "none";
        document.getElementById('slider-down-i8').style.display = "none";
        document.getElementById('slider-down-tesla').style.display = "none";
        document.getElementById('slider-down-xl1').style.display = "none";
        document.getElementById('slider-down-truck').style.display = "none";
        document.getElementById('slider-down-prius').style.display = "none";
        document.getElementById('slider-down-enzo').style.display = "none";
        document.getElementById('slider-down-f1').style.display = "none";
        document.getElementById('slider-down-cbr').style.display = "none";
}

function showSlider () {
        document.getElementById('slider').style.display = "block";
        document.getElementById('slider-down-leon').style.display = "block";
        document.getElementById('slider-down-touareg').style.display = "block";
        document.getElementById('slider-down-2008').style.display = "block";
        document.getElementById('slider-down-i8').style.display = "block";
        document.getElementById('slider-down-tesla').style.display = "block";
        document.getElementById('slider-down-xl1').style.display = "block";
        document.getElementById('slider-down-truck').style.display = "block";
        document.getElementById('slider-down-prius').style.display = "block";
        document.getElementById('slider-down-enzo').style.display = "block";
        document.getElementById('slider-down-f1').style.display = "block";
        document.getElementById('slider-down-cbr').style.display = "block";
}



//document.getElementById('slider-down-leon').style.visibility = 'hidden';

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

enzo_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-enzo').style.top = '50%';
}

f1_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-f1').style.top = '50%';
}

cbr_main.onclick = () => {
    upSlider();
    document.getElementById('slider-down-cbr').style.top = '50%';
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
    returnStartPos();
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

    setInterval(changeImageRed, 100);
    function changeImageRed() {
        let images = ['1', '6', '1', '11'];
        indexP = (indexP + 1) % (images.length);
        return policeSrc = `./images/gif/${images[indexP]}.png`;
    }

    setInterval(srcPolice, 45);
    function srcPolice () {
        player.image.src = policeSrc;
    } 

    document.addEventListener('keydown', function (event) {
        if (event.shiftKey) {
            document.getElementById('siren').play();
        }
        if (event.ctrlKey) {
            document.getElementById('sgu').play();
        }
    });
}

enzo_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-enzo').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Enzo/car_1.png`;
}

enzo_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-enzo').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Enzo/car_2.png`;
}

enzo_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-enzo').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/Enzo/car_3.png`;
}

f1_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-f1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/f1/car_1.png`;
}

f1_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-f1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/f1/car_2.png`;
}

f1_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-f1').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/f1/car_3.png`;
}

cbr_1.onclick = () => {
    eS.play();
    document.getElementById('slider-down-cbr').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    returnStartPosMoto()
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/cbr/car_1.png`;
}

cbr_2.onclick = () => {
    eS.play();
    document.getElementById('slider-down-cbr').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    returnStartPosMoto()
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/cbr/car_2.png`;
}

cbr_3.onclick = () => {
    eS.play();
    document.getElementById('slider-down-cbr').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    returnStartPosMoto()
    setTimeout(start, 500);
    return player.image.src = `./images/Smooth models/cbr/car_3.png`;
}

function returnStartPos() {
    return player = new Car(cars[playerCarSelect], canvas.width / 2 - player.image.width * scale / 2, canvas.height * .68, true);
}

function returnStartPosMoto() {
    return player = new Car(cars[playerCarSelect], (canvas.width / 2) - (176 * scale / 2), canvas.height * .8, true);
}