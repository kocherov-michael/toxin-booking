import menuSlider from './menu-slider'
import rangeSlider from './../blocks/range-slider/range-slider.js'
import formatPrice from './format-price'
import calendar from './../blocks/calendar/calendar.js'
import checkbox from './../blocks/checkbox/checkbox.js'

menuSlider()
rangeSlider()
formatPrice('[data-price-format]')
checkbox('[data-search-room-expand]')


// const calendarElement = document.querySelector('[data-calendar]')
// if (calendarElement) {
//   // const datesData = calendar('[data-calendar]')
// }
if (document.querySelector('[data-calendar="search-room"]')){
  // console.log('ok')
  calendar('[data-calendar="search-room"]','[data-input-filter-date="search-room"]')
}