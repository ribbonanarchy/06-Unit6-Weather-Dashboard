var APIkey = '98d3224356b201e244abbb70a065a5a2';

var cityElement = document.querySelector('#city-input');
var searchButton = document.querySelector('#search-button');
var cityNameElement = document.querySelector('#city-name');
var tempElement = document.querySelector("#temperature");
var windElement = document.querySelector("#wind");
var humidElement = document.querySelector("#humidity");
var uviElement = document.querySelector("#uvi");

var locationURL, city, lat, lon, weatherURL;
var temp, wind, humidity, uv, dateToday;
searchButton.addEventListener('click', getAPI);

function getAPI() {
    city = cityElement.value;
    locationURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',US&appid=' + APIkey;
    console.log(locationURL);

    fetch(locationURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        lat = data[0].lat;
        lon = data[0].lon;
        weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' +lon + '&units=imperial&appid=' + APIkey;

        fetch(weatherURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            dateToday = moment().format('MM/DD/YYYY');
            temp = data.current.temp;
            wind = data.current.wind_speed;
            humidity = data.current.humidity;
            uv = data.current.uvi;

            cityNameElement.textContent = city + ' ' + dateToday;
            tempElement.textContent = temp;
            windElement.textContent = wind;
            humidElement.textContent = humidity;
            uviElement.textContent = uv;

            for(var i=1; i<6; i++) {
                var foreDate = document.querySelector('#date'+i);
                var foreTemp = document.querySelector('#temperature'+i);
                var foreWind = document.querySelector('#wind'+i);
                var foreHumid = document.querySelector('#humidity'+i);
                var foreUVI = document.querySelector('#uvi'+i);

                foreDate.textContent = moment().add(i, 'days').calendar();
                foreTemp.textContent = data.daily[i-1].temp.day;
                foreWind.textContent = data.daily[i-1].wind_speed;
                foreHumid.textContent = data.daily[i-1].humidity;
                foreUVI.textContent = data.daily[i-1].uvi;
            }
        })
    })
}

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history


// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city