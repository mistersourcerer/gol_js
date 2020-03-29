const render = (grid) => {
  console.clear();
  let sym;
  let joined = grid.map((row, y) => {
    return row.map((cell, x) => {
      sym = (cell === true) ? 'O' : ' ';

      if(x == 0) {
        return `|| ${sym}`;
      } else if(x == row.length - 1) {
        return `${sym} ||`;
      } else {
        return sym;
      }
    }).join("|");
  });

  joined.forEach((line, idx) => {
    let id = performance.now().toString().padEnd(18, ' ');
    let filler = `${id}        `;
    let row = `${filler}${line}`;

    if (idx == 0) {
      let boxTop = `${''.padEnd(filler.length - 1, ' ')} ${''.padEnd(line.length, "*")}`;
      console.log(boxTop);
    }

    console.log(row);

    if (idx == joined.length - 1) {
      let boxBottom = `${''.padEnd(filler.length - 1, ' ')} ${''.padEnd(line.length, "*")}`;
      console.log(boxBottom);
    }
  });
};

module.exports = {
  render: render,
}
