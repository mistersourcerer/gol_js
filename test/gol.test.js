import GolJS from 'gol';
import life from 'life'

describe('GolJS', () => {
  describe('generate', () => {
    test('creates a 25x25 grid by default', () => {
      let {gridSize} = GolJS.generate();

      expect(gridSize).toEqual([25, 25]);
    });

    test('intializes with a glider by default', () => {
      let {initialForms} = GolJS.generate();

      expect(initialForms.length).toBe(1);
      expect(initialForms[0]).toEqual(GolJS.forms.glider);
    });
  });

  describe('Iterating through generations', () => {
    describe('Creating a new generation (no pre-existent gen)', () => {
      test('returns a new generation', () => {
        let nextGeneration = GolJS.generate();

        expect(nextGeneration.grid.length).toEqual(25);
        expect(nextGeneration.grid[0].length).toEqual(25);
        expect(nextGeneration.birthDate).not.toBe(undefined);
        expect(nextGeneration.generation).toBe(1);
        expect(nextGeneration.ttl).toBe(300);
        expect(nextGeneration.maxGenerations).toBe(40);
      });

      test('returns a new generation if grid is missing (even with generation set)', () => {
        let nextGeneration = GolJS.generate({generation: 1});

        expect(nextGeneration.grid.length).toEqual(25);
        expect(nextGeneration.grid[0].length).toEqual(25);
        expect(nextGeneration.birthDate).not.toBe(undefined);
        expect(nextGeneration.generation).toBe(1);
        expect(nextGeneration.ttl).toBe(300);
        expect(nextGeneration.maxGenerations).toBe(40);
      });

      test('accepts override options', () => {
        let clock = {now: jest.fn(() => 123)};
        let nextGeneration = GolJS.generate({
          gridSize: [2, 2],
          clock: clock,
          initialForms: [grid => grid],
        });

        expect(nextGeneration.generation).toBe(1);
        expect(nextGeneration.birthDate).toBe(123);
        expect(nextGeneration.grid).toEqual([
          [false, false],
          [false, false],
        ]);
      });

      test('invokes callback', () => {
        let callback = jest.fn(() => {});
        let nextGeneration = GolJS.generate({}, callback);

        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toEqual(nextGeneration);
      });
    });

    describe('When an existent generation is passed as parameter', () => {
      describe('ttl', () => {
        test('creates new generation current (param) is old enough', () => {
          let now = Date.now();
          let clock = {now: jest.fn(() => now)};
          let nextGeneration = GolJS.generate({
            grid: GolJS.forms.glider(life.grid(5, 5)),
            gridSize: [5, 5],
            clock: clock,
            birthDate: now - 300,
            ttl: 300,
            generation: 1
          });

          expect(nextGeneration.generation).toBe(2);
          expect(nextGeneration.birthDate).toBe(now);
          expect(nextGeneration.grid).toEqual([
            [false, false, false, false, false],
            [false,  true, false, false, false],
            [false, false,  true,  true, false],
            [false,  true,  true, false, false],
            [false, false, false, false, false],
          ]);
        });

        test('does not create new generation if current (param) is too young', () => {
          let now = Date.now();
          let clock = {now: jest.fn(() => now)};
          let glider = GolJS.forms.glider(life.grid(5, 5));
          let nextGeneration = GolJS.generate({
            grid: glider,
            gridSize: [5, 5],
            clock: clock,
            birthDate: now - 200,
            ttl: 300,
            generation: 1
          });

          expect(nextGeneration.generation).toBe(1);
          expect(nextGeneration.birthDate).toBe(now - 200);
          expect(nextGeneration.done).toBe(false);// not finished, just too young
          expect(nextGeneration.grid).toEqual(glider);
        });
      });

      test('stops when generation limit is reached (even if old enough)', () => {
        let now = Date.now();
        let clock = {now: jest.fn(() => now)};
        let glider = GolJS.forms.glider(life.grid(5, 5));
        let nextGeneration = GolJS.generate({
          grid: glider,
          clock: clock,
          ttl: 300,
          birthDate: now - 301,
          generation: 10,
          maxGenerations: 10,
        });

        expect(nextGeneration.generation).toBe(10);
        expect(nextGeneration.birthDate).toBe(now - 301);
        expect(nextGeneration.done).toBe(true);
        expect(nextGeneration.grid).toEqual(glider);
      });
    });
  });
});
