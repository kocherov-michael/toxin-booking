import calendar from '../calendar/calendar.js'

console.log('frc')
const calendarElement = document.querySelector('[data-calendar]')
if (calendarElement) {
  const datesData = calendar('[data-calendar]')
}

const dropdownArrivalElement = document.querySelector('#arrival')
const dropdownDepartureElement = document.querySelector('#departure')
const dropdownArrivalChevronElement = dropdownArrivalElement.querySelector('[data-dropdown-chevron]')
const dropdownDepartureChevronElement = dropdownDepartureElement.querySelector('[data-dropdown-chevron]')
const dropdownArrivalInputElement = dropdownArrivalElement.querySelector('input')
const dropdownDepartureInputElement = dropdownDepartureElement.querySelector('input')

// const dropdownChevronElement = document.querySelector('[data-dropdown-chevron]');
const calendarWrapperElement = document.querySelector('.calendar-wrapper')
const applyFieldElement = calendarElement.querySelector(".calendar__action-apply");
// console.log(calendarWrapperElement)
const datesData = calendar('[data-calendar]')

// dropdownChevronElement.addEventListener('click', calendarToggle)
// dropdownArrivalChevronElement.addEventListener("click", calendarToggle);
dropdownArrivalChevronElement.addEventListener("click", {handleEvent: datesData.calendarToggle, calendarWrapperElement, dropdownArrivalElement, dropdownDepartureElement})

dropdownDepartureChevronElement.addEventListener("click", {handleEvent: datesData.calendarToggle, calendarWrapperElement, dropdownArrivalElement, dropdownDepartureElement})

// dropdownDepartureChevronElement.addEventListener("click", calendarToggle);
calendarWrapperElement.addEventListener("click", getCalendarData, false)
applyFieldElement.addEventListener("click", {handleEvent: datesData.applyCalendarField, calendarWrapperElement, dropdownArrivalElement, dropdownDepartureElement})


function getCalendarData (event) {
  const date = [
    getDoubleNumber(datesData.beginDay), 
    getDoubleNumber(String(parseInt(datesData.beginMonth) + 1)), 
    datesData.beginYear
  ].join('.')
  console.log(date)
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
