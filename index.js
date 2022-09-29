let now = new Date();
  
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

  let todayIs = document.querySelector(`h2#today`);
  todayIs.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`; 
  }


  function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["mon", "tue", "wed", "fri"];
  days.forEach(function (day) {
  forecastHTML = 
  forecastHTML + 
  `      
  <div class="col">
    <div class="forecast-date" id="day1">${day}</div>
    <img src="http://openweathermap.org/img/wn/10d@2x.png" width="100" height="100"/>
    <div class="forecast-temperature">
      <span class="forecast-temperature-max">21°</span>
      <span class="forecast-temperature-min">17°</span>
    </div>
  </div>
  ` 
  ;
  });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
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
  } 

  function updateCity(event) {
  event.preventDefault();
  let apiKey = `6bb85c847753f42906fed65eb4885241`;
  let city = document.querySelector(`#city-search`).value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  }

  let searchedCity = document.querySelector("form");
  searchedCity.addEventListener("submit", updateCity);
  let searchedCityButtton = document.querySelector("#button-addon2");
  searchedCityButtton.addEventListener("click", updateCity);

  function searchCity(city) {
    let apiKey = "6bb85c847753f42906fed65eb4885241";
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
  
  let celsiusTemperature = null;

  let currentLocationButton = document.querySelector("#currentLocation");
  currentLocationButton.addEventListener("click", currentLocation);


  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degree");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degree");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius");
  celsiusLink.addEventListener("click", convertToCelsius);

  searchCity("New York");
  displayForecast();

  






