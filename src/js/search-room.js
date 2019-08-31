;(function () {
  'use strict'
  const filterButtonElement = document.querySelector('[data-filter-button]')
  const mainButtonElement = document.querySelector('[data-main-button]')
  const filterButtonWrapperElement = document.querySelector('[data-filter-button-wrapper]')
  const filterWrapperElement = document.querySelector('[data-filter-wrapper]')
  const filterTextElement = document.querySelector('[data-filter-text]')
  const filterCloseElement = document.querySelector('[data-filter-close]')
  const filterElement = document.querySelector('[data-filter]')
  const bodyElement = document.querySelector('body')


  if (mainButtonElement) {
    mainButtonElement.addEventListener('click', (event) => {
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

  }

  filterButtonElement.addEventListener('click', (event)=> {
    event.stopImmediatePropagation()
    toggleMenu()

  })

  function toggleMenu () {
    filterWrapperElement.classList.toggle('search-room__filter-wrapper_show')
    filterTextElement.classList.toggle('search-room__filter-text_show')

    if (bodyElement.style.overflow === 'hidden') {
      // меню закрывается
      bodyElement.style.overflow = ''
    } else {
      // меню открывается
      bodyElement.style.overflow = 'hidden'
    }
  }
  



})()