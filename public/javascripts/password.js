
function validPassword(password, errors) {
  if (password.length < 8 || password.length > 15 || !/^[a-zA-Z0-9]+$/.test(password)) {
    // eslint-disable-next-line no-param-reassign
    errors.password = '1. The password must contain between 8 and 15 characters\n '
      + '2. The password must contain letters\n'
      + ' 3. The password must contain numbers\n'
      + 'At least one of the parameters does not exist';
  }
}

module.exports.validPassword = validPassword;
