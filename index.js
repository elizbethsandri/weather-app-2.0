searchCity("Venice");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = 69;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);


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

  let todayIs = document.querySelector(`h2#today`);
  todayIs.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`; 
  }

  console.log(formatDate(now));

  function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#degree`).innerHTML = Math.round(response.data.main.temp);
  document.querySelector(`#weatherCondition`).innerHTML = response.data.weather[0].description;
  document.querySelector(`#min`).innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector(`#max`).innerHTML = Math.round(response.data.main.temp_max);
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

  
  function showTemperature(response) {
    let currentTemperature = document.querySelector(`#degree`);
    let temperature = Math.round(response.data.main.temp);
    currentTemperature.innerHTML = `${temperature}`;
    console.log(response.data);
    document.querySelector(`#city`).innerHTML = response.data.name;
    document.querySelector(`#degree`).innerHTML = Math.round(response.data.main.temp);
    document.querySelector(`#weatherCondition`).innerHTML = response.data.weather[0].description;
    document.querySelector(`#min`).innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector(`#max`).innerHTML = Math.round(response.data.main.temp_max);   
  }
  
  function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6bb85c847753f42906fed65eb4885241";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  }

  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition); 
  }

  let currentLocationButton = document.querySelector("#currentLocation");
  currentLocationButton.addEventListener("click", currentLocation);






