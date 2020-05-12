const config = require('../config');

const addOrder = function addOrder(order){
  const sql = 'INSERT INTO Orders SET ?';
  const query = config.connection.query(sql, order, (err, results) => {
    if (err) throw err;
    return true;
  });
}

const getOrderById = function getOrderById(orderId, callBackFunction){
  const sql = `Select * from Orders where orderId ='${orderId}'`;
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
}

const getOrderByCustomerType = function getOrderByCustomerType(consumer_type, callBackFunction) {
  const sql = `Select * from Orders where consumer_type ='${consumer_type}'`;
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
}

const getOrderByDate = function getOrderByDate(date, callBackFunction){
  const sql = `Select * from Orders where date ='${date}'`;
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
}

const removeOrder = function removeOrder(orderId){
  const sql = `DELETE from Orders where orderId ='${orderId}'`;
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    return true;
  });
}

const getCoundOrder = function getCoundOrder(callBackFunction) {
  const sql = 'SELECT COUNT(*) as total FROM Orders';
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    callBackFunction(result[0].total);
  });
};

exports.addOrder = addOrder;
exports.getOrderById = getOrderById;
exports.getOrderByCustomerType = getOrderByCustomerType;
exports.getOrderByDate = getOrderByDate;
exports.removeOrder = removeOrder;
exports.getCoundOrder = getCoundOrder;
