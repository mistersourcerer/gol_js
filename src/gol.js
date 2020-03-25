const grid = (width, height) => {
  return Array(height)
    .fill(null)
    .map(() => {
      return Array(width).fill(false, 0, width);
    });
};

const spawn = (grid, x, y) => {
  return _cellValue(grid, x, y, true);
};

const kill = (grid, x, y) => {
  return _cellValue(grid, x, y, false);
};

const neighbors = (grid, x, y) => {
  let neighbourhood = [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y],                 [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ];

  let alive = false;
  return neighbourhood.reduce((sum, next) => {
    alive = _cellAt(grid, ...next) === true
    return sum + (alive ? 1 : 0);
  }, 0);
};

const _cellValue = (grid, x, y, value) => {
  let copy = _cloneGrid(grid);
  copy[y][x] = value;
  return copy;
};

const _cloneGrid = (grid) => {
  return grid.map((row) => Array.from(row));
};

const _cellAt = (grid, x, y) => {
  // Transforms coordinates starting in 1 to array indexes
  let row = grid[x];
  if(row === undefined) {
    return;
  }
  return grid[x][y];
}

module.exports = {
  grid: grid,
  spawn: spawn,
  kill: kill,
  neighbors: neighbors,
};
