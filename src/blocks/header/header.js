;(function () {
  'use strict'
  const headerNavBarElement = document.querySelector('[data-menu-bar]')
  const headerNavElement = document.querySelector('[data-header-navigation]')

  if (headerNavBarElement) {

    headerNavBarElement.addEventListener('click', () => {
  
        headerNavElement.classList.toggle('navigation__list_hide')
    })
  }
})()