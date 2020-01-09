import Day from './Day.js'

export default class DatePicker {
  constructor(calendarElement, headerCalenderElement, dateFieldElement, clearFieldElement) {
    this.beginDate = "",
    this.endDate = "",
    this.beginDay = "",
    this.endDay = "",
    this.beginMonth = "",
    this.endMonth = "",
    this.beginYear = "",
    this.endYear = "",
    this.calendarElement = calendarElement,
    this.dateFieldElement = dateFieldElement,
    this.clearFieldElement = clearFieldElement,
    this.headerCalenderElement = headerCalenderElement,
    this.months = [
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
  }

  // Отмечаем даты приезда и выезда
  showChoosenDays(calendarElement, clearFieldElement) {
    if (calendarElement) {
      const daysList = calendarElement.querySelectorAll("[data-calendar-day]");

      for (let i = 0; i < daysList.length; i++) {
        daysList[i].classList.remove("calendar__day_period");
        daysList[i].classList.remove("calendar__day_period_between");
        daysList[i].classList.remove("calendar__day_period_begin");
        daysList[i].classList.remove("calendar__day_period_end");

        const iterationDay = daysList[i].getAttribute("data-calendar-day");
        const iterationMonth = daysList[i].getAttribute("data-month");
        const iterationYear = daysList[i].getAttribute("data-year");

        const dayBeginIsEqual = this.beginDay === iterationDay;
        const dayEndIsEqual = this.endDay === iterationDay;
        const monthBeginIsEqual = this.beginMonth === iterationMonth;
        const monthEndIsEqual = this.endMonth === iterationMonth;
        const yearBeginIsEqual = this.beginYear === iterationYear;
        const yearEndIsEqual = this.endYear === iterationYear;

        if (dayBeginIsEqual && monthBeginIsEqual && yearBeginIsEqual) {
          daysList[i].classList.add("calendar__day_period");

          if (this.endDay && this.endDate !== this.beginDate) {
            daysList[i].classList.add("calendar__day_period_begin");
          }
        }

        if (dayEndIsEqual && monthEndIsEqual && yearEndIsEqual) {
          daysList[i].classList.add("calendar__day_period");

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
          iterationDate > this.beginDate &&
          iterationDate < this.endDate
        ) {
          daysList[i].classList.add("calendar__day_period_between");
        }

        if (this.beginDay !== "" || this.endDay !== "") {
          clearFieldElement.style.display = "block";
        }
      }
    }
  }

  

  // Отрисовываем календарь
  createDateField() {
    
    const monthInfo = DatePicker.getMonthInfo(this.nowMonthDisplay, this.nowYearDisplay);
    let previosMonthDayBegin = monthInfo.previosMonthLastWeekDayBegin;

    this.dateFieldElement.innerHTML = "";

    if (previosMonthDayBegin) {
      for (let i = previosMonthDayBegin; i <= monthInfo.previosMonthDaysCount; i++) {
        const newDay = new Day(this.nowYearDisplay, this.nowMonthDisplay - 1, i);
        const calendarDay = newDay.createDateElement(newDay.year, newDay.month, i, this.dateFieldElement, this);
        calendarDay.classList.add("calendar__day_another-month");
        calendarDay.classList.add("calendar__day_previous-month");
        calendarDay.addEventListener("click", {handleEvent: newDay.handler, calendarElement: this.calendarElement, clearFieldElement: this.clearFieldElement, calendar: this});
      }
    }

    for (let i = 1; i <= monthInfo.daysCount; i++) {
      const newDay = new Day(this.nowYearDisplay, this.nowMonthDisplay, i);
      const calendarDay = newDay.createDateElement(this.nowYearDisplay, this.nowMonthDisplay, i, this.dateFieldElement, this);

      calendarDay.addEventListener("click", {handleEvent: newDay.handler, calendarElement: this.calendarElement, clearFieldElement: this.clearFieldElement, calendar: this});
    }

    for (let i = 1; i <= monthInfo.nextMonthViewedDays; i++) {
      const newDay = new Day(this.nowYearDisplay, this.nowMonthDisplay + 1, i);
      const calendarDay = newDay.createDateElement(newDay.year, newDay.month, i, this.dateFieldElement, this);
      calendarDay.classList.add("calendar__day_another-month");
      calendarDay.classList.add("calendar__day_next-month");
      calendarDay.addEventListener("click", {handleEvent: newDay.handler, calendarElement: this.calendarElement, clearFieldElement: this.clearFieldElement, calendar: this});
    }
    this.showChoosenDays(this.calendarElement, this.clearFieldElement);

  }

  // Перелисываем календарь на предыдущий месяц
  decreaseHeaderDate() {
    this.nowMonthDisplay -= 1;
    if (this.nowMonthDisplay < 0) {
      this.nowMonthDisplay = 11;
      this.nowYearDisplay -= 1;
    }
    this.headerCalenderElement.innerHTML = `${this.months[this.nowMonthDisplay]} ${this.nowYearDisplay}`;
    this.createDateField()
  }

  // Перелистываем календарь на следующий месяц
  increaseHeaderDate() {
    this.nowMonthDisplay += 1
    if (this.nowMonthDisplay > 11) {
      this.nowMonthDisplay = 0
      this.nowYearDisplay += 1
    }
    this.headerCalenderElement.innerHTML = `${this.months[this.nowMonthDisplay]} ${this.nowYearDisplay}`
    this.createDateField()
  }


  // Получаем данные о текущей дате
  static getMonthInfo(month, year) {
    const currentMonth = {
      daysCount: DatePicker.getDaysCount(month, year),
      firstNumberDay: new Date(year, month).getDay(),
      previosMonthDaysCount: DatePicker.getDaysCount(month - 1, year),
      previosMonthLastWeekDayBegin: DatePicker.getPreviosMonthLastWeekDayBegin(
        month - 1,
        year
      ),
      nextMonthViewedDays: DatePicker.getNextMonthViewedDays(month + 1, year)
    };
    return currentMonth;
  }

  //Видимые дни следующего месяца
  static getNextMonthViewedDays(month, year) {
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
  static getPreviosMonthLastWeekDayBegin(month, year) {
    const daysCount = DatePicker.getDaysCount(month, year);
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
  static getDaysCount(month, year) {
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

  // Вывод даты в отдельный инпут при выборе дат в календаре
  getCalendarData () {
    const dateBegin = [
      DatePicker.getDoubleNumber(this.calendar.beginDay), 
      DatePicker.getDoubleNumber(String(parseInt(this.calendar.beginMonth) + 1)), 
      this.calendar.beginYear
    ].join('.')
  
    const dateEnd = [
      DatePicker.getDoubleNumber(this.calendar.endDay), 
      DatePicker.getDoubleNumber(String(parseInt(this.calendar.endMonth) + 1)), 
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

  // Вывод совмещённого диапазона дат в инпут
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
    // запоминаем чтобыло записано в инпуте
    const inpetDefaultValue = this.dropdownArrivalInputElement.value

    const firstDate = `${this.calendar.beginDay} ${monthsShort[this.calendar.beginMonth]}`

    if (this.calendar.endDay) {
      const secondDate = `${this.calendar.endDay} ${monthsShort[this.calendar.endMonth]}`

      this.dropdownArrivalInputElement.value = `${firstDate} - ${secondDate}`
    } else {
      this.dropdownArrivalInputElement.value = firstDate
    }
    // если дата не выбрана, то возвращаем значение по умолчанию
    if (this.calendar.beginMonth === '') {
      this.dropdownArrivalInputElement.value = inpetDefaultValue
    }
  }

  // создаём доту для отдельных инпутов прибытия - отправления
  static getDoubleNumber (string) {
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