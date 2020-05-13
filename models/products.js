const config = require('../config');

const getAllProducts = function getAllProducts(callBackFunction) {
  const sql = 'SELECT * FROM Products';
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
};
const getProductByID = function getProductByID(productID, callBackFunction) {
  const sql = `Select * from Products where id ='${productID}'`;
  const query = config.connection.query(sql, (err, rows) => {
    if (err) throw err;
    callBackFunction(rows);
  });
};
const updateAmountOfProduct = function updateAmountOfProduct(productID, newAmount) {
  const sql = `update Products SET quantity='${newAmount}' WHERE id ='${productID}'`;
  // eslint-disable-next-line no-undef
  const query = config.connection.query(sql, (err, results) => {
    if (err) throw err;
    return true;
  });
};


const uptadePriceOfProduct = function uptadePriceOfProduct(productID, newPrice) {
  const sql = `update Products SET price='${newPrice}' WHERE id ='${productID}'`;
  // eslint-disable-next-line no-undef
  const query = config.connection.query(sql, (err, results) => {
    if (err) throw err;
    return true;
  });
};


const addNewProduct = function addNewProduct(product) {
  const sql = 'INSERT INTO Products SET ?';
  const query = config.connection.query(sql, product, (err, results) => {
    if (err) throw err;
    return true;
  });
};


const deleteProductByID = function deleteProduct(productID) {
  const sql = `DELETE from Products where id = ${productID}`;
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    return true;
  });
};

const getCoundProduct = function getCoundProduct(callBackFunction) {
  const sql = 'SELECT COUNT(*) as total FROM Products';
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    callBackFunction(result[0].total);
  });
};

exports.updateAmountOfProduct = updateAmountOfProduct;
exports.uptadePriceOfProduct = uptadePriceOfProduct;
exports.addNewProduct = addNewProduct;
exports.deleteProductByID = deleteProductByID;
exports.getProductByID = getProductByID;
exports.getAllProducts = getAllProducts;
exports.getCoundProduct = getCoundProduct;
