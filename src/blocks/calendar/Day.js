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

export default Day