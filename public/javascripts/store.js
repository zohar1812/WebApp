// eslint-disable-next-line eqeqeq
if (document.readyState == 'loading') {
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('DOMContentLoaded', ready);
} else {
  // eslint-disable-next-line no-use-before-define
  ready();
}

function ready() {
  // eslint-disable-next-line no-var
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  // eslint-disable-next-line vars-on-top,block-scoped-var,no-var,no-plusplus
  for (var i = 0; i < addToCartButtons.length; i++) {
    // eslint-disable-next-line block-scoped-var,no-var,vars-on-top
    var button = addToCartButtons[i];
    // eslint-disable-next-line no-use-before-define,block-scoped-var
    button.addEventListener('click', addToCartClicked);
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  // eslint-disable-next-line no-var,block-scoped-var,vars-on-top,no-plusplus,no-redeclare
  for (var i = 0; i < quantityInputs.length; i++) {
    // eslint-disable-next-line block-scoped-var
    const input = quantityInputs[i];
    // eslint-disable-next-line no-use-before-define
    input.addEventListener('change', quantityChanged);
  }

  // eslint-disable-next-line no-var,no-redeclare,vars-on-top
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  // eslint-disable-next-line no-var,vars-on-top,block-scoped-var,no-redeclare,no-plusplus
  for (var i = 0; i < addToCartButtons.length; i++) {
    // eslint-disable-next-line no-var,block-scoped-var,no-redeclare,vars-on-top
    var button = addToCartButtons[i];
    // eslint-disable-next-line block-scoped-var,no-use-before-define
    button.addEventListener('click', addToCartClicked);
  }
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement.parentElement;
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  // eslint-disable-next-line no-use-before-define
  addItemToCart(title, price, imageSrc);
  // eslint-disable-next-line no-use-before-define
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cartItemNames.length; i++) {
    // eslint-disable-next-line eqeqeq
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart');
      return;
    }
  }
  const cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  // eslint-disable-next-line no-use-before-define
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0];
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    const price = priceElement.innerText;
    const quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = total;
}

function quantityChanged(event) {
  const input = event.target;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
