const registrationsFunc = require('../../public/javascripts/registration');

describe('Test name validation function', () => {
  it('Name is only letters - (Valid Test)', () => {
    const error = {};
    const name = 'avraham';
    registrationsFunc.validName(name, error);
    expect(error).toStrictEqual({});
  });

  it('Name is NOT only letters - (Invalid Test)', () => {
    const error = {};
    const name = 'avraham1';
    registrationsFunc.validName(name, error);
    // eslint-disable-next-line no-undef
    expect(error.name).toStrictEqual('Name must contain only letters');
  });
});

describe('Test ID validation function (already ony numbers)', () => {
  it('ID is length of 9 - (Valid Test)', () => {
    const error = {};
    const id = '123456789';
    registrationsFunc.validID(id, error);
    expect(error).toStrictEqual({});
  });

  it('ID is NOT length of 9 - (Invalid Test)', () => {
    const error = {};
    const id = '12345678';
    registrationsFunc.validID(id, error);
    expect(error.ID).toStrictEqual('Must contain 9 numbers');
  });
});


describe('Test last name validation function', () => {
  it('Last Name is only letters - (Valid Test)', () => {
    const error = {};
    const name = 'avraham';
    registrationsFunc.validLastname(name, error);
    expect(error).toStrictEqual({});
  });

  it('Name is NOT only letters - (Invalid Test)', () => {
    const error = {};
    const name = 'avraham1';
    registrationsFunc.validLastname(name, error);
    // eslint-disable-next-line no-undef
    expect(error.lastName).toStrictEqual('Last name must contain only letters');
  });
});


describe('Test studets ID validation function (already ony numbers)', () => {
  it('ID is length of 6 - (Valid Test)', () => {
    const error = {};
    const id = '123456';
    registrationsFunc.validStudentID(id, error);
    expect(error).toStrictEqual({});
  });

  it('ID is NOT length of 6 - (Invalid Test)', () => {
    const error = {};
    const id = '1234567';
    registrationsFunc.validStudentID(id, error);
    expect(error.studentID).toStrictEqual('Must contain 6 numbers');
  });
});
