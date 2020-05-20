const connectionPoolManager = require('./connectionPoolManager');


const saveNewUser = function saveUser(data) {
  const sql = 'INSERT INTO users SET ?';
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, data, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};

const getUserByUserName = function getUserByUserName(userName, callbackFunc) {
  const sql = `Select * from users where username ='${userName}'`;
  connectionPoolManager.getConnection((err, connection) => {
    connection.query(sql, (err, result) => {
      if (err) throw err;
      callbackFunc(result);
      connection.release();
    });
  });
};

const updateUserPassword = function updateUserPassword(userName, password) {
  const sql = `update users SET password='${password}' WHERE username ='${userName}'`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-undef,no-unused-vars
    const query = config.connection.query(sql, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
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
