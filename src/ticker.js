import GolJS from './gol'
import life from './life'
import text from './rendering/text'
import './css/main.scss'

let done = true
let paused = false
const renderOptions = {
  text: {
    alive: '[O]', joinWith: '', cycler: ['`', '\'']
  }
}

// default renderer
let callback = (grid, _) => {
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
  callback(state.grid, state)
  console.log(`gen: ${state.generation} | pop: ${life.population(state.grid)}`)
}

const loop = () => {
  if (done) {
    return
  }

  if (paused) {
    console.log('type golControls.start() to unpause')
    return
  }

  iteration = GolJS.generate(iteration, newGenerationCreated)
  done = iteration.done
  window.requestAnimationFrame(loop)
}

export const start = (_callback) => {
  if (_callback !== undefined) {
    callback = _callback
  }
  if (done) {
    iteration = { ...config }
  }
  done = false
  paused = false
  window.requestAnimationFrame(loop)
  return iteration
}

export const stop = () => {
  done = true
  console.clear()
  return iteration
}

export const pause = () => {
  paused = true
  return iteration
}
