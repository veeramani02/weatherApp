// import React, { useState } from 'react';
// import axios from 'axios';
// import Cloud from '../assets/Cloud.png'
// import Drizzle from '../assets/Drizzle.png'
// import Humidity from '../assets/Humidity.jpg'
// import Rain from '../assets/Rain.jpeg'
// import Snow from '../assets/Snow2.jpeg'
// import Sun from '../assets/Sun.png'
// import Wind from '../assets/Wind.png'
// import { FaSearch } from 'react-icons/fa';

// function Weather() {
//  const [icon,setIcon]=useState(Cloud)
//   const[temp,setTemp]=useState(0)
//   const[city,setCity]=useState("chennai")
//   const[log,setLog]=useState(0)
//   const[lon,setLon]=useState(0)
// const[country,setCountry]=useState("IN")
// const[humidity,setHumidity]=useState(0)
// const[wind,setWind]=useState(0)

//   const search = () => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={39aa7f1e083a7b3778536e2423902b60}&units=metric`;

    
//   }
//   const WeatherDetails =({icon,temp,city,log,lon,country,humidity,wind})=>{
//    return(
//      <>
//     <div className='img'>
//     <img src={icon} alt='img'></img>
//     </div>
//     <div className='temp'>
//      {temp} C
//     </div>
//     <div className='city'>
//       {city}
//     </div>
//     <div className='country'>
//       {country}
//     </div>
//     <div className='coordinates'>
//     <div >
//       <span className='lat'>latitiude</span>
//       <span> {lon} </span>
//     </div>
//     <div className='log'>
//       <span className='log'>longitude</span>
//       <span> {log} </span>
//     </div>
//     </div>
//     <div className='data-container'>
//       <div className='element'>
//         <img src={Humidity}  alt="humidity"
//         className='icon'></img>
//         <div className="data">
//           <div className="humidity-percent">{humidity}</div>
//           <div className="text">humidity</div>
//         </div>
//       </div>
//           <div className='element'>
//         <img src={Wind}  alt="wind"
//         className='icon'></img>
//         <div className="data">
//           <div className="wind-percent">{wind}</div>
//           <div className="text">wind speed</div>
//         </div>
//       </div>
//     </div>
//     </>
//    )
//   }
 

//   return (
//     <div className='container'>
//       <div className=' input-container'>
//         <input type='text' className='input' placeholder='enter city'></input>
//         <div>
//           <FaSearch className='search' />
//         </div>
       
//       </div>
//       <div>
//         <WeatherDetails icon={icon} temp={temp} city={city} lon={lon} log={log} country={country} humidity={humidity} wind={wind}/>
//       </div>
//       </div>
//   );
// }

// export default Weather;
import React, { useState, useEffect } from 'react';
import Cloud from '../assets/Cloud.png';
import Drizzle from '../assets/Drizzle.png';
import Humidity from '../assets/Humidity.jpg';
import Rain from '../assets/Rain.jpeg';
import Snow from '../assets/Snow2.jpeg';
import Sun from '../assets/Sun.png';
import Wind from '../assets/Wind.jpeg';
import { FaSearch } from 'react-icons/fa';

function Weather() {
  const [icon, setIcon] = useState(Cloud);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [country, setCountry] = useState("IN");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const api_key = "39aa7f1e083a7b3778536e2423902b60";

  const fetchWeather = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      setTemp(data.main.temp);
      setCity(data.name);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setCountry(data.sys.country);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);

      const weather = data.weather[0].main;
      switch (weather) {
        case "Clouds":
          setIcon(Cloud);
          break;
        case "Rain":
          setIcon(Rain);
          break;
        case "Drizzle":
          setIcon(Drizzle);
          break;
        case "Snow":
          setIcon(Snow);
          break;
        case "Clear":
          setIcon(Sun);
          break;
        default:
          setIcon(Cloud);
          break;
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      fetchWeather(searchInput.trim());
    }
  };

  const WeatherDetails = ({ icon, temp, city, lat, lon, country, humidity, wind }) => {
    return (
      <>
        <div className='img'>
          <img src={icon} alt='img' />
        </div>
        <div className='temp'>{temp} C</div>
        <div className='city'>{city}</div>
        <div className='country'>{country}</div>
        <div className='coordinates'>
          <div>
            <span className='lat'>latitiude</span>
            <span> {lat} </span>
          </div>
          <div className='log'>
            <span className='log'>longitude</span>
            <span> {lon} </span>
          </div>
        </div>
        <div className='data-container'>
          <div className='element'>
            <img src={Humidity} alt="humidity" className='icon' />
            <div className="data">
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src={Wind} alt="wind" className='icon' />
            <div className="data">
              <div className="wind-percent">{wind} m/s</div>
              <div className="text">wind speed</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='container'>
      <div className='input-container'>
        <input
          type='text'
          className='input'
          placeholder='enter city'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
        />
        <div onClick={handleSearch}>
          <FaSearch className='search' />
        </div>
      </div>
      <div>
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          lon={lon}
          lat={lat}
          country={country}
          humidity={humidity}
          wind={wind}
        />
      </div>
    </div>
  );
}

export default Weather;
