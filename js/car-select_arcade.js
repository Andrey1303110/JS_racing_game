let eS = document.getElementById('engine_start');

let slides = document.getElementsByClassName("your-class slider-down");

let playerCarSelect = 0;

let scoreV = [50, 40, 30, 24, 19, 15, 12, 10, 8, 6, 5, 4, 3, 2, 1, 0];

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
    if (document.getElementById('for_name') != null) {
        document.getElementById('for_name').remove();
    }
    if (document.getElementById('pervue') != null) {
        document.getElementById('pervue').remove();
    }
}

$(document).ready(function () {
    $(".slider-down").on("beforeChange", function () { spray.play() });
    $(".up_slider").on("beforeChange", function () { car_select.play() });
});


function upSlider() {
    let sliderX = document.getElementsByClassName('your-class slider-down');
    for (let i = 0; i < sliderX.length; i++) { sliderX[i].style.top = '-50%'; }
}

$(document).ready(function () {
    $(".main_screen_cars_img").click(function () {
        upSlider();
        $("#lock_cars").removeClass("active_lock");
        prius_main.onclick = () => {
            $("#lock_cars").addClass("active_lock");
            $("#lock_cars.active_lock")[0].onclick = () => { main_theme.volume = .5; acces_denied.play(); setTimeout(() => main_theme.volume = 1, 1800 ) }
        }
        $("#slider-down-prius")[0].onclick = () => {
            $("#lock_cars").addClass("active_lock");
        }
        document.getElementById(`slider-down-${this.name}`).style.top = '50%';
        $("#cbr_main").click(function () {
            setTimeout(() => {returnStartPosMoto()}, 1500)
        })
    });
});

function setPosY() {
    return player.y = canvas.height - (player.image.height * scale) - 50;
}

var isPolice = false;

$(document).ready(function () {
    $("#slick-slide77").click(function () {
        $("#button_special_signals").css("display", "flex");
        prius_function()
        return isPolice = true;
    })
    $(".cars_img").click(function () {
        setScreen();
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

function returnStartPosMoto() {
    player.x = (canvas.width / 2) - (176 * scale / 2);
    player.y = canvas.height * .82;
}

function sgu() {
    if (sessionStorage.getItem('current car') == 'prius_police') {
        document.getElementById('sgu_sound').play();
        for (let i = 0; i < objects.length; i++) {
            if (((player.x - objects[i].x) <= 17) && ((player.x - objects[i].x) >= -17)) {
                if (objects[i].y > 0) {
                    if (objects[i].x >= 340 && objects[i].x <= canvas.width) {
                        let move = setInterval(() => {
                            objects[i].x -= 8.3
                        }, 35);
                        setTimeout(() => { clearInterval(move); }, 350);
                    }
                    else {
                        let move = setInterval(() => {
                            objects[i].x += 8.3
                        }, 35);
                        setTimeout(() => { clearInterval(move); }, 350);
                    }
                }
            }
        }
    }
}

function siren() {
    document.getElementById('siren_sound').play();
}

function prius_function() {
    eS.play();
    upSlider();
    document.getElementById('timer').style.color = 'aqua';
    document.getElementById('slider').style.top = '-50%';
    sessionStorage.setItem('last down slider', 'slider-down-prius');
    sessionStorage.setItem('current car', 'prius_police');
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
                siren();
            }
        }
        if (event.ctrlKey) {
            sgu();
        }
    });
}

$("#siren")[0].onclick = siren;
$("#sgu")[0].onclick = sgu;
