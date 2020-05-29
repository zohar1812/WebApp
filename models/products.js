// eslint-disable-next-line no-unused-vars
const connectionPoolManager = require('./connectionPoolManager');

const getAllProducts = function getAllProducts(callBackFunction) {
  const sql = 'SELECT * FROM Products';
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
const getProductByID = function getProductByID(productID, callBackFunction) {
  const sql = `Select * from Products where id ='${productID}'`;

  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow
    connection.query(sql, (err, rows) => {
      if (err) throw err;
      callBackFunction(rows);
      connection.release();
    });
  });
};

const updateAmountOfProduct = function updateAmountOfProduct(productID, newAmount) {
  const sql = `update Products SET quantity='${newAmount}' WHERE id ='${productID}'`;
  // eslint-disable-next-line no-undef,no-unused-vars

  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow,no-unused-vars
    connection.query(sql, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};


const uptadePriceOfProduct = function uptadePriceOfProduct(productID, newPrice) {
  const sql = `update Products SET price='${newPrice}' WHERE id ='${productID}'`;
  // eslint-disable-next-line no-undef,no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow,no-unused-vars
    connection.query(sql, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};


const addNewProduct = function addNewProduct(product) {
  const sql = 'INSERT INTO Products SET ?';
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-unused-vars,no-shadow
    connection.query(sql, product, (err, results) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};


const deleteProductByID = function deleteProduct(productID) {
  const sql = `DELETE from Products where id = ${productID}`;
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow,no-unused-vars
    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.release();
      return true;
    });
  });
};

const getCoundProduct = function getCoundProduct(callBackFunction) {
  const sql = 'SELECT COUNT(*) as total FROM Products';
  // eslint-disable-next-line no-unused-vars
  connectionPoolManager.getConnection((err, connection) => {
    // eslint-disable-next-line no-shadow
    connection.query(sql, (err, result) => {
      if (err) throw err;
      callBackFunction(result[0].total);
      return true;
    });
  });
};

const getProductByCateBra = function getProductByCateBra(category, brand, callBackFunction) {
  const sql = `SELECT * FROM Products WHERE category='${category}' AND brand = '${brand}'`;
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

exports.updateAmountOfProduct = updateAmountOfProduct;
exports.uptadePriceOfProduct = uptadePriceOfProduct;
exports.addNewProduct = addNewProduct;
exports.deleteProductByID = deleteProductByID;
exports.getProductByID = getProductByID;
exports.getAllProducts = getAllProducts;
exports.getCoundProduct = getCoundProduct;
exports.getProductByCateBra = getProductByCateBra;
