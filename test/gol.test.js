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
		let grid = gol.grid(5, 5);
		expect(gol.spawn(grid, 3, 3)).toEqual([
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, true , false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
		]);
	});
});


describe('kill', () => {
	let grid = gol.spawn(gol.grid(5, 5), 3, 3);
	grid = gol.spawn(grid, 4, 3);

	test('kills a cell on a given coordinate on a grid', () => {
		expect(gol.kill(grid, 3, 3)).toEqual([
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, false, true , false, false],
			[false, false, false, false, false],
		]);
	});
});
