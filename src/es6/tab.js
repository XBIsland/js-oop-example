export class Tab {
  constructor(mode) {
    this.mode = mode
    this.oPage = $('.J_page')
    this.oTab = $('.J_tab')
    this.oPageWrap = this.oPage.children('.page-wrap')
    this.oPageItems = this.oPageWrap.find('.item')

    this.init()
  }

  init() {
    this.setMode()
    this.bindEvent()
  }
  setMode() {
    this.oPageWrap.addClass(this.mode)
  }
  bindEvent() {
    this.oTab.on('click', '.item', $.proxy(this.tabClick, this))
  }
  tabClick(e) {
    const target = e.target
    const tar = $(target)
    const index = tar.index()
    if (tar.hasClass('item')) {
      tar.addClass('current').siblings('.item').removeClass('current')
      this.#pageChange(index)
    }
  }
  #fadePage(index) {
    this.oPageItems
      .eq(index)
      .addClass('active')
      .siblings('.item')
      .removeClass('active')
  }
  #pageChange(index) {
    switch (this.mode) {
      case 'fade':
        this.#fadePage(index)
        break
      case 'slide':
        this.#slidePage(index)
        break

      default:
        break
    }
  }
  #slidePage(index) {
    this.oPageWrap.animate({
      left: -index * 500 + 'px'
    })
  }
}
