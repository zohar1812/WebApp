const config = require('../config');


const getIncomeBtType = function getIncomeByType(callBackFunction) {
  const sql2 = 'Select * from IncomeByType';
  const query = config.connection.query(sql2, (err, result) => {
    if (err) throw err;
    callBackFunction(result);
  });
}


exports.getIncomeBtType =getIncomeBtType;
