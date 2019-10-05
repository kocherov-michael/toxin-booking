console.log('calendar connect')

function calendar(element) {
  class Day {
    constructor(year, month, day) {
      this.date = new Date(year, month, day);
      // this.year = year
      // this.month = month
      // this.day = day
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
    showToday() {
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

    createDateElement(year, month, day, dateFieldElement) {
      const calendarDay = document.createElement("div");
      calendarDay.classList.add("calendar__day");
      calendarDay.setAttribute("data-calendar-day", day);
      calendarDay.setAttribute("data-month", month);
      calendarDay.setAttribute("data-year", year);

      if (this.showToday()) {
        calendarDay.classList.add("calendar__day_today");
      }

      calendarDay.innerHTML = `${day}`;
      dateFieldElement.appendChild(calendarDay);
      return calendarDay;
    }

    handler(event) {
      const dayElement = event.currentTarget;
      const day = dayElement.getAttribute("data-calendar-day");
      const month = dayElement.getAttribute("data-month");
      const year = dayElement.getAttribute("data-year");
      const date = new Date(year, month, day).getTime();

      // console.log(date)
      // console.log(calendar.nowDate)

      if (date < calendar.nowDate) {
        dayElement.classList.add("calendar__day_error");
        setTimeout(() => {
          dayElement.classList.remove("calendar__day_error");
        }, 300);
        return;
      }

      if (calendar.endDate !== "") {
        calendar.beginDate = "";
        calendar.beginDay = "";
        calendar.beginMonth = "";
        calendar.beginYear = "";
        calendar.endDate = "";
        calendar.endDay = "";
        calendar.endMonth = "";
        calendar.endYear = "";
      }

      if (calendar.beginDate === "") {
        calendar.beginDate = date;
        calendar.beginDay = day;
        calendar.beginMonth = month;
        calendar.beginYear = year;
      } else if (date >= calendar.beginDate) {
        calendar.endDate = date;
        calendar.endDay = day;
        calendar.endMonth = month;
        calendar.endYear = year;
      } else {
        calendar.endDate = calendar.beginDate;
        calendar.endDay = calendar.beginDay;
        calendar.endMonth = calendar.beginMonth;
        calendar.endYear = calendar.beginYear;
        calendar.beginDate = date;
        calendar.beginDay = day;
        calendar.beginMonth = month;
        calendar.beginYear = year;
      }
      // console.log(calendar)
      if (dayElement.classList.contains("calendar__day_previous-month")) {
        calendar.decreaseHeaderDate();
      } else if (dayElement.classList.contains("calendar__day_next-month")) {
        calendar.increaseHeaderDate();
      }

      calendar.showChoosenDays();
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

    // Отмесаем даты приезда и выезда
    showChoosenDays() {
      const daysList = document.querySelectorAll("[data-calendar-day]");

      for (let i = 0; i < daysList.length; i++) {
        daysList[i].classList.remove("calendar__day_period");
        daysList[i].classList.remove("calendar__day_period_between");
        daysList[i].classList.remove("calendar__day_period_begin");
        daysList[i].classList.remove("calendar__day_period_end");

        const iterationDay = daysList[i].getAttribute("data-calendar-day");
        const iterationMonth = daysList[i].getAttribute("data-month");
        const iterationYear = daysList[i].getAttribute("data-year");

        const dayBeginIsEqual = calendar.beginDay === iterationDay;
        const dayEndIsEqual = calendar.endDay === iterationDay;
        const monthBeginIsEqual = calendar.beginMonth === iterationMonth;
        const monthEndIsEqual = calendar.endMonth === iterationMonth;
        const yearBeginIsEqual = calendar.beginYear === iterationYear;
        const yearEndIsEqual = calendar.endYear === iterationYear;

        if (dayBeginIsEqual && monthBeginIsEqual && yearBeginIsEqual) {
          daysList[i].classList.add("calendar__day_period");

          if (calendar.endDay && calendar.endDate !== calendar.beginDate) {
            daysList[i].classList.add("calendar__day_period_begin");
          }
        }

        if (dayEndIsEqual && monthEndIsEqual && yearEndIsEqual) {
          daysList[i].classList.add("calendar__day_period");

          if (calendar.endDay && calendar.endDate !== calendar.beginDate) {
            daysList[i].classList.add("calendar__day_period_end");
          }
        }

        const iterationDate = new Date(
          iterationYear,
          iterationMonth,
          iterationDay
        ).getTime();

        if (
          iterationDate > calendar.beginDate &&
          iterationDate < calendar.endDate
        ) {
          daysList[i].classList.add("calendar__day_period_between");
        }

        if (calendar.beginDay !== "" || calendar.endDay !== "") {
          clearFieldElement.style.display = "block";
        }
      }
    }

    

    // Отрисовываем календарь
    createDateField(month, year) {
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
          const calendarDay = newDay.createDateElement(
            newDay.year,
            newDay.month,
            i,
            dateFieldElement
          );
          calendarDay.classList.add("calendar__day_another-month");
          calendarDay.classList.add("calendar__day_previous-month");
          calendarDay.addEventListener("click", newDay.handler);
        }
      }

      for (let i = 1; i <= monthInfo.daysCount; i++) {
        const newDay = new Day(year, month, i);
        const calendarDay = newDay.createDateElement(
          year,
          month,
          i,
          dateFieldElement
        );

        calendarDay.addEventListener("click", newDay.handler);
      }

      for (let i = 1; i <= monthInfo.nextMonthViewedDays; i++) {
        const newDay = new Day(year, month + 1, i);
        const calendarDay = newDay.createDateElement(
          newDay.year,
          newDay.month,
          i,
          dateFieldElement
        );
        calendarDay.classList.add("calendar__day_another-month");
        calendarDay.classList.add("calendar__day_next-month");
        calendarDay.addEventListener("click", newDay.handler);
      }

      this.showChoosenDays();

    }

    // Перелисываем календарь на предыдущий месяц
    decreaseHeaderDate() {
      calendar.nowMonthDisplay -= 1;
      if (calendar.nowMonthDisplay < 0) {
        calendar.nowMonthDisplay = 11;
        calendar.nowYearDisplay -= 1;
      }
      headerCalenderElement.innerHTML = `${months[calendar.nowMonthDisplay]} ${calendar.nowYearDisplay}`;
      calendar.createDateField(calendar.nowMonthDisplay, calendar.nowYearDisplay);
    }

    // Перелистываем календарь на следующий месяц
    increaseHeaderDate() {
      calendar.nowMonthDisplay += 1;
      if (calendar.nowMonthDisplay > 11) {
        calendar.nowMonthDisplay = 0;
        calendar.nowYearDisplay += 1;
      }
      headerCalenderElement.innerHTML = `${months[calendar.nowMonthDisplay]} ${calendar.nowYearDisplay}`;
      calendar.createDateField(calendar.nowMonthDisplay, calendar.nowYearDisplay);
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
      const clearFieldElement = document.querySelector(".calendar__action-clear")

      calendar.beginDate = ""
      calendar.endDate = ""
      calendar.beginDay = ""
      calendar.endDay = ""
      calendar.beginMonth = ""
      calendar.endMonth = ""
      calendar.beginYear = ""
      calendar.endYear = ""
      
      clearFieldElement.style.display = "none";
      calendar.showChoosenDays()

      if (dropdownArrivalElement) {
        dropdownArrivalElement.firstElementChild.innerHTML = "ДД.ММ.ГГГГ";
        dropdownDepartureElement.firstElementChild.innerHTML = "ДД.ММ.ГГГГ";
        dropdownArrivalElement.firstElementChild.classList.add("form-focus");
        dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
      }
    }

    // Открываем календарь
    calendarToggle(event) {
      event.preventDefault()
      this.calendarWrapperElement.classList.toggle("hide");
      if (calendar.beginDay && !calendar.endDay) {
        this.dropdownDepartureElement.firstElementChild.classList.add("form-focus");
      } else {
        this.dropdownArrivalElement.firstElementChild.classList.add("form-focus");
      }
      if (this.calendarWrapperElement.classList.contains("hide")) {
        this.dropdownArrivalElement.firstElementChild.classList.remove("form-focus");
        this.dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
      }
      
    }

    // Действие кнопки ПРИМЕНИТЬ
    applyCalendarField() {
      this.dropdownArrivalElement.firstElementChild.classList.remove("form-focus");
      this.dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
      this.calendarWrapperElement.classList.add("hide");

    }
  }



  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];
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
  ];

  const dateNow = new Date();

  // console.log("calendar.js подключен");

  // const teatYear =2019
  // const testMonth = -1
  // const testDay = 20

  // const testDate = new Date(teatYear, testMonth, testDay)
  // console.log(testDate)


  const calendarElement = document.querySelector("[data-calendar]");
  const headerCalenderElement = calendarElement.querySelector(".calendar__header-date");

  const arrowLeftElement = calendarElement.querySelector(".calendar__header-left");
  const arrowRightElement = calendarElement.querySelector(".calendar__header-right");
  const dateFieldElement = calendarElement.querySelector(".calendar__date");
  const clearFieldElement = calendarElement.querySelector(".calendar__action-clear");
  // const applyFieldElement = calendarElement.querySelector(".calendar__action-apply");

  const calendar = new Calendar();

  // const dropdownArrivalElement = document.querySelector("#arrival");
  // const dropdownDepartureElement = document.querySelector("#departure");
  // const calendarWrapperElement = document.querySelector(".calendar-wrapper");

  const nowMonthNum = dateNow.getMonth();
  const nowMonth = months[nowMonthNum];

  calendar.nowMonthDisplay = dateNow.getMonth();
  const nowYear = dateNow.getFullYear();
  calendar.nowYearDisplay = dateNow.getFullYear();
  headerCalenderElement.innerHTML = `${nowMonth} ${nowYear}`;

  clearFieldElement.style.display = "none";

  calendar.createDateField(calendar.nowMonthDisplay, calendar.nowYearDisplay);

  clearFieldElement.addEventListener("click", calendar.clearCalendarField);
  // applyFieldElement.addEventListener("click", calendar.applyCalendarField);
  arrowLeftElement.addEventListener("click", calendar.decreaseHeaderDate);
  arrowRightElement.addEventListener("click", calendar.increaseHeaderDate);
  // dropdownArrivalElement.addEventListener("click", calendarToggle);
  // dropdownDepartureElement.addEventListener("click", calendarToggle);


  // Отображаем дату прибытия и выезда в элементах форм
  function showDatesInForm(day, month, year) {
    let dayDisplay = day.toString();
    let monthDisplay = (month + 1).toString();
    if (dayDisplay.length === 1) {
      dayDisplay = "0" + dayDisplay;
    }
    if (monthDisplay.length === 1) {
      monthDisplay = "0" + monthDisplay;
    }
    return `${dayDisplay}.${monthDisplay}.${year.toString()}`;
  }


  // Действие кнопки ПРИМЕНИТЬ
  function applyCalendarField() {
    // dropdownArrivalElement.firstElementChild.classList.remove("form-focus");
    // dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
    // calendarWrapperElement.classList.add("hide");

  }

  return calendar
}

export default calendar;
