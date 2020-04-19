require('devtools-detect')

window.addEventListener('devtoolschange', event => {
  var display = event.detail.isOpen ? 'block' : 'none'
  document.querySelector('#gol-console .controls').style.display = display
})
