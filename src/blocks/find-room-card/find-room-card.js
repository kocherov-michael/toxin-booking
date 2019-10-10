import calendar from '../calendar/calendar.js'
import inputDate from '../../js/input-date'

if (document.querySelector('[data-calendar="find-room"]')){

  calendar('[data-calendar="find-room"]','[data-find-room-arrival="find-room"]','[data-find-room-departure="find-room"]')
}

inputDate('[data-input-date]')
