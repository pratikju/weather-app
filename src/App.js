import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import Switch from '@material-ui/core/Switch';
import SimpleTable from './Table';
import Button from '@material-ui/core/Button';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const api = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
  params: { appid: "0fc47171c38320af914c66f014c03d1d" },
});

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forecastData: undefined,
      units: 'metric',
      error: false,
      showBreakdown: false,
      currentBreakdown: 0,
      breakdownData: undefined,
      hourlyForecastData: undefined
    }
  }

  getDailyBreakup() {
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

  getHourlyBreakUp() {
    api.get("/forecast", {
      params: {
        id: "1275004",
        units: this.state.units,
      }
    }).then((res) => {
        return this.setState({hourlyForecastData: res.data.list})
    }).then(() => {
        if (this.state.showBreakdown) {
          this.seeHourly(this.state.currentBreakdown);
        }
    }).catch((ex) => {
        this.setState({error: true});
    })
  }

  onScaleSwitch() {
    const {units} = this.state;
    const toggler = {
      'metric': 'imperial',
      'imperial': 'metric'
    }
    this.setState({units: toggler[units]}, () => {
      this.getDailyBreakup();
      this.getHourlyBreakUp();
    });
  }

  seeHourly(val) {
    const {hourlyForecastData} = this.state;
    const curr_day = (new Date(val * 1000)).getDate();
    var filterData = hourlyForecastData.filter((d) => {
        var d_day = (new Date(d.dt * 1000)).getDate();
        return d_day === curr_day;
    });
    if (filterData.length !== 8) {
      filterData = hourlyForecastData.slice(0, 8);
    }
    this.setState({showBreakdown: true, breakdownData: filterData, currentBreakdown: val});
  }

  componentDidMount() {
    this.getDailyBreakup();
    this.getHourlyBreakUp();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.units === nextState.units;
  }

  render() {
    const data = this.state.forecastData;
    let city, cards, forecastTable;
    if (data !== undefined) {
      city = `${data.city.name}, ${data.city.country}`;
      cards = data.list.map((d) => {
        return (
            <Card key={d.dt} city={city} data={d} units={this.state.units} onClick={this.seeHourly.bind(this, d.dt)}/>
        );
      });
    }

    if (this.state.breakdownData !== undefined) {
       forecastTable = (
        <SimpleTable data={this.state.breakdownData} units={this.state.units}/>
      );
    }

    return (
      <div style={{textAlign: 'center'}}>
          <h1> Weather Forecast Kolkata, India</h1>
          <div style={{position: 'absolute', right: 20, top: 20, zIndex: 4000}}>
             &#8451;
            <Switch
              value={this.state.units}
              onChange={this.onScaleSwitch.bind(this)}
              color="primary"
            />
            &#8457;
          </div>
        <div style={{backgroundColor: '#ffffff', display: 'flex', alignItems: 'flex-start', padding: 32, paddingTop: 0}}>
            {cards}
        </div>
        {this.state.showBreakdown? (
          <div style={{backgroundColor: 'grey', padding: 16}}>
            <div style={{color: "white"}}> 3 Hourly Breakup
              <Button style={{marginLeft: 16}} size="small" variant="contained" color="default"  onClick={
                () => {
                  this.setState({showBreakdown: false})
                }}>

                <VisibilityOffIcon />
              </Button>


              </div>
            {forecastTable}
          </div>
        ) : null}

      </div>
    );
  }
}
