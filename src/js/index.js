// let now = Date.now()
// let nowDay = now.getDate()
// console.log(nowDay)
// console.log("fired")
const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг","Пятница", "Суббота"];
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь","Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const dateNow = new Date();

// console.log("день недели: " + days[dateNow.getDay()]); //текущий день недели
// console.log("Число: " + dateNow.getDate()); // Число
// console.log("Месяц: " + months[dateNow.getMonth()]); // Месяц
// console.log("Год: " + dateNow.getFullYear()); // Год

// var febr = new Date(2019, 1, 29)
// var mar = new Date(2019, 1, 29)
// console.log(febr)
// console.log(mar)

for (let i=0; i<11; i++) {
	const month31 = new Date(2019, i, 31)
	const month1 = new Date(2019, i+1, 1)
	// console.log(month31)
	// console.log(Date.parse(month31))
	// console.log(month1)
	// console.log(Date.parse(month1))
	// console.log(Date.parse(month31)==Date.parse(month1))

	if (Date.parse(month31)==Date.parse(month1)) {
		// const result = months[i] + ' имеет 30 дней'
		// console.log(result)
	}
}
const headerCalenderElement = document.querySelector(".calendar__header-date")
const arrowLeftElement = document.querySelector(".calendar__header-left")
const arrowRightElement = document.querySelector(".calendar__header-right")
const dateFieldElement = document.querySelector(".calendar__date")
// const calendarDay = document.querySelectorAll("[data-calendar-day]")

// console.log(headerCalenderElement.innerHTML)
const nowMonth = months[dateNow.getMonth()]
let nowMonthDisplay = dateNow.getMonth()
const nowYear = dateNow.getFullYear()
let nowYearDisplay = dateNow.getFullYear()
headerCalenderElement.innerHTML = `${nowMonth} ${nowYear}`



