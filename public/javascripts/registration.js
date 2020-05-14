const users = require('../../models/users');
const psw = require('./password');


const createUser = function (req, callBackFunction) {
  let errors = {};
  // eslint-disable-next-line no-undef
  users.getUserByUserName(req.body.username, (userFromDb) => {
    // eslint-disable-next-line eqeqeq
    if (userFromDb.length != 0) {
      errors.username = 'A selected username already exists';
    }
    // eslint-disable-next-line no-const-assign,no-use-before-define
    errors = registrationUser(req);
    callBackFunction(errors);
  });
};

function registrationUser(req) {
  let data;
  // eslint-disable-next-line no-use-before-define
  const errors = validation(req);
  // eslint-disable-next-line no-use-before-define
  if (!isEmpty(errors)) {
    return { errors };
  }
  // eslint-disable-next-line eqeqeq
  if (req.body.studentID != '') {
    data = {
      id: req.body.ID,
      name: req.body.name,
      lastName: req.body.lastName,
      studentID: req.body.studentID,
      userName: req.body.username,
      password: req.body.password,
      type: 'student',
      ans: req.body.ans,
    };
  } else {
    data = {
      id: req.body.ID,
      name: req.body.name,
      lastName: req.body.lastName,
      userName: req.body.username,
      password: req.body.password,
      type: 'regular',
      ans: req.body.ans,
    };
  }
  return users.saveUser(data);
}

function validation(req) {
  const errors = {};
  // eslint-disable-next-line no-use-before-define
  validID(req.body.ID, errors);
  // eslint-disable-next-line no-use-before-define
  validName(req.body.name, errors);
  // eslint-disable-next-line no-use-before-define
  validLastname(req.body.lastName, errors);
  // eslint-disable-next-line eqeqeq
  if (req.body.studentID != '') {
    // eslint-disable-next-line no-use-before-define
    validStudentID(req.body.studentID, errors);
  }
  // eslint-disable-next-line no-use-before-define
  psw.validPassword(req.body.password, errors);
  return errors;
}


function validID(id, errors) {
  // eslint-disable-next-line eqeqeq
  if (id.length !== 9) {
    // eslint-disable-next-line no-param-reassign
    errors.ID = 'Must contain 9 numbers';
  }
}

function validName(name, errors) {
  if (!/^[a-zA-Z]+$/.test(name)) {
    // eslint-disable-next-line no-param-reassign
    errors.name = 'Name must contain only letters';
  }
}

function validLastname(lastName, errors) {
  if (!/^[a-zA-Z]+$/.test(lastName)) {
    // eslint-disable-next-line no-param-reassign
    errors.lastName = 'Last name must contain only letters';
  }
}
function validStudentID(studentID, errors) {
  // eslint-disable-next-line eqeqeq
  if (studentID.length !== 6) {
    // eslint-disable-next-line no-param-reassign
    errors.studentID = 'Must contain 6 numbers';
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports.createUser = createUser;
exports.validName = validName;
exports.validID = validID;
exports.validLastname = validLastname;
exports.validStudentID = validStudentID;
