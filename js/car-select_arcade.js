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
    $(".up_slider").on("beforeChange", function () { car_select.play(); });
});


function upSlider() {
    let sliderX = document.getElementsByClassName('your-class slider-down');
    for (let i = 0; i < sliderX.length; i++) { sliderX[i].style.top = '-50%'; }
}

$(document).ready(function () {
    $(".main_screen_cars_img").click(function () {
        $("#lock_cars").removeClass("active_lock");
        locked_cars();
        upSlider();
        document.getElementById(`slider-down-${this.name}`).style.top = '50%';
        $("#cbr_main").click(function () {
            setTimeout(() => {returnStartPosMoto()}, 1500)
        })
    });
    
    prius_main.onclick = () => {
        if (localStorage.getItem('score') < lock_prius) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_prius} or more!`;
            $("#slider-down-prius").css("opacity", ".5");
            $("#slider-down-prius .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_prius) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-prius").css("opacity", "1");
            $("#slider-down-prius .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    scania_main.onclick = () => {
        if (localStorage.getItem('score') < lock_scania) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_scania} or more!`;
            $("#slider-down-scania").css("opacity", ".5");
            $("#slider-down-scania .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_scania) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-scania").css("opacity", "1");
            $("#slider-down-scania .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    cbr_main.onclick = () => {
        if (localStorage.getItem('score') < lock_cbr) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_cbr} or more!`;
            $("#slider-down-cbr").css("opacity", ".5");
            $("#slider-down-cbr .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_cbr) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-cbr").css("opacity", "1");
            $("#slider-down-cbr .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    f1_main.onclick = () => {
        if (localStorage.getItem('score') < lock_f1) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_f1} or more!`;
            $("#slider-down-f1").css("opacity", ".5");
            $("#slider-down-f1 .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_f1) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-f1").css("opacity", "1");
            $("#slider-down-f1 .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    bmw_x5_main.onclick = () => {
        if (localStorage.getItem('score') < lock_bmw_x5) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_bmw_x5} or more!`;
            $("#slider-down-bmw_x5").css("opacity", ".5");
            $("#slider-down-bmw_x5 .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_bmw_x5) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-bmw_x5").css("opacity", "1");
            $("#slider-down-bmw_x5 .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    volvo_main.onclick = () => {
        if (localStorage.getItem('score') < lock_volvo) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_volvo} or more!`;
            $("#slider-down-volvo").css("opacity", ".5");
            $("#slider-down-volvo .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_volvo) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-volvo").css("opacity", "1");
            $("#slider-down-volvo .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    fj_main.onclick = () => {
        if (localStorage.getItem('score') < lock_fj) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_fj} or more!`;
            $("#slider-down-fj").css("opacity", ".5");
            $("#slider-down-fj .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_fj) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-fj").css("opacity", "1");
            $("#slider-down-fj .slick-list.draggable").css("pointer-events", "auto");
        }
    }
    buggati_main.onclick = () => {
        if (localStorage.getItem('score') < lock_buggati) {
            $("#lock_cars").addClass("active_lock");
            document.querySelector("#lock_cars p").innerText = `You may take score ${lock_buggati} or more!`;
            $("#slider-down-buggati").css("opacity", ".5");
            $("#slider-down-buggati .slick-list.draggable").css("pointer-events", "none");
            $("#lock_cars").css("z-index", "2");
        }
        if (localStorage.getItem('score') >= lock_buggati) {
            $("#lock_cars").css("z-index", "-1");
            $("#slider-down-buggati").css("opacity", "1");
            $("#slider-down-buggati .slick-list.draggable").css("pointer-events", "auto");
        }
    }
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
                    if (objects[i].x < 340 && objects[i].x >= 0) {
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
