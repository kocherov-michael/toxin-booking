import menuSlider from './menu-slider'
import rangeSlider from './../blocks/range-slider/range-slider.js'
import formatPrice from './format-price'
import calendar from './../blocks/calendar/calendar.js'
import checkbox from './../blocks/checkbox/checkbox.js'
import dropdown from './../blocks/dropdown/dropdown.js'

menuSlider()
rangeSlider()
formatPrice('[data-price-format]')
checkbox('[data-search-room-expand]')
calendar('[data-calendar="search-room"]','[data-input-filter-date="search-room"]')
dropdown('#dropdown-search-room')