import calendar from '../calendar/calendar.js'
import dropdown from '../dropdown/dropdown.js'
import '../room-info/room-info'
import formatPrice from '../../js/format-price.js'

if (document.querySelector('[data-calendar="room-price"]')){

  calendar('[data-calendar="room-price"]','[data-find-room-arrival="room-price"]','[data-find-room-departure="room-price"]')
}

dropdown("#dropdown-guests")

formatPrice('[data-calculator-price]')

roomPriceCalculator()

function roomPriceCalculator () {
  const arrivalElement = document.querySelector('[data-find-room-arrival="room-price"]')
  const arrivalInputElement = arrivalElement.querySelector('input')
  const departureElement = document.querySelector('[data-find-room-departure="room-price"]')
  const departureInputElement = departureElement.querySelector('input')

  const calendarElement = document.querySelector('[data-calendar="room-price"]')
  const applyCalendarButton = calendarElement.querySelector('[data-action="apply"]')

  const pricePerDayElement = document.querySelector('[data-room-price-per-day]')
  const totalElement = document.querySelector('[data-calculator-price="total"]')
  const allDaysElement = document.querySelector('[data-calculator-price="all-days"]')
  const daysCountElement = document.querySelector('[data-calculator-price="days-count"]')


  applyCalendarButton.addEventListener('click', calculatePrice)

  arrivalInputElement.addEventListener('input', () => {countDays()})
  departureInputElement.addEventListener('input', () => {countDays()})

  const sourse = {
    pricePerDay: parseInt(pricePerDayElement.getAttribute('data-room-price-per-day')),
    days: countDays(),
    guests: 0,
    serviceFee: 0,
    additionalFee: 0,
    discount: 0
  }
  // console.log(parseInt(pricePerDayElement.getAttribute('data-room-price-per-day')))


  function countDays() {
  
    const firstDayArr = arrivalInputElement.value.split('.')
    const lastDayArr = departureInputElement.value.split('.')
    const firstDay = new Date(firstDayArr[2], firstDayArr[1], firstDayArr[0])
    const lastDay = new Date(lastDayArr[2], lastDayArr[1], lastDayArr[0])

    return (lastDay.getTime() - firstDay.getTime())/ 86400000
  }

  function calculatePrice () {
    console.log('calc')
    // const firstDay = arrivalInputElement.value
    // const lastDay = departureInputElement.value
    // console.log(parseInt(firstDay))
    // console.log(lastDay)
    sourse.days = countDays()
    let result = sourse.pricePerDay * sourse.days

    daysCountElement.innerHTML = sourse.days
    allDaysElement.innerHTML = result





    totalElement.innerHTML = result
  }
}
