


// const elm = document.querySelector('[data-range-slider-input]');
// const container = elm.parentNode;

// const values = [
//   elm.getAttribute('data-values-min'),
//   elm.getAttribute('data-values-max')
// ]

// const sliderContainer = document.createElement('div')
// sliderContainer.classList.add('range-slider')
// container.insertBefore(sliderContainer, elm)

// //ширина слайдера
// const containerWidth = container.offsetWidth

// //отступ от края
// const margin = ((parseInt(elm.getAttribute('max')) - parseInt(elm.getAttribute('min'))) * (100 * 6)/containerWidth) / 100
// // console.log('margin ' , margin)

// const maxValue = parseInt(elm.getAttribute('max')) + margin
// const minValue = parseInt(elm.getAttribute('min')) - margin

// //линия между точками
// const sliderLine = document.createElement('div')
// sliderLine.classList.add('range-slider__slider-line')
// sliderContainer.append(sliderLine)

// for (let i = 0; i < values.length; i++) {
//   const rangeItem = elm.cloneNode();

//   let rangeItemContainerClassName = "range-slider__item-container-" + i
//   let rangeItemClassName = "range-slider__item-" + i

//   const rangeItemContainer = document.createElement('div')
//   rangeItemContainer.classList.add(rangeItemContainerClassName)
//   if ( i === 0) {
//     // rangeItemContainer.style.width = `${ (values[i+1]/elm.getAttribute('max'))*containerWidth}px`
//     // console.log(values[i+1])
//     // console.log(rangeItemContainer.style.width)
//     rangeItem.style.width =  `${containerWidth}px`
//   }
//   sliderContainer.append(rangeItemContainer)

//   rangeItem.classList.add(rangeItemClassName)
//   rangeItem.type = 'range';
//   rangeItem.removeAttribute('data-values-min');
//   rangeItem.removeAttribute('data-values-max');
//   rangeItem.value = values[i];
//   rangeItemContainer.append(rangeItem)
// }


// elm.remove();

// const rangeMinItem = sliderContainer.querySelector('.range-slider__item-container-0')
// const rangeMinInput = rangeMinItem.querySelector('input')
// const rangeMaxItem = sliderContainer.querySelector('.range-slider__item-container-1')
// const rangeMaxInput = rangeMaxItem.querySelector('input')

// setLinePosition()

// const showRangeValue = function () {
//   if (parseInt(rangeMinInput.value) >= (parseInt(rangeMaxInput.value) - 1) ) {
//     rangeMaxInput.value = String(parseInt(rangeMinInput.value))
//   }
//   // console.log('max =', rangeMaxInput.value)
//   // console.log('min =', rangeMinInput.value)
//   setLinePosition()
// }
// const mouseDownListener = function () {
//   rangeMinItem.addEventListener('mousemove', showRangeValue)
// }
// rangeMinInput.addEventListener('mousedown', mouseDownListener)
// rangeMinInput.addEventListener('mouseup', () => {
//   rangeMinItem.removeEventListener('mousemove', showRangeValue)
// })

// const showRangeValue2 = function () {
//   if (parseInt(rangeMaxInput.value) < parseInt(rangeMinInput.value)) {
//     rangeMinInput.value = String(parseInt(rangeMaxInput.value))
//   }
//   // console.log('max =', rangeMaxInput.value)
//   // console.log('min =', rangeMinInput.value)
//   setLinePosition()
// }
// const mouseDownListener2 = function () {
//   rangeMaxInput.addEventListener('mousemove', showRangeValue2)
// }
// rangeMaxInput.addEventListener('mousedown', mouseDownListener2)
// rangeMaxInput.addEventListener('mouseup', () => {
//   rangeMaxInput.removeEventListener('mousemove', showRangeValue2)
// })

// function setLinePosition(){
//   sliderLine.style.width = `${parseInt(((rangeMaxInput.value/(maxValue - minValue))*containerWidth) - (rangeMinInput.value/(maxValue - minValue))*containerWidth )}px`
//   sliderLine.style.left = `${ parseInt(((rangeMinInput.value - minValue)/(maxValue - minValue))*containerWidth)}px`
//   console.log('left =', parseInt(sliderLine.style.left) )
//   console.log('right =', parseInt(sliderLine.style.width) + parseInt(sliderLine.style.left) )
//   console.log('Ширина:', containerWidth)
// }












































