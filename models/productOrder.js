const config = require('../config');

const getProductsByOrderId = function getProductsByOrderId(orderId, callBackFunction) {
  const id = Number(orderId);
  const sql = `Select * from OrderProducts where orderId =${id}`;
  // eslint-disable-next-line no-unused-vars
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
};


// eslint-disable-next-line max-len
const getProductsByproductId = function getProductsByproductId(productId, orderId, callBackFunction) {
  const proID = Number(productId);
  const ordID = Number(orderId);
  const sql = `Select * from OrderProducts where productId =${proID} AND orderId =${ordID}`;
  // eslint-disable-next-line no-unused-vars
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
};
const addProductToCart = function addProductToCart(productInCard) {
  const sql = 'INSERT INTO OrderProducts SET ?';
  // eslint-disable-next-line no-unused-vars
  const query = config.connection.query(sql, productInCard, (err, results) => {
    if (err) throw err;
    return true;
  });
};

// eslint-disable-next-line max-len
const uptadeAmountInCard = function uptadeProductInCard(productId, cardId, newAmount, newTotalPrice) {
  const sql = `update OrderProducts SET totalPrice='${newTotalPrice}',quantity='${newAmount}' WHERE productId ='${productId}'AND orderId='${cardId}'`;
  // eslint-disable-next-line no-undef,no-unused-vars
  const query = config.connection.query(sql, (err, results) => {
    if (err) throw err;
  });
};


const removeProductFromCard = function removeProductFromCard(productId, cardId) {
  const sql = `DELETE from OrderProducts where productId ='${productId}'AND orderId='${cardId}`;
  // eslint-disable-next-line no-unused-vars
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    return true;
  });
};

exports.getProductsByOrderId = getProductsByOrderId;
exports.addProductToCart = addProductToCart;
exports.uptadeAmountInCard = uptadeAmountInCard;
exports.removeProductFromCard = removeProductFromCard;
exports.getProductsByproductId = getProductsByproductId;
