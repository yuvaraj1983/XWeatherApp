import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Card from './Components/Card/Card';
import axios from 'axios';
import  './Components/Card/Card.css';
function App() {

  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isdata, setIsData] = useState(false);
  const [weatherdata , setWeatherData] = useState({});
  const [data, setData] = useState([]);

  // const datatemp = [
  //   {name: "Temperature", value: "27.4 C"},
  //   {name: "Humidity", value: "27.4 C"},
  //   {name: "Condition", value: "Sunny"},
  //   {name: "Wind Speed", value: "13.7 kph"}
  // ]

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setIsLoading(true);
  //   setIsData(true);
  //   const apikey = 'f291805bb1c34eccb3d121044242703'
  //   const url=`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
  //   // console.log('url',url)

  //   axios.get(url).then((response) => {
  //     setWeatherData(response.data);
  //     // console.log(response.data);
  //     // console.log("Temperature",response.data.current.temp_c);
  //     // console.log("Humidity",response.data.current.humidity);
  //     // console.log("Condition",response.data.current.condition.text);
  //     // console.log("Wind Speed",response.data.current.wind_kph);

  //     // setWeatherData([
  //     //   {name: "Temperature", value: response.data.current.temp_c},
  //     //   {name: "Humidity", value: response.data.current.humidity},
  //     //   {name: "Condition", value: response.data.current.condition.text},
  //     //   {name: "Wind Speed", value: response.data.current.wind_kph}
  //     // ])
  //     setIsLoading(false);
     
  //   })
  //   .catch((err) => {
  //     alert('Failed to fetch weather data');
  //   //  console.log(err)
  //   } );

  // }

  const handleSubmit = ((e) => {
    e.preventDefault();
    //setCity(e.target.value);
    getWeatherData();
  })

  // useEffect(() => {0
  //   getWeatherData();
  // },[city])

  const getWeatherData = async () => {
    if(city) {
      const apikey = 'f291805bb1c34eccb3d121044242703'
      const url=`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
      // console.log('url',url)
      setIsLoading(true);
      setIsData(false);

      try {
        const response = await axios.get(url);
        const datares = await response.data;
        setWeatherData(datares);
        console.log("datares", datares)
      //      setWeatherData([
      //   {name: "Temperature", value: data.current.temp_c},
      //   {name: "Humidity", value: data.current.humidity},
      //   {name: "Condition", value: data.current.condition.text},
      //   {name: "Wind Speed", value: data.current.wind_kph}
      // ])
        const datatemp = [
        {name: "Temperature", value: datares.current.temp_c},
        {name: "Humidity", value: datares.current.humidity},
        {name: "Condition", value: datares.current.condition.text},
        {name: "Wind Speed", value: datares.current.wind_kph}
          ];
          setData(datatemp);
       console.log("datatemp", datatemp)
       console.log("data", data)
        setIsData(true);
        setIsLoading(false);
      } catch(err) {
        alert('Failed to fetch weather data');
      }
     
      // axios.get(url).then((response) => {
      //   setWeatherData(response.data);
      //   setIsData(true);
      //   setIsLoading(false);
       
      // })
      // .catch((err) => {
      //   alert('Failed to fetch weather data');
      // } );
    }
    
  }
  return (
    <>
    <div style={{display:'flex', justifyContent:'center'}}>
      <form onSubmit={handleSubmit}>
       
       <input placeholder='Enter city name' type='text' 
       value={city}
       onChange={(e) => setCity(e.target.value)}
       />
       <button style={{backgroundColor: 'orange', color:'white', textAlign:'center',padding:'10px',border:'none', borderRadius:'5px', margin:'10px'}} type='submit'>Search</button>
      </form>
     
    </div>
    {/* { isdata &&
        <div className='weather-cards'> 
        {  data &&  data.map((dt) => (
            <Card  key={dt.name} name={dt.name} value={dt.value}/>
          ))
        }
        
      </div>
    } */}

{isdata &&
  <div className='weather-cards'> 
    {data.map((item, index) => (
      <Card key={index} name={item.name} value={item.value} />
    ))}
  </div>
}

   { isLoading && 
     
      <p style={{textAlign:'center'}}>Loading data...</p> 
     }
   </>
  );
}

export default App;
