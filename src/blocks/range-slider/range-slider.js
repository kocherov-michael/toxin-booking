// console.log('range')
const rangeSliderList = document.querySelectorAll('[data-range-slider]')
// console.log(rangeSliderList.length)
if (rangeSliderList.length > 0) {
  // console.log('ok')
  for(element of rangeSliderList) {
    // console.log(element)
    const sliderFieldElement = element.querySelector('[data-range-slider-field]')
    const leftElement = element.querySelector('[data-range-slider-left-item]')
    const rightElement = element.querySelector('[data-range-slider-right-item]')
    const lineElement = element.querySelector('[data-range-slider-line]')
    // console.log(sliderFieldElement.style)

    const sliderWidth = sliderFieldElement.getBoundingClientRect().width
    const sliderLeftSidePosition = sliderFieldElement.getBoundingClientRect().left
    const sliderRightSidePosition = sliderFieldElement.getBoundingClientRect().right

    // console.log(sliderFieldElement.getBoundingClientRect())
    // console.log('sliderWidth =', sliderWidth)
    console.log('sliderLeftSidePosition =', sliderLeftSidePosition)
    // console.log('sliderRightSidePosition =', sliderRightSidePosition)

    // левая точка
    const leftItemParams = leftElement.getBoundingClientRect()
    // const leftItemAbsolutePosition = leftItemParams.left + leftItemParams.width/2
    // const leftItemAbsolutePosition = leftElement.offsetLeft
    // console.log(leftItemAbsolutePosition)
    console.log(leftItemParams)
    // console.log(leftItemPosition)
    // console.log(leftItemPosition - sliderLeftSidePosition)

    // правая точка
    const rightItemParams = rightElement.getBoundingClientRect()
    const rightItemPosition = rightItemParams.left + rightItemParams.width/2
    // console.log(rightItemParams)
    // console.log(rightItemPosition)

    // линия
    const lineParams = lineElement.getBoundingClientRect()
    // console.log(lineParams)


    // let leftItemPosition = 74
    let leftItemPosition = leftElement.offsetLeft
    leftElement.style.left = `${leftItemPosition}px`

    let move = true

    
    
    function mousedownListener(event) {
      event.stopPropagation()
      // move = true
      console.log('move = true')
      // console.log(event.pageX)
      // console.log(leftElement.style)
      let startPosition = leftItemPosition
      let pushPosition = event.pageX
      // console.log( 'startPosition = ', startPosition)
      // console.log( 'pushPosition = ', pushPosition)
      leftElement.addEventListener('mousemove', {handleEvent: mousemoveListener, startPosition, pushPosition})
    }

    function mousemoveListener (event) {
      event.stopPropagation()
      if( move === true) {

      
        // console.log(this.startPosition)
        // console.log(this.pushPosition)
        // console.log('event.pageX = ', event.pageX)
        let delta = event.pageX - this.pushPosition
        // console.log('delta = ', delta)
        // leftItemPosition = this.startPosition + delta
        leftItemPosition = this.startPosition + delta
        // console.log('leftItemPosition = ', leftItemPosition)
        leftElement.style.left = `${leftItemPosition}px`

        leftElement.addEventListener('mouseup', mouseupListener)
        leftElement.addEventListener('mouseover', mouseoverListener)
        leftElement.removeEventListener('mousemove', mousemoveListener)
        // console.log('this: ', this)
        // console.log('event.type: ', event.type)
        // console.log('arguments.callee: ', arguments.callee)
        // leftElement.removeEventListener(event.type, arguments.callee, event.eventPhase)
      }
    }

    function mouseupListener () {
      // console.log('mouseUP')
      // console.log('move = false')
      // move = false
      leftElement.removeEventListener('mousemove', mousemoveListener)
      leftElement.removeEventListener('mouseup', mouseupListener)
    }

    function mouseoverListener () {
      // console.log('mouseOVER')
      // console.log('move = false')
      // move = false
      leftElement.removeEventListener('mousemove', mousemoveListener)
      leftElement.removeEventListener('mouseup', mouseupListener)
      leftElement.removeEventListener('mouseover', mouseoverListener)
    }

    leftElement.addEventListener('mousedown', mousedownListener)

    // document.addEventListener('click', (event) => {
    //   console.log(event.pageX)
    // })





  }
}