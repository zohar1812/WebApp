const productTable = require('../../models/products');


function editProduct(productID, reqBody) {
  const message = {};
  // eslint-disable-next-line eqeqeq
  if (reqBody.parameter == 'price') {
    updateProductPrice(productID, Number(reqBody.val), message);
    // eslint-disable-next-line eqeqeq
  } else if (reqBody.parameter == 'quantity') {
    updateProductAmound(productID, Number(reqBody.val), message);
  } else {
    message.error = 'No change was entered';
  }
  return message;
}

function updateProductPrice(productID, newPrice, message) {
  if (validPrice(newPrice)) {
    productTable.uptadePriceOfProduct(productID, newPrice);
    message.success = 'success update price';
  } else {
    message.error = 'Invalid price';
  }
}
function updateProductAmound(productID, newAmound, message) {
  if (validAmound(newAmound)) {
    productTable.updateAmountOfProduct(productID, newAmound);
    message.success = 'success update amound';
  } else {
    message.error = 'Invalid amound';
  }
}

function addProduct(reqBody){
  productTable.getCoundProduct((result) => {
    let data = {
      id: result + 1,
      name: reqBody.name,
      picture: reqBody.picture,
      price: reqBody.price,
      category: reqBody.category,
      quantity: reqBody.quantity,
      brand: reqBody.brand,
      description: reqBody.description,
    };
    productTable.addNewProduct(data);
  });
}




function deleteProduct(productID) {
  productTable.deleteProductByID(productID);
}
function validPrice(price) {
  if (price <= 0) return false;
  return true;
}

function validAmound(amound) {
  if (amound <= 0) return false;
  return true;
}

exports.deleteProduct = deleteProduct;
exports.editProduct = editProduct;
exports.addProduct = addProduct;
