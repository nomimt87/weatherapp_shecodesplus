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

function getForecast(coordinates) {
  let apiKey = "adda405da08f4e0af2c4bf326ccdff5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(response.data.coord);
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
  getForecast(response.data.coord);
}

let currentLocation = document.querySelector("#geolocation");
currentLocation.addEventListener("click", coordinates);

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="row">
        <div class="col-4">
        <strong class="day">${formatForecast(forecastDay.dt)}</strong>
        </div>
        <div class="col-4">
          <img
            class="five"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
          />
        </div>
        <div class="col-4">
          <span class="maxTemp">${Math.round(forecastDay.temp.max)} </span>/
          <span class="minTemp">${Math.round(
            forecastDay.temp.min
          )}</span> <span class="unit">°C</span>
        </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

searchEng("Quito");
