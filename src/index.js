import life from './life';
import csl from './rendering/console';
import generator from './generator'

let done = false;
let generations = 40;
let ttl = 300;
let gridSize = [25, 25];

const glider = (grid) => {
  grid = life.spawn(grid, 0, 2);
  grid = life.spawn(grid, 1, 3);
  grid = life.spawn(grid, 2, 1);
  grid = life.spawn(grid, 2, 2);
  return life.spawn(grid, 2, 3);
}

let iteration = {grid: glider(life.grid(...gridSize))};

let draw = (newGeneration) => {
  let {grid, birthDate, generation} = newGeneration;

  if(birthDate != iteration['birthDate']) {
    done = generation >= generations;
    iteration = newGeneration;
    csl.render(grid, GolJS.options.render);
    console.log(`gen: ${generation}`);
  }
}

const loop = () => {
  if(done) {
    console.log("that was a good run");
    return;
  }

  generator.nextGen(iteration, Date.now(), {ttl: ttl, life:life}, draw);

  //lastGeneration = gol.generate(lastGeneration, Date.now());

  requestAnimationFrame(loop);
}


const start = (gens = generations, cols = gridSize[0], rows = gridSize[1]) => {
  done = false;
  generations = gens;
  iteration = {grid: glider(life.grid(cols, rows))};
  requestAnimationFrame(loop);
};

const stop = () => {
  done = true;
  console.clear();
}

const GolJS = {
  options: {
    render: { alive: '[O]', joinWith: '', cycler: ['\'', '`'] },
  },
  stop: stop,
  start: start,
}
window.GolJS = GolJS;

window.requestAnimationFrame(loop);
