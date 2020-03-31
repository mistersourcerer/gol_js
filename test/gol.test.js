import consoleRender from 'rendering/console';
import GolJS from 'gol.js';

describe('gol', () => {
  let gol;

  beforeEach(() => {
    gol = GolJS.gol();
  });

  test('returns a function', () => {
    expect(typeof(GolJS.gol())).toEqual('function');
  });

  describe('Default configurations', () => {
    test('uses console rendering', () => {
      expect(gol.render).toEqual(consoleRender);
    });

    test('creates a 25x25 grid', () => {
      expect(gol.gridSize).toEqual([25, 25]);
    });

    test('intializes with a glider', () => {
      expect(gol.initialForms.length).toBe(1);
      expect(gol.initialForms[0]).toEqual(GolJS.forms.glider);
    });
  });

  describe('generate', () => {
    test('returns the new generation', () => {
      let nextGeneration = gol();

      expect(nextGeneration.grid.length).toEqual(25);
      expect(nextGeneration.grid[0].length).toEqual(25);
      expect(nextGeneration.birthDate).not.toBe(undefined);
      expect(nextGeneration.generation).toBe(1);
    });

    test('accepts override options', () => {
      let clock = {now: jest.fn(() => 123)};
      let nextGeneration = gol({
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
  });
});
