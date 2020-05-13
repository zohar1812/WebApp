const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.99.100', // check on your computer
  port: '3306', // default port
  user: 'root',
  password: 'root',
  database: 'supersami',
});
connection.connect((error) => {
  if (error) console.log(error);
  else console.log('Database Connected!');
});

module.exports.connection = connection;
