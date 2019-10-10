import formatPrice from './format-price'
import inputDate from './input-date'
import rangeSlider from './../blocks/range-slider/range-slider.js'
import dropdown from './../blocks/dropdown/dropdown.js'

rangeSlider()
formatPrice('[data-price-format]')
inputDate('[data-input-date]')
dropdown("#dropdown-rooms")
dropdown("#dropdown-calculator")