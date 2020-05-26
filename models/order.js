const connectionPoolManager = require('./connectionPoolManager');

const addOrder = function addOrder(order) {
  const sql = 'INSERT INTO Orders SET ?';
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-unused-vars,no-shadow
    connection.query(sql, order, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};
const getAllOrder = function getAllOrder(callBackFunction) {
  const sql = 'SELECT * FROM Orders';
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, result) => {
      if (err) throw err;
      callBackFunction(result);
      connection.release();
    });
  });
};

const getOrderById = function getOrderById(orderId, callBackFunction) {
  const sql = `Select * from Orders where orderId ='${orderId}'`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};


const getOrderByCustomerType = function getOrderByCustomerType(consumerType, callBackFunction) {
  // eslint-disable-next-line camelcase
  const sql = `Select * from Orders where consumer_type ='${consumerType}'`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};

const getOrderByDate = function getOrderByDate(date, callBackFunction) {
  const sql = `Select * from Orders where date ='${date}'`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};

const removeOrder = function removeOrder(orderId) {
  const sql = `DELETE from Orders where orderId ='${orderId}'`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};


const getCoundOrder = function getCoundOrder(callBackFunction) {
  const sql = 'SELECT COUNT(*) as total FROM Orders';
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      callBackFunction(result[0].total);
      connection.release();
    });
  });
};

const uptadePrice = function uptadePrice(cardId, price) {
  const sql = `update Orders SET total_price='${price}' WHERE orderId='${cardId}'`;
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-undef,no-unused-vars
    connection.query(sql, (err, results) => {
      if (err) throw err;
      connection.release();
    });
  });
};

exports.addOrder = addOrder;
exports.getOrderById = getOrderById;
exports.getOrderByCustomerType = getOrderByCustomerType;
exports.getOrderByDate = getOrderByDate;
exports.removeOrder = removeOrder;
exports.getCoundOrder = getCoundOrder;
exports.getAllOrder = getAllOrder;
exports.uptadePrice = uptadePrice;
