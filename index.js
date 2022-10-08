let now = new Date();
  
  console.log(now);
  console.log(now.getDay());
  console.log(now.getHours());
  console.log(now.getMinutes());
  
  function formatDate(date) {
  let days = [
    `Sunday`, 
    `Monday`, 
    `Tuesday`, 
    `Wednesday`, 
    `Thursday`, 
    `Friday`, 
    `Saturday`
  ];

  let currentDay = days[now.getDay()]; 
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  if (currentHour < 10) {currentHour = `0${currentHour}`};
  if (currentMinutes < 10) {currentMinutes = `0${currentMinutes}`};

  let todayIs = document.querySelector(`#today`);
  todayIs.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`; 
  }

  console.log(formatDate(now));

  function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;    
    let forecastElement = document.querySelector("#forecast");
      
      let forecastHTML = `<div class="row flex-sm-fill">`;
      forecast.forEach(function (forecastDay, index) {
        if (index < 5) {
        forecastHTML =
          forecastHTML +
      `      
      <div class="col-sm">
        <div class="forecast-date" id="day1">${formatForecastDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="100" height="100"/>
        <div class="forecast-temperature">
          <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}º</span>
          <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}º</span>
        </div>
      </div>
      ` 
      ;
    }
      });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    }

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function displayWeatherCondition(response) {
  console.log(response.data);

  celsiusTemperature = response.data.main.temp;
  
  let iconElement = document.querySelector(`#icon`);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#degree`).innerHTML = Math.round(celsiusTemperature);
  document.querySelector(`#weatherCondition`).innerHTML = response.data.weather[0].description;
  document.querySelector(`#min`).innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector(`#max`).innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = response.data.wind.speed;
  iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);

  if (celsiusTemperature <= 5) {
    document.querySelector("#background").style.background =
  "linear-gradient(to bottom, rgba(241,248,255,1), rgba(235,245,255,1), rgba(222,238,255,1), rgba(205,222,240,1), rgba(197,215,233,1)";
}

  if (celsiusTemperature >= 6 ) {
    document.querySelector("#background").style.background =
  "linear-gradient(to bottom, rgba(255,252,252,1), rgba(225,230,251,1), rgba(225,230,251,1), rgba(214,222,252,1)"; 
}

  if (celsiusTemperature >= 14 ) {
    document.querySelector("#background").style.background =
  "linear-gradient(to top, rgba(255,235,199,1), rgba(255,235,199,1), rgba(255,251,245,1), rgba(255,251,245,1)"; 
  }
  if (celsiusTemperature >= 19 ) {
    document.querySelector("#background").style.background =
  "linear-gradient(180deg, rgba(255,247,233,1), rgba(255,245,231,1), rgba(255,245,231,1), rgba(255,228,182,1)";
  }
}


  function updateCity(event) {
  event.preventDefault();
  let apiKey = `8cac06f7ab6c10287cd06a316ff84a57`;
  let city = document.querySelector(`#city-search`).value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  }

  let searchedCity = document.querySelector("form");
  searchedCity.addEventListener("submit", updateCity);
  let searchedCityButtton = document.querySelector("#button-addon2");
  searchedCityButtton.addEventListener("click", updateCity);

  function searchCity(city) {
    let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6bb85c847753f42906fed65eb4885241";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  }

  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition); 
  } 
  
  let currentLocationButton = document.querySelector("#currentLocation");
  currentLocationButton.addEventListener("click", currentLocation);

  searchCity("New York");






