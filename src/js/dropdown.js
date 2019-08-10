;(function(){
  'use strict'

  const dropdownElement = document.querySelector("[data-dropdown]")
  const dropdownArrowElement = dropdownElement.querySelector(".dropdown__text-arrow")
  const listItemElements = dropdownElement.querySelectorAll(".dropdown-list__item")
  const inputElement = dropdownElement.querySelector("[data-dropdown-input]")
  const clearButtonElement = dropdownElement.querySelector("[data-dropdown-clear]")

  const listArray = {}
  
  dropdownArrowElement.addEventListener("click", () => {
    dropdownElement.classList.toggle("dropdown--active")
  })

  listItemElements.forEach(function(listItem, i, arr){
    const currentListElement = listItem
    const plusElement = currentListElement.querySelector("[data-dropdown-plus]")
    const minusElement = currentListElement.querySelector("[data-dropdown-minus]")
    const textElement = currentListElement.querySelector("[data-dropdown-text]")
    const countElement = currentListElement.querySelector("[data-dropdown-count]")
    let itemCount = parseInt(countElement.innerHTML)
    const elementName = textElement.innerHTML
    

    listArray[elementName] = itemCount
  
    listItem.addEventListener("click", function(event) {

      if (event.target === plusElement) {
        itemCount++
        console.log(itemCount)
        countElement.innerHTML = itemCount
        minusElement.classList.remove("dropdown-list__item-minus_unavailable")
        listArray[elementName] = itemCount
      }

      if (event.target === minusElement && itemCount > 0) {
        itemCount--
        console.log(itemCount)
        countElement.innerHTML = itemCount
        if (itemCount <= 0) {
          minusElement.classList.add("dropdown-list__item-minus_unavailable")
        }
        listArray[elementName] = itemCount
      }

      let string = ""
      for(let key in listArray) {
        if (listArray[key] > 0) {
          if (string !== "") {
            string += `, ${listArray[key]} ${key}`
          } else {
            string += `${listArray[key]} ${key}`
          }
        }
      }

      inputElement.value = string

      if (string !== "") {
        clearButtonElement.classList.remove("hide")
        clearButtonElement.addEventListener("click",(event)=> {
          event.preventDefault()
  
          console.log('clear')
          listItemElements.forEach(function(listItem, i, arr){
            listItem.querySelector("[data-dropdown-count]").innerHTML = 0
            minusElement.classList.add("dropdown-list__item-minus_unavailable")
          })
          inputElement.value = ""
          clearButtonElement.classList.add("hide")
          for(let key in listArray){
            listArray[key] = 0
          }
          
          itemCount = 0
        })
      } else {
        clearButtonElement.classList.add("hide")
      }
    })
    
  })
})()