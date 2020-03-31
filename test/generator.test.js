import generator from 'generator';

describe('nextGen', () => {
  let now = Date.now();
  let life = {
    nextGen: () => throw('Please mock me.'),
  }

  beforeEach(() => {
    life.nextGen = jest.fn(grid => [true, false]);
  });

  test('uses the given GOL to calculate next generation', () => {
    let {grid} = generator.nextGen({grid: [true, true]}, now, {life: life});

    expect(life.nextGen.mock.calls[0][0]).toEqual([true, true]);
    expect(life.nextGen.mock.calls.length).toBe(1);
    expect(grid).toEqual([true, false]);
  });

  test('timestamps the last generation created', () => {
    let {birthDate} = generator.nextGen({grid: []}, now, {life: life});

    expect(birthDate).toEqual(now);
  });

  describe('when current generation is too young', () => {
    let generation = {
      grid: [true, true],
      birthDate: now,
    };

    test('returns current generation if not enough time has passed', () => {
      generator.nextGen(generation, now, {life: life});

      // do not called a second time here
      expect(life.nextGen.mock.calls.length).toBe(0);
    });
  });

  describe('Using options to configure next generation', () => {
    test('accepts time to live as an option(al) parameter', () => {
      let generation = {grid: [true, true], birthDate: now};
      let {grid} = generator.nextGen(generation, now + 501, {ttl: 500, life: life});

      expect(life.nextGen.mock.calls.length).toBe(1);
      expect(grid).toEqual([true, false]);
    });
  });

  describe('callback for new generations', () => {
    test('invokes when new generation is created', () => {
      let whenNewGen = jest.fn();
      let generation = {grid: [[true], [true]]};
      generator.nextGen(generation, now, whenNewGen);

      expect(whenNewGen.mock.calls.length).toBe(1);
    });

    test('does not invoke if current gen is too young', () => {
      let whenNewGen = jest.fn();
      let generation = {grid: [[true], [true]], birthDate: now};
      generator.nextGen(generation, now + 1, {ttl: 500}, whenNewGen);

      expect(whenNewGen.mock.calls.length).toBe(0);
    });
  });

  test('keep track of generation count', () => {
    let iteration = generator.nextGen({grid: [[true], [true]]}, now);
    expect(iteration.generation).toBe(1);

    iteration = generator.nextGen(iteration, now + 301, {ttl: 300});
    expect(iteration.generation).toBe(2);
  })
});
