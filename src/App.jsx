import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const ApiKey = "02b81006ad3d4d8cfa389cf6490501be";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`;
      axios
        .get(url)
        .then(res => {
          setWeather(res.data)
          const obj ={
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
          setTemp(obj)
          setLoading(false)
        })
        .catch(err => console.log(err));
    }
  }, [coords]);

  

  return (
    <>
      {loading ? (
        <LoadingScreen /> 
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </>
  )
}

export default App;
