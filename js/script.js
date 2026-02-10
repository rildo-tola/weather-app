// DOM ELEMENT SELECTION
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");
const weatherContainer = document.getElementById("weatherContainer");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const errorMsg = document.getElementById("errorMsg");
const loadingMsg = document.getElementById("loadingMsg");

// API KEY
const API_KEY = "";


// SEARCH BUTTON EVENT
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;

  if (searchBtn.disabled) return;

  getWeather(city);
});


cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});


// MAIN FUNCTION
async function getWeather(city) {
  //RESET UI STATE
  errorMsg.classList.add("hidden");
  weatherContainer.classList.add("hidden");

  loadingMsg.classList.remove("hidden");
  searchBtn.disabled = true;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

const isDay = data.weather[0].icon.includes("d");
updateDayNight(isDay);

const iconCode = data.weather[0].icon;
weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

const weatherMain = data.weather[0].main.toLowerCase();
updateBackground(weatherMain);

    cityName.textContent = data.name;
    temperature.textContent = `🌡️ ${Math.round(data.main.temp)}°C`;
    description.textContent = `☁️ ${data.weather[0].description}`;

    weatherContainer.classList.remove("hidden");

    const temp = data.main.temp;
    updateTemperatureColor(temp);

  } catch (error) {
    errorMsg.textContent = "City not found. Please check spelling and try again.";
    errorMsg.classList.remove("hidden");
  } finally {
    loadingMsg.classList.add("hidden");
    searchBtn.disabled = false;
    cityInput.value = "";
  }
  
}

function updateBackground(condition) {
  const body = document.body;

  if (condition.includes("clear")) {
    body.style.background = "linear-gradient(to top, #4facfe, #00f2fe)";
  } 
  else if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(to top, #bdc3c7, #2c3e50)";
  } 
  else if (condition.includes("rain")) {
    body.style.background = "linear-gradient(to top, #373b44, #4286f4)";
  } 
  else if (condition.includes("snow")) {
    body.style.background = "linear-gradient(to top, #e6dada, #274046)";
  } 
  else {
    body.style.background = "#0f172a"; // default
  }
}

function updateDayNight(isDay) {
  const app = document.querySelector(".app");

  if (isDay) {
    app.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
  } else {
    app.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
  }
}

function updateTemperatureColor(temp) {
  if (temp <= 10) {
    temperature.style.color = "#3b82f6"; // cold (blue)
  } 
  else if (temp <= 25) {
    temperature.style.color = "#22c55e"; // mild (green)
  } 
  else {
    temperature.style.color = "#ef4444"; // hot (red)
  }
}


cityInput.focus();