arrowLeftElement.addEventListener('click', decreaseHeaderDate)
arrowRightElement.addEventListener('click', increaseHeaderDate)
function decreaseHeaderDate() {
	nowMonthDisplay -= 1
	if (nowMonthDisplay < 0) {
		nowMonthDisplay = 11
		nowYearDisplay -= 1
	}
	headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`
	// console.log(nowMonthDisplay)
	createDateField()
}
function increaseHeaderDate() {
	nowMonthDisplay += 1
	if (nowMonthDisplay > 11) {
		nowMonthDisplay = 0
		nowYearDisplay += 1
	}
	headerCalenderElement.innerHTML = `${months[nowMonthDisplay]} ${nowYearDisplay}`
	// console.log(nowMonthDisplay)
	createDateField()
}
createDateField()
function createDateField() {
	let monthInHeader = nowMonthDisplay
	let yearInHeader = nowYearDisplay
	const dateInHeader = new Date(yearInHeader, monthInHeader)
	// console.log(monthInHeader)
	// console.log(yearInHeader)
	const monthInfo = getMonthInfo(monthInHeader, yearInHeader)
	// console.log(monthInfo)

	let previosMonthDayBegin
	if (monthInfo.firstNumberDay == 0) {
		previosMonthDayBegin = monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay - 5
	} else {
		previosMonthDayBegin = monthInfo.previosMonthDaysCount - monthInfo.firstNumberDay + 2
	}

	let dayNumber = 1
	let nextMonthDayBegin = 1
	let begin = false
	let datesAfter = false
	let datesBefore = true
	dateFieldElement.innerHTML = ''

	while(dayNumber <= monthInfo.daysCount){
		const weekLine = document.createElement('div')
		weekLine.classList.add('calendar__date-row')
		dateFieldElement.appendChild(weekLine)
		for (let i = 0; i < 7; i++){
			const monthDay = document.createElement('div')
			monthDay.classList.add('calendar__day')
			if (i+1 == monthInfo.firstNumberDay) {
				begin = true
				datesBefore = false
			} else if ((monthInfo.firstNumberDay == 0) && (i == 6)){
				begin = true
				datesBefore = false
			}
			if (monthInfo.daysCount==dayNumber-1) {
				begin = false
				datesAfter = true
			}
			if(begin) {
				monthDay.innerText = dayNumber
				monthDay.setAttribute("data-calendar-day", dayNumber)
				dayNumber += 1
			}
			if (datesBefore) {
				monthDay.classList.add("pale")
				monthDay.innerText = previosMonthDayBegin
				previosMonthDayBegin += 1
			}
			if (datesAfter) {
				monthDay.classList.add("pale")
				monthDay.innerText = nextMonthDayBegin
				nextMonthDayBegin += 1
			}
			weekLine.appendChild(monthDay)
	
		}
	}
	const calendarDay = document.querySelectorAll("[data-calendar-day]")
	
	displayToday()

	for (let i = 0; i < calendarDay.length; i++){
		calendarDay[i].addEventListener('click', chooseDate)
	}
	// calendarDay.forEach (function(element){
	// 	element.addEventListener('click', chooseDate(element))

	// })

}

function displayToday(){
	const calendarDay = document.querySelectorAll("[data-calendar-day]")
	if ((nowMonthDisplay === dateNow.getMonth()) && (nowYearDisplay === dateNow.getFullYear())) {
		for (let i = 0; i < calendarDay.length; i++){
			if (calendarDay[i].innerText == dateNow.getDate()){
				
				calendarDay[i].classList.add("calendar__day--today")
			}
		}
	}
}

function getMonthInfo(month, year) {
	const currentMonth = {
		daysCount: getDaysCount(month, year),
		firstNumberDay: new Date(year, month).getDay(),
		previosMonthDaysCount: getDaysCount(month-1, year)
	}
	return currentMonth
}

function getDaysCount(month, year){

	for (i=28; i<=31; i++) {
		const monthCurrent = new Date(year, month, i)
		const monthNext = new Date(year, month+1, 0)
		if (Date.parse(monthCurrent)===Date.parse(monthNext)) {
			return i
		}
	}
}
const choosenDate = {
	beginDay: '',
	endDay: ''
}
function chooseDate(event){
	event.preventDefault()
	const calendarDay = document.querySelectorAll("[data-calendar-day]")
	
	if (choosenDate.beginDay === '') {
		const beginDay = this
		beginDay.classList.add("calendar__day--period")
		choosenDate.beginDay = this.innerText
	}
	else if (choosenDate.endDay === '') {
		const endDay = this
		endDay.classList.add("calendar__day--period")
		choosenDate.endDay = this.innerText
		
		if (parseInt(choosenDate.beginDay) > parseInt(choosenDate.endDay)) {
			const toggleDate = choosenDate.endDay
			choosenDate.endDay = choosenDate.beginDay
			choosenDate.beginDay = toggleDate
		}
			
		let between = false
		for (let i = 0; i < calendarDay.length; i++) {
			if (calendarDay[i].innerText === choosenDate.endDay) {
				calendarDay[i].classList.add("calendar__day--period-end")
				between = false
			}
			if (between === true) {
				calendarDay[i].classList.add("calendar__day--period-between")
			}
			if (calendarDay[i].innerText === choosenDate.beginDay) {
				calendarDay[i].classList.add("calendar__day--period-begin")
				between = true
			}

		}


	} else {
		for (let i = 0; i < calendarDay.length; i++){
			if (calendarDay[i].classList.contains("calendar__day--period") ) {
				calendarDay[i].classList.remove("calendar__day--period")
				calendarDay[i].classList.remove("calendar__day--period-begin")
				calendarDay[i].classList.remove("calendar__day--period-end")
				calendarDay[i].classList.remove("calendar__day--period-between")
			}
			if (calendarDay[i].classList.contains("calendar__day--period-between") ) {
				
				calendarDay[i].classList.remove("calendar__day--period-between")
			}
		}
		choosenDate.beginDay = ''
		choosenDate.endDay = ''
	}
	
	console.log(choosenDate)
}