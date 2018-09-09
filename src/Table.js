import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Util from './Util';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 600,
  },
});

function SimpleTable(props) {
  const { classes } = props;
  const scale = Util.getScale(props.units);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">
              {Util.getDate(props.data[0].dt).day}
            </TableCell>

            {props.data.map( d => {
              return (<TableCell key={`hours_${d.dt}`} numeric>{Util.getHour(d.dt)}</TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                {props.data.map( d => {
                  return (<TableCell key={`icon_${d.dt}`} numeric>
                    <img src={`http://openweathermap.org/img/w/${d.weather[0].icon}.png`} alt="Weather icon" />
                  </TableCell>)
                })}
            </TableRow>
            <TableRow>
              <TableCell variant="head" component="th" scope="row">
                {'Forecast'}
              </TableCell>
                {props.data.map( d => {
                  return <TableCell key={`forecast_${d.dt}`}  numeric>{d.weather[0].description}</TableCell>
                })}
            </TableRow>
            <TableRow>
              <TableCell variant="head" component="th" scope="row">
                {'Temp'} ({scale.temp})
              </TableCell>
                {props.data.map( d => {
                  return <TableCell key={`temp_${d.dt}`} numeric>{d.main.temp.toFixed(0)}&deg;</TableCell>
                })}
            </TableRow>
            <TableRow>
              <TableCell variant="head" component="th" scope="row">
                {'Humidity'}
              </TableCell>
                {props.data.map( d => {
                  return <TableCell key={`humidity_${d.dt}`} numeric>{d.main.humidity}%</TableCell>
                })}
            </TableRow>
            <TableRow>
              <TableCell variant="head" component="th" scope="row">
                {'Wind'} ({scale.wind})
              </TableCell>
                {props.data.map( d => {
                  return <TableCell key={`wind_${d.dt}`} numeric>{d.wind.speed}</TableCell>
                })}
            </TableRow>

        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
