import gol from './gol';

const defaultTTL = 300;
const defaultOptions = {
  ttl: defaultTTL,
  gol: gol,
};

const optionValue = (key, options) => {
  if(typeof(options) === 'undefined' || typeof(options[key]) === 'undefined') {
    return defaultOptions[key];
  }
  // TODO: check the existence of key on defaultOptions first
  return options[key];
};

const defaultValues = (keys, options) => {
  return keys.reduce((defaults, key) => {
    defaults[key] = optionValue(key, options);
    return defaults;
  }, {});
}

const oldEnough = (birthDate, now, ttl) => {
  if(birthDate === undefined) {
    return true;
  }
  return (now - birthDate) >= ttl;
}

const generate = (gol, grid, now, callback) => {
  let newGeneration = {
    grid: gol.nextGen(grid),
    birthDate: now,
  }
  callback(newGeneration);

  return newGeneration;
}

const noop = () => {};

const nextGen = (generation, now, options, whenNewGeneration) => {
  let {
    grid,
    birthDate,
  } = generation;

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
  } = defaultValues(['ttl', 'gol'], options);

  if(!oldEnough(birthDate, now, ttl)) {
    return generation;
  }

  return generate(gol, grid, now, whenNewGeneration);
};

export default {
  nextGen: nextGen,
};
