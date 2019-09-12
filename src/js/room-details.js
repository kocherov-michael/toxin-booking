import slider from './slider'

const sliderEmements = document.querySelectorAll('[data-slider]')
for (let i = 0; i < sliderEmements.length; i++) {
  slider(sliderEmements[i])
}

