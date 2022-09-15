// * 引入图标
import './src/icons/iconfont.js'
import './src/scss/index.scss'
import { Carousel } from './src/js/index.js'

const carousel = new Carousel($, {
  mode: 'fade',
  dom: '.j-carousel',
  speed: 3000
})

console.log('carousel', carousel)
