// const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг","Пятница", "Суббота"];
// const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
// const dateNow = new Date();

// // console.log("день недели: " + days[dateNow.getDay()]); //текущий день недели
// // console.log("Число: " + dateNow.getDate()); // Число
// // console.log("Месяц: " + months[dateNow.getMonth()]); // Месяц
// // console.log("Год: " + dateNow.getFullYear()); // Год
// console.log("fired")

// const headerCalenderElement = document.querySelector(".calendar__header-date")

// const arrowLeftElement = document.querySelector(".calendar__header-left")
// const arrowRightElement = document.querySelector(".calendar__header-right")
// const dateFieldElement = document.querySelector(".calendar__date")
// const clearFieldElement = document.querySelector(".calendar__action-clear")

// const calendar = {
// 	beginDay: '',
// 	endDay: '',
// 	beginMonth: '',
// 	endMonth: '',
// 	beginYear: '',
// 	endYear: ''
// }
// // const calendarDay = document.querySelectorAll("[data-calendar-day]")

// // console.log(headerCalenderElement.innerHTML)
// const nowMonth = months[dateNow.getMonth()]
// let nowMonthDisplay = dateNow.getMonth()
// const nowYear = dateNow.getFullYear()
// let nowYearDisplay = dateNow.getFullYear()
// headerCalenderElement.innerHTML = `${nowMonth} ${nowYear}`

// clearFieldElement.style.display = "none"

// clearFieldElement.addEventListener('click', clearCalendarField)
// arrowLeftElement.addEventListener('click', decreaseHeaderDate)
// arrowRightElement.addEventListener('click', increaseHeaderDate)
// function decreaseHeaderDate() {
// 	nowMonthDisplay -= 1
// 	if (nowMonthDisplay < 0) {
// 		nowMonthDisplay = 11
// 		nowYearDisplay -= 1
// 	}
// 	headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`
// 	// console.log(nowMonthDisplay)
// 	createDateField()
// }
// function increaseHeaderDate() {
// 	nowMonthDisplay += 1
// 	if (nowMonthDisplay > 11) {
// 		nowMonthDisplay = 0
// 		nowYearDisplay += 1
// 	}
// 	headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`
// 	// console.log(nowMonthDisplay)
// 	createDateField()
// }
// createDateField()

// // const currentGlobalDate = {
// // 	currentMonth: '',
// // 	currentYear: ''
// // }
// function createDateField() {
// 	let monthInHeader = nowMonthDisplay
// 	let yearInHeader = nowYearDisplay
// 	const dateInHeader = new Date(yearInHeader, monthInHeader)
// 	// console.log(monthInHeader)
// 	// console.log(yearInHeader)
// 	const monthInfo = getMonthInfo(monthInHeader, yearInHeader)
// 	// console.log(monthInfo)

// 	let previosMonthDayBegin
// 	if (monthInfo.firstNumberDay == 0) {
// 		previosMonthDayBegin = monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay - 5
// 	} else {
// 		previosMonthDayBegin = monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay + 2
// 	}

// 	let dayNumber = 1
// 	let nextMonthDayBegin = 1
// 	let begin = false
// 	let datesAfter = false
// 	let datesBefore = true
// 	dateFieldElement.innerHTML = ''

// 	while(dayNumber <= monthInfo.daysCount){
// 		const weekLine = document.createElement('div')
// 		weekLine.classList.add('calendar__date-row')
// 		dateFieldElement.appendChild(weekLine)
// 		for (let i = 0; i < 7; i++){
// 			const monthDay = document.createElement('div')
// 			monthDay.classList.add('calendar__day')
// 			if (i+1 == monthInfo.firstNumberDay) {
// 				begin = true
// 				datesBefore = false
// 			} else if ((monthInfo.firstNumberDay == 0) && (i == 6)){
// 				begin = true
// 				datesBefore = false
// 			}
// 			if (monthInfo.daysCount==dayNumber-1) {
// 				begin = false
// 				datesAfter = true
// 			}
// 			if(begin) {
// 				monthDay.innerText = dayNumber
// 				monthDay.setAttribute("data-calendar-day", dayNumber)
// 				dayNumber += 1
// 			}
// 			if (datesBefore) {
// 				monthDay.classList.add("pale")
// 				monthDay.innerText = previosMonthDayBegin
// 				previosMonthDayBegin += 1
// 			}
// 			if (datesAfter) {
// 				monthDay.classList.add("pale")
// 				monthDay.innerText = nextMonthDayBegin
// 				nextMonthDayBegin += 1
// 			}
// 			weekLine.appendChild(monthDay)

// 		}
// 	}
// 	const calendarDay = document.querySelectorAll("[data-calendar-day]")
// 	displayToday()
// 	showcalendars()

// 	for (let i = 0; i < calendarDay.length; i++){
// 		calendarDay[i].addEventListener('click', chooseDate)
// 	}
// 	// calendarDay.forEach (function(element){
// 	// 	element.addEventListener('click', chooseDate(element))

