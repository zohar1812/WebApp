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
};

const getPtype = function getPtype(type, callBackFunction) {
  const sql = `Select total_income from IncomeByType WHERE ptype='${type}'`;
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};

const updateIncomeByType = function updateIncomeByType(type, amount) {
  const sql = `update IncomeByType SET total_income='${amount}' WHERE ptype='${type}'`;
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      connection.release();
    });
  });
};
exports.getIncomeBtType = getIncomeBtType;
exports.updateIncomeByType = updateIncomeByType;
exports.getPtype = getPtype;
