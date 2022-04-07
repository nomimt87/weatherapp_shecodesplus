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

// Weather and Geolocation WK5

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
}

let currentLocation = document.querySelector("#geolocation");
currentLocation.addEventListener("click", coordinates);

searchEng("Quito");

//C & F buttons

function tempConversion() {
  let conversionTemp = document.querySelector(".tempActual");
  conversionTemp.innerHTML = `68`;
}
let fDegrees = document.querySelector("#fahrenheit");
fDegrees.addEventListener("click", tempConversion);

function tempConversionTwo() {
  let conversionReturn = document.querySelector(".tempActual");
  conversionReturn.innerHTML = "20";
}
let cDegrees = document.querySelector("#celsius");
cDegrees.addEventListener("click", tempConversionTwo);
