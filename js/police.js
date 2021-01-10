let indexP = 0;
let policeSrc = `./images/gif/1.png`;
function changeImage() {
    var images = ['1', '2', '3', '4', '5', '6', '1', '6', '1', '6', '1', '6', '5', '4', '3', '2', '1', '6'];
    indexP = (indexP + 1) % images.length;
    return policeSrc = `./images/gif/${images[indexP]}.png`;
}
setInterval(changeImage, 50);

prius.onclick = () => {
    eS.play();
    document.getElementById('slider-down-leon').style.top = '-50%';
    document.getElementById('slider').style.top = '-50%';
    setTimeout(Start, 500);
    function srcPolice () {
        player.image.src = policeSrc;
    }
    setInterval (srcPolice, 25);
}