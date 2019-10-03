
// if (window.location.pathname === '/landing.html') {
  class Day {
    constructor(year, month, day) {
      this.year = year
      this.month = month
      this.day = day
      this.date = new Date(year, month, day)
      this.previosMonth = new Date(year, month - 1, day).getMonth()
      this.nextMonth = new Date(year, month + 1, day).getMonth()
      this.previosYear = new Date(year - 1, month,day).getFullYear()
      this.nextYear = new Date(year + 1, month,day).getFullYear()
      this.milliseconds = new Date(year, month, day).getTime()

    }
    // Добавляем стиль к текущей дате на календаре
    showToday() {
      const nowDate = new Date()
      const yearIsEqual = (this.year === nowDate.getFullYear() )
      const monthIsEqual = (this.month === nowDate.getMonth() )
      const dayIsEqual = (this.day === nowDate.getDate() )
      if (yearIsEqual && monthIsEqual && dayIsEqual) {
        return true
      } else {
        return false
      }
    }

    createDateElement(year, month, day, dateFieldElement) {
      const calendarDay = document.createElement('div')
      calendarDay.classList.add('calendar__day')
      calendarDay.setAttribute('data-calendar-day', day)
      calendarDay.setAttribute('data-month', month)
      calendarDay.setAttribute('data-year', year)
      calendarDay.innerHTML = `${day}`
      dateFieldElement.appendChild(calendarDay)
      return calendarDay
    }

    handler(event){
      // console.log('click')
      console.log(event.target)
      // console.log(event.currentTarget)
      const dayElement = event.currentTarget
      console.log(dayElement.innerHTML)
      const day = dayElement.getAttribute('data-calendar-day')
      const month = dayElement.getAttribute('data-month')
      const year = dayElement.getAttribute('data-year')
      choosenDate.beginDate = new Date(year, month, day).getTime()
      choosenDate.beginDay = day
      choosenDate.beginMonth = month
      choosenDate.beginYear = year
      console.log(choosenDate)
      calendar.render()
    }


  }

  class Calendar {
    constructor(){

    }
    render(){
      const daysList = document.querySelectorAll('[data-calendar-day]')
      for( let i = 0; i < daysList.length; i++) {
        daysList[i].classList.remove('calendar__day_period')
        const dayIsEqual = (choosenDate.beginDay === daysList[i].getAttribute('data-calendar-day'))
        const monthIsEqual = (choosenDate.beginMonth === daysList[i].getAttribute('data-month'))
        const yearIsEqual = (choosenDate.beginYear === daysList[i].getAttribute('data-year'))
        if(dayIsEqual && monthIsEqual && yearIsEqual) {
          daysList[i].classList.add('calendar__day_period')
        }
      }
    }
  }

  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг","Пятница", "Суббота"];
  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const dateNow = new Date();
  
  console.log('calendar.js подключен')
  
  const headerCalenderElement = document.querySelector(".calendar__header-date")
  
  const arrowLeftElement = document.querySelector(".calendar__header-left")
  const arrowRightElement = document.querySelector(".calendar__header-right")
  const dateFieldElement = document.querySelector(".calendar__date")
  const clearFieldElement = document.querySelector(".calendar__action-clear")
  const applyFieldElement = document.querySelector(".calendar__action-apply")
  
  const choosenDate = {
    beginDay: '',
    endDay: '',
    beginMonth: '',
    endMonth: '',
    beginYear: '',
    endYear: ''
  }
  
  const calendar = new Calendar()
  
  const dropdownArrivalElement = document.querySelector("#arrival")
  const dropdownDepartureElement = document.querySelector("#departure")
  const calendarWrapperElement = document.querySelector(".calendar-wrapper")
  
  const nowMonthNum = dateNow.getMonth()
  const nowMonth = months[nowMonthNum]
  console.log(nowMonthNum)
  console.log(nowMonth)
  let nowMonthDisplay = dateNow.getMonth()
  const nowYear = dateNow.getFullYear()
  let nowYearDisplay = dateNow.getFullYear()
  headerCalenderElement.innerHTML = `${nowMonth} ${nowYear}`
  
  clearFieldElement.style.display = "none"
  
  createDateField(nowMonthDisplay, nowYearDisplay)
  
  clearFieldElement.addEventListener('click', clearCalendarField)
  applyFieldElement.addEventListener('click', applyCalendarField)
  arrowLeftElement.addEventListener('click', decreaseHeaderDate)
  arrowRightElement.addEventListener('click', increaseHeaderDate)
  dropdownArrivalElement.addEventListener('click', calendarToggle)
  dropdownDepartureElement.addEventListener('click', calendarToggle)
  
  // Перелисываем календарь на предыдущий месяц
  function decreaseHeaderDate() {
    console.log('left')
    nowMonthDisplay -= 1
    if (nowMonthDisplay < 0) {
      nowMonthDisplay = 11
      nowYearDisplay -= 1
    }
    headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`
    createDateField(nowMonthDisplay, nowYearDisplay)
  }
  // Перелистываем календарь на следующий месяц
  function increaseHeaderDate() {
    nowMonthDisplay += 1
    if (nowMonthDisplay > 11) {
      nowMonthDisplay = 0
      nowYearDisplay += 1
    }
    headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`
    createDateField(nowMonthDisplay, nowYearDisplay)
  }
  
  











  
  // Отрисовываем календарь
  function createDateField(month, year) {
    // let monthInHeader = month
    // let monthInHeader = nowMonthDisplay
    // let yearInHeader = year
    // let yearInHeader = nowYearDisplay
    // const dateInHeader = new Date(yearInHeader, monthInHeader)
    const monthInfo = getMonthInfo(month, year)
    // console.log(monthInfo.previosMonthLastWeekDayBegin)
    // console.log(monthInfo.nextMonthViewedDays)
  
    let previosMonthDayBegin = monthInfo.previosMonthLastWeekDayBegin
    // if (monthInfo.firstNumberDay == 0) {
    //   previosMonthDayBegin = monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay - 5
    // } else {
    //   previosMonthDayBegin = monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay + 2
    // }
  
    // let dayNumber = 1
    // let nextMonthDayBegin = 1
    // let begin = false
    // let datesAfter = false
    // let datesBefore = true
    dateFieldElement.innerHTML = ''
    // console.log(previosMonthDayBegin)
    // console.log(monthInfo.previosMonthDaysCount)

    if (previosMonthDayBegin){

      for ( let i = previosMonthDayBegin; i <= monthInfo.previosMonthDaysCount; i++ ) {
        const calendarDay = document.createElement('div')
        calendarDay.classList.add('calendar__day')
        calendarDay.classList.add('calendar__day_another-month')
        calendarDay.setAttribute('data-calendar-day', i)
        calendarDay.setAttribute('data-month', month - 1)
        calendarDay.setAttribute('data-year', year)
        calendarDay.innerHTML = `${i}`
        dateFieldElement.appendChild(calendarDay)
      }
    }

    for (let i = 1; i <= monthInfo.daysCount; i++) {
      // const calendarDay = document.createElement('div')
      // calendarDay.classList.add('calendar__day')
      // calendarDay.setAttribute('data-calendar-day', i)
      // calendarDay.setAttribute('data-month', month)
      // calendarDay.setAttribute('data-year', year)
      // calendarDay.innerHTML = `${i}`
      // dateFieldElement.appendChild(calendarDay)

      
      const newDay = new Day(year, month , i)
      const calendarDay = newDay.createDateElement(year, month, i, dateFieldElement)
      // console.log(testDay.today())
      // newDay.today(newDay.createDateElement(year, month, i, dateFieldElement))
      if (newDay.showToday()) {
        calendarDay.classList.add("calendar__day_today")
      }
      calendarDay.addEventListener('click', newDay.handler)
    }

    for (let i = 1; i <= monthInfo.nextMonthViewedDays; i++) {
      const calendarDay = document.createElement('div')
      calendarDay.classList.add('calendar__day')
      calendarDay.classList.add('calendar__day_another-month')
      calendarDay.setAttribute('data-calendar-day', i)
      calendarDay.setAttribute('data-month', month + 1)
      calendarDay.setAttribute('data-year', year)
      calendarDay.innerHTML = `${i}`
      dateFieldElement.appendChild(calendarDay)
    }

    calendar.render()
  
    // while(dayNumber <= monthInfo.daysCount){
    //   const weekLine = document.createElement('div')
    //   weekLine.classList.add('calendar__date-row')
    //   dateFieldElement.appendChild(weekLine)
    //   for (let i = 0; i < 7; i++){
    //     const monthDay = document.createElement('div')
    //     monthDay.classList.add('calendar__day')
    //     if (i+1 == monthInfo.firstNumberDay) {
    //       begin = true
    //       datesBefore = false
    //     } else if ((monthInfo.firstNumberDay == 0) && (i == 6)){
    //       begin = true
    //       datesBefore = false
    //     }
    //     if (monthInfo.daysCount==dayNumber-1) {
    //       begin = false
    //       datesAfter = true
    //     }
    //     if(begin) {
    //       monthDay.innerText = dayNumber
    //       monthDay.setAttribute("data-calendar-day", dayNumber)
    //       dayNumber += 1
    //     }
    //     if (datesBefore) {
    //       monthDay.classList.add("pale")
    //       monthDay.innerText = previosMonthDayBegin
    //       previosMonthDayBegin += 1
    //     }
    //     if (datesAfter) {
    //       monthDay.classList.add("pale")
    //       monthDay.innerText = nextMonthDayBegin
    //       nextMonthDayBegin += 1
    //     }
    //     weekLine.appendChild(monthDay)
    
    //   }
    // }
    // const calendarDay = document.querySelectorAll("[data-calendar-day]")
    // displayToday()
    // showChoosenDates()
  
    // for (let i = 0; i < calendarDay.length; i++){
    //   calendarDay[i].addEventListener('click', chooseDate)
    // }
    
  
  }



  
  // const testDay = new Day(nowYear, nowMonthNum , new Date().getDate())
  // console.log(testDay.today())





  
  // Добавляем стиль к текущей дате на календаре
  // function displayToday(){
  //   const calendarDay = document.querySelectorAll("[data-calendar-day]")
  //   if ((nowMonthDisplay === dateNow.getMonth()) && (nowYearDisplay === dateNow.getFullYear())) {
  //     for (let i = 0; i < calendarDay.length; i++){
        
  //       // if (calendarDay[i].innerText == dateNow.getDate()){
  //       if ((calendarDay[i].getAttribute('data-calendar-day') == dateNow.getDate()) && (calendarDay[i].getAttribute('data-month') == dateNow.getMonth()) ){
  //           // console.log(calendarDay[i].getAttribute('data-calendar-day'))
  //           // console.log(dateNow.getDate())
  //           // console.log(calendarDay[i].getAttribute('data-month'))
  //           // console.log(dateNow.getMonth())
          
  //         calendarDay[i].classList.add("calendar__day_today")
  //       }
  //     }
  //   }
  // }
  
  // Получаем данные о текущей дате
  function getMonthInfo(month, year) {
    const currentMonth = {
      daysCount: getDaysCount(month, year),
      firstNumberDay: new Date(year, month).getDay(),
      previosMonthDaysCount: getDaysCount(month-1, year),
      previosMonthLastWeekDayBegin: getPreviosMonthLastWeekDayBegin(month-1, year),
      nextMonthViewedDays: getNextMonthViewedDays(month+1, year)
    }
    return currentMonth
  }







  //Видимые дни следующего месяца
  function getNextMonthViewedDays(month, year) {
    const firstDayOfWeek = new Date(year, month, 1).getDay()
    // console.log(firstDayOfWeek)
    if (firstDayOfWeek === 1) {
      return 0
    }
    let result = 8 - firstDayOfWeek
    if (result === 8) {
      result = 1
    }
    return result
  }

  //Первый день последней недели предыдущего месяца
  function getPreviosMonthLastWeekDayBegin (month, year) {
    const daysCount = getDaysCount(month, year)
    let result
    // console.log(daysCount)
    if ((new Date(year, month, daysCount).getDay()) === 0) {
      return false
    }
    for (let i = 0; i < daysCount; i++ ) {
      const date = new Date(year, month, i).getDay() + 1
      // console.log(date)
      if ( date === 1) {
        result = i + 1
        // console.log(result)
      }
    }
    return result
  }
  









  // Определяем длинну месяца
  function getDaysCount(month, year){
  
    for (let i=28; i<=31; i++) {
      const monthCurrent = new Date(year, month, i)
      const monthNext = new Date(year, month+1, 0)
      if (Date.parse(monthCurrent)===Date.parse(monthNext)) {
        return i
      }
    }
  }
  
  // Отмечаем даты приезда и выезды
  function chooseDate(event){
    event.preventDefault()
    event.stopPropagation()
  
    const notAllowedBeginDate = (
      parseInt(this.innerText) < parseInt(dateNow.getDate()) 
      && (nowMonthDisplay <= dateNow.getMonth()) 
      && (nowYearDisplay <= dateNow.getFullYear()) 
      || (nowMonthDisplay < dateNow.getMonth()) 
      && (nowYearDisplay <= dateNow.getFullYear()) 
      )
    const notAllowedEndDate = (
      parseInt(this.innerText) < parseInt(choosenDate.beginDay) 
      && (nowMonthDisplay <= choosenDate.beginMonth) 
      && (nowYearDisplay <= choosenDate.beginYear) 
      || (nowMonthDisplay < choosenDate.beginMonth) 
      && (nowYearDisplay <= choosenDate.beginYear) 
      )
  
  
    if (notAllowedBeginDate) {
      this.classList.add("calendar__day--error")
      setTimeout( () => {
        this.classList.remove("calendar__day--error")
      }, 300)
    }
  
    if (choosenDate.beginDay === '') {
  
      if (!notAllowedBeginDate) {
        choosenDate.beginDay = parseInt(this.innerText)
        choosenDate.beginMonth = nowMonthDisplay
        choosenDate.beginYear = nowYearDisplay
        localStorage.setItem('beginDay', choosenDate.beginDay)
        localStorage.setItem('beginMonth', choosenDate.beginMonth)
        localStorage.setItem('beginYear', choosenDate.beginYear)
  
        dropdownArrivalElement.firstElementChild.innerHTML = showDatesInForm(choosenDate.beginDay, choosenDate.beginMonth, choosenDate.beginYear)
  
        dropdownArrivalElement.firstElementChild.classList.remove("form-focus")
        dropdownDepartureElement.firstElementChild.classList.add("form-focus")
      }
    }
    else if (choosenDate.endDay === '') {
      // console.log(parseInt(this.innerText))
      // console.log(parseInt(choosenDate.beginDay))
      if (!notAllowedEndDate) {
        choosenDate.endDay = parseInt(this.innerText)
        choosenDate.endMonth = nowMonthDisplay
        choosenDate.endYear = nowYearDisplay
        localStorage.setItem('endDay', choosenDate.endDay)
        localStorage.setItem('endMonth', choosenDate.endMonth)
        localStorage.setItem('endYear', choosenDate.endYear)
  
        dropdownDepartureElement.firstElementChild.innerHTML = showDatesInForm(choosenDate.endDay, choosenDate.endMonth, choosenDate.endYear)
      } else {
        this.classList.add("calendar__day--error")
        setTimeout( () => {
          this.classList.remove("calendar__day--error")
        }, 300)
      }
      
  
  
    }
    showChoosenDates()
    if ((choosenDate.beginDay !== '') || (choosenDate.endDay !== '')) {
      clearFieldElement.style.display = "block"
    }
  
    // console.log(choosenDate)
  }
  
  // Отображаем дату прибытия и выезда в элементах форм
  function showDatesInForm(day, month, year) {
    let dayDisplay = day.toString()
    let monthDisplay = (month + 1).toString()
    if (dayDisplay.length === 1) {
      dayDisplay = '0' + dayDisplay
    }
    if (monthDisplay.length === 1) {
      monthDisplay = '0' + monthDisplay
    }
    return `${dayDisplay}.${monthDisplay}.${year.toString()}`
  }
  
  // Применяем стили к выбранным датам и промежутку
  function showChoosenDates(){
    const calendarDay = document.querySelectorAll("[data-calendar-day]")
    let between = false
      for (let i = 0; i < calendarDay.length; i++) {
  
        if ((parseInt(calendarDay[i].innerText) === parseInt(choosenDate.endDay)) 
          && (parseInt(choosenDate.beginDay) !== parseInt(choosenDate.endDay)) 
          && (parseInt(choosenDate.endMonth) === parseInt(nowMonthDisplay)) 
          && (parseInt(choosenDate.endYear) === parseInt(nowYearDisplay))
          ) {
          calendarDay[i].classList.add("calendar__day--period")
          calendarDay[i].classList.add("calendar__day--period-end")
          between = false
        }
        else if (
          (parseInt(choosenDate.beginMonth) < parseInt(choosenDate.endMonth)) 
          && (parseInt(choosenDate.beginMonth) < parseInt(nowMonthDisplay)) 
          && (parseInt(calendarDay[i].innerText) < parseInt(choosenDate.endDay)) 
          && (parseInt(nowMonthDisplay) <= parseInt(choosenDate.endMonth)) 
          && (parseInt(nowYearDisplay) <= parseInt(choosenDate.endYear)) 
          || (parseInt(nowMonthDisplay) < parseInt(choosenDate.endMonth)) 
          && (parseInt(nowMonthDisplay) > parseInt(choosenDate.beginMonth)) 
          && (parseInt(nowYearDisplay) <= parseInt(choosenDate.endYear)) 
          || (parseInt(choosenDate.beginYear) < parseInt(nowYearDisplay)) 
          && (parseInt(nowMonthDisplay) <= parseInt(choosenDate.endMonth)) 
          && (parseInt(calendarDay[i].innerText) < parseInt(choosenDate.endDay)) 
          && (parseInt(choosenDate.beginYear) < parseInt(choosenDate.endYear)) 
          && (parseInt(nowYearDisplay) === parseInt(choosenDate.endYear) )
          || (parseInt(choosenDate.beginMonth) > parseInt(choosenDate.endMonth)) 
          && (parseInt(choosenDate.beginYear) < parseInt(choosenDate.endYear))
          && (parseInt(choosenDate.beginMonth) < parseInt(nowMonthDisplay)) 
          && (parseInt(nowYearDisplay) === parseInt(choosenDate.beginYear))
          ){
          between = true
        }
        if ((between === true) && (parseInt(choosenDate.beginDay) !== parseInt(choosenDate.endDay)) && (parseInt(choosenDate.endDay) !== '') ) {
          calendarDay[i].classList.add("calendar__day--period-between")
        }
        if (
          (parseInt(calendarDay[i].innerText) === parseInt(choosenDate.beginDay)) 
          && (parseInt(choosenDate.beginDay) !== parseInt(choosenDate.endDay)) 
          && (parseInt(choosenDate.beginMonth) === parseInt(nowMonthDisplay)) 
          && (parseInt(choosenDate.beginYear) === parseInt(nowYearDisplay)) 
          ) {
          calendarDay[i].classList.add("calendar__day--period")
          if(choosenDate.endDay !== ''){
            calendarDay[i].classList.add("calendar__day--period-begin")
          }
          if (choosenDate.endDay != '') {
            between = true
          }
        }
  
      }
  
  }
  
  // Очищаем календарь
  function clearCalendarField(event){
    event.preventDefault()
    const calendarDay = document.querySelectorAll("[data-calendar-day]")
    for (let i = 0; i < calendarDay.length; i++){
      if (calendarDay[i].classList.contains("calendar__day--period") ) {
        calendarDay[i].classList.remove("calendar__day--period")
        calendarDay[i].classList.remove("calendar__day--period-begin")
        calendarDay[i].classList.remove("calendar__day--period-end")
      }
      if (calendarDay[i].classList.contains("calendar__day--period-between") ) {
        
        calendarDay[i].classList.remove("calendar__day--period-between")
      }
    }
    choosenDate.beginDay = ''
    choosenDate.endDay = ''
    clearFieldElement.style.display = "none"
    if (dropdownArrivalElement) {
      dropdownArrivalElement.firstElementChild.innerHTML = "ДД.ММ.ГГГГ"
      dropdownDepartureElement.firstElementChild.innerHTML = "ДД.ММ.ГГГГ"
      dropdownArrivalElement.firstElementChild.classList.add("form-focus")
      dropdownDepartureElement.firstElementChild.classList.remove("form-focus")
    }
  }
  
  // Действие кнопки ПРИМЕНИТЬ
  function applyCalendarField() {
    dropdownArrivalElement.firstElementChild.classList.remove("form-focus")
    dropdownDepartureElement.firstElementChild.classList.remove("form-focus")
    calendarWrapperElement.classList.add("hide")
  }
  
  
  // Открываем календарь
  function calendarToggle() {
    calendarWrapperElement.classList.toggle("hide")
    if (choosenDate.beginDay && !choosenDate.endDay) {
      dropdownDepartureElement.firstElementChild.classList.add("form-focus")
    } else {
      dropdownArrivalElement.firstElementChild.classList.add("form-focus")
    }
    if (calendarWrapperElement.classList.contains("hide")) {
      dropdownArrivalElement.firstElementChild.classList.remove("form-focus")
      dropdownDepartureElement.firstElementChild.classList.remove("form-focus")
    }
  }
  
  // }