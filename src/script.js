function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentCityWeather);
}
function currentCityWeather(response) {
  console.log(response);
  let currentCity = response.data.name;
  city.innerHTML = `${currentCity}`;
  let condition = response.data.weather[0].main;
  let temp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  coditionElement.innerHTML = `${condition}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
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
  city.innerHTML = `${searchCityInput.value}`;
  coditionElement.innerHTML = `${condition}`;
  currentTempElement.innerHTML = `${temp}`;
  highTempElement.innerHTML = `${highTemp}`;
  lowTempElement.innerHTML = `${lowTemp}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}km/h`;
}

let apiKey = "c10c120febfbdbb2ecbedb567e2ec32d";

let city = document.querySelector("#city");
let searchCityInput = document.querySelector("#search-city-input");
searchCityInput.addEventListener("submit", inputCity);
let searchCityButton = document.querySelector("#search-city-btn");
searchCityButton.addEventListener("click", inputCity);

let coditionElement = document.querySelector("#condition");
let currentTempElement = document.querySelector("#current-temp");
let highTempElement = document.querySelector("#high-temp");
let lowTempElement = document.querySelector("#low-temp");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");

navigator.geolocation.getCurrentPosition(currentCity);
