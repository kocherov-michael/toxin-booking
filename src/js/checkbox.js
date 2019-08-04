if (window.location.pathname === '/search-room.html') {
	console.log('checkbox.js подключен')
	const expandCheckboxListElement = document.querySelector("[data-search-room-expand]")

	expandCheckboxListElement.addEventListener('click', () => {
		expandCheckboxListElement.classList.toggle("expandable-checkbox--active")
	})
}