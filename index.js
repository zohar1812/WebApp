const path = require('path');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const rec = require('./public/javascripts/reconstruction');
const register = require('./public/javascripts/registration.js');
const loginToSys = require('./public/javascripts/loginUverify');
const productTable = require('./models/products');
const toMainPage = require('./public/javascripts/mainPage');
// eslint-disable-next-line no-unused-vars
const productAction = require('./public/javascripts/product');
const config = require('./config.js');

const app = express();

let user = {};
app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// toMainPage.getAllAvailableProducts();

app.get('/', (req, res) => {
  toMainPage.getAllAvailableProducts((result) => {
    res.render('home', {
      user,
      products: result,
    });
  });
});

app.get('/sorted/:attr', (req, res) => {
  const { attr } = req.params;
  toMainPage.getAllAvailableProducts((result) => {
    // eslint-disable-next-line no-param-reassign
    toMainPage.availableProducts = result.sort((a, b) => (a[attr] > b[attr] ? 1 : -1));
    res.render('home', { products: result });
  });
});


app.post('/filter', (req, res) => {
  toMainPage.getAllAvailableProducts((result) => {
    result = toMainPage.filterProducts(result, req.body.parameter, req.body.keyword);
    res.render('home', { products: result });
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
    errors: {
    },
  });
});
app.post('/forgot/user', (req, res) => {
  rec.recover(req, (result) => {
    res.render('forgot-password-question', {
      title: 'user',
      user: {
        id: result.user.id,
        username: result.user.username,
        ans: result.user.ans,
      },
      messages: {
      },
    });
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
      messages: {
      },
    });
  } else {
    res.render('forgot-password-question', {
      user: {
        username: req.body.username,
        id: req.params.id,
        ans: req.body.usersans,
      },
      messages: {
        error: 'The answer is wrong',
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
      messages: {
        error: errors.password,
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
      user = {
        id: result.user.id,
        username: result.user.username,
        type: result.user.type,
      };
      if (user.type == 'admin') {
        res.render('/adminpage');
      } else {
        res.redirect('/');
      }
    }
  });
});


app.listen(3000, () => {
  console.log('Server is running at port 8000');
});
