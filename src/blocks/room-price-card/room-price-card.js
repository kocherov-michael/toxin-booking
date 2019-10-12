import calendar from '../calendar/calendar.js'
import dropdown from '../dropdown/dropdown.js'
import '../room-info/room-info'
import formatPrice from '../../js/format-price.js'

if (document.querySelector('[data-calendar="room-price"]')){

  calendar('[data-calendar="room-price"]','[data-find-room-arrival="room-price"]','[data-find-room-departure="room-price"]')
}

dropdown("#dropdown-guests")

formatPrice('[data-calc-price]')

roomPriceCalculator('[data-calculator-card]')

function roomPriceCalculator (selector) {
  const calculatorCardElements = document.querySelectorAll(selector)
  for (let i = 0; i < calculatorCardElements.length; i++) {
    
    const arrivalElement = calculatorCardElements[i].querySelector('[data-find-room-arrival="room-price"]')
    const arrivalInputElement = arrivalElement.querySelector('input')
    const departureElement = calculatorCardElements[i].querySelector('[data-find-room-departure="room-price"]')
    const departureInputElement = departureElement.querySelector('input')
  
    setDefaultCalcValues(arrivalInputElement, '19.08.2019')
    setDefaultCalcValues(departureInputElement, '27.08.2019')
  
    const calendarElement = calculatorCardElements[i].querySelector('[data-calendar="room-price"]')
    const applyCalendarButton = calendarElement.querySelector('[data-action="apply"]')
  
    const pricePerDayElement = calculatorCardElements[i].querySelector('[data-room-price-per-day]')
    const totalElement = calculatorCardElements[i].querySelector('[data-calculator-total]')
    const allDaysElement = calculatorCardElements[i].querySelector('[data-calculator-all-days]')
    const daysCountElement = calculatorCardElements[i].querySelector('[data-calculator-days-count]')
    const discountElement = calculatorCardElements[i].querySelector('[data-calculator-discount]')
    const feeElement = calculatorCardElements[i].querySelector('[data-calculator-fee]')
    const addFeeElement = calculatorCardElements[i].querySelector('[data-calculator-add-fee]')
  
    const sourse = {
      pricePerDay: parseInt(pricePerDayElement.getAttribute('data-room-price-per-day')),
      days: countDays(),
      guests: 0,
      serviceFee: 0,
      additionalFee: 0,
      discount: 0
    }
  
    calculatePrice ()
  
    applyCalendarButton.addEventListener('click', calculatePrice)
  
    arrivalInputElement.addEventListener('input', calculatePrice)
    departureInputElement.addEventListener('input', calculatePrice)
  
    function countDays() {
    
      const firstDayArr = arrivalInputElement.value.split('.')
      const lastDayArr = departureInputElement.value.split('.')
      const firstDay = new Date(firstDayArr[2], firstDayArr[1], firstDayArr[0])
      const lastDay = new Date(lastDayArr[2], lastDayArr[1], lastDayArr[0])
  
      return (lastDay.getTime() - firstDay.getTime())/ 86400000
    }
  
    function calculatePrice () {
      const days = countDays()
      daysCountElement.innerHTML = days
      sourse.days = countDays()
      let result = sourse.pricePerDay * sourse.days
  
      daysCountElement.innerHTML = sourse.days
      allDaysElement.innerHTML = formatPrice(result)
  
      const total = result - parseInt(discountElement.getAttribute('data-calculator-discount')) + parseInt(feeElement.getAttribute('data-calculator-fee')) + parseInt(addFeeElement.getAttribute('data-calculator-add-fee'))
  
      totalElement.innerHTML = formatPrice(total)
    }
  }
}

function setDefaultCalcValues(element, val) {
  element.value = val
}
