// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "614fd106c8b64026874152333232911";

  const searchWeather = () => {
    setLoading(true);
    setError("");

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.error) {
          alert("Failed to fetch weather data.");
        } else {
          setWeatherData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError("Failed to fetch weather data. Please try again.");
      });
  };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="content">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button onClick={searchWeather}>Search</button>
        {loading && <p>Loading data...</p>}
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div id="weather-container">
            <div className="weather-box">
              <p>
                <strong>Temperature</strong> <br /> {weatherData.current.temp_c}
                °C
              </p>
            </div>
            <div className="weather-box">
              <p>
                <strong>Humidity</strong> <br /> {weatherData.current.humidity}%
              </p>
            </div>
            <div className="weather-box">
              <p>
                <strong>Condition</strong> <br />
                {weatherData.current.condition.text}
              </p>
            </div>
            <div className="weather-box">
              <p>
                <strong>Wind Speed</strong> <br />
                {weatherData.current.wind_kph} km/h
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;