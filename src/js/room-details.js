import slider from './slider'
// import Diagramm from '../blocks/diagramm/diagramm'

const sliderEmements = document.querySelectorAll('[data-slider]')
for (let i = 0; i < sliderEmements.length; i++) {
  slider(sliderEmements[i])
}

// const diagramm = new Diagramm()
// diagramm.render()

const goodElem = document.querySelector('[data-circle-good]')
console.log(goodElem)
goodElem.setAttribute('stroke-width', '2')
const greatTextElement = document.querySelector('[data-diagramm-great]')
const goodTextElement = document.querySelector('[data-diagramm-good]')
const acceptableTextElement = document.querySelector('[data-diagramm-acceptable]')
const disappointedTextElement = document.querySelector('[data-diagramm-disappointed]')

const greatCircleElement = document.querySelector('[data-circle-great]')
const goodCircleElement = document.querySelector('[data-circle-good]')
const acceptableCircleElement = document.querySelector('[data-circle-acceptable]')
const disappointedCircleElement = document.querySelector('[data-circle-disappointed]')

greatTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: greatCircleElement})
goodTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: goodCircleElement})
acceptableTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: acceptableCircleElement})
disappointedTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: disappointedCircleElement})

function showVoices () {
  // console.log(this)
  const parent = this.element.parentNode
  const numberElement = parent.querySelector('[data-chart-number]')
  const circleList = parent.querySelectorAll('[data-active-circle]')
  for (let i = 0; i <circleList.length; i++) {
    circleList[i].setAttribute('stroke-width', '2')
  }
  this.element.setAttribute('stroke-width', '5')
  numberElement.innerHTML = this.element.getAttribute('data-active-circle')
  numberElement.parentNode.style.fill = this.element.getAttribute('data-color')
}
