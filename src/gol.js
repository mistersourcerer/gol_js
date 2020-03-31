import life from './life';
import generator from './generator';
import consoleRender from './rendering/console';
import { v4 as uuid } from 'uuid';

const GolJS = () => {};

GolJS.forms = {
  glider: (grid) => {
    grid = life.spawn(grid, 0, 2);
    grid = life.spawn(grid, 1, 3);
    grid = life.spawn(grid, 2, 1);
    grid = life.spawn(grid, 2, 2);
    return life.spawn(grid, 2, 3);
  }
};

const defaultConfig = {
  render: consoleRender,
  generator: generator,
  gridSize: [25, 25],
  clock: Date,
  initialForms: [GolJS.forms.glider],
  generations: 40,
  options: {
    render: {
      alive: '[O]', joinWith: '', cycler: ['`', '\''],
    },
    generator: {
      ttl: 300,
    },
  }
};

const state = (standardConfig) => {
  return (overrides = {}) => {
    let config = Object.assign(standardConfig, overrides);
    config['__id__'] = uuid();

    if(config.generation === undefined) {
      config = {...config, generation:{
        grid: config.initialForms[0](life.grid(...config.gridSize)),
        birthDate: config.clock.now(),
        generation: 1,
      }};
    }

    return config.generation = config.generator.nextGen(
      config.generation,
      config.clock.now()
    );
  }
};

GolJS.gol = (initialConfig = {}) => {
  let standardConfig = Object.assign(defaultConfig, initialConfig);

  return Object.assign(state(standardConfig), standardConfig);
}

export default GolJS;
