const config = require('../config');


const saveNewUser = function saveUser(data) {
  const sql = 'INSERT INTO users SET ?';
  // eslint-disable-next-line no-unused-vars
  const query = config.connection.query(sql, data, (err, results) => {
    if (err) throw err;
    return true;
  });
};

const getUserByUserName = function getUserByUserName(userName, callbackFunc) {
  const sql = `Select * from users where username ='${userName}'`;
  config.connection.query(sql, (err, result) => {
    if (err) throw err;
    callbackFunc(result);
  });
};

const updateUserPassword = function updateUserPassword(userName, password) {
  const sql = `update users SET password='${password}' WHERE username ='${userName}'`;
  // eslint-disable-next-line no-undef
  const query = config.connection.query(sql, (err, results) => {
    if (err) throw err;
    return true;
  });
};

// const updatePassword = function(userName,newPassword){
//     let sql = `update users SET password = ''+newPassword where username =${userName}`;
//     let query = config.connection.query(sql,(err, results) => {
//         if(err) throw err;
//         res.redirect('/');
//     });
// }
exports.updateUserPassword = updateUserPassword;
exports.getUserByUserName = getUserByUserName;
exports.saveUser = saveNewUser;
exports.getUserByUserName = getUserByUserName;
