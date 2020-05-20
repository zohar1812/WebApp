const connectionPoolManager = require('./connectionPoolManager');


const getProductsByOrderId = function getProductsByOrderId(orderId, callBackFunction) {
  const id = Number(orderId);
  const sql = `Select * from OrderProducts where orderId =${id}`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};


// eslint-disable-next-line max-len
const getProductsByproductId = function getProductsByproductId(productId, orderId, callBackFunction) {
  const proID = Number(productId);
  const ordID = Number(orderId);
  const sql = `Select * from OrderProducts where productId =${proID} AND orderId =${ordID}`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};
const addProductToCart = function addProductToCart(productInCard) {
  const sql = 'INSERT INTO OrderProducts SET ?';
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, productInCard, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};

// eslint-disable-next-line max-len
const uptadeAmountInCard = function uptadeProductInCard(productId, cardId, newAmount, newTotalPrice) {
  const sql = `update OrderProducts SET totalPrice='${newTotalPrice}',quantity='${newAmount}' WHERE productId ='${productId}'AND orderId='${cardId}'`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-undef,no-unused-vars
    connection.query(sql, (err, results) => {
      if (err) throw err;
      connection.release();
    });
  });
};


const removeProductFromCard = function removeProductFromCard(productId, cardId) {
  const sql = `DELETE from OrderProducts where productId ='${productId}'AND orderId='${cardId}`;
  connectionPoolManager.getConnection((err, connection) => {
  // eslint-disable-next-line no-unused-vars
    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};

exports.getProductsByOrderId = getProductsByOrderId;
exports.addProductToCart = addProductToCart;
exports.uptadeAmountInCard = uptadeAmountInCard;
exports.removeProductFromCard = removeProductFromCard;
exports.getProductsByproductId = getProductsByproductId;
