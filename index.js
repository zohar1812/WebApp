const path = require('path');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const http = require('http');
const rec = require('./public/javascripts/reconstruction');
const register = require('./public/javascripts/registration.js');
const loginToSys = require('./public/javascripts/loginUverify');
const productTable = require('./models/products');
const toMainPage = require('./public/javascripts/mainPage');
// eslint-disable-next-line no-unused-vars
const productAction = require('./public/javascripts/product');
const orderAction = require('./public/javascripts/order');
const orderProductTable = require('./models/productOrder');
const orderTable = require('./models/order');
const paymentAction = require('./public/javascripts/payment');
const incomeByTape = require('./models/incomeByType');
const port = process.env.Port || 3000
const app = express();
let cartID = 0;
const userInf = {};
let productOrder = [];
app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
function onRequest(request, response) {
  response.writeHead(200, { 'content-Type': 'text/plain' });
  response.write('hello word');
  response.end();
}
// toMainPage.getAllAvailableProducts();
// eslint-disable-next-line no-undef
// http.createServer(onRequest).listen(process.env.PORT || 3000, function () {
//   // eslint-disable-next-line max-len
//   console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
// });
// app.listen(process.env.PORT || 3000, function () {
// eslint-disable-next-line max-len
// console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
// });
// app.listen(8000, () => {
//   console.log('Server is running at port 8000');
// });

app.get('/', (req, res) => {
  toMainPage.getAllAvailableProducts((result) => {
    res.render('home', {
      user: userInf,
      cart: cartID,
      order: productOrder,
      products: result,
    });
  });
});

app.get('/sorted/:attr', (req, res) => {
  const { attr } = req.params;
  toMainPage.getAllAvailableProducts((result) => {
    // eslint-disable-next-line no-param-reassign
    toMainPage.availableProducts = result.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
    res.render('home', {
      user: userInf,
      cart: cartID,
      order: productOrder,
      products: result,
    });
  });
});


app.post('/filter', (req, res) => {
  toMainPage.getAllAvailableProducts((result) => {
    // eslint-disable-next-line no-param-reassign
    result = toMainPage.filterProducts(result, req.body.parameter, req.body.keyword);
    res.render('home', {
      user: userInf,
      cart: cartID,
      order: productOrder,
      products: result,
    });
  });
});

app.get('/cancelfilter', (req, res) => {
  res.redirect('/');
});

app.get('/adminpage', (req, res) => {
  productTable.getAllProducts((result) => {
    res.render('admin', { products: result });
  });
});

app.get('/edit/:productId', (req, res) => {
  productTable.getProductByID(req.params.productId, (result) => {
    res.render('edit-product', {
      products: result[0],
    });
  });
});
app.post('/edit/:productId', (req, res) => {
  productAction.editProduct(req.params.productId, req.body);
  res.redirect(`/edit/${req.params.productId}`);
});

app.get('/add/product', (req, res) => {
  res.render('addProduct');
});

app.post('/add/product', (req, res) => {
  productAction.addProduct(req.body);
  res.render('admin');
});

app.get('/delete/product/:productId', (req, res) => {
  productAction.deleteProduct(req.params.productId);
  res.redirect('admin');
});


app.get('/registration', (req, res) => {
  res.render('registration', {
    errors: {
    },
  });
});

app.post('/save', (req, res) => {
  register.createUser(req, (errors) => {
    if (errors) {
      res.render('registration', errors);
    } else {
      res.render('login');
    }
  });
});

app.get('/forgot/user', (req, res) => {
  res.render('forgot-password-username', {
    errors: {},
  });
});
app.post('/forgot/user', (req, res) => {
  rec.recover(req, (result) => {
    if (result.user == null) {
      res.render('forgot-password-username', result);
    } else {
      res.render('forgot-password-question', result);
    }
  });
});

