async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
const apiKey = "6429337d39ab21da2768801bcffbb266";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("City not found please try again");

    const data = await response.json();

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const condition = data.weather[0].main;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;


    document.getElementById("weatherResult").innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" />
      <p><strong>${condition}</strong>: ${description}</p>
      <p>🌡 Temperature: ${temp} °C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬 Wind Speed: ${wind} m/s</p>
    `;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
  
}