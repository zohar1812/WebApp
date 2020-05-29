const orderTable = require('../../models/order');
const orderProductTable = require('../../models/productOrder');
const productTable = require('../../models/products');


const createCart = function createCart(userType, callBackFunction) {
  orderTable.getCoundOrder((result) => {
    let data = {};
    data = {
      orderId: result + 1,
      consumer_type: userType,
      // eslint-disable-next-line no-use-before-define
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
    orderProductTable.getProductsByproductId(productID, orderID, (productFromCart) => {
      // eslint-disable-next-line eqeqeq
      if (productFromCart != 0) {
        const newAmount = Number(amount) + Number(productFromCart[0].quantity);
        const newTotalPrice = newAmount * result[0].price;
        orderProductTable.uptadeAmountInCard(Number(productID), Number(orderID),
          newAmount, newTotalPrice);
      } else {
        const data = {
          orderId: Number(orderID),
          productId: Number(productID),
          quantity: Number(amount),
          totalPrice: amount * result[0].price,
          picture: result[0].picture,
          name: result[0].name,
          brand: result[0].brand,
          category: result[0].category
        };
        orderProductTable.addProductToCart(data);
      }
      callBackFunction();
    });
  });
};


exports.createCart = createCart;
exports.addProductToCart = addProductToCart;
