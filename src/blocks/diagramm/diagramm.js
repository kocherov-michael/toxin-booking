function diagramm(selector) {

  const diagrammElemList = document.querySelectorAll(selector)
  for (let i = 0; i < diagrammElemList.length; i++) {

    const diagrammElem = diagrammElemList[i]
    const greatTextElement = document.querySelector('[data-diagramm-great]')
    const goodTextElement = document.querySelector('[data-diagramm-good]')
    const acceptableTextElement = document.querySelector('[data-diagramm-acceptable]')
    const disappointedTextElement = document.querySelector('[data-diagramm-disappointed]')

    const greatCircleElement = diagrammElem.querySelector('[data-circle-great]')
    const goodCircleElement = diagrammElem.querySelector('[data-circle-good]')
    const acceptableCircleElement = diagrammElem.querySelector('[data-circle-acceptable]')
    const disappointedCircleElement = diagrammElem.querySelector('[data-circle-disappointed]')

    const segmentElementList = diagrammElem.querySelectorAll('[data-active-circle]')
    let summ = 0
    const sumArr = {
      summ: 0,
      count: 0
    }
    for (let i = 0; i <segmentElementList.length; i++) {
      const value = parseInt(segmentElementList[i].getAttribute('data-active-circle'))
      sumArr.summ += value
      if ( value > 0) {
        sumArr.count ++
      }
    }
    let offset = 25
    for (let i = 0; i <segmentElementList.length; i++) {
      const voices = parseInt(segmentElementList[i].getAttribute('data-active-circle'))
      const segmentWidth = (voices / (sumArr.summ)) * (100 - sumArr.count / 2)
      segmentElementList[i].setAttribute('stroke-dashoffset', offset)
      offset = offset - segmentWidth -0.5
      segmentElementList[i].setAttribute('stroke-dasharray', `${segmentWidth} ${100 - segmentWidth}`)
    }

    greatTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: greatCircleElement})
    goodTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: goodCircleElement})
    acceptableTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: acceptableCircleElement})
    disappointedTextElement.addEventListener('mouseover', {handleEvent: showVoices, element: disappointedCircleElement})
  }


  function showVoices () {
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
}

export default diagramm