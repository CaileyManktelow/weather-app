function searchCity(city) {
  let apiKey = "11d5388f18b558800b7dfa9265df5c52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  searchCity(city);
}
function displayCurrentWeather(response) {
  celciusTemperature = response.data.main.temp;
  let cityName = (document.querySelector("#city").innerHTML =
    response.data.name);
  let currentTemperature = (document.querySelector(
    "#current-temperature"
  ).innerHTML = Math.round(celciusTemperature));
  let humidity = (document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  ));
  let windSpeed = (document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let currentIconElement = document.querySelector("#current-icon");
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let submit = document.querySelector("#search");
submit.addEventListener("submit", handleSubmit);

function displayCurrentDayTime() {
  let now = new Date();
  let day = now.getDay();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayTime = document.querySelector("#day-time");
  let today = days[day];
  let time = `${hour}:${minute}`;
  dayTime.innerHTML = `${today} ${time}`;
}

displayCurrentDayTime();

function toCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let windSpeedUnit = document.querySelector("#speed-unit");
  windSpeedUnit.innerHTML = " KM/H";
  farenheightSelector.classList.remove("active");
  celciusSelector.classList.add("active");
}
function toFarenheight(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let farenheightTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheightTemperature);
  let windSpeedUnit = document.querySelector("#speed-unit");
  windSpeedUnit.innerHTML = " MPH";
  celciusSelector.classList.remove("active");
  farenheightSelector.classList.add("active");
}
let celciusTemperature = null;
let celciusSelector = document.querySelector("#celcius");
celciusSelector.addEventListener("click", toCelcius);

let farenheightSelector = document.querySelector("#farenheight");
farenheightSelector.addEventListener("click", toFarenheight);

searchCity("montreal");
