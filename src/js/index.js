import { Fade } from './fade.js'
import { Slider } from './slider.js'
class Carousel {
  constructor($, options) {
    const { mode } = options
    if (mode === 'fade') {
      return new Fade($, options)
    } else if (mode === 'slider') {
      return new Slider($, options)
    }
  }
}

export { Carousel }
