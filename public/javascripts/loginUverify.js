// eslint-disable-next-line no-unused-vars
const user = require('../../models/users');


// eslint-disable-next-line no-unused-vars
function loginV(username, password, callBackFunction) {
  user.getUserByUserName(username, (userFromDb) => {
    let result;
    if (userFromDb.length === 0) {
      result = {
        id: null,
        error: 'No such user exists',
      };
    } else {
      // eslint-disable-next-line no-use-before-define
      const ans = pswVarify(password, userFromDb[0].password);
      if (ans) {
        result = {
          user: userFromDb[0],
        };
      } else {
        result = {
          error: 'Wrong username or password',
        };
      }
    }
    callBackFunction(result);
  });


  // const sql = `Select * from users where id =\`${req.body.usn}'`;
  // const query = config.connection.query(sql, (err, result) => {
  //   if (err) throw err;
  //   if (result.length == 0) {
  //     res.redirect('login', { error: 'user ' });
  //   } else {
  //     const ans = psw_varify(req, res, result[0]);
  //     if (ans) { print('welcome!!'); } else { print('no user found!'); }
  //   }
  // });
}

// eslint-disable-next-line camelcase
function pswVarify(reqPassword, resultPassword) {
  // eslint-disable-next-line eqeqeq
  if (reqPassword != resultPassword) { return 0; }
  return 1;
}
exports.loginV = loginV;
exports.pswVarify = pswVarify;
