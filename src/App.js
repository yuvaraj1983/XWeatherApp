import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Card from './Components/Card/Card';
import axios from 'axios';

function App() {

  const [city, setCity] = useState('');

  const weatherdata = [
    {name: "Temperature", value: "27.4 C"},
    {name: "Humidity", value: "27.4 C"},
    {name: "Condition", value: "Sunny"},
    {name: "Wind Speed", value: "13.7 kph"}
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const apikey = 'f291805bb1c34eccb3d121044242703'
    const url=`http://api.weatherapi.com/v1?key=${apikey}&q=${city}`
    console.log('url',url)

    axios.get(url).then((response) => {
      console.log(response.data);
    })
    .catch((err) => console.log(err));

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
     <div className='weather-cards'>
     { weatherdata && weatherdata.map((data) => (
       <Card key={data.name} name={data.name}  value={data.value}/>
     ))
     }
   </div>
   </>
  );
}

export default App;
