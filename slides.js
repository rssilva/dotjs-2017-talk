var GLOBALS = GLOBALS || {};
GLOBALS.audioContext = new AudioContext();

(function () {
  var CURRENT_SLIDE = 1

  var getCurrentSlide = function () {
    var search = window.location.search
    var match = search.match(/slide=[0-9]{1,}/g)
    var slide = 1

    if (match) {
      slide = match[0].replace(/slide=/, '')
    }

    return Number(slide)
  }

  var setSlideOnUrl = function (slide) {
    var patt = /slide=[0-9]{1,}/
    var location = window.location.href
    var match = location.match(patt)
    var next = location.replace(patt, 'slide=' + slide)

    if (slide == 1 && !match) {
      next = location + '?slide=' + slide
    }

    window.history.pushState({}, '', next)
  }

  var showSlide = function (slide) {
    var slides = $('.slide').removeClass('show')
    $('.slide').eq(slide - 1).addClass('show')
  }

  var bindEvents = function () {
    window.addEventListener('keyup', function (ev) {
      onKey(ev.keyCode)
    })

    $('.back-button').on('click', function () {
      --CURRENT_SLIDE
      goToSlide()
    })

    $('.forward-button').on('click', function () {
      ++CURRENT_SLIDE
      goToSlide()
    })
  }

  var onKey = function (keyCode) {
    if (keyCode === 37) {
      --CURRENT_SLIDE
      goToSlide()
    }

    if (keyCode === 39) {
      ++CURRENT_SLIDE
      goToSlide()
    }
  }

  var goToSlide = function () {
    var slides = $('.slide')
    var limit = slides.length

    if (CURRENT_SLIDE < 1) {
      CURRENT_SLIDE = 1
    }

    if (CURRENT_SLIDE >= limit) {
      CURRENT_SLIDE = limit
    }

    showSlide(CURRENT_SLIDE)
    setSlideOnUrl(CURRENT_SLIDE)
  }

  var start = function () {
    CURRENT_SLIDE = getCurrentSlide()

    bindEvents()
    setSlideOnUrl(CURRENT_SLIDE)
    showSlide(CURRENT_SLIDE)
  }

  start()
})()
