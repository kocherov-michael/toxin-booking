import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/js/datepicker'
import 'air-datepicker/dist/css/datepicker.min.css'

import './datepicker.pug'
// import './datepicker.scss'

$('.datepicker-here').datepicker({
  multipleDates: true,
  range: true,
  clearButton: true,
  toggleSelected: false,
  todayButton: true,
})

const dayButtonElement = document.querySelector("[data-action='today']")
dayButtonElement.innerHTML = 'Применить'

const monthElement = document.querySelector(".datepicker--nav-title")
console.log(monthElement.innerHTML.indexOf(','))
const arr = [...monthElement.innerHTML]
arr.splice(monthElement.innerHTML.indexOf(','),1)
console.log(arr.join(''))

monthElement.innerHTML = `${arr.join('')}`
console.log(monthElement.innerHTML)

