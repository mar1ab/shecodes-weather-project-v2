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
  tempUnit.innerHTML = "ºC";
  coditionElement.innerHTML = `${condition}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempIndicator.innerHTML = "H ";
  highTempElement.innerHTML = `${highTemp}`;
  highTempDegree.innerHTML = "º";
  lowTempIndicator.innerHTML = " | L ";
  lowTempElement.innerHTML = `${lowTemp}`;
  lowTempDegree.innerHTML = "º";
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  if (response.data.dt < response.data.sys.sunrise) {
    style.setAttribute("href", "src/darkstyle.css");
  } else {
    if (response.data.dt > response.data.sys.sunset) {
      style.setAttribute("href", "src/darkstyle.css");
    } else {
      style.setAttribute("href", "src/style.css");
    }
  }
  getForecast(response.data.coord);
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
  tempUnit.innerHTML = "ºC";
  city.innerHTML = `${searchCityInput.value}`;
  coditionElement.innerHTML = `${condition}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempIndicator.innerHTML = "H ";
  highTempElement.innerHTML = `${highTemp}`;
  highTempDegree.innerHTML = "º";
  lowTempIndicator.innerHTML = " | L ";
  lowTempElement.innerHTML = `${lowTemp}`;
  lowTempDegree.innerHTML = "º";
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${condition}`);
  if (response.data.dt < response.data.sys.sunrise) {
    style.setAttribute("href", "src/darkstyle.css");
  } else {
    if (response.data.dt > response.data.sys.sunset) {
      style.setAttribute("href", "src/darkstyle.css");
    } else {
      style.setAttribute("href", "src/style.css");
    }
  }
  getForecast(response.data.coord);
}

function getForecast(position) {
  let lat = position.lat;
  let lon = position.lon;
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <strong class="forecast-day">${formatForecastDate(
            forecastDay.dt
          )}</strong><br /><span class="forecast-temp-high">${Math.round(
          forecastDay.temp.max
        )}</span>º | <span class="forecast-temp-low">${Math.round(
          forecastDay.temp.min
        )}</span>º <br /><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png">
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
let highTempIndicator = document.querySelector("#h-temp-indicator");
let lowTempIndicator = document.querySelector("#l-temp-indicator");
let highTempDegree = document.querySelector("#h-degree-populate");
let lowTempDegree = document.querySelector("#l-degree-populate");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");

let tempUnit = document.querySelector("#temp-unit");

let forecastElement = document.querySelector("#forecast");

let style = document.querySelector("#style");

navigator.geolocation.getCurrentPosition(currentCity);
