function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function sunRiseSet(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchEng(city);
}

function searchEng(city) {
  let apiKey = "adda405da08f4e0af2c4bf326ccdff5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".tempActual").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentDisplay").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("h5").innerHTML = response.data.weather[0].description;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${wind}`;
  document.querySelector("#sunrise").innerHTML = sunRiseSet(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = sunRiseSet(
    response.data.sys.sunset * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", searchCity);

function coordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "adda405da08f4e0af2c4bf326ccdff5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(geolocationTemp);
}

function geolocationTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".tempActual").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentDisplay").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("h5").innerHTML = response.data.weather[0].description;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${wind}`;
  document.querySelector("#sunrise").innerHTML = sunRiseSet(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = sunRiseSet(
    response.data.sys.sunset * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

let currentLocation = document.querySelector("#geolocation");
currentLocation.addEventListener("click", coordinates);

function fahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(".tempActual").innerHTML = Math.round(
    fahrenheitTemperature
  );
  cDegrees.classList.remove("active");
  fDegrees.classList.add("active");
}

function celsiusTemp(event) {
  event.preventDefault();
  document.querySelector(".tempActual").innerHTML =
    Math.round(celsiusTemperature);
  fDegrees.classList.remove("active");
  cDegrees.classList.add("active");
}

let fDegrees = document.querySelector("#fahrenheit");
fDegrees.addEventListener("click", fahrenheitTemp);

let cDegrees = document.querySelector("#celsius");
cDegrees.addEventListener("click", celsiusTemp);

let celsiusTemperature = null;

searchEng("Quito");
