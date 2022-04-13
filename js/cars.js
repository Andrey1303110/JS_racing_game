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