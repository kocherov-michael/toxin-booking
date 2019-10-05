function formatPrice(selector) {
  const priceElement = document.querySelectorAll(selector)

  for (let i = 0; i < priceElement.length; i++) {
    const price = [...priceElement[i].innerHTML].reverse()
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
    priceElement[i].innerHTML = `${newPrice.reverse().join('')}`
  }
}

export default formatPrice
