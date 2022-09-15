class Carousel {
  constructor($, options = {}) {
    const { dom, speed } = options
    this.$dom = $(dom)
    this.oCarItems = this.$dom.find('li')
    this.oIndicators = this.$dom.find('i')
    this.speed = speed
    this.timer = null
    this.curInx = 0
    this.init()
  }

  init() {
    this.autoPlay()
    this.bindEvent()
  }

  bindEvent() {
    this.$dom.on('mouseover', { event: 'in' }, $.proxy(this._mouseInOut, this))
    this.$dom.on('mouseout', { event: 'out' }, $.proxy(this._mouseInOut, this))
    this.$dom.on('click', $.proxy(this.carClick, this))
  }

  autoPlay() {
    this.timer = setInterval($.proxy(this.run, this), this.speed)
  }
  run() {
    this._setIndex('next')
    this._pageChange(this.curInx)
  }
  carClick(ev) {
    const e = ev
    const tar = e.target
    const tagName = tar.tagName.toLowerCase()
    console.log(tagName)

    if (tagName === 'button') {
      const { dir } = e.target.dataset
      this._setIndex(dir)
      this._pageChange(this.curInx)
    } else if (tagName === 'i') {
      this.curInx = $(tar).index()
      this._pageChange(this.curInx)
    }
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

  _setIndex(dir) {
    switch (dir) {
      case 'next':
        this.curInx === this.oCarItems.length - 1
          ? (this.curInx = 0)
          : this.curInx++
        break
      case 'prev':
        this.curInx === 0
          ? (this.curInx = this.oCarItems.length - 1)
          : this.curInx--
        break
      default:
        break
    }
  }

  _pageChange(index) {
    this.oCarItems
      .eq(index)
      .addClass('active')
      .siblings('li')
      .removeClass('active')
    this.oIndicators
      .eq(index)
      .addClass('active')
      .siblings('i')
      .removeClass('active')
  }
}

export { Carousel }
