function formatDate(timestamp) {
  let updateTime = new Date(timestamp);
  let hours = updateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = updateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[updateTime.getDay()];
  return `Last updated ${day} ${hours}:${minutes}`;
}

function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentCityWeather);
}
function currentCityWeather(response) {
  let currentCity = response.data.name;
  city.innerHTML = `${currentCity}`;
  let condition = response.data.weather[0].main;
  let temp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  coditionElement.innerHTML = `${condition}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function locateCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateCityWeather);
  function locateCityWeather(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(currentCityWeather);
  }
}

function inputCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(inputCityWeather);
}

function inputCityWeather(response) {
  let condition = response.data.weather[0].main;
  let temp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  city.innerHTML = `${searchCityInput.value}`;
  coditionElement.innerHTML = `${condition}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${condition}`);
}

function tempToFahrenheit() {
  if (tempUnit.innerHTML === "ºC") {
    let currentTemp = currentTempElement.innerHTML;
    currentTemp = Number(currentTemp);
    currentTempElement.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
    let highTemp = highTempElement.innerHTML;
    highTemp = Number(highTemp);
    highTempElement.innerHTML = Math.round((highTemp * 9) / 5 + 32);
    let lowTemp = lowTempElement.innerHTML;
    lowTemp = Number(lowTemp);
    lowTempElement.innerHTML = Math.round((lowTemp * 9) / 5 + 32);
    tempUnit.innerHTML = "ºF";
  }
}

function tempToCelcius() {
  if (tempUnit.innerHTML === "ºF") {
    let currentTemp = currentTempElement.innerHTML;
    currentTemp = Number(currentTemp);
    currentTempElement.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
    let highTemp = highTempElement.innerHTML;
    highTemp = Number(highTemp);
    highTempElement.innerHTML = Math.round(((highTemp - 32) * 5) / 9);
    let lowTemp = lowTempElement.innerHTML;
    lowTemp = Number(lowTemp);
    lowTempElement.innerHTML = Math.round(((lowTemp - 32) * 5) / 9);
    tempUnit.innerHTML = "ºC";
  }
}

let apiKey = "c10c120febfbdbb2ecbedb567e2ec32d";

let dateTimeElement = document.querySelector("#date-time");

let city = document.querySelector("#city");
let searchCityInput = document.querySelector("#search-city-input");
searchCityInput.addEventListener("submit", inputCity);
let searchCityButton = document.querySelector("#search-city-btn");
searchCityButton.addEventListener("click", inputCity);

let locationButton = document.querySelector("#location-btn");
locationButton.addEventListener("click", locateCity);

let iconElement = document.querySelector("#icon-element");
let coditionElement = document.querySelector("#condition");
let currentTempElement = document.querySelector("#current-temp");
let highTempElement = document.querySelector("#high-temp");
let lowTempElement = document.querySelector("#low-temp");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");

let tempUnit = document.querySelector("#temp-unit");

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", tempToFahrenheit);

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", tempToCelcius);

navigator.geolocation.getCurrentPosition(currentCity);
