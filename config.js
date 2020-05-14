const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: '192.168.99.100', // check on your computer
//   port: '3306', // default port
//   user: 'root',
//   password: 'root',
//   database: 'supersami',
// });

const db_config = mysql.createConnection({
  host: 'eu-cdbr-west-03.cleardb.net', // check on your computers
  port: '3306', // default port
  user: 'b309a56c38621f',
  password: '4e9ac4e4',
  database: 'heroku_e0f01176dce3eaf',
});

let connection;


function handleDisconnect() {
  db_config.connect((error) => {
    if (error) console.log(error);
    else console.log('Database Connected!');
  });

  // connection.connect((err) => { // The server is either down
  //   if (err) { // or restarting (takes a while sometimes).
  //     console.log('error when connecting to db:', err);
  //     setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
  //   } // to avoid a hot loop, and to allow our node script to
  // }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  db_config.on('error', (err) => {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else { // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports.connection = connection;
