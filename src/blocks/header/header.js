// открываем/закрываем меню гамбургер
export default function headerMenuToggle () {

  const headerNavBarElementList = document.querySelectorAll('[data-menu-bar]')
  
  for (let i = 0; i < headerNavBarElementList.length; i++) {
    const headerNavElement = document.querySelector('[data-header-navigation]')
    const bodyElement = document.querySelector('body')
  
    headerNavBarElementList[i].addEventListener('click', () => {
  
        headerNavElement.classList.toggle('navigation__list_hide')
        headerNavBarElementList[i].classList.toggle('navigation__menu-bar_position_top-left')

        if (bodyElement.style.overflow === 'hidden') {
          bodyElement.style.overflow = ''
        } else {
          bodyElement.style.overflow = 'hidden'
        }
    })
  }

}