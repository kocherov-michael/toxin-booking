import slider from './slider'
import diagramm from '../blocks/diagramm/diagramm'

const sliderEmements = document.querySelectorAll('[data-slider]')
for (let i = 0; i < sliderEmements.length; i++) {
  slider(sliderEmements[i])
}

diagramm ('[data-diagramm]')


