import GolJS from './gol'
import life from './life'
import text from './rendering/text'
import './css/main.scss'

require('devtools-detect')

let done = true
let paused = false
const renderOptions = {
  text: {
    alive: '[O]', joinWith: '', cycler: ['`', '\'']
  }
}

// default renderer
const render = (grid) => {
  text.render(grid, renderOptions.text)
}

const config = {
  maxGenerations: 40,
  ttl: 300,
  gridSize: [25, 25]
}

// Initial (standard) configurations
let iteration = { ...config }

const newGenerationCreated = (state) => {
  render(state.grid)
  console.log(`gen: ${state.generation} | pop: ${life.population(state.grid)}`)
}

const loop = () => {
  if (done) {
    return
  }

  if (paused) {
    console.log('type gol.start() to unpause')
    return
  }

  iteration = GolJS.generate(iteration, newGenerationCreated)
  done = iteration.done
  window.requestAnimationFrame(loop)
}

const start = () => {
  if (done) {
    iteration = { ...config }
  }
  done = false
  paused = false
  window.requestAnimationFrame(loop)
  return iteration
}

const stop = () => {
  done = true
  console.clear()
  return iteration
}

const pause = () => {
  paused = true
  return iteration
}

window.gol = { stop: stop, start: start, pause: pause }
window.requestAnimationFrame(loop)

window.addEventListener('devtoolschange', event => {
  var display = event.detail.isOpen ? 'block' : 'none'
  document.getElementById('controls').style.display = display
})
