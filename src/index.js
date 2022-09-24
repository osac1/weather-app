let now = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let hour = now.getHours();
let minute = ("0" + now.getMinutes()).slice(-2);

let todaysDate = document.querySelector(".date");
todaysDate.innerHTML = `${day[now.getDay()]}, ${hour}:${minute}`;

function showData(response) {
  let newDegrees = document.querySelector(".mainTemp");
  newDegrees.innerHTML = `${Math.round(response.data.main.temp)}°C 🌤`;
  let locName = document.querySelector("#city-name");
  locName.innerHTML = response.data.name;
}

function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  let changedCity = document.querySelector("#city-name");

  if (newCity.value) {
    changedCity.innerHTML = newCity.value;
  } else {
    changedCity.innerHTML = "Enter your city";
  }
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showData);
}

let cityIn = document.querySelector("#enter-city");
cityIn.addEventListener("submit", changeCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiLocKey = "ca5af28648d86b7925348bb9fb85cd3a";
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiLocKey}&units=metric`;
  axios.get(apiUrlTwo).then(showData);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let newLocation = document.querySelector("#curr-location");
newLocation.addEventListener("click", getPosition);
