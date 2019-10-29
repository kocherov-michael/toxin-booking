function checkbox (selector) {
  const checkboxList = document.querySelectorAll(selector)
  for (let i = 0; i < checkboxList.length; i++) {

    const expandCheckboxElement = checkboxList[i]
    const expandHeaderElement = expandCheckboxElement.querySelector(".expandable-checkbox__header")
    const expandListElement = expandCheckboxElement.querySelector(".expandable-checkbox__list")
    let listHeight = parseFloat(getComputedStyle(expandListElement, null).height.replace("px", ""))
  
    expandHeaderElement.addEventListener('click', function handler() {
      if (!listHeight) {
        expandCheckboxElement.classList.add("expandable-checkbox_active")
        listHeight = parseFloat(getComputedStyle(expandListElement, null).height.replace("px", ""))
        expandCheckboxElement.classList.remove("expandable-checkbox_active")
      }
      
      if (expandCheckboxElement.classList.contains("expandable-checkbox_active")) {
        expandListElement.style.height = `${listHeight}px`

        const showList = setInterval(() => {
          let height = parseInt(expandListElement.style.height.replace("px", ""))

          height -= 10
          expandListElement.style.height = `${height}px`

          if (height <= 0) {
            expandCheckboxElement.classList.remove("expandable-checkbox_active")
            clearInterval(showList)
          }
        }, 10)
      } else {
        expandListElement.style.height = "0px"

        const showList = setInterval(() => {
          expandCheckboxElement.classList.add("expandable-checkbox_active")

          let height = parseInt(expandListElement.style.height.replace("px", ""))
          
          height += 10
          expandListElement.style.height = `${height}px`

          if (height > listHeight || height > 300) {
            clearInterval(showList)
          }
        }, 10)
      }
    })
  }
}

export default checkbox