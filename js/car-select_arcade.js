let eS = document.getElementById('engine_start');

let slides = document.getElementsByClassName("your-class slider-down");

let playerCarSelect = 0;

let scoreV = [, 33, 25, 15, 10, 5, 3, 1];

let playerStartHeightPos = .7;

var moveD = 6;

function clearSlider() {
    document.getElementById('slider').style.display = "block";
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}

function showSlider() {
    document.getElementById('slider').style.display = "block";
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "block";
    }
}

function clearCarPreloadDOM() {
    if (document.getElementById('game_cars') != null) {
        document.getElementById('game_cars').remove();
    }
}

$(document).ready(function () {
    $('.slider-down button.slick-prev').click(() => { spray.play() });
    $('.slider-down button.slick-next').click(() => { spray.play() });
    $('.slick-dots li').click(() => { spray.play() });
    $('.up_slider button.slick-prev').click(() => { car_select.play() });
    $('.up_slider button.slick-next').click(() => { car_select.play() });
});


function upSlider() {
    let sliderX = document.getElementsByClassName('your-class slider-down');
    for (let i = 0; i < sliderX.length; i++) { sliderX[i].style.top = '-50%'; }
}

$(document).ready(function () {
    $(".main_screen_cars_img").click(function () {
        upSlider();
        document.getElementById(`slider-down-${this.name}`).style.top = '50%';
        $("#cbr_main").click(function () {
            setTimeout(() => {returnStartPosMoto()}, 1500)
        })
    });
});

function setPosY() {
    return player.y = canvas.height - (player.image.height * scale);
}

var isPolice = false;

$(document).ready(function () {
    $("#slick-slide77").click(function () {
        prius_function()
        return isPolice = true;
    })
    $(".cars_img").click(function () {
        isPolice = false;
        eS.play();
        $(`#slider-down-${this.name}`)[0].style.top = '-50%';
        document.getElementById('slider').style.top = '-50%';
        document.getElementById('timer').style.color = 'orange';
        setTimeout(start, 500);
        sessionStorage.setItem('last down slider', document.getElementById(`slider-down-${this.name}`).id);
        sessionStorage.setItem('current car', this.alt);
        return player.image.src = `./images/Smooth_models/${this.alt}.png`;
    });
});

function returnStartPos() {
    player.x = (canvas.width / 2) - (312 * scale / 2);
    player.y = canvas.height * .73;
}

function returnStartPosMoto() {
    player.x = (canvas.width / 2) - (176 * scale / 2);
    player.y = canvas.height * .82;
}

function prius_function() {
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
    }

    document.addEventListener('keydown', function (event) {
        if (event.shiftKey) {
            if (sessionStorage.getItem('current car') == 'prius_police') {
                document.getElementById('siren').play();
            }
        }
        if (event.ctrlKey) {
            if (sessionStorage.getItem('current car') == 'prius_police') {
                document.getElementById('sgu').play();
                for (let i = 0; i < objects.length; i++) {
                    if (((player.x - objects[i].x) <= 15) && ((player.x - objects[i].x) >= -15)) {
                        if (objects[i].y > 0) {
                            if (objects[i].x >= 340 && objects[i].x <= canvas.width) {
                                let move = setInterval(() => {
                                    objects[i].x -= 8.3
                                }, 25);
                                setTimeout(() => { clearInterval(move); }, 250);
                            }
                            else {
                                let move = setInterval(() => {
                                    objects[i].x += 8.3
                                }, 25);
                                setTimeout(() => { clearInterval(move); }, 250);
                            }
                        }
                    }
                }
            }
        }
    });
}
