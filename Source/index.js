function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

searchCity("Sandton");
