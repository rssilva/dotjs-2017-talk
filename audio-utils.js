var playSignal = function (signal, audioContext, sampleRate) {
  var signalLength = signal.length

  var node = audioContext.createBufferSource()

  var buffer = audioContext.createBuffer(1, signalLength, sampleRate)

  var data = buffer.getChannelData(0)

  // Let's write the values from our signal to the buffer...
  for (var i = 0; i < signalLength; i += 1) {
    data[i] = signal[i]
  }

  // then assign the buffer to the node.buffer prop
  node.buffer = buffer

  // let's connect the buffer to the audioContext.destination, which means the speakers
  //  audioContext is the context that you need to handle all this fancy stuff Web Audio API related :)
  node.connect(audioContext.destination)

  // now we start to play!
  node.start(audioContext.currentTime)
}

var loadSound = (path, audioContext) => {
  var request = new XMLHttpRequest()
  request.open('GET', path, true)
  request.responseType = 'arraybuffer'

  var promise = new Promise((resolve, reject) => {
    request.onload = () => {
      audioContext.decodeAudioData(
        request.response,
        (buffer) => resolve(buffer),
        (error) => console.error(error)
      )
    }

    request.onerror = (error) => reject(error)
  })

  request.send()

  return promise
}

var playBuffer = function (buffer, audioContext) {
  var startTime = audioContext.currentTime

  var source = audioContext.createBufferSource()
  source.buffer = buffer

  source.connect(audioContext.destination)

  source.start(startTime)
  source.stop(startTime + 2)
}