// 	// })

// }

// function displayToday(){
// 	const calendarDay = document.querySelectorAll("[data-calendar-day]")
// 	if ((nowMonthDisplay === dateNow.getMonth()) && (nowYearDisplay === dateNow.getFullYear())) {
// 		for (let i = 0; i < calendarDay.length; i++){
// 			if (calendarDay[i].innerText == dateNow.getDate()){

// 				calendarDay[i].classList.add("calendar__day--today")
// 			}
// 		}
// 	}
// }

// function getMonthInfo(month, year) {
// 	const currentMonth = {
// 		daysCount: getDaysCount(month, year),
// 		firstNumberDay: new Date(year, month).getDay(),
// 		previosMonthDaysCount: getDaysCount(month-1, year)
// 	}
// 	return currentMonth
// }

// function getDaysCount(month, year){

// 	for (i=28; i<=31; i++) {
// 		const monthCurrent = new Date(year, month, i)
// 		const monthNext = new Date(year, month+1, 0)
// 		if (Date.parse(monthCurrent)===Date.parse(monthNext)) {
// 			return i
// 		}
// 	}
// }

// function chooseDate(event){
// 	event.preventDefault()
// 	event.stopPropagation()
// 	// const calendarDay = document.querySelectorAll("[data-calendar-day]")
// 	// const currentMonth = getMonthInfo(month, year)

// 	const notAllowedDate = (
// 		parseInt(this.innerText) < parseInt(dateNow.getDate())
// 		&& (nowMonthDisplay <= dateNow.getMonth())
// 		|| (nowMonthDisplay < dateNow.getMonth()) )

// 	if (calendar.beginDay === '') {

// 		if (!notAllowedDate) {
// 			calendar.beginDay = this.innerText
// 			calendar.beginMonth = nowMonthDisplay
// 			calendar.beginYear = nowYearDisplay
// 		}
// 	}
// 	else if (calendar.endDay === '') {

// 		if (!notAllowedDate) {
// 			calendar.endDay = this.innerText
// 			calendar.endMonth = nowMonthDisplay
// 			calendar.endYear = nowYearDisplay
// 		}

// 		if ((parseInt(calendar.beginDay) > parseInt(calendar.endDay)) && (calendar.beginMonth === calendar.endMonth)) {
// 			const toggleDate = calendar.endDay
// 			calendar.endDay = calendar.beginDay
// 			calendar.beginDay = toggleDate

// 		}

// 	}
// 	showcalendars()
// 	if ((calendar.beginDay !== '') || (calendar.endDay !== '')) {
// 		clearFieldElement.style.display = "block"
// 	}

// 	console.log(calendar)
// }
// function showcalendars(){
// 	const calendarDay = document.querySelectorAll("[data-calendar-day]")
// 	let between = false
// 		for (let i = 0; i < calendarDay.length; i++) {

// 			if ((parseInt(calendarDay[i].innerText) === parseInt(calendar.endDay))
// 				&& (parseInt(calendar.beginDay) != parseInt(calendar.endDay))
// 				&& (calendar.endMonth === nowMonthDisplay)
// 				&& (calendar.endYear === nowYearDisplay)
// 				) {
// 				calendarDay[i].classList.add("calendar__day--period")
// 				calendarDay[i].classList.add("calendar__day--period-end")
// 				between = false
// 			}
// 			if ((between === true) && (calendar.beginDay != calendar.endDay) && (calendar.endDay !== '') ) {
// 				calendarDay[i].classList.add("calendar__day--period-between")
// 			}
// 			if ((calendarDay[i].innerText === calendar.beginDay)
// 				&& (calendar.beginDay != calendar.endDay)
// 				&& (calendar.beginMonth === nowMonthDisplay)
// 				&& (calendar.beginYear === nowYearDisplay)
// 				) {
// 				calendarDay[i].classList.add("calendar__day--period")
// 				if(calendar.endDay !== ''){
// 					calendarDay[i].classList.add("calendar__day--period-begin")
// 				}
// 				between = true
// 			}

// 		}

// }
// function clearCalendarField(event){
// 	event.preventDefault()
// 	const calendarDay = document.querySelectorAll("[data-calendar-day]")
// 	for (let i = 0; i < calendarDay.length; i++){
// 		if (calendarDay[i].classList.contains("calendar__day--period") ) {
// 			calendarDay[i].classList.remove("calendar__day--period")
// 			calendarDay[i].classList.remove("calendar__day--period-begin")
// 			calendarDay[i].classList.remove("calendar__day--period-end")
// 		}
// 		if (calendarDay[i].classList.contains("calendar__day--period-between") ) {

// 			calendarDay[i].classList.remove("calendar__day--period-between")
// 		}
// 	}
// 	calendar.beginDay = ''
// 	calendar.endDay = ''
// 	clearFieldElement.style.display = "none"
// }
