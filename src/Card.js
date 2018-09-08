import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Util from './Util';

const styles = {
  card: {
    minWidth: 275,
    background: '#ffffff',
    borderRadius: 0
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};




function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  const data = props.data;
  const dateObj = Util.getDate(data.dt);

  const scale = Util.getScale(props.units);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {props.city}
        </Typography>
        <Typography variant="headline" component="h2">
          {dateObj.date}
        </Typography>
        <Typography variant="subheading">
          {dateObj.day}
        </Typography>
        <Typography variant="caption" gutterBottom>
          <img id="wicon" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather icon" /><br/>
          {data.weather[0].description}
        </Typography>

        <Typography component="p">
          Day {data.temp.day}<sup>o</sup>{scale.temp} {bull} Night {data.temp.night}<sup>o</sup>{scale.temp}
          <br/>
          humidity: {data.humidity}% <br/>
          wind: {data.speed} {scale.wind}<br/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={props.onClick}>See Hourly</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
