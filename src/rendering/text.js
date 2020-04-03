const _consoleDevice = {
  clear: () => console.clear(),
  push: msg => console.log(msg),
};
const consoleDevice = () => _consoleDevice;

const memoryDevice = () => {
  return {
    mem: [[]],
    idx: 0,
    clear: function() {
      this.idx++;
      this.mem[this.idx] = [];
    },
    push: function(msg) {
      this.mem[this.idx].push(msg);
    },
  };
};

const defaults = {
  device: consoleDevice(),
  joinWith: '|',
  alive: 'O',
  cycler: ['*', '#'],
};

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

const render = (grid, options) => {
  let {
    device,
    alive,
    joinWith,
    dead,
    cycler,
  } = {...defaults, ...options};

  device.clear();

  let joined = joinCells(grid, joinWith, alive);

  joined.forEach((line, idx) => {
    let id = cycler[idx % cycler.length].toString();
    let filler = id;
    let row = `${line}${filler}`;

    if (idx == 0) {
      device.push(''.padEnd(line.length, "*"));
    }

    device.push(row);

    if (idx == joined.length - 1) {
      device.push(''.padEnd(line.length, "*"));
    }
  });
};

export default {
  render: render,
  devices: {
    console: consoleDevice,
    memory: memoryDevice,
  },
};