// // console.log('range')
// const rangeSliderList = document.querySelectorAll('[data-range-slider]')
// // console.log(rangeSliderList.length)
// if (rangeSliderList.length > 0) {
//   // console.log('ok')
//   for(element of rangeSliderList) {
//     // console.log(element)
//     const sliderFieldElement = element.querySelector('[data-range-slider-field]')
//     const leftElement = element.querySelector('[data-range-slider-left-item]')
//     const rightElement = element.querySelector('[data-range-slider-right-item]')
//     const lineElement = element.querySelector('[data-range-slider-line]')
//     // console.log(sliderFieldElement.style)

//     const sliderWidth = sliderFieldElement.getBoundingClientRect().width
//     const sliderLeftSidePosition = sliderFieldElement.getBoundingClientRect().left
//     const sliderRightSidePosition = sliderFieldElement.getBoundingClientRect().right

//     // console.log(sliderFieldElement.getBoundingClientRect())
//     // console.log('sliderWidth =', sliderWidth)
//     console.log('sliderLeftSidePosition =', sliderLeftSidePosition)
//     // console.log('sliderRightSidePosition =', sliderRightSidePosition)

//     // левая точка
//     const leftItemParams = leftElement.getBoundingClientRect()
//     // const leftItemAbsolutePosition = leftItemParams.left + leftItemParams.width/2
//     // const leftItemAbsolutePosition = leftElement.offsetLeft
//     // console.log(leftItemAbsolutePosition)
//     console.log(leftItemParams)
//     // console.log(leftItemPosition)
//     // console.log(leftItemPosition - sliderLeftSidePosition)

//     // правая точка
//     const rightItemParams = rightElement.getBoundingClientRect()
//     const rightItemPosition = rightItemParams.left + rightItemParams.width/2
//     // console.log(rightItemParams)
//     // console.log(rightItemPosition)

//     // линия
//     const lineParams = lineElement.getBoundingClientRect()
//     // console.log(lineParams)


//     // let leftItemPosition = 74
//     let leftItemPosition = leftElement.offsetLeft
//     leftElement.style.left = `${leftItemPosition}px`

//     let move = true

    
    
//     function mousedownListener(event) {
//       event.stopPropagation()
//       move = true
//       console.log('move = true')
//       // console.log(event.pageX)
//       // console.log(leftElement.style)
//       let startPosition = leftItemPosition
//       let pushPosition = event.pageX
//       // console.log( 'startPosition = ', startPosition)
//       // console.log( 'pushPosition = ', pushPosition)
//       leftElement.addEventListener('mousemove', {handleEvent: mousemoveListener, startPosition, pushPosition})
//     }

//     function mousemoveListener (event) {
//       event.stopPropagation()
//       if( move === true) {

      
//         // console.log(this.startPosition)
//         // console.log(this.pushPosition)
//         // console.log('event.pageX = ', event.pageX)
//         let delta = event.pageX - this.pushPosition
//         // console.log('delta = ', delta)
//         // leftItemPosition = this.startPosition + delta
//         leftItemPosition = this.startPosition + delta
//         // console.log('leftItemPosition = ', leftItemPosition)
//         leftElement.style.left = `${leftItemPosition}px`

//         leftElement.addEventListener('mouseup', mouseupListener)
//         leftElement.addEventListener('mouseover', mouseoverListener)
//         leftElement.removeEventListener('mousemove', mousemoveListener)
//         // console.log('this: ', this)
//         // console.log('event.type: ', event.type)
//         // console.log('arguments.callee: ', arguments.callee)
//         // leftElement.removeEventListener(event.type, arguments.callee, event.eventPhase)
//       }
//     }

//     function mouseupListener () {
//       console.log('mouseUP')
//       // console.log('move = false')
//       move = false
//       leftElement.removeEventListener('mousemove', mousemoveListener)
//       leftElement.removeEventListener('mouseup', mouseupListener)
//     }

//     function mouseoverListener () {
//       console.log('mouseOVER')
//       // console.log('move = false')
//       move = false
//       leftElement.removeEventListener('mousemove', mousemoveListener)
//       leftElement.removeEventListener('mouseup', mouseupListener)
//       leftElement.removeEventListener('mouseover', mouseoverListener)
//     }

//     leftElement.addEventListener('mousedown', mousedownListener)

//     // document.addEventListener('click', (event) => {
//     //   console.log(event.pageX)
//     // })





//   }
// }

