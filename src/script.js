function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentCityWeather);
}
function currentCityWeather(response) {
  console.log(response);
}
let apiKey = "c10c120febfbdbb2ecbedb567e2ec32d";
navigator.geolocation.getCurrentPosition(currentCity);
