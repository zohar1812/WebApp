const addNumbers = require('../../src/addNumbers.js');

describe('Test my add function', () => {
  it('add two positive numbers', () => {
    expect(addNumbers(2, 3)).toBe(5);
  });

  it('add two negative numbers', () => {
    expect(addNumbers(-4, -5)).toBe(-9);
  });
});
