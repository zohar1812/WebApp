const productsTable = require('../../models/products');
const productOrderTable = require('../../models/productOrder');

function UpdateQuantity(orderId) {
  productOrderTable.getProductsByOrderId(orderId, (productOrderFromDb) => {
    // eslint-disable-next-line no-unused-vars
    let result;
    // eslint-disable-next-line eqeqeq
    if (productOrderFromDb.length == 0) {
      result = {
        id: null,
        error: 'no such order',
      };
    } else {
      productsTable.getAllProducts((allProducts) => {
        let newAmound;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < productOrderFromDb.length; i++) {
          // eslint-disable-next-line no-plusplus
          for (let j = 0; j < allProducts.length; j++) {
            // eslint-disable-next-line eqeqeq
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
