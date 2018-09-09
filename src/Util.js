export default class Util {
  static getDate(timestamp) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var humanDate = new Date(timestamp * 1000);
    return {
      date: `${humanDate.getDate()} ${months[humanDate.getMonth()]}, ${humanDate.getFullYear()}`,
      day: days[humanDate.getDay()]
    }
  }

  static getHour(ts) {
    var hours = (new Date(ts * 1000)).getHours() - 2;
    var subscript = hours < 12 ? 'AM' : 'PM';
    var value = hours % 12 || 12;

    return `${value} ${subscript}`;
  }

  static getScale(unit) {
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
    return scaleMap[unit];
  }
}
