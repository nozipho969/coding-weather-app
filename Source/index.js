function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = formateDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  feelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="description-icon" />`;

  fetchWeekForecast(response.data.city);
}

function formateDate(date) {
  let year = date.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${month} ${year} ${day} ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}

function fetchWeekForecast(city) {
  let apiKey = "6ca646t4occ4350eb99fb0c373d683b4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showWeekForecast);
}

function showWeekForecast(response) {
  let weekForecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      weekForecastHtml =
        weekForecastHtml +
        `
    <div class="day-forecast">
    <div class="week-forecast-date">${formatDay(day.time)}</div>
    <img src ="${day.condition.icon_url}" class="day-forecast-icon />
    <div class="week-forecast-temperatures">
    <span class="week-forecast-temperature-max">
    <strong> ${Math.round(day.temperature.maximum)}°</strong></span>
    <span class="week-forecast-temperature-min"> ${Math.round(
      day.temperature.minimum
    )}° </span>
    </div>
    </div>
    `;
    }
  });

  let weekForecastElement = document.querySelector("#week-forecast");
  weekForecastElement.innerHTML = weekForecastHtml;
}

let textFormElement = document.querySelector("#search-form");
textFormElement.addEventListener("submit", handleTextSubmit);

checkOwnCity("Sandton");
