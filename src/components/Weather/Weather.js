import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/reducers/user'
import axios from 'axios';
import Backdrop from '../Backdrop/Backdrop'

import './Weather.css'
import moment from 'moment'

const clearDay = require('../../assets/weather images/clear-day.png')
const clearNight = require('../../assets/weather images/clear-night.png')
const rain = require('../../assets/weather images/rain.png')
const snow = require('../../assets/weather images/snow.png')
const sleet = require('../../assets/weather images/sleet.png')
const wind = require('../../assets/weather images/wind.png')
const fog = require('../../assets/weather images/fog.png')
const cloudy = require('../../assets/weather images/cloudy.png')
const partlyCloudyDay = require('../../assets/weather images/partly-cloudy-day.png')
const partlyCloudyNight = require('../../assets/weather images/partly-cloudy-night.png')
const loading = require('../../assets/loading.svg')

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: "",
      userLng: "",
      userCityName: "",
      currentTemperature: "",
      icon: "",
      currentWeather: "",
      isWeatherModalVisible: false,
      // Today = 0, Tomorrow = 1...etc
      todayHiTemp: "",
      todayLowTemp: "",
      todayMoonPhase: "",

      dailyHi1: "",
      dailyLow1: "",
      dailyMoonPhase1: "",
      dailyWeather1: "",
      dailyWeatherIcon1: "",
      dailyHi2: "",
      dailyLow2: "",
      dailyMoonPhase2: "",
      dailyWeather2: "",
      dailyWeatherIcon2: "",
      dailyHi3: "",
      dailyLow3: "",
      dailyMoonPhase3: "",
      dailyWeather3: "",
      dailyWeatherIcon3: "",
      dailyHi4: "",
      dailyLow4: "",
      dailyMoonPhase4: "",
      dailyWeather4: "",
      dailyWeatherIcon4: "",
      dailyHi5: "",
      dailyLow5: "",
      dailyMoonPhase5: "",
      dailyWeather5: "",
      dailyWeatherIcon5: "",
      dailyHi6: "",
      dailyLow6: "",
      dailyMoonPhase6: "",
      dailyWeather6: "",
      dailyWeatherIcon6: ""
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoLocationOn);
    } else {
      this.geoLocationOff();
    }
    this.props.getCurrentUser();
  }

  weatherModalToggler = () => {
    this.setState({
      isWeatherModalVisible: !this.state.isWeatherModalVisible
    })
    this.props.logout()
  }

  geoLocationOn = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.getUpdatedWeather({ lng, lat })
    this.setState({
      userLat: lat,
      userLng: lng
    })
  }

  geoLocationOff = () => {
    axios.get(`/api.zippopotam.us/us/${this.props.user.zipcode}`).then(result => {
      this.getUpdatedWeather({ lat: result.data.places[0].latitude, lng: result.data.places[0].longitude })
      this.setState({
        userLat: result.data.places[0].latitude,
        userLng: result.data.places[0].longitude,
        userCityName: result.data.places[0]['place name']
      })
    })
  }

  getUpdatedWeather = (obj) => {
    console.log(obj)
    axios.get(`/api/weather?long=${obj.lng}&lat=${obj.lat}`).then(results => {
      let { currently } = results.data;
      let { data } = results.data.daily;
      this.setState({
        currentTemperature: Math.trunc(currently.temperature),
        icon: currently.icon,
        todayHiTemp: Math.trunc(data[0].apparentTemperatureHigh),
        todayLowTemp: Math.trunc(data[0].apparentTemperatureLow),
        todayMoonPhase: data[0].moonPhase,

        dailyHi1: Math.trunc(data[1].apparentTemperatureHigh),
        dailyLow1: Math.trunc(data[1].apparentTemperatureLow),
        dailyMoonPhase1: data[1].moonPhase,
        dailyWeatherIcon1: data[1].icon,
        dailyHi2: Math.trunc(data[2].apparentTemperatureHigh),
        dailyLow2: Math.trunc(data[2].apparentTemperatureLow),
        dailyMoonPhase2: data[2].moonPhase,
        dailyWeatherIcon2: data[2].icon,
        dailyHi3: Math.trunc(data[3].apparentTemperatureHigh),
        dailyLow3: Math.trunc(data[3].apparentTemperatureLow),
        dailyMoonPhase3: data[3].moonPhase,
        dailyWeatherIcon3: data[3].icon,
        dailyHi4: Math.trunc(data[4].apparentTemperatureHigh),
        dailyLow4: Math.trunc(data[4].apparentTemperatureLow),
        dailyMoonPhase4: data[4].moonPhase,
        dailyWeatherIcon4: data[4].icon,
        dailyHi5: Math.trunc(data[5].apparentTemperatureHigh),
        dailyLow5: Math.trunc(data[5].apparentTemperatureLow),
        dailyMoonPhase5: data[5].moonPhase,
        dailyWeatherIcon5: data[5].icon,
        dailyHi6: Math.trunc(data[6].apparentTemperatureHigh),
        dailyLow6: Math.trunc(data[6].apparentTemperatureLow),
        dailyMoonPhase6: data[6].moonPhase,
        dailyWeatherIcon6: data[6].icon,
      })
    })
  }

  render() {
    let backdrop;
    if (this.state.isWeatherModalVisible) {
      backdrop = <Backdrop weatherClick={this.weatherModalToggler} />
    }

    function iconMaker(icon) {
      if (icon === 'rain') { return <img className="weather-forecast-icon" src={rain} alt="rain" /> }
      else if (icon === 'clear-day') { return <img className="weather-forecast-icon" src={clearDay} alt="clear day" /> }
      else if (icon === 'clear-night') { return <img className="weather-forecast-icon" src={clearNight} alt="clear night" /> }
      else if (icon === 'snow') { return <img className="weather-forecast-icon" src={snow} alt="snow" /> }
      else if (icon === 'sleet') { return <img className="weather-forecast-icon" src={sleet} alt="sleet" /> }
      else if (icon === 'wind') { return <img className="weather-forecast-icon" src={wind} alt="wind" /> }
      else if (icon === 'fog') { return <img className="weather-forecast-icon" src={fog} alt="fog" /> }
      else if (icon === 'cloudy') { return <img className="weather-forecast-icon" src={cloudy} alt="cloudy" /> }
      else if (icon === 'partly-cloudy-day') { return <img className="weather-forecast-icon" src={partlyCloudyDay} alt="partly cloudy day" /> }
      else if (icon === 'partly-cloudy-night') { return <img className="weather-forecast-icon" src={partlyCloudyNight} alt="partly cloudy night" /> }
      else return <img className="weather-forecast-icon" src={loading} alt="loading" />
    }

    function mainIconMaker(icon) {
      if (icon === 'rain') { return <img className="main-forecast-icon" src={rain} alt="rain" /> }
      else if (icon === 'clear-day') { return <img className="main-forecast-icon" src={clearDay} alt="clear day" /> }
      else if (icon === 'clear-night') { return <img className="main-forecast-icon" src={clearNight} alt="clear night" /> }
      else if (icon === 'snow') { return <img className="main-forecast-icon" src={snow} alt="snow" /> }
      else if (icon === 'sleet') { return <img className="main-forecast-icon" src={sleet} alt="sleet" /> }
      else if (icon === 'wind') { return <img className="main-forecast-icon" src={wind} alt="wind" /> }
      else if (icon === 'fog') { return <img className="main-forecast-icon" src={fog} alt="fog" /> }
      else if (icon === 'cloudy') { return <img className="main-forecast-icon" src={cloudy} alt="cloudy" /> }
      else if (icon === 'partly-cloudy-day') { return <img className="main-forecast-icon" src={partlyCloudyDay} alt="partly cloudy day" /> }
      else if (icon === 'partly-cloudy-night') { return <img className="main-forecast-icon" src={partlyCloudyNight} alt="partly cloudy night" /> }
      else return <img className="main-forecast-icon" src={loading} alt="loading" />
    }

    let daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <div className="weather-box" onClick={this.weatherModalToggler} id="weather-box">
        {backdrop}
        {mainIconMaker(this.state.icon)}
        <p>{this.state.currentTemperature}{'\u00B0'}</p>
        <div className="city-name"><p>{this.state.userCityName}</p></div>
        {this.state.isWeatherModalVisible &&
          <div className="weatherModalContainer">
            <div className="daily-weather-container">
              <div className="weather-daily">
                {/* TODAY*/}
                <p className="day-of-the-week-text">{daysOfTheWeek[moment().weekday()]}</p>
                {iconMaker(this.state.icon)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.todayHiTemp}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.todayLowTemp}{'\u00B0'}</span>
                </div>
              </div>

              <div className="weather-daily">
                {/* TOMORROW*/}
                <p className="day-of-the-week-text">{daysOfTheWeek[moment().add(1, 'd').weekday()]}</p>
                {iconMaker(this.state.dailyWeatherIcon1)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.dailyHi1}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.dailyLow1}{'\u00B0'}</span>
                </div>
              </div>

              <div className="weather-daily">
                <p className="day-of-the-week-text">{daysOfTheWeek[moment().add(2, 'd').weekday()]}</p>
                {iconMaker(this.state.dailyWeatherIcon2)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.dailyHi2}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.dailyLow2}{'\u00B0'}</span>
                </div>
              </div>

              <div className="weather-daily">
                <p className="day-of-the-week-text">{daysOfTheWeek[moment().add(3, 'd').weekday()]}</p>
                {iconMaker(this.state.dailyWeatherIcon3)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.dailyHi3}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.dailyLow3}{'\u00B0'}</span>
                </div>
              </div>

              <div className="weather-daily">
                <p className="day-of-the-week-text">{daysOfTheWeek[moment().add(4, 'd').weekday()]}</p>
                {iconMaker(this.state.dailyWeatherIcon4)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.dailyHi4}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.dailyLow4}{'\u00B0'}</span>
                </div>
              </div>

              <div className="weather-daily">
                <p className="day-of-the-week-text">{daysOfTheWeek[moment().add(5, 'd').weekday()]}</p>
                {iconMaker(this.state.dailyWeatherIcon5)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.dailyHi5}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.dailyLow5}{'\u00B0'}</span>
                </div>
              </div>

              <div className="weather-daily">
                <p className="day-of-the-week-text">{daysOfTheWeek[[moment().add(6, 'd').weekday()]]}</p>
                {iconMaker(this.state.dailyWeatherIcon6)}
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">HI: </span>
                  <span>{this.state.dailyHi6}{'\u00B0'}</span>
                </div>
                <p></p>
                <div className="temp-wrapper">
                  <span className="weather-temp-descriptor">LO: </span>
                  <span>{this.state.dailyLow6}{'\u00B0'}</span>
                </div>
              </div>
            </div>
          </div>}
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}

export default connect(mapStateToProps, { getCurrentUser })(Weather);