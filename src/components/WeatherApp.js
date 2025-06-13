import { useState, useEffect } from 'react';

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
    </svg>
);

const MapPinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
);

const ThermometerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
    </svg>
);

const DropletsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2.04 4.6 4.14 6.58s3.73 4.85 3.73 8.4c0 5.76-3.58 10.43-8 10.43-.14 0-.28 0-.42-.02"></path>
    </svg>
);

const WindIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
    </svg>
);

const SunIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
);

const RefreshIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    </svg>
);

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchCity, setSearchCity] = useState('');
    const [currentCity, setCurrentCity] = useState('Colombo');

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://api.weatherapi.com/v1/current.json'
    : '/v1/current.json';

    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
            );

            if (!response.ok) {
                throw new Error(`Weather data not found for "${city}"`);
            }

            const data = await response.json();
            setWeatherData(data);
            setCurrentCity(city);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchCity.trim()) {
            fetchWeather(searchCity.trim());
            setSearchCity('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const refreshWeather = () => {
        fetchWeather(currentCity);
    };

    useEffect(() => {
        fetchWeather('Colombo');
    }, []);

    const formatDateTime = () => {
        const now = new Date();
        return {
            date: now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const getUVIndexColor = (uv) => {
        if (uv <= 2) return 'uv-low';
        if (uv <= 5) return 'uv-moderate';
        if (uv <= 7) return 'uv-high';
        if (uv <= 10) return 'uv-very-high';
        return 'uv-extreme';
    };

    const getUVIndexLabel = (uv) => {
        if (uv <= 2) return 'Low';
        if (uv <= 5) return 'Moderate';
        if (uv <= 7) return 'High';
        if (uv <= 10) return 'Very High';
        return 'Extreme';
    };

    return (
        <div className="weather-app">
            <div className="weather-container">
                <div className="weather-header">
                    <h1 className="weather-title">Weather Reporter</h1>
                    <p className="weather-subtitle">Real-time weather information</p>
                </div>

                <div className="search-section">
                    <div className="search-container">
                        <input
                            type="text"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search for a city..."
                            className="search-input"
                        />
                        <button onClick={handleSearch} className="search-button">
                            <SearchIcon />
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="loading-container">
                        <div className="loading-content">
                            <RefreshIcon className="loading-spinner" />
                            <span>Loading weather data...</span>
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div className="error-container">
                        <div className="error-title">Error:</div>
                        <div className="error-message">
                            {error}
                            <br />
                            Please check the city name and try again.
                        </div>
                        <button onClick={() => fetchWeather('Colombo')} className="error-button">
                            Load Colombo Weather
                        </button>
                    </div>
                )}

                {weatherData && !error && !loading && (
                    <div className="weather-content">
                        <div className="weather-location">
                            <div className="location-name">
                                <MapPinIcon />
                                {weatherData.location.name}, {weatherData.location.country}
                            </div>
                            <div className="location-date">{formatDateTime().date}</div>
                            <div className="location-time">
                                <ClockIcon />
                                {formatDateTime().time}
                            </div>
                        </div>

                        <div className="weather-main">
                            <img
                                src={`https:${weatherData.current.condition.icon}`}
                                alt={weatherData.current.condition.text}
                                className="weather-icon"
                            />
                            <div className="main-temp">
                                {Math.round(weatherData.current.temp_c)}°C
                            </div>
                        </div>

                        <div className="weather-condition">
                            {weatherData.current.condition.text}
                        </div>

                        <div className="weather-details">
                            <div className="detail-card">
                                <div className="detail-header">
                                    <ThermometerIcon />
                                    <span className="detail-label">Temperature</span>
                                </div>
                                <div className="detail-value">
                                    {Math.round(weatherData.current.temp_c)}°C
                                </div>
                                <div className="detail-extra">
                                    Feels like {Math.round(weatherData.current.feelslike_c)}°C
                                </div>
                            </div>

                            <div className="detail-card">
                                <div className="detail-header">
                                    <DropletsIcon />
                                    <span className="detail-label">Humidity</span>
                                </div>
                                <div className="detail-value">
                                    {weatherData.current.humidity}%
                                </div>
                            </div>

                            <div className="detail-card">
                                <div className="detail-header">
                                    <WindIcon />
                                    <span className="detail-label">Wind Speed</span>
                                </div>
                                <div className="detail-value">
                                    {weatherData.current.wind_kph} km/h
                                </div>
                                <div className="detail-extra">
                                    {weatherData.current.wind_dir}
                                </div>
                            </div>

                            <div className="detail-card">
                                <div className="detail-header">
                                    <SunIcon />
                                    <span className="detail-label">UV Index</span>
                                </div>
                                <div className={`detail-value ${getUVIndexColor(weatherData.current.uv)}`}>
                                    {weatherData.current.uv}
                                </div>
                                <div className={`detail-extra ${getUVIndexColor(weatherData.current.uv)}`}>
                                    {getUVIndexLabel(weatherData.current.uv)}
                                </div>
                            </div>
                        </div>

                        <div className="weather-footer">
                            <div className="last-updated">
                                Last updated: {new Date(weatherData.current.last_updated).toLocaleTimeString()}
                            </div>
                            <button onClick={refreshWeather} className="refresh-button">
                                <RefreshIcon />
                                Refresh
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;