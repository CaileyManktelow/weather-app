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
  km = response.data.wind.speed;
  let windSpeed = (document.querySelector("#wind-speed").innerHTML =
    Math.round(km));
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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
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

  farenheightSelector.classList.remove("active");
  celciusSelector.classList.add("active");
}
function toFarenheight(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let farenheightTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheightTemperature);

  celciusSelector.classList.remove("active");
  farenheightSelector.classList.add("active");
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row gx-2">`;
  let days = ["Thursday", "friday", "Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-lg-2">
            <div class="forecast">
              <div class="day">${day}</div>
              <p class="future">
                6° <br />
                <i class="fas fa-cloud cloud"></i>
              </p>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celciusTemperature = null;
let km = null;
let celciusSelector = document.querySelector("#celcius");
celciusSelector.addEventListener("click", toCelcius);

let farenheightSelector = document.querySelector("#farenheight");
farenheightSelector.addEventListener("click", toFarenheight);

searchCity("montreal");
displayForecast();
