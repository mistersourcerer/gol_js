import gol from './gol';

const defaultTTL = 300;
const defaultOptions = {
  ttl: defaultTTL,
  gol: gol,
};

const oldEnough = (birthDate, now, ttl) => {
  if(birthDate === undefined) {
    return true;
  }
  return (now - birthDate) >= ttl;
}

const generate = (gol, grid, attributes, callback) => {
  let newGeneration = Object.assign(attributes, {
    grid: gol.nextGen(grid),
  });
  callback(newGeneration);

  return newGeneration;
}

const noop = () => {};

const nextGen = (iteration, now, options, whenNewGeneration) => {
  let {
    grid,
    birthDate,
    generation,
  } = iteration;

  // options and callback are optional
  if(typeof(whenNewGeneration) === 'undefined') {
    if(typeof(options) === 'function') {
      whenNewGeneration = options;
      options = {};
    } else {
      whenNewGeneration = noop;
    }
  }

  let {
    ttl,
    gol,
  } = Object.assign(defaultOptions, options);

  if(!oldEnough(birthDate, now, ttl)) {
    return iteration;
  }

  return generate(gol, grid, {
    birthDate: now,
    generation: (typeof(generation) === 'undefined') ? 1 : generation + 1,
  }, whenNewGeneration);
};

export default {
  nextGen: nextGen,
};
