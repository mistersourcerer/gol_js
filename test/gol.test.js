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
