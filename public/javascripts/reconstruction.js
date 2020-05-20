// eslint-disable-next-line import/no-unresolved
const user = require('../../models/users');
const psw = require('./password');

// eslint-disable-next-line no-unused-vars
function recover(req, callBackFunction) {
  user.getUserByUserName(req.body.username, (userFromDb) => {
    let result;
    // eslint-disable-next-line eqeqeq
    if (userFromDb.length === 0) {
      result = {
        user: null,
        errors: {
          username: 'No such user exists',
        },
      };
    } else {
      result = {
        user: {
          id: userFromDb[0].id,
          username: userFromDb[0].username,
          ans: userFromDb[0].ans,
        },
        errors: {
        },
      };
    }
    // eslint-disable-next-line no-undef
    callBackFunction(result);
  });
}

function validAns(ans, userAns) {
  if (ans === userAns) {
    return true;
  }
  return false;
}

function updatePassword(userName, password) {
  const errors = {};
  psw.validPassword(password, errors);
  // eslint-disable-next-line no-use-before-define
  if (isEmpty(errors)) {
    user.updateUserPassword(userName, password);
  }
  return errors;
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports.updatePassword = updatePassword;
module.exports.recover = recover;
module.exports.validAns = validAns;
module.exports.isEmpty = isEmpty;
