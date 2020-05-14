const registrationsFunc = require('../../public/javascripts/registration');

describe('Test name validation function', () => {
  it('Name is only letters - (Valid Test)', () => {
    const error = {};
    const name = 'avraham';
    registrationsFunc.validName(name, error);
    expect(error).toBe({});
  });

  it('Name is NOT only letters - (Invalid Test)', () => {
    const error = {};
    const name = 'avraham1';
    registrationsFunc.validName(name, error);
    // eslint-disable-next-line no-undef
    expect(errors.name).toStrictEqual('Name must contain only letters');
  });
});

describe('Test ID validation function (already ony numbers)', () => {
  it('ID is length of 9 - (Valid Test)', () => {
    const error = {};
    const id = '123456789';
    registrationsFunc.validID(id, error);
    expect(error).toBe({});
  });

  it('ID is NOT length of 9 - (Invalid Test)', () => {
    const error = {};
    const id = '12345678';
    registrationsFunc.validID(id, error);
    expect(error.ID).toStrictEqual('Must contain 9 numbers');
  });
});
