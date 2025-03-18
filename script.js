// API Key and Base URL
const apiKey = "2ae4a8e8466eec7f2cbcc421da0631a1"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const locationInput = document.getElementById("location-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");
const locationName = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Default weather icon
const defaultIcon = "default-icon.png"; // Add a default icon in the same folder

// Fetch Weather Data
async function fetchWeather(city) {
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Display Weather Data
function displayWeather(data) {
  locationName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Set the weather icon
  const iconCode = data.weather[0].icon;
  if (iconCode) {
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  } else {
    weatherIcon.src = defaultIcon; // Fallback to default icon
  }
}

// Event Listener for Search Button
searchBtn.addEventListener("click", async () => {
  const city = locationInput.value;
  if (city) {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  }
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  themeToggle.textContent = body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

// Fetch Weather for User's Location on Page Load
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        displayWeather(data);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }
});
