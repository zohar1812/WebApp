const productsTable = require('../../models/products');
const productOrderTable = require('../../models/productOrder');

function UpdateQuantity(orderId) {
  productOrderTable.getProductsByOrderId(orderId, (productOrderFromDb) => {
    let result;
    if (productOrderFromDb.length == 0) {
      result = {
        id: null,
        error: 'no such order',
      };
    } else {
      productsTable.getAllProducts((allProducts) => {
        let newAmound;
        for (let i = 0; i < productOrderFromDb.length; i++) {
          for (let j = 0; j < allProducts.length; j++) {
            if (productOrderFromDb[i].productId == allProducts[j].id) {
              newAmound = allProducts[j].quantity - productOrderFromDb[i].quantity;
              productsTable.updateAmountOfProduct(productOrderFromDb[i].productId, newAmound);
            }
          }
        }
      });
    }
  });
}

exports.UpdateQuantity = UpdateQuantity;
