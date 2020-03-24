const grid = (width, height) => {
	return Array(height)
		.fill(null)
		.map(() => {
			return Array(width).fill(false, 0, width);
		});
};

const spawn = (grid, x, y) => {
	return _cellValue(grid, x - 1, y - 1, true);
}

const kill = (grid, x, y) => {
	return _cellValue(grid, x - 1, y - 1, false);
}

const _cellValue = (grid, x, y, value) => {
	let copy = Array.from(grid);
	copy[x][y] = value;
	return copy;
}

module.exports = {
	grid: grid,
	spawn: spawn,
	kill: kill,
};
