// console.log('calendar connect')

function calendar(calendarSelector, firstDateSelector, secondDateSelector) {
  class Day {
    constructor(year, month, day) {
      this.date = new Date(year, month, day);
      this.year = new Date(year, month, day).getFullYear();
      this.month = new Date(year, month, day).getMonth();
      this.day = new Date(year, month, day).getDate();

      this.previosMonth = new Date(year, month - 1, day).getMonth();
      this.nextMonth = new Date(year, month + 1, day).getMonth();
      this.previosYear = new Date(year - 1, month, day).getFullYear();
      this.nextYear = new Date(year + 1, month, day).getFullYear();
      this.milliseconds = new Date(year, month, day).getTime();
    }

    // Добавляем стиль к текущей дате на календаре
    showToday(calendar) {
      const nowDate = new Date();
      calendar.nowDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate()
      ).getTime();
      const yearIsEqual = this.year === nowDate.getFullYear();
      const monthIsEqual = this.month === nowDate.getMonth();
      const dayIsEqual = this.day === nowDate.getDate();

      if (yearIsEqual && monthIsEqual && dayIsEqual) {
        return true;
      } else {
        return false;
      }
    }

    createDateElement(year, month, day, dateFieldElement, calendar) {
      const calendarDay = document.createElement("div");
      calendarDay.classList.add("calendar__day");
      calendarDay.setAttribute("data-calendar-day", day);
      calendarDay.setAttribute("data-month", month);
      calendarDay.setAttribute("data-year", year);

      if (this.showToday(calendar)) {
        calendarDay.classList.add("calendar__day_today");
      }

      calendarDay.innerHTML = `${day}`;
      dateFieldElement.appendChild(calendarDay);
      return calendarDay;
    }

    handler(event) {
      event.preventDefault()
      
      const dayElement = event.target;
      const day = dayElement.getAttribute("data-calendar-day");
      const month = dayElement.getAttribute("data-month");
      const year = dayElement.getAttribute("data-year");
      const date = new Date(year, month, day).getTime();

      if (date < this.calendar.nowDate) {
        dayElement.classList.add("calendar__day_error");
        setTimeout(() => {
          dayElement.classList.remove("calendar__day_error");
        }, 300);
        return;
      }

      if (this.calendar.endDate !== "") {
        this.calendar.beginDate = "";
        this.calendar.beginDay = "";
        this.calendar.beginMonth = "";
        this.calendar.beginYear = "";
        this.calendar.endDate = "";
        this.calendar.endDay = "";
        this.calendar.endMonth = "";
        this.calendar.endYear = "";
      }

      if (this.calendar.beginDate === "") {
        this.calendar.beginDate = date;
        this.calendar.beginDay = day;
        this.calendar.beginMonth = month;
        this.calendar.beginYear = year;
      } else if (date >= this.calendar.beginDate) {
        this.calendar.endDate = date;
        this.calendar.endDay = day;
        this.calendar.endMonth = month;
        this.calendar.endYear = year;
      } else {
        this.calendar.endDate = this.calendar.beginDate;
        this.calendar.endDay = this.calendar.beginDay;
        this.calendar.endMonth = this.calendar.beginMonth;
        this.calendar.endYear = this.calendar.beginYear;
        this.calendar.beginDate = date;
        this.calendar.beginDay = day;
        this.calendar.beginMonth = month;
        this.calendar.beginYear = year;
      }
      
      if (dayElement.classList.contains("calendar__day_previous-month")) {
        this.calendar.decreaseHeaderDate();
      } else if (dayElement.classList.contains("calendar__day_next-month")) {
        this.calendar.increaseHeaderDate();
      }
      this.calendar.showChoosenDays(this.calendarElement, this.clearFieldElement);
    }
  }



  class Calendar {
    constructor() {
      this.beginDate = "",
      this.endDate = "",
      this.beginDay = "",
      this.endDay = "",
      this.beginMonth = "",
      this.endMonth = "",
      this.beginYear = "",
      this.endYear = ""
    }

    // Отмечаем даты приезда и выезда
    showChoosenDays(calendarElement, clearFieldElement) {
      // console.log('showChoosen: ', this)
      if (calendarElement) {
        const daysList = calendarElement.querySelectorAll("[data-calendar-day]");
        // console.log(daysList)
      

        for (let i = 0; i < daysList.length; i++) {
          daysList[i].classList.remove("calendar__day_period");
          daysList[i].classList.remove("calendar__day_period_between");
          daysList[i].classList.remove("calendar__day_period_begin");
          daysList[i].classList.remove("calendar__day_period_end");

          const iterationDay = daysList[i].getAttribute("data-calendar-day");
          const iterationMonth = daysList[i].getAttribute("data-month");
          const iterationYear = daysList[i].getAttribute("data-year");

          // const dayBeginIsEqual = calendar.beginDay === iterationDay;
          // const dayEndIsEqual = calendar.endDay === iterationDay;
          // const monthBeginIsEqual = calendar.beginMonth === iterationMonth;
          // const monthEndIsEqual = calendar.endMonth === iterationMonth;
          // const yearBeginIsEqual = calendar.beginYear === iterationYear;
          // const yearEndIsEqual = calendar.endYear === iterationYear;

          const dayBeginIsEqual = this.beginDay === iterationDay;
          const dayEndIsEqual = this.endDay === iterationDay;
          const monthBeginIsEqual = this.beginMonth === iterationMonth;
          const monthEndIsEqual = this.endMonth === iterationMonth;
          const yearBeginIsEqual = this.beginYear === iterationYear;
          const yearEndIsEqual = this.endYear === iterationYear;

          // console.log(calendar)
          // console.log(monthBeginIsEqual)
          // console.log(yearBeginIsEqual)
          if (dayBeginIsEqual && monthBeginIsEqual && yearBeginIsEqual) {
            // console.log('ker')
            daysList[i].classList.add("calendar__day_period");

            // if (calendar.endDay && calendar.endDate !== calendar.beginDate) {
            if (this.endDay && this.endDate !== this.beginDate) {
              daysList[i].classList.add("calendar__day_period_begin");
            }
          }

          if (dayEndIsEqual && monthEndIsEqual && yearEndIsEqual) {
            daysList[i].classList.add("calendar__day_period");

            // if (calendar.endDay && calendar.endDate !== calendar.beginDate) {
            if (this.endDay && this.endDate !== this.beginDate) {
              daysList[i].classList.add("calendar__day_period_end");
            }
          }

          const iterationDate = new Date(
            iterationYear,
            iterationMonth,
            iterationDay
          ).getTime();

          if (
            // iterationDate > calendar.beginDate &&
            iterationDate > this.beginDate &&
            // iterationDate < calendar.endDate
            iterationDate < this.endDate
          ) {
            daysList[i].classList.add("calendar__day_period_between");
          }

          // if (calendar.beginDay !== "" || calendar.endDay !== "") {
          if (this.beginDay !== "" || this.endDay !== "") {
            clearFieldElement.style.display = "block";
          }
        }
      }
    }

    

    // Отрисовываем календарь
    createDateField(month, year, calendarElement, dateFieldElement, clearFieldElement) {
      
      const monthInfo = this.getMonthInfo(month, year);
      let previosMonthDayBegin = monthInfo.previosMonthLastWeekDayBegin;

      dateFieldElement.innerHTML = "";

      if (previosMonthDayBegin) {
        for (
          let i = previosMonthDayBegin;
          i <= monthInfo.previosMonthDaysCount;
          i++
        ) {
          const newDay = new Day(year, month - 1, i);
          const calendarDay = newDay.createDateElement(newDay.year, newDay.month, i, dateFieldElement, this);
          calendarDay.classList.add("calendar__day_another-month");
          calendarDay.classList.add("calendar__day_previous-month");
          calendarDay.addEventListener("click", {handleEvent: newDay.handler, calendarElement, clearFieldElement, calendar: this});
        }
      }

      for (let i = 1; i <= monthInfo.daysCount; i++) {
        const newDay = new Day(year, month, i);
        const calendarDay = newDay.createDateElement(year, month, i, dateFieldElement, this);

        calendarDay.addEventListener("click", {handleEvent: newDay.handler, calendarElement, clearFieldElement, calendar: this});
      }

      for (let i = 1; i <= monthInfo.nextMonthViewedDays; i++) {
        const newDay = new Day(year, month + 1, i);
        const calendarDay = newDay.createDateElement(newDay.year, newDay.month, i, dateFieldElement, this);
        calendarDay.classList.add("calendar__day_another-month");
        calendarDay.classList.add("calendar__day_next-month");
        calendarDay.addEventListener("click", {handleEvent: newDay.handler, calendarElement, clearFieldElement, calendar: this});
      }
      this.showChoosenDays(calendarElement, clearFieldElement);

    }

    // Перелисываем календарь на предыдущий месяц
    decreaseHeaderDate() {
      
      this.calendar.nowMonthDisplay -= 1;
      if (this.calendar.nowMonthDisplay < 0) {
        this.calendar.nowMonthDisplay = 11;
        this.calendar.nowYearDisplay -= 1;
      }
      this.headerCalenderElement.innerHTML = `${months[this.calendar.nowMonthDisplay]} ${this.calendar.nowYearDisplay}`;
      this.calendar.createDateField(this.calendar.nowMonthDisplay, this.calendar.nowYearDisplay, this.calendarElement, this.dateFieldElement, this.clearFieldElement)
    }

    // Перелистываем календарь на следующий месяц
    increaseHeaderDate() {
      console.log(this)
      this.calendar.nowMonthDisplay += 1;
      if (this.calendar.nowMonthDisplay > 11) {
        this.calendar.nowMonthDisplay = 0;
        this.calendar.nowYearDisplay += 1;
      }
      this.headerCalenderElement.innerHTML = `${months[this.calendar.nowMonthDisplay]} ${this.calendar.nowYearDisplay}`;
      this.calendar.createDateField(this.calendar.nowMonthDisplay, this.calendar.nowYearDisplay, this.calendarElement, this.dateFieldElement, this.clearFieldElement);
    }

    // Получаем данные о текущей дате
    getMonthInfo(month, year) {
      const currentMonth = {
        daysCount: this.getDaysCount(month, year),
        firstNumberDay: new Date(year, month).getDay(),
        previosMonthDaysCount: this.getDaysCount(month - 1, year),
        previosMonthLastWeekDayBegin: this.getPreviosMonthLastWeekDayBegin(
          month - 1,
          year
        ),
        nextMonthViewedDays: this.getNextMonthViewedDays(month + 1, year)
      };
      return currentMonth;
    }

    //Видимые дни следующего месяца
    getNextMonthViewedDays(month, year) {
      const firstDayOfWeek = new Date(year, month, 1).getDay();
      if (firstDayOfWeek === 1) {
        return 0;
      }
      let result = 8 - firstDayOfWeek;
      if (result === 8) {
        result = 1;
      }
      return result;
    }

    //Первый день последней недели предыдущего месяца
    getPreviosMonthLastWeekDayBegin(month, year) {
      const daysCount = this.getDaysCount(month, year);
      let result;
      if (new Date(year, month, daysCount).getDay() === 0) {
        return false;
      }
      for (let i = 0; i < daysCount; i++) {
        const date = new Date(year, month, i).getDay() + 1;
        if (date === 1) {
          result = i + 1;
        }
      }
      return result;
    }

    // Определяем длинну месяца
    getDaysCount(month, year) {
      for (let i = 28; i <= 31; i++) {
        const monthCurrent = new Date(year, month, i);
        const monthNext = new Date(year, month + 1, 0);
        if (Date.parse(monthCurrent) === Date.parse(monthNext)) {
          return i;
        }
      }
    }

    // Очищаем календарь
    clearCalendarField(event) {
      event.preventDefault();

      this.calendar.beginDate = ""
      this.calendar.endDate = ""
      this.calendar.beginDay = ""
      this.calendar.endDay = ""
      this.calendar.beginMonth = ""
      this.calendar.endMonth = ""
      this.calendar.beginYear = ""
      this.calendar.endYear = ""
      
      this.clearFieldElement.style.display = "none";
      this.calendar.showChoosenDays(this.calendarElement)

      if (this.dropdownArrivalInputElement) {
        this.dropdownArrivalInputElement.value = '';
        if(this.dropdownDepartureInputElement) {
          this.dropdownDepartureInputElement.value = '';
        }
      }
    }

    // Открываем календарь
    calendarToggle(event) {
      event.preventDefault()
      this.calendarWrapperElement.classList.toggle("hide");
    }

    // Действие кнопки ПРИМЕНИТЬ
    applyCalendarField() {
      if (this.calendarWrapperElement) {
        
        this.calendarWrapperElement.classList.add("hide");
      }
    }

    // Вывод даты в инпут при выборе дат в календаре
    getCalendarData () {
      const dateBegin = [
        this.calendar.getDoubleNumber(this.calendar.beginDay), 
        this.calendar.getDoubleNumber(String(parseInt(this.calendar.beginMonth) + 1)), 
        this.calendar.beginYear
      ].join('.')
    
      const dateEnd = [
        this.calendar.getDoubleNumber(this.calendar.endDay), 
        this.calendar.getDoubleNumber(String(parseInt(this.calendar.endMonth) + 1)), 
        this.calendar.endYear
      ].join('.')


      if (this.dropdownArrivalInputElement && this.dropdownArrivalInputElement.value !== dateBegin && this.calendar.beginDate !== '') {
    
        this.dropdownArrivalInputElement.value = dateBegin
    
        if (this.dropdownDepartureInputElement && this.dropdownDepartureInputElement.value !== dateEnd && this.calendar.endDate !== '') {
          this.dropdownDepartureInputElement.value = dateEnd
        } else if (this.dropdownDepartureInputElement && this.calendar.endDate === '') {
          this.dropdownDepartureInputElement.value = ''
        }
      }
      else if (this.dropdownDepartureInputElement && this.dropdownDepartureInputElement.value !== dateEnd && this.calendar.endDate !== '') {
        this.dropdownDepartureInputElement.value = dateEnd
      }
    }

    // Вывод диапазона дат в инпут
    getCalendarRangeData () {
      const monthsShort = [
        "янв",
        "февр",
        "март",
        "апр",
        "май",
        "июнь",
        "июль",
        "авг",
        "сент",
        "окт",
        "нояб",
        "дек"
      ]

      const firstDate = `${this.calendar.beginDay} ${monthsShort[this.calendar.beginMonth]}`

      if (this.calendar.endDay) {
        const secondDate = `${this.calendar.endDay} ${monthsShort[this.calendar.endMonth]}`

        this.dropdownArrivalInputElement.value = `${firstDate} - ${secondDate}`
      } else {
        this.dropdownArrivalInputElement.value = firstDate
      }
    }

    getDoubleNumber (string) {
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
  }



  // const days = [
  //   "Воскресенье",
  //   "Понедельник",
  //   "Вторник",
  //   "Среда",
  //   "Четверг",
  //   "Пятница",
  //   "Суббота"
  // ];


  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ]
  
  const calendarElement = document.querySelector(calendarSelector);
  if(calendarElement) {
    const headerCalenderElement = calendarElement.querySelector(".calendar__header-date")
    
    const arrowLeftElement = calendarElement.querySelector(".calendar__header-left")
    const arrowRightElement = calendarElement.querySelector(".calendar__header-right")
    const dateFieldElement = calendarElement.querySelector(".calendar__date");
    const clearFieldElement = calendarElement.querySelector(".calendar__action-clear")
    const applyFieldElement = calendarElement.querySelector(".calendar__action-apply")
    let calendarWrapperElement

    const dateNow = new Date()
    const calendar = new Calendar()

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
    const nowMonth = months[nowMonthNum];
  
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
