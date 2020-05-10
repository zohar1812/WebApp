const user = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\src\\models\\users.js');
const rec = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\src\\public\\javascripts\\reconstruction.js');
const path = require('path');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const bodyParser = require('body-parser');
const register = require('./src/public/javascripts/registration.js');
const config = require('./config.js');

const app = express();


app.use(express.static(`${__dirname}/public`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.render('forgot-password-username', {
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
  register.createUser(req, res);
});

app.get('/forgot/user', (req, res) => {
  res.render('forgot-password-username', {
    errors: {
    },
  });
});
app.post('/forgot/user', (req, res) => {
  rec.recover(req, res, (result) => {
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
      messages: {
      },
      user: {
        username: req.body.username,
        id: user.id,
      },
    });
  } else {
    res.render('forgot-password-question', {
      messages: {
        error: 'The answer is wrong',
      },
      user: {
        username: req.body.username,
        userid: user.id,
        ans: req.body.usersans,
      },
    });
  }
});
app.post('/forgot/reset/user/:id', (req, res) => {
  rec.updatePassword(req.body.username, req.body.password);
  res.render('login');
});


// Server Listening

app.get('/login', (req, res) => {
  res.render('login');
});

function psw_varify(req, res, result) {
  if (req.body.psw != result.password) return 0;
  return 1;
}

app.post('/loginverify', (req, res) => {
  const sql = `Select * from users where username ='${req.body.usn}'`;
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.redirect('login', { error: 'user ' });
    } else {
      const ans = psw_varify(req, res, result[0]);
      if (ans) {
        console.log('great!');
      } else console.log('no!!');
    }
  });
});
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
