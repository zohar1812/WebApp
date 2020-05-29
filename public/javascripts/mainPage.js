const productTable = require('../../models/products');


function getAllAvailableProducts(callBackFunction) {
  productTable.getAllProducts((result) => {
    // eslint-disable-next-line no-param-reassign,no-use-before-define
    result = getAvailableProducts(result);
    callBackFunction(result);
  });
}

function filterProducts(products, attr, keyword) {
  const filtered = [];
  // eslint-disable-next-line no-param-reassign
  keyword = keyword.toLowerCase();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < products.length; ++i) {
    const val = products[i][attr].toLowerCase();
    if (val.includes(keyword)) {
      filtered.push(products[i]);
    }
  }
  return filtered;
}

function getAvailableProducts(products) {
  const res = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < products.length; ++i) {
    if (products[i].quantity > 0) {
      res.push(products[i]);
    }
  }
  return res;
}

function findIndexProducdID(products, id) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < products.length; ++i) {
    // eslint-disable-next-line eqeqeq
    if (products[i].id == id) {
      return i;
    }
  }
  return -1;
}

exports.getAllAvailableProducts = getAllAvailableProducts;
exports.filterProducts = filterProducts;
exports.findIndexProducdID = findIndexProducdID;
exports.getAvailableProducts = getAvailableProducts;
