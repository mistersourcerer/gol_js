import GolJS from './gol';
import life from './life';
import consoleRender from './rendering/console';

let done = false;
let paused = false;
let renderOptions = {
  text: {
    alive: '[O]', joinWith: '', cycler: ['`', '\''],
  }
}

// default renderer
let render = (grid) => {
  consoleRender.render(grid, renderOptions.text);
}

let config = {
  maxGenerations: 40,
  ttl: 300,
  gridSize: [25, 25],
};

// Initial (standard) configurations
let iteration = config;

let newGenerationCreated = (state) => {
  render(state.grid);
  console.log(`gen: ${state.generation} | pop: ${life.population(state.grid)}`);
  done = state.done;
}

const loop = () => {
  if(done) {
    iteration = config;
    console.log('-the end-');
    return;
  }

  if(paused) {
    console.log('type gol.start() to unpause');
    return;
  }

  iteration = GolJS.generate(iteration, newGenerationCreated);
  requestAnimationFrame(loop);
}

const start = () => {
  done = false;
  paused = false;

  requestAnimationFrame(loop);
};

const stop = () => {
  done = true;
};

const pause = () => {
  paused = true;
};

window.gol = { stop: stop, start: start, pause: pause };
window.requestAnimationFrame(loop);
