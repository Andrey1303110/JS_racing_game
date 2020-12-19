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
		this.y += speed; //The image will move down with every frame

		if (this.y > window.innerHeight) //if the image left the screen, it will change it's position
		{
			this.y = road.y - canvas.height + speed; //New position depends on the second Road object
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

		if (this.y < car.y + (car.image.height * .8) * scale && this.y + (this.image.height * .8) * scale > car.y) //If there is collision by y
		{
			if (this.x + (this.image.width * .85) * scale > car.x && this.x < car.x + (car.image.width * .85) * scale) //If there is collision by x
			{
				hit = true;
			}
		}

		return hit;
	}

	Move(v, d) {
		if (v == "x") //Moving on x
		{
			d *= 2.75;

			this.x += d; //Changing position

			//Rolling back the changes if the car left the screen
			if (this.x + this.image.width * scale > canvas.width * .99) {
				this.x -= d;
			}

			if (this.x + this.image.width * scale < canvas.width * .15) {
				this.x -= d;
			}

			if (this.x < 0) {
				this.x = 0;
			}
		}
		else //Moving on y
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

var canvas = document.getElementById("canvas"); //Getting the canvas from DOM
var ctx = canvas.getContext("2d"); //Getting the context to work with the canvas

var scale = 0.24; //Cars scale

Resize(); //Changing the canvas size on startup

window.addEventListener("resize", Resize); //Change the canvas size with the window size

//Forbidding openning the context menu to make the game play better on mobile devices
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Listenning for keyboard events

var objects = []; //Game objects

var roads =
	[
		new Road("images/road4.jpg", 0),
		new Road("images/road4.jpg", canvas.height)
	]; //Backgrounds

var player = new Car("images/car1.png", canvas.width / 2 - 37, canvas.height * .76, true); //Player's object


var speed = 8;

Start();


function Start() {
	if (!player.dead) {
		timer = setInterval(Update, UPDATE_TIME); //Updating the game 60 times a second
	}

}

function Stop() {
	clearInterval(timer); //Game stop
	timer = null;
}

function Update() {
	roads[0].Update(roads[1]);
	roads[1].Update(roads[0]);

	if (RandomInteger(0, 1000) > 995) //Generating new car
	{
		objects.push(new Car("images/car2.png", 12, RandomInteger(40, 730) * -1, false));
	}

	if (RandomInteger(1000, 2000) > 1995) //Generating new car
	{
		objects.push(new Car("images/car2.png", 98, RandomInteger(40, 730) * -1, false));
	}

	if (RandomInteger(2000, 3000) > 2995) //Generating new car
	{
		objects.push(new Car("images/car2.png", 182, RandomInteger(40, 730) * -1, false));
	}

	if (RandomInteger(3000, 4000) > 3995) //Generating new car
	{
		objects.push(new Car("images/car2.png", 266, RandomInteger(40, 730) * -1, false));
	}

	if (RandomInteger(4000, 5000) > 4995) //Generating new car
	{
		objects.push(new Car("images/car2.png", 353, RandomInteger(40, 730) * -1, false));
	}

	player.Update();

	if (player.dead) {
		alert("Crash!");
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
			Stop();
			document.getElementById('sound').play();
			alert("Crash!");
			player.dead = true;
			/*let question = prompt('Желаете начать заново?');
			if question != 'No' || 'no' || 'Нет' || 'нет' {

			}*/

		}
	}

	Draw();
}

function Draw() //Working with graphics
{
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clearing the canvas

	for (var i = 0; i < roads.length; i++) {
		ctx.drawImage
			(
				roads[i].image, //Image
				0, //First X on image
				0, //First Y on image
				roads[i].image.width, //End X on image
				roads[i].image.height, //End Y on image
				roads[i].x, //X on canvas
				roads[i].y, //Y on canvas
				canvas.width, //Width on canvas
				canvas.height //Height on canvas
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
			player.Move("x", -speed);
			break;

		case 65: //Left
			player.Move("x", -speed);
			break;

		case 39: //Right
			player.Move("x", speed);
			break;

		case 68: //Right
			player.Move("x", speed);
			break;

		case 38: //Up
			player.Move("y", -speed);
			break;

		case 87: //Up
			player.Move("y", -speed);
			break;

		case 40: //Down
			player.Move("y", speed * 2);
			break;

		case 83: //Down
			player.Move("y", speed * 2);
			break;

		case 81: //Left-Up
			player.Move("x", -speed), player.Move("y", -speed);
			break;

		case 69: //Right-Up
			player.Move("x", speed), player.Move("y", -speed);
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

