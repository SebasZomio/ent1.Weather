import { useState } from "react"

const WeatherCard = ({ weather, temp }) => {

    const [isCelsius, setIsCelsius] = useState(true)
    
    const handleChangeTemp = () => setIsCelsius(!isCelsius)
    
    return (
        <article>
            <h1>Weather App</h1>
            <h2>{weather?.name}, {weather?.sys.country}</h2>
            <div className="weather-card">
                <div className="image-container">
                    <img 
                    src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} 
                    alt="" />
                </div>
                <section className="weather-info">
                    <h3>"{weather?.weather[0].description}"</h3>
                    <ul className="date-list">
                        <li className='principal-item'><span className='principal-label'>Wind Speed </span><span>{weather?.wind.speed}m/s</span></li>
                        <li className='principal-item'><span className='principal-label'>Clouds </span><span>{weather?.clouds.all}%</span></li>
                        <li className='principal-item'><span className='principal-label'>Pressure </span><span>{weather?.main.pressure}hPa</span></li>
                    </ul>
                </section>
            </div>
            <h2>{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</h2>
            <button onClick={handleChangeTemp}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
        </article>
    )
}

export default WeatherCard