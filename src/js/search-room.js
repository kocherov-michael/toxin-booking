import menuSlider from './menu-slider'
import rangeSlider from './../blocks/range-slider/range-slider.js'
import formatPrice from './format-price'
import calendar from './../blocks/calendar/calendar.js'

menuSlider()
rangeSlider()
formatPrice('[data-price-format]')


const calendarElement = document.querySelector('[data-calendar]')
if (calendarElement) {
  const datesData = calendar('[data-calendar]')
}