const connectionPoolManager = require('./connectionPoolManager');


const getIncomeBtType = function getIncomeByType(callBackFunction) {
  const sql = 'Select * from IncomeByType';
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
}

exports.getIncomeBtType = getIncomeBtType;
