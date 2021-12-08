function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#change-city").value;
  let apiKey = "11d5388f18b558800b7dfa9265df5c52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}
//Display a city by default
//Add current location button
function displayCurrentWeather(response) {
  console.log(response);
  let cityName = (document.querySelector("#city").innerHTML =
    response.data.name);
  console.log(cityName);
  let currentTemperature = (document.querySelector(
    "#current-temperature"
  ).innerHTML = Math.round(response.data.main.temp));
  let humidity = (document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  ));
  let windSpeed = (document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let feelsLike = (document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  ));
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
}

let search = document.querySelector("#search");
search.addEventListener("submit", changeCity);

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
