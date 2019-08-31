;(function () {
  'use strict'
  const filterButtonElement = document.querySelector('[data-filter-button]')
  const filterButtonText = filterButtonElement.querySelector('.button-secondary__inner')
  const filterButtonWrapperElement = document.querySelector('[data-filter-button-wrapper]')
  const filterWrapperElement = document.querySelector('[data-filter-wrapper]')
  const filterTextElement = document.querySelector('[data-filter-text]')
  const filterCloseElement = document.querySelector('[data-filter-close]')
  const filterElement = document.querySelector('[data-filter]')
  const bodyElement = document.querySelector('body')

  filterButtonElement.addEventListener('click', (event)=> {
    event.stopImmediatePropagation()
    toggleMenu()

    filterElement.addEventListener('click', (event) => {
      event.stopImmediatePropagation()
    })

    filterButtonWrapperElement.addEventListener('click', (event) => {
      event.stopImmediatePropagation()
    })

    filterTextElement.addEventListener('click', (event) => {
      event.stopImmediatePropagation()
    })

    filterWrapperElement.addEventListener('click', (event) => {
      event.stopImmediatePropagation()
      toggleMenu()
    })

    filterCloseElement.addEventListener('click', (event) => {
      event.stopImmediatePropagation()
      toggleMenu()
    })
  })

  function toggleMenu () {
    filterElement.classList.toggle('search-room__filter_hide')
    filterWrapperElement.classList.toggle('search-room__filter-wrapper_show')
    filterButtonWrapperElement.classList.toggle('search-room__filter-button-wrapper_position')
    filterTextElement.classList.toggle('search-room__filter-text_show')

    if (bodyElement.style.overflow === 'hidden') {
      bodyElement.style.overflow = ''
      filterButtonText.innerHTML = 'Фильтр'
    } else {
      bodyElement.style.overflow = 'hidden'
      filterButtonText.innerHTML = 'Применить'
    }
  }



})()