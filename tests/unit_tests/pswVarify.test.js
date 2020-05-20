const loginV = require('../../public/javascripts/loginUverify');

describe('Test pswVarify function ', () => {
  it('Valid', () => {
    expect(loginV.pswVarify(12345, 12345)).toBe(1);
  });
  it('Invalid Test', () => {
    expect(loginV.pswVarify(12345, 11111)).toBe(0);
  });
});