app.post('/forgot/question/user/:id', (req, res) => {
  if (rec.validAns(req.body.ans, req.body.userans)) {
    res.render('forgot-password-reset', {
      title: 'valid user',
      user: {
        username: req.body.username,
        id: req.params.id,
      },
      errors: {
      },
    });
  } else {
    res.render('forgot-password-question', {
      user: {
        username: req.body.username,
        id: req.params.id,
        ans: req.body.usersans,
      },
      errors: {
        ans: 'The answer is wrong',
      },
    });
  }
});
app.post('/forgot/reset/user/:id', (req, res) => {
  const errors = rec.updatePassword(req.body.username, req.body.password);
  if (!rec.isEmpty(errors)) {
    res.render('forgot-password-reset', {
      user: {
        username: req.body.username,
        id: req.params.id,
        ans: req.body.ans,
      },
      errors: {
        ans: errors.password,
      },
    });
  } else {
    res.render('login');
  }
});

app.post('/forgot/reset/user/:id', (req, res) => {
  const errors = rec.updatePassword(req.body.username, req.body.password);
  if (!rec.isEmpty(errors)) {
    res.render('forgot-password-reset', {
      user: {
        username: req.body.username,
        id: req.params.id,
        ans: req.body.ans,
      },
      messages: {
        error: errors.password,
      },
    });
  } else {
    res.render('login');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/loginverify', (req, res) => {
  loginToSys.loginV(req.body.username, req.body.password, (result) => {
    if (result.error) {
      res.render('login', result);
    } else {
      userInf.id = result.user.id;
      userInf.username = result.user.username;
      userInf.type = result.user.type;
      // eslint-disable-next-line eqeqeq
      if (userInf.type == 'admin') {
        res.redirect('/adminpage');
      } else {
        // eslint-disable-next-line no-shadow
        orderAction.createCart(userInf.type, (result) => {
          cartID = result.orderId;
          orderProductTable.getProductsByOrderId(result.orderId, (productFromDB) => {
            productOrder = productFromDB;
            res.redirect('/');
          });
        });
      }
    }
  });
});

app.post('/cart/add/:cartId/:productId', (req, res) => {
  orderAction.addProductToCart(req.params.cartId, req.params.productId, req.body.amaount,
    () => {
      orderProductTable.getProductsByOrderId(req.params.cartId,
        (productFromDB) => {
          productOrder = productFromDB;
          console.log(productOrder);
          res.redirect('/');
        });
    });
});

app.get('/payment/:cartId', (req, res) => {
  res.render('payment');
});
app.post('/payment/:cartId', (req, res) => {
  paymentAction.UpdateQuantity(Number(req.params.cartId));
  res.redirect('/endPurchas');
});
app.get('/endPurchas', (req, res) => {
  res.render('endPurchas');
});

app.get('/reportpage', (req, res) => {
  res.render('reportmain', {
    messages: {
    },
  });
});
app.post('/dayrep', (req, res) => {
  orderTable.getOrderByDate(req.body.reportByDay, (result) => {
    // eslint-disable-next-line eqeqeq
    if (result.length == 0) {
      res.render('reportmain', {
        massages: {
          error: 'user ',
        },
      });
    } else {
      res.render('reportmain', {
        messages: {
          titleday: 'report by dat',
          dtype: result,
        },
      });
    }
  });
});


app.post('/reportpage', (req, res) => {
  // eslint-disable-next-line eqeqeq
  if (req.body.radio == 'day') {
    orderTable.getAllOrder((result) => {
      // eslint-disable-next-line eqeqeq
      if (result.length == 0) {
        res.render('reportmain', {
          massages: {
            error: 'user ',
          },
        });
      } else {
        res.render('reportmain', {
          messages: {
            titleday: 'report by product type',
            dtype: result,
          },
        });
      }
    });
    // eslint-disable-next-line eqeqeq
  } else if (req.body.radio == 'ptype') {
    incomeByTape.getIncomeBtType((result) => {
      // eslint-disable-next-line eqeqeq
      if (result.length == 0) {
        res.render('reportmain', { error: 'user ' });
      } else {
        res.render('reportmain', {
          messages: {
            title: 'report by product type',
            body: result,
          },

        });
      }
    });
    // eslint-disable-next-line eqeqeq
  } else if (req.body.radio == 'ctype') {
    orderTable.getAllOrder((result) => {
      // eslint-disable-next-line eqeqeq
      if (result.length == 0) {
        res.render('reportmain', {
          massages: {
            error: 'user ',
          },
        });
      } else {
        res.render('reportmain', {
          messages: {
            title: 'report by product type',
            ctype: result,
          },

        });
      }
    });
  }
});
app.listen(port)
