let eS = document.getElementById('engine_start');

let slides = document.getElementsByClassName("your-class slider-down");

let playerCarSelect = 0;

let scoreV = [, 33, 25, 15, 10, 5, 3, 1];

let playerStartHeightPos = .76;

var moveD = 6.2;

function clearSlider () {
    document.getElementById('slider').style.display = "block";
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}

function showSlider () {
    document.getElementById('slider').style.display = "block";
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "block";
    }
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

$(document).ready(function(){
    $(".main_screen_cars_img").click(function(){
        upSlider();
        returnStartPos();
        document.getElementById(`slider-down-${this.name}`).style.top = '50%';
        $("#cbr_main").click(function() {
            returnStartPosMoto();
        })
        $("#truck_main").click(function() {
            returnStartPosTruck();
        })
    });
});

$(document).ready(function(){
    $("#slick-slide77").click(function(){
        prius_function ()
    })
    $(".cars_img").click(function(){
        eS.play();
        $(`#slider-down-${this.name}`)[0].style.top = '-50%';
        document.getElementById('slider').style.top = '-50%';
        document.getElementById('timer').style.color = 'orange';
        setTimeout(start, 500);
        sessionStorage.setItem('last down slider', document.getElementById(`slider-down-${this.name}`).id);
        sessionStorage.setItem('current car', this.alt);
        return player.image.src = `./images/Smooth models/all_cars/${this.alt}.png`; 
    });
});

function returnStartPos() {
    player.x = (canvas.width / 2) - (312 * scale / 2);
    player.y = canvas.height * .8;
}

function returnStartPosTruck() {
    player.x = (canvas.width / 2) - (312 * scale / 2);
    player.y = canvas.height * .69;
}

function returnStartPosMoto() {
    player.x = (canvas.width / 2) - (176 * scale / 2);
    player.y = canvas.height * .82;
}

function prius_function () {
    eS.play();
    upSlider();
    document.getElementById('timer').style.color = 'aqua';
    document.getElementById('slider').style.top = '-50%';
    sessionStorage.setItem('last down slider', 'slider-down-prius');
    sessionStorage.setItem('current car', 'prius_police');
    returnStartPos();
    setTimeout(start, 500);
    let indexP = 0;
    let policeSrc = `./images/gif/1.png`;

    setInterval(changeImageRed, 100);
    //garage_button.onclick = clearInterval(changeImageRed), clearInterval(srcPolice);
    function changeImageRed() {
        let images = ['1', '6', '1', '12'];
        indexP = (indexP + 1) % (images.length);
        return policeSrc = `./images/gif/${images[indexP]}.png`;
    }

    setInterval(srcPolice, 40);
    function srcPolice() {
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
