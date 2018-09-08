import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import Switch from '@material-ui/core/Switch';

const api = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
  params: { appid: "0fc47171c38320af914c66f014c03d1d" },
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecastData: undefined,
      units: 'metric',
      error: false,
    }
  }

  getWeatherDetails(_unit) {
    var unit = _unit || 'metric';
    api.get("/forecast/daily", {
      params: {
        id: "1275004",
        units: unit,
        cnt: 5
      }
    }).then((res) => {
        this.setState({forecastData: res.data, units: unit})
    }).catch((ex) => {
        this.setState({error: true});
    })
  }

  componentDidMount() {
    this.getWeatherDetails();
  }

  onScaleSwitch() {
    const {units} = this.state;
    const toggler = {
      'metric': 'imperial',
      'imperial': 'metric'
    }

    this.getWeatherDetails(toggler[units]);
  }

  render() {
    const data = this.state.forecastData;
    let city, cards;
    console.log(data);
    if (data !== undefined) {
      city = `${data.city.name}, ${data.city.country}`;
      cards = data.list.map((d) => {
        return (
            <Card key={d.dt} city={city} data={d} units={this.state.units}/>
        );
      });


    }
    return (
      <div style={{textAlign: 'center'}}>
          <div>
            <h1> Weather Forecast </h1> <sup>o</sup>C
            <Switch
              value={this.state.units}
              onChange={this.onScaleSwitch.bind(this)}
              color="primary"
            />
            <sup>o</sup>F
          </div>
        <div style={{backgroundColor: '#ffffff', display: 'flex', alignItems: 'flex-start', padding: 32}}>
            {cards}
        </div>
      </div>
    );
  }
}

export default App;
