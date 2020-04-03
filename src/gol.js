import life from './life'

const GolJS = () => {}

GolJS.forms = {
  glider: (grid) => {
    grid = life.spawn(grid, 0, 2)
    grid = life.spawn(grid, 1, 3)
    grid = life.spawn(grid, 2, 1)
    grid = life.spawn(grid, 2, 2)
    return life.spawn(grid, 2, 3)
  }
}

const defaultConfig = {
  gridSize: [25, 25],
  clock: Date,
  initialForms: [GolJS.forms.glider],
  maxGenerations: 40,
  ttl: 300,
  done: false,
  options: {
    render: {
      alive: '[O]', joinWith: '', cycler: ['`', '\'']
    }
  }
}

const createFirstGen = (state) => {
  return {
    ...state,
    // can we have more than one initial form?
    grid: state.initialForms[0](life.grid(...state.gridSize)),
    birthDate: state.clock.now(),
    generation: 1,
    ttl: state.ttl
  }
}

GolJS.generate = (config = {}, callback = () => {}) => {
  const state = { ...defaultConfig, ...config }

  const brandNew = config.grid === undefined ||
    (config.generation === undefined || config.generation <= 0)
  if (brandNew) {
    const newState = createFirstGen(state)
    callback(newState)
    return newState
  }

  const now = state.clock.now()
  const done = (state.generation >= state.maxGenerations)
  if (done || (now < state.birthDate + state.ttl)) {
    return { ...state, done: done }
  }

  const newState = {
    ...state,
    grid: life.nextGen(state.grid),
    birthDate: now,
    generation: state.generation + 1
  }
  callback(newState)

  return newState
}

export default GolJS
