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

function getForecast(coordinates) {
  let apiKey = "11d5388f18b558800b7dfa9265df5c52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
  console.log(response);
  let cityName = (document.querySelector("#city").innerHTML =
    response.data.name);
  let currentTemperature = (document.querySelector(
    "#current-temperature"
  ).innerHTML = Math.round(response.data.main.temp));
  let humidity = (document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  ));
  let windSpeed = (document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let feelsLike = (document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  ));
  let currentIconElement = document.querySelector("#current-icon");
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
displayCurrentDayTime();

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row gx-2">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-lg-2">
            <div class="forecast">
              <div class="day">${formatDay(forecastDay.dt)}</div>
             <div id="forecast-icon"><img width=65px src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png" /> </div>
               <div class="forecastTemp">
               <span class="forecastTempMax"> ${Math.round(
                 forecastDay.temp.max
               )}°</span>       
                <span class="forecastTempMin"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>

              </div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
searchCity("montreal");
displayForecast();
