document.getElementById('fetch-btn').addEventListener('click', fetchWeatherData);


document.getElementById('city-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') fetchWeatherData();
});

async function fetchWeatherData() {
  const cityInput = document.getElementById('city-input').value.trim();
  const displayArea = document.getElementById('weather-display');
  const statusMsg = document.getElementById('msg-status');

  if (!cityInput) {
    statusMsg.textContent = 'Please enter a city name.';
    statusMsg.className = 'status error';
    return;
  }

 
  statusMsg.textContent = `Fetching weather for ${cityInput}...`;
  statusMsg.className = 'status';
  displayArea.style.display = 'none';

 
  const apiEndpoint = `https://wttr.in/${encodeURIComponent(cityInput)}?format=j1`;

  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    const currentCondition = data.current_condition[0];
    const locationArea = data.nearest_area[0];

    
    document.getElementById('city-name').textContent = `${locationArea.areaName[0].value}, ${locationArea.country[0].value}`;
    document.getElementById('temperature').textContent = `${currentCondition.temp_C}°C`;
    document.getElementById('condition').textContent = currentCondition.weatherDesc[0].value;
    document.getElementById('humidity').textContent = currentCondition.humidity;

    statusMsg.textContent = '';
    displayArea.style.display = 'block';

  } catch (error) {
    console.error('Fetch error:', error);
    statusMsg.textContent = 'Failed to load weather data. Check city name.';
    statusMsg.className = 'status error';
  }
}