console.log('cards connect')
import calendar from './../blocks/calendar/calendar.js'
import './../blocks/find-room-card/find-room-card.js'
import './../blocks/room-price-card/room-price-card.js'

const calendarElement = document.querySelector('[data-calendar="cards"]')
if (calendarElement) {
  const datesData = calendar('[data-calendar="cards"]')
}
// const datesDataCards = calendar('[data-calendar="cards"]')