class Carousel {
  constructor($, options) {
    const { dom, speed, mode } = options
    this.mode = mode
    this.$dom = $(dom)
    this.oCarItems = this.$dom.find('li')
    this.oIndicators = this.$dom.find('i')
    this.speed = speed
    this.timer = null
    this.curInx = 0
  }

  bindEvent() {
    this.$dom.on('mouseover', { event: 'in' }, $.proxy(this._mouseInOut, this))
    this.$dom.on('mouseout', { event: 'out' }, $.proxy(this._mouseInOut, this))
    this.$dom.on('click', $.proxy(this.carClick, this))
  }

  autoPlay() {
    this.timer = setInterval($.proxy(this.run, this), this.speed)
  }

  _mouseInOut(e) {
    const event = e.data.event
    switch (event) {
      case 'in':
        clearInterval(this.timer)
        break
      case 'out':
        this.autoPlay()
        break
      default:
        break
    }
  }
}

export { Carousel }
