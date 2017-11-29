;
(function () {
  var audioContext = GLOBALS.audioContext
  var select = document.querySelector('#filter-selector')
  var frequencyRange = document.querySelector('#frequency-range')
  var currentFrequency = document.querySelector('#current-frequency')
  var playButton = $('.play-filter-button')

  var sourceNode = null
  var filter = null

  loadSound('./audio/rebel-rebel.mp3', audioContext)
    .then((buffer) => {
      sourceNode = getSourceNode(audioContext, buffer)
      // play(audioContext, sourceNode)

      sourceNode.start(audioContext.currentTime)
    })

  var getSourceNode = (audioContext, buffer) => {
    var source = audioContext.createBufferSource()

    source.buffer = buffer
    source.looping = true

    return source
  }

  var getFilter = (audioContext, type, frequency) => {
    var filter = audioContext.createBiquadFilter()

    filter.type = type
    filter.frequency.value = frequency

    return filter
  }

  var play = (audioContext, sourceNode) => {
    if (filter) {
      filter.disconnect()
    }

    filter = getFilter(audioContext, select.value, frequencyRange.value)

    sourceNode.connect(filter)
    filter.connect(audioContext.destination)
  }

  var disconnect = (sourceNode) => {
    if (sourceNode) {
      sourceNode.disconnect()
    }

    if (filter) {
      filter.disconnect()
    }
  }

  var bindFilterEvents = function () {
    select.addEventListener('change', () => {
      disconnect(sourceNode)
      play(audioContext, sourceNode)
    })

    frequencyRange.addEventListener('change', () => {
      currentFrequency.value = frequencyRange.value
      disconnect(sourceNode)
      play(audioContext, sourceNode)
    })

    playButton.bind('click', function () {
      play(audioContext, sourceNode)
    })
  }

  bindFilterEvents()
})();
