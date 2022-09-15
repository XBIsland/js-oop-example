class Slider {
  constructor($, options) {
    const { dom, speed } = options
    this.$dom = $(dom)
    this.oCarList = this.$dom.find('ul')
    this.oCarItems = this.oCarList.children('li')
    this.carW = this.$dom.width()
    this.oIndicators = this.$dom.find('i')
    this.speed = speed
    this.timer = null
    this.curInx = 0
    this.init()
  }

  init() {
    this.cloneItem()
    this.autoPlay()
    this.bindEvent()
  }

  cloneItem() {
    const firstItem = this.oCarItems.eq(0).clone()
    this.oCarList.append(firstItem)
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
    this._slideAction('next')
  }

  carClick(ev) {
    const e = ev
    const tar = e.target
    const tagName = tar.tagName.toLowerCase()
    console.log(tagName)

    if (tagName === 'button') {
      const { dir } = e.target.dataset
      this._slideAction(dir)
    } else if (tagName === 'i') {
      this.curInx = $(tar).index()
      console.log(this.curInx)
      this._setSlider(this.curInx, null, false)
    }
  }

  _slideAction(dir) {
    let t = null
    switch (dir) {
      case 'next':
        if (this.curInx === this.oCarItems.length) {
          this.curInx = 1
          this._setSlider(this.curInx, dir, true)
          t = setTimeout(() => {
            this._setSlider(this.curInx, dir, false)
            clearTimeout(t)
          }, 0)
        } else {
          this.curInx++
          this._setSlider(this.curInx, dir, false)
        }
        // ?  this.curInx++
        break
      case 'prev':
        if (this.curInx === 0) {
          this.curInx = this.oCarItems.length - 1
          this._setSlider(this.curInx, dir, true)
          t = setTimeout(() => {
            this._setSlider(this.curInx, dir, false)
            clearTimeout(t)
          }, 0)
        } else {
          this.curInx--
          this._setSlider(this.curInx, dir, false)
        }
        break
      default:
        break
    }
  }

  _setSlider(index, dir, isInitail) {
    const x = isInitail
      ? dir === 'next'
        ? 0
        : this.oCarItems.length * -this.carW
      : index * -this.carW
    // console.log()
    this.oCarList.css({
      transform: `translate3d(${x}px,0,0)`,
      transitionDuration: isInitail ? 'initial' : '.5s'
    })

    this._setIndicator(
      index === this.oCarItems.length || index === 0 ? 0 : index
    )
  }

  _setIndicator(index) {
    this.oIndicators
      .eq(index)
      .addClass('active')
      .siblings('i')
      .removeClass('active')
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

  // _setIndex() {
  //   switch (dir) {
  //     case 'next':
  //       this.curInx === this.oCarItems.length - 1
  //         ? (this.curInx = 0)
  //         : this.curInx++
  //       break
  //     case 'prev':
  //       this.curInx === 0
  //         ? (this.curInx = this.oCarItems.length - 1)
  //         : this.curInx--
  //       break
  //     default:
  //       break
  //   }
  // }
}

export { Slider }
