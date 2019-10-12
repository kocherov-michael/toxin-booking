// function formatPrice(selector) {
//   const priceElement = document.querySelectorAll(selector)

//   for (let i = 0; i < priceElement.length; i++) {
//     const price = [...priceElement[i].innerHTML].reverse()
//     const newPrice = []
    
//     const priceArrayWithoutSpace = price.filter(letter => letter !== ' ')

//     for( let i = 0; i < priceArrayWithoutSpace.length; i++) {
//       if ((Math.floor(i/3) === i/3) && i !== 0) {
//         newPrice.push(' ')
//         newPrice.push(priceArrayWithoutSpace[i])
//       } else {
//         newPrice.push(priceArrayWithoutSpace[i])
//       }
//     }
//     priceElement[i].innerHTML = `${newPrice.reverse().join('')}`
//   }
// }

function formatPrice(selector) {
  if (typeof(selector) === 'string') {

    const priceElement = document.querySelectorAll(selector)
  
    for (let i = 0; i < priceElement.length; i++) {
      priceElement[i].innerHTML = addSpaces(parseInt(priceElement[i].innerHTML))
    }
  }
  else if (typeof(selector) === 'number') {
    return addSpaces(selector)
  }

  function addSpaces ( number) {
    const price = [...number.toString()].reverse()
    const newPrice = []
    
    const priceArrayWithoutSpace = price.filter(letter => letter !== ' ')

    for( let i = 0; i < priceArrayWithoutSpace.length; i++) {
      if ((Math.floor(i/3) === i/3) && i !== 0) {
        newPrice.push(' ')
        newPrice.push(priceArrayWithoutSpace[i])
      } else {
        newPrice.push(priceArrayWithoutSpace[i])
      }
    }
    return `${newPrice.reverse().join('')}`
  }
}

export default formatPrice
