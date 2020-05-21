import GolJS from './gol'
import life from './life'

let done = true
let paused = false

// default callback (is a "noop" render).
let callback = (grid, state) => {
  console.log(grid)
  console.log(state)
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

export const start = () => {
  callback = window.golRenderConsole // forcing it for now...
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
