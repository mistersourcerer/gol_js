import generator from 'generator';

describe('nextGen', () => {
  let now = Date.now();
  let gol = {
    nextGen: () => throw('Please mock me.'),
  }

  beforeEach(() => {
    gol.nextGen = jest.fn(grid => [true, false]);
  });

  test('uses the given GOL to calculate next generation', () => {
    let {grid} = generator.nextGen({grid: [true, true]}, now, {gol: gol});

    expect(gol.nextGen.mock.calls[0][0]).toEqual([true, true]);
    expect(gol.nextGen.mock.calls.length).toBe(1);
    expect(grid).toEqual([true, false]);
  });

  test('timestamps the last generation created', () => {
    let {birthDate} = generator.nextGen({grid: []}, now, {gol: gol});

    expect(birthDate).toEqual(now);
  });

  describe('when current generation is too young', () => {
    let generation = {
      grid: [true, true],
      birthDate: now,
    };

    test('returns current generation if not enough time has passed', () => {
      generator.nextGen(generation, now, {gol: gol});

      // do not called a second time here
      expect(gol.nextGen.mock.calls.length).toBe(0);
    });
  });

  describe('Using options to configure next generation', () => {
    test('accepts time to live as an option(al) parameter', () => {
      let generation = {grid: [true, true], birthDate: now};
      let {grid} = generator.nextGen(generation, now + 501, {ttl: 500, gol: gol});

      expect(gol.nextGen.mock.calls.length).toBe(1);
      expect(grid).toEqual([true, false]);
    });
  });
});
