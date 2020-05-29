const mysql = require('mysql');

let connectionPool;

function pool() {
  if (connectionPool === undefined) {
    connectionPool = mysql.createPool({
      host: 'eu-cdbr-west-03.cleardb.net', // check on your computers
      port: '3306', // default port
      user: 'b309a56c38621f',
      password: '4e9ac4e4',
      database: 'heroku_e0f01176dce3eaf',
    //   host: '192.168.99.100', // check on your computer
    //   port: '3306', // default port
    //   user: 'root',
    //   password: 'root',
    //   database: 'supersami',
    });
  }

  return connectionPool;
}

function getConnection(callback) {
  pool().getConnection((err, connection) => {
    callback(err, connection);
  });
}

module.exports.getConnection = getConnection;
