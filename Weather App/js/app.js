// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = '4d8fb5b93d4af21d66a2948710284366'; // Replace with your OpenWeatherMap API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLastCity();
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const locationBtn = document.getElementById('locationBtn');
        const cityInput = document.getElementById('cityInput');

        searchBtn.addEventListener('click', () => this.searchWeather());
        locationBtn.addEventListener('click', () => this.getLocationWeather());
        
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });

        // Add input event for real-time search suggestions
        cityInput.addEventListener('input', (e) => {
            this.handleInputChange(e.target.value);
        });
    }

    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();

        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        // Check if API key is set
        if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
            this.showError('API key not configured. Please add your OpenWeatherMap API key to get real weather data.');
            console.log('API key not set. Please add your OpenWeatherMap API key in js/app.js');
            return;
        }

        this.showLoading();
        try {
            const weatherData = await this.getWeatherData(city);
            const forecastData = await this.getForecastData(city);
            
            this.displayWeather(weatherData, forecastData);
            this.saveLastCity(city);
        } catch (error) {
            if (error.message === 'City not found') {
                this.showError(`City "${city}" not found. Please check the spelling and try again.`);
            } else if (error.message.includes('401')) {
                this.showError('Invalid API key. Please check your OpenWeatherMap API key.');
            } else if (error.message.includes('429')) {
                this.showError('API rate limit exceeded. Please try again later.');
            } else {
                this.showError('Unable to fetch weather data. Please check your internet connection and try again.');
            }
            console.error('Error fetching weather data:', error);
        }
    }

    async getLocationWeather() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        // Check if API key is set
        if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
            this.showError('API key not configured. Please add your OpenWeatherMap API key to get real weather data.');
            console.log('API key not set. Please add your OpenWeatherMap API key in js/app.js');
            return;
        }

        this.showLoading();
        
        try {
            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position.coords;
            
            const weatherData = await this.getWeatherDataByCoords(latitude, longitude);
            const forecastData = await this.getForecastDataByCoords(latitude, longitude);
            
            this.displayWeather(weatherData, forecastData);
        } catch (error) {
            if (error.code === 1) {
                this.showError('Location access denied. Please allow location access or search for a city.');
            } else if (error.code === 2) {
                this.showError('Location unavailable. Please try searching for a city.');
            } else if (error.code === 3) {
                this.showError('Location request timed out. Please try again.');
            } else {
                this.showError('Unable to get your location. Please try searching for a city.');
            }
            console.error('Error getting location:', error);
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: true
            });
        });
    }

    async getWeatherData(city) {
        const response = await fetch(
            `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`
        );
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 401) {
                throw new Error('401 Unauthorized');
            } else if (response.status === 429) {
                throw new Error('429 Rate limit exceeded');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        }
        
        return await response.json();
    }

    async getWeatherDataByCoords(lat, lon) {
        const response = await fetch(
            `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        );
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('401 Unauthorized');
            } else if (response.status === 429) {
                throw new Error('429 Rate limit exceeded');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        }
        
        return await response.json();
    }

    async getForecastData(city) {
        const response = await fetch(
            `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`
        );
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            } else if (response.status === 401) {
                throw new Error('401 Unauthorized');
            } else if (response.status === 429) {
                throw new Error('429 Rate limit exceeded');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        }
        
        return await response.json();
    }

    async getForecastDataByCoords(lat, lon) {
        const response = await fetch(
            `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        );
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('401 Unauthorized');
            } else if (response.status === 429) {
                throw new Error('429 Rate limit exceeded');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        }
        
        return await response.json();
    }

    displayWeather(weatherData, forecastData) {
        this.hideLoading();
        this.hideError();
        
        // Update current weather
        this.updateCurrentWeather(weatherData);
        
        // Update forecast
        this.updateForecast(forecastData);
        
        // Show weather display
        document.getElementById('weatherDisplay').classList.add('show');
    }

    updateCurrentWeather(data) {
        const cityName = document.getElementById('cityName');
        const temperature = document.getElementById('temperature');
        const weatherDescription = document.getElementById('weatherDescription');
        const weatherIcon = document.getElementById('weatherIcon');
        const feelsLike = document.getElementById('feelsLike');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const visibility = document.getElementById('visibility');
        const pressure = document.getElementById('pressure');
        const uvIndex = document.getElementById('uvIndex');

        cityName.textContent = data.name + ', ' + data.sys.country;
        temperature.textContent = Math.round(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
        weatherIcon.className = this.getWeatherIcon(data.weather[0].main, data.weather[0].description);
        feelsLike.textContent = Math.round(data.main.feels_like);
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
        visibility.textContent = (data.visibility / 1000).toFixed(1) + ' km';
        pressure.textContent = data.main.pressure + ' hPa';
        uvIndex.textContent = '5'; // UV index not available in free API

        // Add animation
        this.animateWeatherUpdate();
    }

    updateForecast(forecastData) {
        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        // Get daily forecasts (every 24 hours)
        const dailyForecasts = this.getDailyForecasts(forecastData.list);

        dailyForecasts.forEach(forecast => {
            const forecastCard = this.createForecastCard(forecast);
            forecastContainer.appendChild(forecastCard);
        });
    }

    getDailyForecasts(forecastList) {
        const dailyForecasts = [];
        const today = new Date();
        
        // Get forecasts for next 5 days
        for (let i = 1; i <= 7; i++) {
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + i);
            
            // Find forecast for this day (around noon)
            const dayForecast = forecastList.find(forecast => {
                const forecastDate = new Date(forecast.dt * 1000);
                return forecastDate.getDate() === targetDate.getDate() &&
                       forecastDate.getMonth() === targetDate.getMonth();
            });
            
            if (dayForecast) {
                dailyForecasts.push(dayForecast);
            }
        }
        
        return dailyForecasts;
    }

    createForecastCard(forecast) {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = this.getWeatherIcon(forecast.weather[0].main, forecast.weather[0].description);
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        
        card.innerHTML = `
            <div class="day">${day}</div>
            <div class="forecast-icon">
                <i class="${icon}"></i>
            </div>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-desc">${description}</div>
        `;
        
        return card;
    }

    getWeatherIcon(main, description) {
        const weatherIcons = {
            'Clear': 'fas fa-sun',
            'Clouds': description.includes('scattered') ? 'fas fa-cloud-sun' : 'fas fa-cloud',
            'Rain': description.includes('light') ? 'fas fa-cloud-rain' : 'fas fa-cloud-showers-heavy',
            'Drizzle': 'fas fa-cloud-rain',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Smoke': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Dust': 'fas fa-smog',
            'Fog': 'fas fa-smog',
            'Sand': 'fas fa-smog',
            'Ash': 'fas fa-smog',
            'Squall': 'fas fa-wind',
            'Tornado': 'fas fa-wind'
        };
        
        return weatherIcons[main] || 'fas fa-cloud-sun';
    }

    animateWeatherUpdate() {
        const weatherDisplay = document.getElementById('weatherDisplay');
        weatherDisplay.style.opacity = '0';
        weatherDisplay.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            weatherDisplay.style.transition = 'all 0.5s ease';
            weatherDisplay.style.opacity = '1';
            weatherDisplay.style.transform = 'translateY(0)';
        }, 100);
    }

    showLoading() {
        document.getElementById('loading').classList.add('show');
        document.getElementById('weatherDisplay').classList.remove('show');
        document.getElementById('errorMessage').classList.remove('show');
    }

    hideLoading() {
        document.getElementById('loading').classList.remove('show');
    }

    showError(message) {
        this.hideLoading();
        document.getElementById('weatherDisplay').classList.remove('show');
        
        const errorElement = document.getElementById('errorMessage');
        errorElement.querySelector('p').textContent = message;
        errorElement.classList.add('show');
    }

    hideError() {
        document.getElementById('errorMessage').classList.remove('show');
    }

    handleInputChange(value) {
        // Add real-time validation or suggestions here
        if (value.length > 0) {
            document.getElementById('searchBtn').style.opacity = '1';
        } else {
            document.getElementById('searchBtn').style.opacity = '0.7';
        }
    }

    saveLastCity(city) {
        localStorage.setItem('lastCity', city);
    }

    loadLastCity() {
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            document.getElementById('cityInput').value = lastCity;
        }
    }

    // Demo mode for when API key is not available
    enableDemoMode() {
        const demoData = {
            name: 'New York',
            sys: { country: 'US' },
            main: {
                temp: 22,
                feels_like: 24,
                humidity: 65,
                pressure: 1013
            },
            weather: [{ main: 'Clouds', description: 'partly cloudy' }],
            wind: { speed: 3.3 },
            visibility: 10000
        };

        const demoForecast = {
            list: [
                { dt: Date.now() / 1000 + 86400, main: { temp: 24 }, weather: [{ main: 'Clear', description: 'clear sky' }] },
                { dt: Date.now() / 1000 + 172800, main: { temp: 26 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }] },
                { dt: Date.now() / 1000 + 259200, main: { temp: 23 }, weather: [{ main: 'Rain', description: 'light rain' }] },
                { dt: Date.now() / 1000 + 345600, main: { temp: 25 }, weather: [{ main: 'Clear', description: 'clear sky' }] },
                { dt: Date.now() / 1000 + 432000, main: { temp: 27 }, weather: [{ main: 'Clouds', description: 'broken clouds' }] },
                { dt: Date.now() / 1000 + 518400, main: { temp: 28 }, weather: [{ main: 'Clear', description: 'clear sky' }] },
                { dt: Date.now() / 1000 + 604800, main: { temp: 26 }, weather: [{ main: 'Clouds', description: 'scattered clouds' }] }
            ]
        };

        this.displayWeather(demoData, demoForecast);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = new WeatherApp();
    
    // Check if API key is set, if not enable demo mode
    if (!weatherApp.apiKey || weatherApp.apiKey === 'YOUR_API_KEY') {
        console.log('API key not set. Running in demo mode.');
        weatherApp.enableDemoMode();
    }
});

// Add some additional UI enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling
    const smoothScroll = (target) => {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('cityInput').blur();
        }
    });

    // Add focus effects
    const cityInput = document.getElementById('cityInput');
    cityInput.addEventListener('focus', () => {
        cityInput.parentElement.style.transform = 'scale(1.02)';
    });

    cityInput.addEventListener('blur', () => {
        cityInput.parentElement.style.transform = 'scale(1)';
    });
});
