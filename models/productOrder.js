const config = require('../config');

const getProductsByOrderId(orderId, callBackFunction) {
  const sql = `Select * from OrderProduct where id ='${orderId}'`;
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
}

const addProductToCart(productInCard) {
  const sql = 'INSERT INTO OrderProduct SET ?';
  const query = config.connection.query(sql, productInCard, (err, results) => {
    if (err) throw err;
    return true;
  });
}

const uptadeAmountInCard(productId, cardId, newAmound) {
  const sql = `update Orderproduct SET quantity='${newAmount}' WHERE productId ='${productID}'AND orderId='${cardId}`;
  // eslint-disable-next-line no-undef
  const query = config.connection.query(sql, (err, results) => {
    if (err) throw err;
    return true;
  });
}

const removeProductFromCard(productId, cardId){
  const sql = `DELETE from Orderproduct where productId ='${productID}'AND orderId='${cardId}`;
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    return true;
  });
}

exports.getProductsByOrderId = getProductsByOrderId;
exports.addProductToCart = addProductToCart;
exports.uptadeAmountInCard = uptadeAmountInCard;
exports.removeProductFromCard = removeProductFromCard;
