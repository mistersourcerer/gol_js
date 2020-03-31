const joinCells = (grid, joinWith, alive) => {
  let sym;
  let dead = ''.padEnd(alive.length, ' ');

  return grid.map((row, y) => {
    return row.map((cell, x) => {
      sym = (cell === true) ? alive : dead;

      if(x == 0) {
        return `|| ${sym}`;
      } else if(x == row.length - 1) {
        return `${sym} ||`;
      } else {
        return sym;
      }
    }).join(joinWith);
  });
};

const defaults = {
  output: console,
  joinWith: '|',
  alive: 'O',
  cycler: ['*', '#'],
};

const render = (grid, options) => {
  let {
    output,
    alive,
    joinWith,
    dead,
    cycler,
  } = Object.assign(defaults, options);

  output.clear();

  let joined = joinCells(grid, joinWith, alive);

  joined.forEach((line, idx) => {
    let id = cycler[idx % cycler.length].toString();
    let filler = id;
    let row = `${line}${filler}`;

    if (idx == 0) {
      output.log(''.padEnd(line.length, "*"));
    }

    output.log(row);

    if (idx == joined.length - 1) {
      output.log(''.padEnd(line.length, "*"));
    }
  });
};

export default {
  render: render,
}
