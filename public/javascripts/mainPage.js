const productTable = require('../../models/products');


function getAllAvailableProducts(callBackFunction) {
  productTable.getAllProducts((result) => {
    result = getAvailableProducts(result);
    callBackFunction(result);
  });
}


function filterProducts(products, attr, keyword) {
  const filtered = [];
  keyword = keyword.toLowerCase();
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
  for (let i = 0; i < products.length; ++i) {
    if (products[i].quantity > 0) {
      res.push(products[i]);
    }
  }
  return res;
}

function findIndexProducdID(products, id) {
  for (let i = 0; i < products.length; ++i) {
    if (products[i].id == id) {
      return i;
    }
  }
  return -1;
}

exports.getAllAvailableProducts = getAllAvailableProducts;
exports.filterProducts = filterProducts;
