import generator from 'generator';

describe('nextGen', () => {
  let gol = {
    nextGen: () => throw('Please mock me.'),
  }
  let now = Date.now();
  const _originalDateNow = Date.now;

  beforeAll(() => {
    Date.now = jest.fn(() => now);
  });

  beforeEach(() => {
    gol.nextGen = jest.fn(grid => [true, false]);
  });

  afterAll(() => {
    Date.now = _originalDateNow;
  });

  test('uses the given GOL to calculate next generation', () => {
    let {grid} = generator.nextGen({grid: [true, true]}, gol);

    expect(gol.nextGen.mock.calls[0][0]).toEqual([true, true]);
    expect(gol.nextGen.mock.calls.length).toBe(1);
    expect(grid).toEqual([true, false]);
  });

  test('timestamps the last generation created', () => {
    let {birthDate} = generator.nextGen({grid: []}, gol);

    expect(birthDate).toEqual(now);
  });

  describe('when current generation is too young', () => {
    let generation = {
      grid: [true, true],
      birthDate: now,
    };

    test('returns current generation if not enough time has passed', () => {
      generator.nextGen(generation, gol);

      // do not called a second time here
      expect(gol.nextGen.mock.calls.length).toBe(0);
    });
  });

  describe('Using options to configure next generation', () => {
    test('accepts time to live as an option(al) parameter', () => {
      Date.now = jest.fn(() => now + 501)
      let generation = {grid: [true, true], brithDate: now}
      let {grid} = generator.nextGen(generation, gol, {ttl: 500})

      expect(gol.nextGen.mock.calls.length).toBe(1);
      expect(grid).toEqual([true, false]);
    });
  });
});
