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

const nextGen = (generation, now, options, whenNewGeneration) => {
  let {
    grid,
    birthDate,
  } = generation;

  if(!oldEnough(birthDate, now, optionValue('ttl', options))) {
    return generation;
  }

  let gol = optionValue('gol', options);

  return {
    grid: gol.nextGen(grid),
    birthDate: now,
  }
};

export default {
  nextGen: nextGen,
};
