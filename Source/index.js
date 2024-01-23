function handleTextSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = searchInput.value;
}

let textFormElement = document.querySelector("#search-form");
textFormElement.addEventListener("submit", handleTextSubmit);
