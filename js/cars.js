function set_from_json(file_name){
    let cars = null;
    $.ajax({
        'async': false,
        'url': `./js/${file_name}.json`,
        'success': function (data) {
            cars = data;
        }
    });
    return cars;
}

var cars = set_from_json('cars');
var cars_reverse = set_from_json('cars-reverse');
var cars_params = set_from_json('cars_params');

var cars_logos = [];
var init_slide = 1;

for (let key in cars_params) {
    cars_logos.push({
        key: key,
        value: cars_params[key]['price']
    });
}

let playerStartHeightPos = .7;
let playerCarSelect = 0;
let selectCar = cars_logos[0]['key'];