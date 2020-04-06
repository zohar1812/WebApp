const add_numbers = require('./../../src/add_numbers.js');

describe('Test my add function', () => {
	it('add two positive numbers', () => {
		expect(add_numbers(2, 3)).toBe(5);
	});

	it('add two negative numbers', () => {
		expect(add_numbers(-4, -5)).toBe(-9);
	});
});
