const config = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\config.js');

const getUserByUserName = function getUser(userName) {
  const sql = `Select * from users where username ='${userName}'`;
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    return result[0];
  });
  return query;
};

const saveNewUser = async function saveUser(data, res) {
  const sql = 'INSERT INTO users SET ?';
  const query = await config.connection.query(sql, data, (err, results) => {
    if (err) throw err;
    return true;
    // res.redirect('/');
  });
};

const getUserByName = function getUserByName(userName, callbackFunc) {
  const sql = `Select * from users where username ='${userName}'`;
  config.connection.query(sql, (err, result) => {
    if (err) throw err;
    callbackFunc(result[0]);
  });
};

const updateUserPassword = function updateUserPassword(userName, password) {
  const sql = `update users SET password='${password}' WHERE username =${userName}`;
  const query = connection.query(sql, (err, results) => {
    if (err) throw err;
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
exports.getUserByName = getUserByName;
exports.saveUser = saveNewUser;
exports.getUserByUserName = getUserByUserName;
