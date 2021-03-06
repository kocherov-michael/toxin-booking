if (window.location.pathname === "/landing.html") {
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

  console.log("calendar.js подключен");

  const headerCalenderElement = document.querySelector(
    ".calendar__header-date"
  );

  const arrowLeftElement = document.querySelector(".calendar__header-left");
  const arrowRightElement = document.querySelector(".calendar__header-right");
  const dateFieldElement = document.querySelector(".calendar__date");
  const clearFieldElement = document.querySelector(".calendar__action-clear");
  const applyFieldElement = document.querySelector(".calendar__action-apply");

  const calendar = {
    beginDay: "",
    endDay: "",
    beginMonth: "",
    endMonth: "",
    beginYear: "",
    endYear: ""
  };

  const dropdownArrivalElement = document.querySelector("#arrival");
  const dropdownDepartureElement = document.querySelector("#departure");
  const calendarWrapperElement = document.querySelector(".calendar-wrapper");

  const nowMonth = months[dateNow.getMonth()];
  let nowMonthDisplay = dateNow.getMonth();
  const nowYear = dateNow.getFullYear();
  let nowYearDisplay = dateNow.getFullYear();
  headerCalenderElement.innerHTML = `${nowMonth} ${nowYear}`;

  clearFieldElement.style.display = "none";

  createDateField();

  clearFieldElement.addEventListener("click", clearCalendarField);
  applyFieldElement.addEventListener("click", applyCalendarField);
  arrowLeftElement.addEventListener("click", decreaseHeaderDate);
  arrowRightElement.addEventListener("click", increaseHeaderDate);
  dropdownArrivalElement.addEventListener("click", calendarToggle);
  dropdownDepartureElement.addEventListener("click", calendarToggle);

  // Перелисываем календарь на предыдущий месяц
  function decreaseHeaderDate() {
    console.log("left");
    nowMonthDisplay -= 1;
    if (nowMonthDisplay < 0) {
      nowMonthDisplay = 11;
      nowYearDisplay -= 1;
    }
    headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`;
    createDateField();
  }
  // Перелистываем календарь на следующий месяц
  function increaseHeaderDate() {
    nowMonthDisplay += 1;
    if (nowMonthDisplay > 11) {
      nowMonthDisplay = 0;
      nowYearDisplay += 1;
    }
    headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`;
    createDateField();
  }

  // Отрисовываем календарь
  function createDateField() {
    let monthInHeader = nowMonthDisplay;
    let yearInHeader = nowYearDisplay;
    // const dateInHeader = new Date(yearInHeader, monthInHeader)
    const monthInfo = getMonthInfo(monthInHeader, yearInHeader);

    let previosMonthDayBegin;
    if (monthInfo.firstNumberDay == 0) {
      previosMonthDayBegin =
        monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay - 5;
    } else {
      previosMonthDayBegin =
        monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay + 2;
    }

    let dayNumber = 1;
    let nextMonthDayBegin = 1;
    let begin = false;
    let datesAfter = false;
    let datesBefore = true;
    dateFieldElement.innerHTML = "";

    while (dayNumber <= monthInfo.daysCount) {
      const weekLine = document.createElement("div");
      weekLine.classList.add("calendar__date-row");
      dateFieldElement.appendChild(weekLine);
      for (let i = 0; i < 7; i++) {
        const monthDay = document.createElement("div");
        monthDay.classList.add("calendar__day");
        if (i + 1 == monthInfo.firstNumberDay) {
          begin = true;
          datesBefore = false;
        } else if (monthInfo.firstNumberDay == 0 && i == 6) {
          begin = true;
          datesBefore = false;
        }
        if (monthInfo.daysCount == dayNumber - 1) {
          begin = false;
          datesAfter = true;
        }
        if (begin) {
          monthDay.innerText = dayNumber;
          monthDay.setAttribute("data-calendar-day", dayNumber);
          dayNumber += 1;
        }
        if (datesBefore) {
          monthDay.classList.add("pale");
          monthDay.innerText = previosMonthDayBegin;
          previosMonthDayBegin += 1;
        }
        if (datesAfter) {
          monthDay.classList.add("pale");
          monthDay.innerText = nextMonthDayBegin;
          nextMonthDayBegin += 1;
        }
        weekLine.appendChild(monthDay);
      }
    }
    const calendarDay = document.querySelectorAll("[data-calendar-day]");
    displayToday();
    showcalendars();

    for (let i = 0; i < calendarDay.length; i++) {
      calendarDay[i].addEventListener("click", chooseDate);
    }
  }

  // Добавляем стиль к текущей дате на календаре
  function displayToday() {
    const calendarDay = document.querySelectorAll("[data-calendar-day]");
    if (
      nowMonthDisplay === dateNow.getMonth() &&
      nowYearDisplay === dateNow.getFullYear()
    ) {
      for (let i = 0; i < calendarDay.length; i++) {
        if (calendarDay[i].innerText == dateNow.getDate()) {
          calendarDay[i].classList.add("calendar__day--today");
        }
      }
    }
  }

  // Получаем данные о текущей дате
  function getMonthInfo(month, year) {
    const currentMonth = {
      daysCount: getDaysCount(month, year),
      firstNumberDay: new Date(year, month).getDay(),
      previosMonthDaysCount: getDaysCount(month - 1, year)
    };
    return currentMonth;
  }

  // Определяем длинну месяца
  function getDaysCount(month, year) {
    for (i = 28; i <= 31; i++) {
      const monthCurrent = new Date(year, month, i);
      const monthNext = new Date(year, month + 1, 0);
      if (Date.parse(monthCurrent) === Date.parse(monthNext)) {
        return i;
      }
    }
  }

  // Отмечаем даты приезда и выезды
  function chooseDate(event) {
    event.preventDefault();
    event.stopPropagation();

    const notAllowedBeginDate =
      (parseInt(this.innerText) < parseInt(dateNow.getDate()) &&
        nowMonthDisplay <= dateNow.getMonth() &&
        nowYearDisplay <= dateNow.getFullYear()) ||
      (nowMonthDisplay < dateNow.getMonth() &&
        nowYearDisplay <= dateNow.getFullYear());
    const notAllowedEndDate =
      (parseInt(this.innerText) < parseInt(calendar.beginDay) &&
        nowMonthDisplay <= calendar.beginMonth &&
        nowYearDisplay <= calendar.beginYear) ||
      (nowMonthDisplay < calendar.beginMonth &&
        nowYearDisplay <= calendar.beginYear);

    if (notAllowedBeginDate) {
      this.classList.add("calendar__day--error");
      setTimeout(() => {
        this.classList.remove("calendar__day--error");
      }, 300);
    }

    if (calendar.beginDay === "") {
      if (!notAllowedBeginDate) {
        calendar.beginDay = parseInt(this.innerText);
        calendar.beginMonth = nowMonthDisplay;
        calendar.beginYear = nowYearDisplay;
        localStorage.setItem("beginDay", calendar.beginDay);
        localStorage.setItem("beginMonth", calendar.beginMonth);
        localStorage.setItem("beginYear", calendar.beginYear);

        dropdownArrivalElement.firstElementChild.innerHTML = showDatesInForm(
          calendar.beginDay,
          calendar.beginMonth,
          calendar.beginYear
        );

        dropdownArrivalElement.firstElementChild.classList.remove("form-focus");
        dropdownDepartureElement.firstElementChild.classList.add("form-focus");
      }
    } else if (calendar.endDay === "") {
      // console.log(parseInt(this.innerText))
      // console.log(parseInt(calendar.beginDay))
      if (!notAllowedEndDate) {
        calendar.endDay = parseInt(this.innerText);
        calendar.endMonth = nowMonthDisplay;
        calendar.endYear = nowYearDisplay;
        localStorage.setItem("endDay", calendar.endDay);
        localStorage.setItem("endMonth", calendar.endMonth);
        localStorage.setItem("endYear", calendar.endYear);

        dropdownDepartureElement.firstElementChild.innerHTML = showDatesInForm(
          calendar.endDay,
          calendar.endMonth,
          calendar.endYear
        );
      } else {
        this.classList.add("calendar__day--error");
        setTimeout(() => {
          this.classList.remove("calendar__day--error");
        }, 300);
      }
    }
    showcalendars();
    if (calendar.beginDay !== "" || calendar.endDay !== "") {
      clearFieldElement.style.display = "block";
    }

    // console.log(calendar)
  }

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

  // Применяем стили к выбранным датам и промежутку
  function showcalendars() {
    const calendarDay = document.querySelectorAll("[data-calendar-day]");
    let between = false;
    for (let i = 0; i < calendarDay.length; i++) {
      if (
        parseInt(calendarDay[i].innerText) === parseInt(calendar.endDay) &&
        parseInt(calendar.beginDay) !== parseInt(calendar.endDay) &&
        parseInt(calendar.endMonth) === parseInt(nowMonthDisplay) &&
        parseInt(calendar.endYear) === parseInt(nowYearDisplay)
      ) {
        calendarDay[i].classList.add("calendar__day--period");
        calendarDay[i].classList.add("calendar__day--period-end");
        between = false;
      } else if (
        (parseInt(calendar.beginMonth) < parseInt(calendar.endMonth) &&
          parseInt(calendar.beginMonth) < parseInt(nowMonthDisplay) &&
          parseInt(calendarDay[i].innerText) < parseInt(calendar.endDay) &&
          parseInt(nowMonthDisplay) <= parseInt(calendar.endMonth) &&
          parseInt(nowYearDisplay) <= parseInt(calendar.endYear)) ||
        (parseInt(nowMonthDisplay) < parseInt(calendar.endMonth) &&
          parseInt(nowMonthDisplay) > parseInt(calendar.beginMonth) &&
          parseInt(nowYearDisplay) <= parseInt(calendar.endYear)) ||
        (parseInt(calendar.beginYear) < parseInt(nowYearDisplay) &&
          parseInt(nowMonthDisplay) <= parseInt(calendar.endMonth) &&
          parseInt(calendarDay[i].innerText) < parseInt(calendar.endDay) &&
          parseInt(calendar.beginYear) < parseInt(calendar.endYear) &&
          parseInt(nowYearDisplay) === parseInt(calendar.endYear)) ||
        (parseInt(calendar.beginMonth) > parseInt(calendar.endMonth) &&
          parseInt(calendar.beginYear) < parseInt(calendar.endYear) &&
          parseInt(calendar.beginMonth) < parseInt(nowMonthDisplay) &&
          parseInt(nowYearDisplay) === parseInt(calendar.beginYear))
      ) {
        between = true;
      }
      if (
        between === true &&
        parseInt(calendar.beginDay) !== parseInt(calendar.endDay) &&
        parseInt(calendar.endDay) !== ""
      ) {
        calendarDay[i].classList.add("calendar__day--period-between");
      }
      if (
        parseInt(calendarDay[i].innerText) === parseInt(calendar.beginDay) &&
        parseInt(calendar.beginDay) !== parseInt(calendar.endDay) &&
        parseInt(calendar.beginMonth) === parseInt(nowMonthDisplay) &&
        parseInt(calendar.beginYear) === parseInt(nowYearDisplay)
      ) {
        calendarDay[i].classList.add("calendar__day--period");
        if (calendar.endDay !== "") {
          calendarDay[i].classList.add("calendar__day--period-begin");
        }
        if (calendar.endDay != "") {
          between = true;
        }
      }
    }
  }

  // Очищаем календарь
  function clearCalendarField(event) {
    event.preventDefault();
    const calendarDay = document.querySelectorAll("[data-calendar-day]");
    for (let i = 0; i < calendarDay.length; i++) {
      if (calendarDay[i].classList.contains("calendar__day--period")) {
        calendarDay[i].classList.remove("calendar__day--period");
        calendarDay[i].classList.remove("calendar__day--period-begin");
        calendarDay[i].classList.remove("calendar__day--period-end");
      }
      if (calendarDay[i].classList.contains("calendar__day--period-between")) {
        calendarDay[i].classList.remove("calendar__day--period-between");
      }
    }
    calendar.beginDay = "";
    calendar.endDay = "";
    clearFieldElement.style.display = "none";
    if (dropdownArrivalElement) {
      dropdownArrivalElement.firstElementChild.innerHTML = "ДД.ММ.ГГГГ";
      dropdownDepartureElement.firstElementChild.innerHTML = "ДД.ММ.ГГГГ";
      dropdownArrivalElement.firstElementChild.classList.add("form-focus");
      dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
    }
  }

  // Действие кнопки ПРИМЕНИТЬ
  function applyCalendarField() {
    dropdownArrivalElement.firstElementChild.classList.remove("form-focus");
    dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
    calendarWrapperElement.classList.add("hide");
  }

  // Открываем календарь
  function calendarToggle() {
    calendarWrapperElement.classList.toggle("hide");
    if (calendar.beginDay && !calendar.endDay) {
      dropdownDepartureElement.firstElementChild.classList.add("form-focus");
    } else {
      dropdownArrivalElement.firstElementChild.classList.add("form-focus");
    }
    if (calendarWrapperElement.classList.contains("hide")) {
      dropdownArrivalElement.firstElementChild.classList.remove("form-focus");
      dropdownDepartureElement.firstElementChild.classList.remove("form-focus");
    }
  }
}
