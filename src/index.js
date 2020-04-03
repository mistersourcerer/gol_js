import GolJS from './gol';
import life from './life';
import consoleRender from './rendering/console';

let done = false;
let generations = 40;
let ttl = 300;
let gridSize = [25, 25];
let iteration = {};
let renderOptions = {
  alive: '[O]', joinWith: '', cycler: ['`', '\''],
}

let newGenerationCreated = (state) => {
  consoleRender.render(state.grid, renderOptions);
  console.log(`gen: ${state.generation} | pop: ${life.population(state.grid)}`);
  done = state.done;
}

const loop = () => {
  if(done) {
    console.log("that was a good run");
    return;
  }
  iteration = GolJS.generate(iteration, newGenerationCreated);
  requestAnimationFrame(loop);
}

const start = (gens = generations, cols = gridSize[0], rows = gridSize[1]) => {
  done = false;
  generations = gens;
  requestAnimationFrame(loop);
};

const stop = () => {
  done = true;
  console.clear();
}

window.gol = { stop: stop, start: start };
window.requestAnimationFrame(loop);
