import DatePicker from './DatePicker.js'

function calendar(calendarSelector, firstDateSelector, secondDateSelector) {

  const calendarList = document.querySelectorAll(calendarSelector)
  for (let i = 0; i < calendarList.length; i++) {

    const calendarElement = calendarList[i]
    const headerCalenderElement = calendarElement.querySelector(".calendar__header-date")
    
    const arrowLeftElement = calendarElement.querySelector(".calendar__header-left")
    const arrowRightElement = calendarElement.querySelector(".calendar__header-right")
    const dateFieldElement = calendarElement.querySelector(".calendar__date")
    const clearFieldElement = calendarElement.querySelector(".calendar__action-clear")
    const applyFieldElement = calendarElement.querySelector(".calendar__action-apply")
    let calendarWrapperElement

    const dateNow = new Date
    const calendar = new DatePicker(calendarElement, headerCalenderElement, dateFieldElement, clearFieldElement)

    let dropdownArrivalInputElement
    let dropdownDepartureInputElement

    calendar.rangeDateInput = false
  
    if (firstDateSelector) {
      const dropdownArrivalElement = document.querySelector(firstDateSelector)
      const dropdownArrivalChevronElement = dropdownArrivalElement.querySelector('[data-dropdown-chevron]')
      dropdownArrivalInputElement = dropdownArrivalElement.querySelector('input')
      calendarWrapperElement = calendarElement.parentElement
      
      dropdownArrivalChevronElement.addEventListener('click', {handleEvent: calendar.calendarToggle, calendarWrapperElement})

      if (dropdownArrivalElement.hasAttribute('data-input-filter-date')) {
        calendar.rangeDateInput = true
      }

      if (secondDateSelector) {
        const dropdownDepartureElement = document.querySelector(secondDateSelector)
        const dropdownDepartureChevronElement = dropdownDepartureElement.querySelector('[data-dropdown-chevron]')
        dropdownDepartureInputElement = dropdownDepartureElement.querySelector('input')
        
        dropdownDepartureChevronElement.addEventListener('click', {handleEvent: calendar.calendarToggle, calendarWrapperElement})
      }

      if (calendar.rangeDateInput === true) {
        calendarWrapperElement.addEventListener("click", {handleEvent:calendar.getCalendarRangeData, calendarElement, dropdownArrivalInputElement, dropdownDepartureInputElement, calendar}, false)
      } else {
        calendarWrapperElement.addEventListener("click", {handleEvent:calendar.getCalendarData, calendarElement, dropdownArrivalInputElement, dropdownDepartureInputElement, calendar}, false)
      }
    }
    
    const nowMonthNum = dateNow.getMonth();
    const nowMonth = calendar.months[nowMonthNum];
  
    calendar.nowMonthDisplay = dateNow.getMonth();
    const nowYear = dateNow.getFullYear();
    calendar.nowYearDisplay = dateNow.getFullYear();
    headerCalenderElement.innerHTML = `${nowMonth} ${nowYear}`;
  
    clearFieldElement.style.display = "none";
  
    calendar.createDateField(calendar.nowMonthDisplay, calendar.nowYearDisplay, calendarElement, dateFieldElement, clearFieldElement);

    clearFieldElement.addEventListener("click", {handleEvent:calendar.clearCalendarField, calendarElement, dropdownArrivalInputElement, dropdownDepartureInputElement, calendar, clearFieldElement});
    arrowLeftElement.addEventListener("click", {handleEvent: calendar.decreaseHeaderDate, calendarElement, calendar, headerCalenderElement, dateFieldElement, clearFieldElement});
    arrowRightElement.addEventListener("click", {handleEvent: calendar.increaseHeaderDate, calendarElement, calendar, headerCalenderElement, dateFieldElement, clearFieldElement});
    applyFieldElement.addEventListener("click", {handleEvent: calendar.applyCalendarField, calendarWrapperElement})
  
  }
  return calendar
}

export default calendar
