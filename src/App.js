import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import Switch from '@material-ui/core/Switch';
import SimpleTable from './Table';

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
      showBreakdown: false,
      breakdownData: undefined,
      hourlyForecastData: undefined
    }
  }

  getWeatherDetails() {
    api.get("/forecast/daily", {
      params: {
        id: "1275004",
        units: this.state.units,
        cnt: 5
      }
    }).then((res) => {
        this.setState({forecastData: res.data})
    }).catch((ex) => {
        this.setState({error: true});
    })
  }

  getDailyBreakUp() {
    api.get("/forecast", {
      params: {
        id: "1275004",
        units: this.state.units,
      }
    }).then((res) => {
        this.setState({hourlyForecastData: res.data.list})
    }).catch((ex) => {
        this.setState({error: true});
    })
  }


  componentDidMount() {
    this.getWeatherDetails();
    this.getDailyBreakUp();
  }

  onScaleSwitch() {
    const {units} = this.state;
    const toggler = {
      'metric': 'imperial',
      'imperial': 'metric'
    }
    this.setState({units: toggler[units], showBreakdown: false}, () => {
      this.getWeatherDetails();
      this.getDailyBreakUp();
    });
  }

  onClickSeeMore(val) {
    const {hourlyForecastData} = this.state;
    const curr_day = (new Date(val * 1000)).getDate();
    var filterData = hourlyForecastData.filter((d) => {
        var d_day = (new Date(d.dt * 1000)).getDate();
        return d_day === curr_day;
    });
    if (filterData.length !== 8) {
      filterData = hourlyForecastData.slice(0, 8)
    }
    this.setState({showBreakdown: true, breakdownData: filterData});
  }

  render() {
    const data = this.state.forecastData;
    let city, cards;
    if (data !== undefined) {
      city = `${data.city.name}, ${data.city.country}`;
      cards = data.list.map((d) => {
        return (
            <Card key={d.dt} city={city} data={d} units={this.state.units} onClick={this.onClickSeeMore.bind(this, d.dt)}/>
        );
      });
    }

    var forecastTable;

    if (this.state.breakdownData !== undefined) {
       forecastTable = (
        <SimpleTable data={this.state.breakdownData}/>
      );
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
        {this.state.showBreakdown? (
          <div style={{backgroundColor: 'grey', padding: 16}}>
            <h3 style={{color: "white"}}> 3 Hourly Breakup </h3>
            {forecastTable}
          </div>
        ) : null}

      </div>
    );
  }
}

export default App;
