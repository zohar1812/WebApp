const productsTable = require('../../models/products');
const productOrderTable = require('../../models/productOrder');
const orderTable = require('../../models/order');
const incomeByTypeTable = require('../../models/incomeByType');

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
        let totalPrice = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < productOrderFromDb.length; i++) {
          // eslint-disable-next-line no-plusplus
          totalPrice += productOrderFromDb[i].totalPrice;
          for (let j = 0; j < allProducts.length; j++) {
            // eslint-disable-next-line eqeqeq
            if (productOrderFromDb[i].productId == allProducts[j].id) {
              newAmound = allProducts[j].quantity - productOrderFromDb[i].quantity;
              productsTable.updateAmountOfProduct(productOrderFromDb[i].productId, newAmound);
              incomeByTypeTable.getPtype(allProducts[j].category, (result) => {
                let totalIncome = result[0].total_income + productOrderFromDb[i].totalPrice;
                incomeByTypeTable.updateIncomeByType(allProducts[j].category, totalIncome);
              });
            }
          }
        }
        orderTable.uptadePrice(orderId, totalPrice);
      });
    }
  });
}

exports.UpdateQuantity = UpdateQuantity;
