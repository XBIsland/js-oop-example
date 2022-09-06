function Tab(mode) {
  this.mode = mode === 'fade' || mode === 'slide' ? mode : 'fade'
  this.oPage = $('.J_page')
  this.oTab = $('.J_tab')
  this.oPageWrap = this.oPage.children('.page-wrap')
  this.oPageItems = this.oPageWrap.find('.item')

  this.init()
}

Tab.prototype.init = function () {
  this.setMode()
  this.bindEvent()
}

Tab.prototype.setMode = function () {
  this.oPageWrap.addClass(this.mode)
}

Tab.prototype.bindEvent = function () {
  this.oTab.on('click', '.item', $.proxy(this.tabClick, this))
}

Tab.prototype.tabClick = function (e) {
  const target = e.target
  const tar = $(target)
  const index = tar.index()
  if (tar.hasClass('item')) {
    tar.addClass('current').siblings('.item').removeClass('current')
    this._pageChange(index)
  }
}

Tab.prototype._pageChange = function (index) {
  switch (this.mode) {
    case 'fade':
      this._fadePage(index)
      break
    case 'slide':
      this._slidePage(index)
      break

    default:
      break
  }
}

Tab.prototype._fadePage = function (index) {
  this.oPageItems
    .eq(index)
    .addClass('active')
    .siblings('.item')
    .removeClass('active')
}
Tab.prototype._slidePage = function (index) {
  this.oPageWrap.animate({
    left: -index * 500 + 'px'
  })
}

new Tab('slide')
