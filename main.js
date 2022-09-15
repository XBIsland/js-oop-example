// * 引入图标
import './src/icons/iconfont.js'
import './src/scss/fade.scss'
import './src/scss/slider.scss'
// import { Fade } from './src/js/fade'
// import { Slider } from './src/js/slider.js'
import { Carousel } from './src/js/index.js'

const carousel = new Carousel($, {
  mode: 'fade',
  dom: '.j-carousel',
  speed: 3000
})

console.log('carousel', carousel)
