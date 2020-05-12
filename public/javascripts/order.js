const orderTable = require('../../models/order');
const orderProductTable = require('../../models/productOrder');
const productTable = require('../../models/products');


const createCart = function createCart(userType, callBackFunction) {
  orderTable.getCoundOrder((result) => {
    let data = {};
    data = {
      orderId: result + 1,
      consumer_type: userType,
      date: createDate(),
      total_price: 0,
    };
    orderTable.addOrder(data);
    callBackFunction(data);
  });
};

function createDate() {
  let today = new Date();
  const dd = String(today.getDate())
    .padStart(2, '0');
  const mm = String(today.getMonth() + 1)
    .padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  today = `${yyyy}/${mm}/${dd}`;
  console.log(today);
  return today;
}

const addProductToCart = function addProductToCart(orderID, productID, amount, callBackFunction) {
  productTable.getProductByID(productID, (result) => {
    const data = {
      orderId: Number(orderID),
      productId: Number(productID),
      quantity: Number(amount),
      totalPrice: amount * result[0].price,
      picture : result[0].picture,
      name: result[0].name,
    };
    orderProductTable.addProductToCart(data);
    callBackFunction();
  });
};


exports.createCart = createCart;
exports.addProductToCart = addProductToCart;

