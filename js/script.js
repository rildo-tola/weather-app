// DOM ELEMENT SELECTION
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherContainer = document.getElementById("weatherContainer");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const errorMsg = document.getElementById("errorMsg");
const loadingMsg = document.getElementById("loadingMsg");

// API KEY
const API_KEY = "15640c149378b4e587f08bcab5bda9b1";


// SEARCH BUTTON EVENT
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;
  getWeather(city);
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

    cityName.textContent = data.name;
    temperature.textContent = `🌡️ ${Math.round(data.main.temp)}°C`;
    description.textContent = `☁️ ${data.weather[0].description}`;

    weatherContainer.classList.remove("hidden");

  } catch (error) {
    errorMsg.textContent = "Could not fetch weather. Try another city.";
    errorMsg.classList.remove("hidden");
  } finally {
    loadingMsg.classList.add("hidden");
    searchBtn.disabled = false;
  }
}
