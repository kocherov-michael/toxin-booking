// console.log('cards connect')
import calendar from './../blocks/calendar/calendar.js'
import './../blocks/find-room-card/find-room-card.js'
import './../blocks/room-price-card/room-price-card.js'
import dropdown from './../blocks/dropdown/dropdown.js'

const calendarElement = document.querySelector('[data-calendar="cards"]')
if (calendarElement) {
  calendar('[data-calendar="cards"]')
}
