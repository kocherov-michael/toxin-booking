function formatPrice(selector) {
  const priceElement = document.querySelectorAll(selector)

  for (let i = 0; i < priceElement.length; i++) {
    const price = [...priceElement[i].innerHTML].reverse()
    const newPrice = []

    for( let i = 0; i < price.length; i++) {
      if (price[i] === ' ') {
        price.splice(i, 1)
      }
    }

    for( let i = 0; i < price.length; i++) {
      if ((Math.floor(i/3) === i/3) && i !== 0) {
        newPrice.push(' ')
        newPrice.push(price[i])
      } else {
        newPrice.push(price[i])
      }
    }
    priceElement[i].innerHTML = `${newPrice.reverse().join('')}`
  }
}

export default formatPrice