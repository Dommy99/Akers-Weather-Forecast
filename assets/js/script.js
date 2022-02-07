// the user searches for a city 1. grab user input 2.uses the user input to know what to grab from the api
// Display the data 1. the city, city dash, wheather dash
// the city searches stay 


//http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}

const key = '2c2f3bb9015dc7daada42b2297d77281'
var searchBar = document.getElementById('search');
var submitBtn = document.getElementById('submit');
var gencity = document.getElementById('city');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvEl = document.getElementById('uv');
 
submitBtn.addEventListener('click', function() {
    var city = searchBar.value;
    findCity(city);

});

// take the city save to local or call api and log it 

// this grabs the city information (lat and lon)
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
function findCity(city){
    limit = 5
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${key}`
    
    fetch(url)
    .then(response =>{
        return response.json();
    }).then(data =>{
        var currentCity = data[0].name;
        var currentCityLat = data[0].lat;
        var currentCityLon = data[0].lon;
        gencity.append(currentCity);
        getForcast(currentCityLat,currentCityLon);
    });
};

function getForcast(currentCityLat, currentCityLon){

    let cityForcast = `https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=${currentCityLat}&lon=${currentCityLon}&appid=${key}`
    fetch(cityForcast)
    .then((response) =>{
       return response.json(); 
    }).then(data =>{
        console.log(data);
        var currentCity = data.current.temp;
        var wind = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uv = data.current.uvi;
        tempEl.append(currentCity);
        windEl.append(wind);
        humidityEl.append(humidity);
        uvEl.append(uv);
        
    })
}

// searchForm.addEventListener('submit', city);