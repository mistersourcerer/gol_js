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

const oldEnough = (birthDate, now, ttl) => {
  if(birthDate === undefined) {
    return true;
  }
  return (now - birthDate) >= ttl;
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

  if(!oldEnough(birthDate, now, optionValue('ttl', options))) {
    return generation;
  }

  let gol = optionValue('gol', options);
  let newGeneration = {
    grid: gol.nextGen(grid),
    birthDate: now,
  }
  whenNewGeneration(newGeneration);

  return newGeneration;
};

export default {
  nextGen: nextGen,
};
