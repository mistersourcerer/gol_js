import text from './rendering/text'

require('devtools-detect')
window.addEventListener('devtoolschange', event => {
  var display = event.detail.isOpen ? 'block' : 'none'
  console.log(display)
})

window.golRenderConsole = (grid, _) => {
  text.render(grid, {
    alive: '[O]', joinWith: '', cycler: ['`', '\'']
  })
}
