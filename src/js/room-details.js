slider('[data-slider]')

function slider(element) {

  const sliderElement = document.querySelector(element)
  const sliderContainerElement = sliderElement.querySelector('[data-slider-container]')
  const sliderItems = sliderElement.querySelectorAll('[data-slider-item]')
  const leftArrowElement = sliderElement.querySelector('[data-slider-left-arrow]')
  const rightArrowElement = sliderElement.querySelector('[data-slider-right-arrow]')
  let activeImg = 0
  let moveLength = 0

  rightArrowElement.addEventListener('click', () => {
    if (activeImg < sliderItems.length - 1) {
      moveLength -= 100
      move(moveLength)
      activeImg++
    }
  })

  leftArrowElement.addEventListener('click', () => {
    if (activeImg > 0) {
      moveLength += 100
      move(moveLength)
      activeImg--
    }
  })

  function move (translate) {
    sliderContainerElement.style.transform = `translateX(${translate}%)`
  }
}