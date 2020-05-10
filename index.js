const path = require('path');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const bodyParser = require('body-parser');
const user = require('./models/users');
const rec = require('./public/javascripts/reconstruction');
const register = require('./public/javascripts/registration.js');
const config = require('./config.js');

const app = express();


app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.render('login', {
  errors: {
  },
}));

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
// app.get('/forgot/question/user/:id',(req,res)=>{
//     res.render('forgot-password-question',(req,res)=>{
//         errors: {
//         }});
// });
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


function psw_varify(req, res, result) {
  if (req.body.psw != result.password) return 0;
  return 1;
}

app.post('/loginverify', (req, res) => {
  const sql = `Select * from users where username ='${req.body.usn}'`;
  // eslint-disable-next-line no-unused-vars
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    // eslint-disable-next-line eqeqeq
    if (result.length === 0) {
      res.redirect('login', { error: 'user ' });
    } else {
      const ans = psw_varify(req, res, result[0]);
      if (ans) {
        // eslint-disable-next-line no-console
        console.log('great!');
      } else console.log('no!!');
    }
  });
});
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