function rangeSlider () {
  console.log('run')
  const rangeSliderList = document.querySelectorAll('[data-range-slider]')
  for( let i = 0; i < rangeSliderList.length; i++) {
    const sliderFieldElement = rangeSliderList[i].querySelector('[data-range-slider-field]')
    const leftElement = rangeSliderList[i].querySelector('[data-range-slider-left-item]')
    const rightElement = rangeSliderList[i].querySelector('[data-range-slider-right-item]')
    const lineElement = rangeSliderList[i].querySelector('[data-range-slider-line]')

    const sliderWidth = sliderFieldElement.getBoundingClientRect().width
    const sliderLeftSidePosition = sliderFieldElement.getBoundingClientRect().left
    const sliderRightSidePosition = sliderFieldElement.getBoundingClientRect().right

    let minRange = parseInt(rangeSliderList[i].getAttribute('data-min-range'))
    let maxRange = parseInt(rangeSliderList[i].getAttribute('data-max-range'))

    // левая точка
    //параметры
    const leftItemParams = leftElement.getBoundingClientRect()
    //абсолютная позиция
    const leftItemPosition = leftItemParams.left + leftItemParams.width/2
    //расстояние до левого края слайдера
    const leftPointToLeft = parseInt(leftElement.getBoundingClientRect().left) - parseInt(sliderFieldElement.getBoundingClientRect().left)

    // правая точка
    const rightItemParams = rightElement.getBoundingClientRect()
    const rightItemPosition = rightItemParams.left + rightItemParams.width/2
    const rightPointToLeft = parseInt(rightElement.getBoundingClientRect().left) - parseInt(sliderFieldElement.getBoundingClientRect().left)

    // линия
    const lineParams = lineElement.getBoundingClientRect()
    lineElement.style.left = `${leftPointToLeft}px`
    lineElement.style.width = `${rightPointToLeft - leftPointToLeft}px`

    // console.log(lineParams)

    const position = {
      mouseX: 0, // точка нажатия мышкой
      leftPointPosition: leftPointToLeft,
      rightPointPosition: rightPointToLeft
    }
    // console.log({position})

    function mousedownListener(event) {
      event.stopPropagation()
      // leftElement.classList.add('onmove')
      // const currentElement = this.element
      // console.log(currentElement)
      document.addEventListener('mousemove', mousemoveListener)
      // document.addEventListener('mousemove', {handleEvent: mousemoveListener, element: currentElement})
      position.mouseX = event.pageX
      position.currentElement = this.element
    }

    function mousemoveListener (event) {
      event.stopPropagation()
      event.preventDefault()
      // if( leftElement.classList.contains('onmove')) {

        //получаем путь, пройденный мышкой
        let delta = event.pageX - position.mouseX

        // console.log('delta = ', delta)
        // console.log('event.pageX = ', event.pageX)
        // console.log('position.mouseX = ', position.mouseX)

        //задаём позицию точки относительно слайдера
        if (position.currentElement === leftElement) {

          let newleftItemPosition = position.leftPointPosition + delta
          if ((newleftItemPosition >= (0 - leftItemParams.width/2)) && (newleftItemPosition < position.rightPointPosition)){
            leftElement.style.left = `${newleftItemPosition}px`
            lineElement.style.left = `${newleftItemPosition}px`
            lineElement.style.width = `${position.rightPointPosition - newleftItemPosition}px`
          }
        }
        else if (position.currentElement === rightElement) {

          let newRightItemPosition = position.rightPointPosition + delta
          if ((newRightItemPosition > position.leftPointPosition -2 ) && (newRightItemPosition < (sliderWidth - rightItemParams.width/2))){
            rightElement.style.left = `${newRightItemPosition}px`
            lineElement.style.width = `${newRightItemPosition - parseInt(lineElement.style.left)}px`
          }
        }


        document.addEventListener('mouseup', mouseupListener)
        // document.addEventListener('mouseup', {handleEvent: mouseupListener, element: this.element})
      // }
    }

    function mouseupListener () {
      // console.log('mouseUP')
      if (position.currentElement === leftElement) {
        position.mouseX = leftElement.getBoundingClientRect().x 
        position.leftPointPosition = parseInt(leftElement.getBoundingClientRect().left) - parseInt(sliderFieldElement.getBoundingClientRect().left)
      }
      else if (position.currentElement === rightElement) {
        position.mouseX = rightElement.getBoundingClientRect().x 
        position.rightPointPosition = parseInt(rightElement.getBoundingClientRect().left) - parseInt(sliderFieldElement.getBoundingClientRect().left)
      }
      // console.log({position})
      document.removeEventListener('mousemove', mousemoveListener)
      // document.removeEventListener('mousemove', {handleEvent: mousemoveListener, element: this.element})
      document.removeEventListener('mouseup', mouseupListener)
    }


    // leftElement.addEventListener('mousedown', mousedownLeftListener)
    // rightElement.addEventListener('mousedown', mousedownRightListener)
    leftElement.addEventListener('mousedown', {handleEvent: mousedownListener, element: leftElement})
    rightElement.addEventListener('mousedown', {handleEvent: mousedownListener, element: rightElement})










  }



}

export default rangeSlider