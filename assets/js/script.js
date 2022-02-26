// the user searches for a city 1. grab user input 2.uses the user input to know what to grab from the api
// Display the data 1. the city, city dash, wheather dash
// the city searches stay

//http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}

const key = "2c2f3bb9015dc7daada42b2297d77281";
var searchBar = document.getElementById("search");
var submitBtn = document.getElementById("submit");
var gencity = document.getElementById("city");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvEl = document.getElementById("uv");
var iconEl = document.getElementById("icon");
var dateEl = document.getElementById("datedash");
var cityEl = document.getElementById("citylist");

// 5 days
var tempElday1 = document.getElementById("temp1");
var windElday1 = document.getElementById("wind1");
var humidityElday1 = document.getElementById("humidity1");
var uvElday1 = document.getElementById("uv1");
var iconElday1 = document.getElementById("icon1");

// searchBar
submitBtn.addEventListener("click", function () {
  var city = searchBar.value;
  findCity(city);
  console.log(city);

  localStorage.setItem("city",(city));
  // cityEl.append(city);


  
});

function loadCity (){
    var savedCity = localStorage.getItem("city");
console.log(savedCity);

var cityBtn = document.createElement("button");
cityBtn.classList.add('waves-effect', 'waves-light', 'btn', 'blue', 'lighten-3')
cityBtn.textContent = savedCity;
cityEl.appendChild(cityBtn);

cityBtn.addEventListener("click", function(){
  console.log("click")
findCity(savedCity);

});
}



// take the city save to local or call api and log it

// this grabs the city information (lat and lon)
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
function findCity(city) {
  limit = 5;
  let url = `//api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${key}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var currentCity = data[0].name;
      var currentCityLat = data[0].lat;
      var currentCityLon = data[0].lon;
      gencity.textContent = currentCity;
      getForcast(currentCityLat, currentCityLon);
    });
}

function getForcast(currentCityLat, currentCityLon) {
  let cityForcast = `//api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=${currentCityLat}&lon=${currentCityLon}&appid=${key}`;
  fetch(cityForcast)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var currentCity = data.current.temp;
      var wind = data.current.wind_speed;
      var humidity = data.current.humidity;
      var uv = data.current.uvi;
      var date = new Date(data.current.dt * 1000).toLocaleDateString("en-US");
      var icons = data.current.weather[0].icon;
      tempEl.textContent = currentCity;
      windEl.textContent = wind;
      humidityEl.textContent =humidity;
      uvEl.textContent =uv;
      dateEl.textContent =date;
      iconEl.textContent =icons;
      document.querySelector("#icon").src =
        "//openweathermap.org/img/wn/" + icons + "@2x.png";
      fiveday(data.daily);
      if (uv < 3) {
        $("#uv").css("background-color", "green");
      } else if (uv < 7) {
        $("#uv").css("background-color", "yellow");
       } else {
        $("#uv").css("background-color", "red");
      }
      
    });
}

function fiveday(fiveDayData) {
  console.log(fiveDayData);
  var temp = fiveDayData[0].temp.day;
  var wind = fiveDayData[0].wind_speed;
  var humidity = fiveDayData[0].humidity;
  var uv = fiveDayData[0].uvi;
  var icon = fiveDayData[0].weather[0].icon;
  tempElday1.append(temp);
  windElday1.append(wind);
  humidityElday1.append(humidity);
  uvElday1.append(uv);
  iconElday1.append(icon);
  for (var i = 0; i < 5; i++) {
    var temp = fiveDayData[i].temp.day;
    var wind = fiveDayData[i].wind_speed;
    var humidity = fiveDayData[i].humidity;
    var uv = fiveDayData[i].uvi;
    var icons = fiveDayData[i].weather[0].icon;
    // document grabs the HTML element, getElementById grabs the id , (i + 1) moves it down the array "math", innertext replaces the text with whatever i give it.
    document.getElementById("temp" + (i + 1)).innerText = temp;
    document.getElementById("wind" + (i + 1)).innerText = wind;
    document.getElementById("humidity" + (i + 1)).innerText = humidity;
    document.getElementById("uv" + (i + 1)).innerText = uv;
    document.getElementById("icon" + (i + 1)).src =
      "//openweathermap.org/img/wn/" + icons + ".png";
    // console.log(icons);
    // document.getElementById("icon"+(i+1)).innerText = icons;
    // document.querySelector("#icon"+(i+1)).src = "http://openweathermap.org/img/wn/" + icons + "@2x.png"
    // [i + 1];
  }
}

loadCity();