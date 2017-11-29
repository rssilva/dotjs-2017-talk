var audioContext = GLOBALS.audioContext
var SAMPLE_RATE = 3000
var increment = 1 / SAMPLE_RATE

var play1 = function (duration) {
  var signal = []

  for (var t = 0; t < duration - increment; t += increment) {
    const value = Math.sin(6.2830 * 150 * t)

    signal.push(value)
  }

  playSignal(signal, audioContext, SAMPLE_RATE)
}

var play2 = function (duration) {
  var signal = []

  for (var t = 0; t < duration - increment; t += increment) {
    const value = Math.exp(-10 * t) * 2 * Math.sin(6.2830 * 150 * t)

    signal.push(value)
  }

  playSignal(signal, audioContext, SAMPLE_RATE)
}

var play3 = function (duration) {
  var signal = []

  for (var t = 0; t < duration - increment; t += increment) {
    const value = Math.exp(-30 * t) * 2 * Math.random()

    signal.push(value)
  }

  playSignal(signal, audioContext, SAMPLE_RATE)
}

var bindPlayArrayEvents = function () {
  $('.button-song-1').bind('click', function () {
    play1(0.5)
  })

  $('.button-song-2').bind('click', function () {
    play2(0.5)
  })

  $('.button-song-3').bind('click', function () {
    play3(0.5)
  })

  $(window).bind('keyup', function (ev) {
    if (ev.keyCode == 65) {
      play2(0.2)
    }

    if (ev.keyCode == 66) {
      play3(0.5)
    }
  })
}

bindPlayArrayEvents()
