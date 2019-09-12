function slider(element) {

  // const sliderElement = document.querySelector(element)
  const sliderElement = element
  if (sliderElement) {

  
    const sliderContainerElement = sliderElement.querySelector('[data-slider-container]')
    const sliderItems = sliderElement.querySelectorAll('[data-slider-item]')
    const leftArrowElement = sliderElement.querySelector('[data-slider-left-arrow]')
    const rightArrowElement = sliderElement.querySelector('[data-slider-right-arrow]')
    const paginationElement = sliderElement.querySelector('[data-slider-pagination]')
    let activeImg = 0
    let moveLength = 0

    addPagination()

    rightArrowElement.addEventListener('click', () => {
      shiftImg ('next')
    })

    leftArrowElement.addEventListener('click', () => {
      shiftImg ('prev')
    })

    function addPagination () {
      paginationElement.innerHTML = ''
      for (let i = 0; i < sliderItems.length; i++) {
        const paginationItemElement = document.createElement('div')
        paginationItemElement.classList.add('slider-pagination__item')
        if( i === activeImg ) {
          paginationItemElement.classList.add('slider-pagination__item_active')
        }
        paginationElement.append(paginationItemElement)
      }
    }

    function shiftImg ( goTo ) {
      if ( goTo === 'next' ) {
        if ( activeImg < sliderItems.length - 1 ) {
          moveLength -= 100
          activeImg++
        }
      }
      else if ( goTo === 'prev' ) {
        if (activeImg > 0) {
          moveLength += 100
          activeImg--
        }
      }
      move(moveLength)
      showActiveImg(activeImg)
    }

    function showActiveImg (activeImg) {
      const paginationItems = sliderElement.querySelectorAll('.slider-pagination__item')
          for ( let i = 0; i < paginationItems.length; i++) {
            paginationItems[i].classList.remove('slider-pagination__item_active')
            if ( i === activeImg) {
              paginationItems[i].classList.add('slider-pagination__item_active')
            }
          }
    }

    function move (translate) {
      sliderContainerElement.style.transform = `translateX(${translate}%)`
    }
  }
}


export default slider