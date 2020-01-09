export default function likeButtonCheck (selector) {
  
  const likeButtonElements = document.querySelectorAll(selector)
  
  for (let i = 0; i < likeButtonElements.length; i++ ) {
    likeButtonElements[i].addEventListener('click', () => {
      likeButtonElements[i].classList.toggle('like-button_checked')
    })
  }

}