import calendar from '../calendar/calendar.js'


// const aloneCalendarElement = document.querySelector('[data-calendar="cards"]')
const calendarElement = document.querySelector('[data-calendar="find-room"]')
// if (calendarElement) {
//   const datesData = calendar('[data-calendar]')
// }

const dropdownArrivalElement = document.querySelector('[data-find-room-arrival]')
const dropdownDepartureElement = document.querySelector('[data-find-room-departure]')
const dropdownArrivalChevronElement = dropdownArrivalElement.querySelector('[data-dropdown-chevron]')
const dropdownDepartureChevronElement = dropdownDepartureElement.querySelector('[data-dropdown-chevron]')
const dropdownArrivalInputElement = dropdownArrivalElement.querySelector('input')
const dropdownDepartureInputElement = dropdownDepartureElement.querySelector('input')

const calendarWrapperElement = document.querySelector('.calendar-wrapper')
const applyFieldElement = calendarElement.querySelector(".calendar__action-apply")
const clearFieldElement = calendarElement.querySelector(".calendar__action-clear")
const datesData = calendar('[data-calendar="find-room"]')

dropdownArrivalChevronElement.addEventListener("click", {handleEvent: datesData.calendarToggle, calendarWrapperElement})

dropdownDepartureChevronElement.addEventListener("click", {handleEvent: datesData.calendarToggle, calendarWrapperElement})

calendarWrapperElement.addEventListener("click", getCalendarData, false)
applyFieldElement.addEventListener("click", {handleEvent: datesData.applyCalendarField, calendarWrapperElement})

clearFieldElement.addEventListener("click", {handleEvent: datesData.clearCalendarField, dropdownArrivalInputElement, dropdownDepartureInputElement})


function getCalendarData () {

  const dateBegin = [
    getDoubleNumber(datesData.beginDay), 
    getDoubleNumber(String(parseInt(datesData.beginMonth) + 1)), 
    datesData.beginYear
  ].join('.')

  const dateEnd = [
    getDoubleNumber(datesData.endDay), 
    getDoubleNumber(String(parseInt(datesData.endMonth) + 1)), 
    datesData.endYear
  ].join('.')

  if ( dropdownArrivalInputElement.value !== dateBegin && datesData.beginDate !== '') {

    dropdownArrivalInputElement.value = dateBegin

    if (dropdownDepartureInputElement.value !== dateEnd && datesData.endDate !== '') {
      dropdownDepartureInputElement.value = dateEnd
    } else if (datesData.endDate === '') {
      dropdownDepartureInputElement.value = ''
    }
  }
  else if (dropdownDepartureInputElement.value !== dateEnd && datesData.endDate !== '') {
    dropdownDepartureInputElement.value = dateEnd
  }
}

function getDoubleNumber (string) {
  const newArray = []
  for(let i=0; i < 2; i++) {
    if ([...string].reverse()[i]) {
      newArray[i] = [...string].reverse()[i]
    } else {
      newArray[i] = '0'
    }
  }
  return newArray.reverse().join('')
}
