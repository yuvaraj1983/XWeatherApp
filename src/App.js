import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Card from './Components/Card/Card';
import axios from 'axios';
import './Components/Card/Card.css';

function App() {

  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(false);
  const [weatherdata, setWeatherData] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  }

  const getWeatherData = async () => {
    if (city) {
      const apikey = 'f291805bb1c34eccb3d121044242703';
      const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;

      setIsLoading(true);
      setIsData(false);

      try {
        const response = await axios.get(url);
        const weatherData = response.data;

        const formattedData = [
          { name: "Temperature", value: weatherData.current.temp_c },
          { name: "Humidity", value: weatherData.current.humidity },
          { name: "Condition", value: weatherData.current.condition.text },
          { name: "Wind Speed", value: weatherData.current.wind_kph }
        ];

        // The setData is setting the data state with the array
        setData(formattedData);
        
        // But in the rendering of the weather cards, you are mapping over weatherdata 
        // which is being set as an object, not an array.
        setWeatherData(weatherData);

        setIsData(true);
        setIsLoading(false);
      } catch (err) {
        alert('Failed to fetch weather data');
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder='Enter city name' 
            type='text' 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button 
            style={{
              backgroundColor: 'orange', 
              color: 'white', 
              textAlign: 'center', 
              padding: '10px', 
              border: 'none', 
              borderRadius: '5px', 
              margin: '10px'
            }} 
            type='submit'
          >
            Search
          </button>
        </form>
      </div>
      {isData &&
        <div className='weather-cards'> 
          { // You should be mapping over the data array, not weatherdata
            data && data.map((data) => (
              <Card name={data.name} value={data.value} />
            ))
          }
        </div>
      }
      {isLoading && 
        <p style={{ textAlign: 'center' }}>Loading data...</p>
      }
    </>
  );
}

export default App;