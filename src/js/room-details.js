import slider from './slider'
import Diagramm from '../blocks/diagramm/diagramm'

const sliderEmements = document.querySelectorAll('[data-slider]')
for (let i = 0; i < sliderEmements.length; i++) {
  slider(sliderEmements[i])
}

const diagramm = new Diagramm()
diagramm.render()
