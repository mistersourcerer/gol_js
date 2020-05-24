import './css/main.scss'
import GolJS from './gol'
import Grid from './grid'
import { Render } from '@noctane/core'

let grid
let currentState = {}
let toSpawn = []
let dragging = false
let toggled = { x: null, y: null }

const config = {
  aliveColor: '#4d3e3e'
}

const toggleMenu = () => {
  const menu = document.querySelector('.grid .menu')
  const current = menu.style.visibility
  const hidden = current === 'hidden' || current === ''
  menu.style.visibility = hidden ? 'visible' : 'hidden'
}

const bindControls = () => {
  document.querySelector('.controls .menu').addEventListener('click', toggleMenu)
  document.querySelector('.controls .start').addEventListener('click', start)
  document.querySelector('.controls .pause').addEventListener('click', pause)
  document.querySelector('.controls .stop').addEventListener('click', stop)
}

const toggleCell = (cell) => {
  const index = toSpawn.findIndex(c => c.x === cell.x && c.y === cell.y)
  if (index > -1) {
    // remove from array
    toSpawn = toSpawn.slice(0, index).concat(toSpawn.slice(index + 1))
    renderCell(cell, currentState)
  } else {
    toSpawn.push(cell)
    cell.value = { ...(cell.value || {}), alive: true }
    renderCell(cell, currentState, config.aliveColor)
  }
}

const dragStart = (e) => {
  dragging = true
  toggled = Grid.coordToCell(grid, { x: e.offsetX, y: e.offsetY })
  toggleCell(toggled)
}

const dragMove = (e) => {
  if (!dragging) return
  // when a drag starts
  // we verify if the pointer was over this cell.
  // if not, we store it.
  // when the cell with the pointer over it changes,
  // we know we are over a different cell...
  const cell = Grid.coordToCell(grid, { x: e.offsetX, y: e.offsetY })
  if (cell && (cell.x !== toggled.x || cell.y !== toggled.y)) {
    toggled = cell
    toggleCell(cell)
  }
}

const dragStop = (e) => {
  dragging = false

  const cell = Grid.coordToCell(grid, { x: e.offsetX, y: e.offsetY })
  if (cell.x !== toggled.x || cell.y !== toggled.y) {
    toggleCell(cell)
  }
  toggled = { x: null, y: null }
}

const bindDrag = () => {
  const canvas = document.getElementById('gol')

  canvas.addEventListener('mousedown', dragStart)
  canvas.addEventListener('mousemove', dragMove)
  canvas.addEventListener('mouseup', dragStop)
}

const renderCell = (cell, state, color) => {
  Render.cell(cell, state.canvas, { cellColor: (color || state.renderConfig.cellColor) })
}

const renderGen = (generation) => {
  const genNum = document.querySelector('.extra .gen')
  genNum.innerText = generation
}

const render = (state) => {
  currentState = state
  // first, clear the canvas here first
  Grid.render(grid, state.context, state.config)

  // show the current generation
  renderGen(state.generation)

  toSpawn.forEach((cell) => {
    state.grid = GolJS.spawn(state.grid, cell.x, cell.y)
  })
  toSpawn = []

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

  return GolJS.generate(state, render)
}

const vanillaCanvas = () => {
  const wrapper = document.querySelector('.grid')
  const canvas = document.getElementById('gol')

  const config = {
    width: wrapper.offsetWidth,
    height: wrapper.offsetHeight,
    cellSize: 20,
    borderSize: 1
  }
  grid = Grid.generate(config)

  const renderConfig = {
    borderColor: '#4d3e3e',
    cellColor: '#ffc38b'
  }
  Render.grid(grid, canvas, renderConfig)

  return {
    canvas: canvas,
    renderConfig: renderConfig
  }
}

// --- controls

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
  toSpawn = []
  reset()
}

const switchImpl = (type) => {
  controls.initializer = initializers[type]
  toggleMenu()
  stop()
}

const initialize = () => {
  if (document.readyState !== 'complete') return
  reset()
  bindControls()
  bindDrag()
}

document.onreadystatechange = initialize
window.switchImpl = switchImpl
