const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('Location').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    getWeather(city);
});

async function getWeather(city) { 
    try {
        // Fetch current weather data
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!currentWeatherResponse.ok) {
            throw new Error('City not found');
        }
        const currentWeatherData = await currentWeatherResponse.json();
        updateCurrentWeather(currentWeatherData);

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not found');
        }
        const forecastData = await forecastResponse.json();
        updateForecast(forecastData);
    } catch (error) {
        alert(error.message);
        clearWeatherInfo();
    }
}

function updateCurrentWeather(data) {
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast-info');
    forecastContainer.innerHTML = '';

    // Group forecast by date
    const forecastByDate = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!forecastByDate[date]) {
            forecastByDate[date] = [];
        }
        forecastByDate[date].push(item);
    });

    // Create forecast cards for each date
    for (const date in forecastByDate) {
        const dayData = forecastByDate[date];
        // Calculate average temperature and pick the first weather description
        const avgTemp = (
            dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length
        ).toFixed(1);
        const description = dayData[0].weather[0].description;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `<div><h3>${date}</h3><p>Avg Temp: ${avgTemp} °C</p><p>Condition: ${description}</p></div>`;
        forecastContainer.appendChild(card);
    }
}

function clearWeatherInfo() {
    document.getElementById('temperature').textContent = 'Temperature: ';
    document.getElementById('condition').textContent = 'Condition: ';
    document.getElementById('humidity').textContent = 'Humidity: ';
    document.getElementById('wind-speed').textContent = 'Wind Speed: ';
    document.getElementById('forecast-info').innerHTML = '';
}
