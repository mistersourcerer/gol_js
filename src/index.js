import pkg from '../package.json';
import gol from './gol';
import csl from './rendering/console';
import generator from './generator'

let generation = 1;
let generations = 20;
let ttl = 300;
let gridSize = [15, 15];

const _glider = (grid) => {
  grid = gol.spawn(grid, 0, 2);
  grid = gol.spawn(grid, 1, 3);
  grid = gol.spawn(grid, 2, 1);
  grid = gol.spawn(grid, 2, 2);
  return gol.spawn(grid, 2, 3);
}

let grid = _glider(gol.grid(...gridSize));

let currentGeneration = {grid: grid};

let draw = () => {
  let newGeneration = generator.nextGen(currentGeneration, gol, {ttl: ttl});
  let {grid, birthDate} = newGeneration;
  if(birthDate != currentGeneration['birthDate']) {
    currentGeneration = newGeneration;
    generation += 1;
    csl.render(grid);
    console.log(`gen: ${generation}`);
  }
}

const _spawner = (grid) => {
  return _glider(grid);
}

// TODO: a better way to make this available?
window.start = (gens, cols, rows) => {
  generations = gens;
  generation = 1;
  grid = _spawner(gol.grid(cols, rows));
  requestAnimationFrame(loop);
};

window.stop = () => {
  generation = generations;
  console.clear();
}

requestAnimationFrame(loop);
function loop() {
  if(generation >= generations) {
    console.log("that was a good run");
    return;
  }
  draw();
  requestAnimationFrame(loop);
}
