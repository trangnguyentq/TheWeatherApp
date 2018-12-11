import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: null,
      degree: 'C',
      temp: null
    };
    this.toggleDegree = this.toggleDegree.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
          .then(res => {
            const weatherInfo = res.data;
            const temp = res.data.main.temp;
            this.setState({ weatherInfo, temp });
          })
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );


  }

  toggleDegree() {
    if (this.state.degree === 'C') {
      var tempFa = parseFloat(this.state.temp) * (9 / 5) + 32;
      console.log(tempFa.toFixed(2));
      this.setState({
        degree: 'F',
        temp: tempFa.toFixed(2)
      })
    } else {
      var tempCe = (parseFloat(this.state.temp) - 32) * (5 / 9);
      this.setState({
        degree: 'C',
        temp: tempCe.toFixed(2)
      })
    }
  }


  render() {
    console.log(this.state.weatherInfo);
    const degree = this.state.degree;
    const WeatherData = this.state.weatherInfo;
    if (!WeatherData) {
      return <div></div>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <p>{`${WeatherData.name}, ${WeatherData.sys.country}`}</p>
          <p>{degree === 'C' ? `${this.state.temp} °C` : `${this.state.temp} °F`}</p>
          <img src={WeatherData.weather[0].icon} className="App-logo" alt="logo" />
          <button onClick={this.toggleDegree}>Toggle</button>
        </header>
      </div>
    );
  }
}

export default App;
