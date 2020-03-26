const gol = require('gol');

describe('grid', () => {
  test('creates an empty grid of width(param) by height(param)', () => {
    expect(gol.grid(5, 5)).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]);
  });
});

describe('spawn', () => {
  test('spawns a new cell on a given coordinate on a grid', () => {
    let grid = gol.grid(5, 2);
    grid = gol.spawn(grid, 2, 0);
    grid = gol.spawn(grid, 2, 1);

    expect(grid).toEqual([
      [false, false, true , false, false],
      [false, false, true, false, false],
    ]);
  });
});

describe('neighbors', () => {
  test('recognizes alive neighbors for a coordinate on the grid', () => {
    let grid = gol.spawn(gol.grid(5, 5), 2, 2);
    expect(gol.neighbors(grid, 2, 2)).toBe(0);

    expect(gol.neighbors(gol.spawn(grid, 1, 1), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 1, 2), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 1, 3), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 2, 1), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 2, 3), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 3, 1), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 3, 2), 2, 2)).toBe(1);
    expect(gol.neighbors(gol.spawn(grid, 3, 3), 2, 2)).toBe(1);
  });

  test('recognizes multiple live neighors for a coordinate on the grid', () => {
    let grid = gol.spawn(gol.grid(5, 5), 2 ,2);
    grid = gol.spawn(grid, 1, 1);
    grid = gol.spawn(grid, 1, 2);
    grid = gol.spawn(grid, 1, 3);
    grid = gol.spawn(grid, 2, 1);
    grid = gol.spawn(grid, 2, 3);
    grid = gol.spawn(grid, 3, 1);
    grid = gol.spawn(grid, 3, 2);
    grid = gol.spawn(grid, 3, 3);

    expect(gol.neighbors(grid, 2, 2)).toBe(8);
  });

  describe('grid edge', () => {
    test('does not go bananas if neighbors would be on a negative coord', () => {
      let grid = gol.spawn(gol.grid(3, 3), 1 , 1);
      grid = gol.spawn(grid, 1, 2);

      expect(gol.neighbors(grid, 1, 1)).toBe(1);
    });

    test('does not go bananas if neighbors would be "out of bounds"', () => {
      let grid = gol.spawn(gol.grid(3, 3), 2 , 2);
      grid = gol.spawn(grid, 1, 2);

      expect(gol.neighbors(grid, 2, 2)).toBe(1);
    });
  });
});
