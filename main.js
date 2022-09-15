// * 引入图标
import './src/icons/iconfont.js'
// import './src/scss/index.scss'
import './src/scss/slider.scss'
// import { Carousel } from './src/js/carousel.js'
import { Slider } from './src/js/slider.js'

// const carousel = new Carousel($, {
//   dom: '.j-carousel',
//   speed: 3000
// })
const slider = new Slider($, {
  dom: '.j-carousel',
  speed: 3000
})

console.log('carousel', slider)
