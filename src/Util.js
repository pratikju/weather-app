const scaleMap= {
  'metric': {
    'temp': '\u2103',
    'wind': 'm/sec'
  },
  'imperial': {
    'temp': '\u2109',
    'wind': 'miles/hr'
  }
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default class Util {
  static getDate(timestamp) {
    var istDate = new Date(timestamp * 1000);
    return {
      date: `${istDate.getDate()} ${months[istDate.getMonth()]}, ${istDate.getFullYear()}`,
      day: days[istDate.getDay()]
    }
  }

  static getHour(ts) {
    var hours = (new Date(ts * 1000)).getHours() - 2;
    var subscript = hours < 12 ? 'AM' : 'PM';
    var value = hours % 12 || 12;

    return `${value} ${subscript}`;
  }

  static getScale(unit) {
    return scaleMap[unit];
  }
}
