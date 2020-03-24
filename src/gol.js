const grid = (width, height) => {
	return Array(height)
		.fill(null)
		.map(() => Array(width).fill(false, 0, width));
};

module.exports = {
	grid: grid,
};
