function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time *1000);

  console.log(response.data);

  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = `${date.getDay()} ${date.getHours()}:${date.getMinutes()};
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  feelsLikeElement.innerHTML = `${response.data.temperature.feels_like}°`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formateDate(date) {
let day = date.getDay();
let minutes = date.getMinutes();
let hours = date.getHours();


let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

}

function checkOwnCity(city) {
  let apiKey = "6ca646t4occ4350eb99fb0c373d683b4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleTextSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  checkOwnCity(searchInput.value);
}

let textFormElement = document.querySelector("#search-form");
textFormElement.addEventListener("submit", handleTextSubmit);

checkOwnCity("Sandton");
