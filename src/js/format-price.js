function formatPrice(selector) {
  if (typeof(selector) === 'string') {

    const priceElement = document.querySelectorAll(selector)
    for (let i = 0; i < priceElement.length; i++) {
      // удаляем пробелы, если есть
      const price = parseInt([...priceElement[i].innerHTML].filter(letter => letter !== ' ').join(''))
      // Добавляем пробелы куда нужно
      priceElement[i].innerHTML = addSpaces(price)
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
