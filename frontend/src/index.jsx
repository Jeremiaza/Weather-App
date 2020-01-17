import React from 'react';
import ReactDOM from 'react-dom';
import Geolocation from 'react-geolocation';

const baseURL = "http://localhost:9000/api";

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};
const getMyWeatherFromApi = async (latitude, longitude) => {
  try {
    const response = await fetch(`${baseURL}/myweather?lon=${longitude}&lat=${latitude}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
}

class Weather extends React.Component {
  constructor(props) {

    super(props);
    this.getWeather = this.getWeather.bind(this);
    this.state = {
      helsinki_icon: "",
      helsinki_temp: "",
      my_icon: "",
      my_temp: "",
      lat: "",
      lon: ""
    };
  }
  async getWeather(latitude, longitude) {
    const weather = await getWeatherFromApi();
    const myweather = await getMyWeatherFromApi(latitude, longitude);
    console.log(weather);
    console.log(myweather);

    this.setState({
      helsinki_icon: weather.weather[0].icon,
      helsinki_temp: weather.main.temp - 273.15,
      my_icon: myweather.weather[0].icon,
      my_temp: myweather.main.temp - 273.15,
      my_city: myweather.name,
      lat: latitude,
      lon: longitude
    });
  };

  render() {
    const { helsinki_icon, helsinki_temp, my_icon, my_temp, my_city, lat, lon } = this.state;
    var roundedtemp = Math.round(Number(helsinki_temp) * 10) / 10;
    var myroundedtemp = Math.round(Number(my_temp) * 10) / 10;

    return (
      <div className="icon">
        <Geolocation
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div>
              <button onClick={getCurrentPosition}>Update Position</button>
              {error &&
                <div>
                  {error.message}
                </div>}
              <pre>
                latitude: {latitude}
              </pre>
              <pre>
                longitude: {longitude}
              </pre>
              <button onClick={async () => { await this.getWeather(latitude, longitude); }}>Get the weather!</button>
            </div>}
        />
        <h3>Weather in Helsinki</h3>
        <div>{helsinki_icon && <img src={`http://openweathermap.org/img/wn/${helsinki_icon}.png`} />} <b>{roundedtemp}C</b></div>
        <h3>Weather in {my_city || "not found"}</h3>
        <div>{my_icon && <img src={`http://openweathermap.org/img/wn/${my_icon}.png`} />} <b>{myroundedtemp}C</b></div>
      </div>
    );
  }
}
ReactDOM.render(<Weather />, document.getElementById('app'));

