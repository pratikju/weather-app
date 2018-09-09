import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import Util from './Util';

const styles = theme => ({
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
  rightIcon: {
    marginLeft: 8,
  },
});


function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  const data = props.data;
  const dateObj = Util.getDate(data.dt);

  const scale = Util.getScale(props.units);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {dateObj.date}
        </Typography>
        <Typography variant="subheading">
          {dateObj.day}
        </Typography>
        <Typography variant="display1">
          {data.temp.max.toFixed(0)}<sup style={{fontSize: 16}}>{scale.temp}</sup>
          <div style={{fontSize: 16, display: 'inline-block'}}>{bull} {data.temp.min.toFixed(0)}{scale.temp}</div>
        </Typography>

        <Typography variant="subheading" gutterBottom>
          <img id="wicon" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather icon" /><br/>
          {data.weather[0].description}
        </Typography>

      </CardContent>
      <CardActions>

        <Button color="primary" onClick={props.onClick}>
          See Hourly
          <SendIcon className={classes.rightIcon} />
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
