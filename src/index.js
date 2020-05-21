import GolJS from './gol'
import { Grid, Render } from '@noctane/core'

const toggleMenu = () => {
  const menu = document.querySelector('.grid .menu')
  const current = menu.style.visibility
  const hidden = current === 'hidden' || current === ''
  menu.style.visibility = hidden ? 'visible' : 'hidden'
}

const bindControls = () => {
  if (window.Gol === undefined) return

  document.querySelector('.controls .menu').addEventListener('click', toggleMenu)
  document.querySelector('.controls .start').addEventListener('click', start)
  document.querySelector('.controls .pause').addEventListener('click', pause)
  document.querySelector('.controls .stop').addEventListener('click', stop)
}

let toSpawn = []

const coordToCell = (coord) => {
  const size = (currentState.config.cellSize + currentState.config.borderSize)
  return {
    x: Math.floor(coord.x / size),
    y: Math.floor(coord.y / size)
  }
}

const toggleCell = (cell) => {
  const index = toSpawn.findIndex(c => c.x === cell.x && c.y === cell.y)
  if (index > -1) {
    // remove from array
    toSpawn = toSpawn.slice(0, index).concat(toSpawn.slice(index + 1))
    renderCell(cell.x, cell.y, currentState, currentState.config.backgroundColor)
  } else {
    toSpawn.push(cell)
    renderCell(cell.x, cell.y, currentState)
  }
}

const dragStart = (e) => {
  // translate the coordinates to cell
  // store the cell if not stored yet
  // turn it to alive in the next renderCanvas call
  //
  // (same for move)
  toggleCell(coordToCell({ x: e.offsetX, y: e.offsetY }))
}

const dragMove = (e) => {
}

const dragStop = (e) => {
}

const bindDrag = () => {
  const canvas = document.getElementById('gol')

  canvas.addEventListener('mousedown', dragStart)
  canvas.addEventListener('mousemove', dragMove)
  canvas.addEventListener('mouseup', dragStop)
}

const renderCell = (x, y, state, color) => {
  const cell = state.emptyGrid.cells[y][x]
  Grid.renderCell(cell, state.context, {
    ...state.config,
    backgroundColor: color || state.config.cellColor
  })
}

const renderGen = (generation) => {
  const genNum = document.querySelector('.extra .gen')
  genNum.innerText = generation
}

const renderCanvas = (state) => {
  currentState = state
  // first, clear the canvas here first
  Grid.render(state.emptyGrid.cells, state.context, state.config)

  // show the current generation
  renderGen(state.generation)

  toSpawn.forEach((cell) => {
    state.grid = GolJS.spawn(state.grid, cell.x, cell.y)
  })

  // now paint cells that are alive
  state.grid.forEach((row, y) => {
    row.forEach((alive, x) => {
      if (alive) renderCell(x, y, state)
    })
  })
}

const generate = (state) => {
  if (controls.paused) return
  if (controls.stopped) return { ...reset(), break: true }

  return GolJS.generate(state, renderCanvas)
}

const vanillaCanvas = () => {
  const grid = document.querySelector('.grid')
  const canvas = document.getElementById('gol')

  const config = {
    width: grid.offsetWidth,
    height: grid.offsetHeight,
    cellSize: 20,
    borderSize: 1,
    backgroundColor: '#ffc38b',
    borderColor: '#ffc38b',
    cellColor: '#4d3e3e'
  }
  const emptyGrid = Grid.empty(config)

  canvas.width = emptyGrid.config.width
  canvas.height = emptyGrid.config.height
  grid.style.width = emptyGrid.config.width
  grid.style.height = emptyGrid.config.height

  // ---
  const context = canvas.getContext('2d')
  const state = {
    canvas: canvas,
    emptyGrid: emptyGrid,
    context: context,
    maxGenerations: 80,
    ttl: 100,
    config: config,
    size: {
      width: grid.offsetWidth,
      height: grid.offsetHeight
    },
    gridSize: [
      emptyGrid.cells.length,
      emptyGrid.cells[0].length
    ]
  }
  const newState = GolJS.generate(state)
  // ---

  Grid.render(newState.emptyGrid.cells, context, config)
  renderCanvas(newState)
  console.log(newState)

  return newState
}

const reset = () => {
  currentState = controls.initializer()
  return currentState
}

const initializers = {
  vanillaCanvas: vanillaCanvas
}

const controls = {
  started: false,
  stopped: true,
  paused: false,
  initializer: initializers.vanillaCanvas // default implementation
}

let currentState = {}

const start = () => {
  controls.started = true
  controls.paused = false
  if (controls.stopped) {
    controls.stopped = false
    Render.loop(generate, window.requestAnimationFrame, reset())
  }
}

const pause = () => {
  controls.paused = true
}

const stop = () => {
  controls.stopped = true
}

const switchImpl = (type) => {
  controls.initializer = initializers[type]
  toggleMenu()
  stop()
}

const config = () => {
  if (document.readyState !== 'complete') return
  reset()
  bindControls()
  bindDrag()
}

document.onreadystatechange = config
window.switchImpl = switchImpl
