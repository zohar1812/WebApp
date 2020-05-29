const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: '192.168.99.100', // check on your computer
//   port: '3306', // default port
//   user: 'root',
//   password: 'root',
//   database: 'supersami',
// });

const connection = mysql.createConnection({
  host: 'eu-cdbr-west-03.cleardb.net', // check on your computers
  port: '3306', // default port
  user: 'b309a56c38621f',
  password: '4e9ac4e4',
  database: 'heroku_e0f01176dce3eaf',
  connectTimeout: 300000,
});


// connection.connect((error) => {
//   if (error) console.log(error);
//   else console.log('Database Connected!');
// });

module.exports.connection = connection;
