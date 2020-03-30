const defaultTTL = 300;
const defaultOptions = {
  ttl: defaultTTL,
};

const optionValue = (key, options) => {
  if(typeof(options) === 'undefined' || typeof(options[key]) === 'undefined') {
    return defaultOptions[key];
  }
  // TODO: check the existence of key on defaultOptions first
  return options[key];
};

const oldEnough = (birthDate, options) => {
  if(birthDate === undefined) {
    return true;
  }
  return (Date.now() - birthDate) >= optionValue('ttl', options);
}

const nextGen = (generation, gol, options) => {
  let {
    grid,
    birthDate,
  } = generation;

  if(!oldEnough(birthDate, options)) {
    return generation;
  }

  return {
    grid: gol.nextGen(grid),
    birthDate: Date.now(),
  }
};

export default {
  nextGen: nextGen,
};
