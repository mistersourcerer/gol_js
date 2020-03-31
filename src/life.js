const grid = (cols, rows) => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false, 0, cols));
};

const spawn = (grid, x, y) => {
  let copy = _cloneGrid(grid);
  copy[y][x] = true;
  return copy;
};

const neighbors = (grid, x, y) => {
  let neighbourhood = [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y],                 [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
  ];

  return neighbourhood.reduce((sum, next) => {
    return sum + (_cellAt(grid, ...next) === true ? 1 : 0);
  }, 0);
};

const nextGen = (currentGrid) => {
  return currentGrid.map((row, y) => {
    return row.map((currentStatus, x) => {
      return _applyRules(neighbors(currentGrid, x, y), currentStatus);
    });
  });
};

const population = (grid) => {
  return grid.flat().filter((cell) => cell === true).length;
};

const _cloneGrid = (grid) => {
  return grid.map((row) => Array.from(row));
};

const _cellAt = (grid, x, y) => {
  // Transforms coordinates starting in 1 to array indexes
  let row = grid[y];
  if(row === undefined) { return; }
  return grid[y][x];
}

const _applyRules = (neighborsCount, currentStatus) => {
  let alive = currentStatus === true;
  let nextStatus = false;

  if (alive && neighborsCount >= 2 && neighborsCount <= 3) {
    nextStatus = true;
  } else if(!alive && neighborsCount == 3) {
    nextStatus = true;
  }

  return nextStatus;
};

export default {
  grid: grid,
  spawn: spawn,
  neighbors: neighbors,
  nextGen: nextGen,
  population: population,
};
