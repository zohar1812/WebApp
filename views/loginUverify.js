const config=require('‪..config.js');
const index=require('‪..index.js');

function loginV(req,res) {
    let sql = "Select * from users where id =`" + req.body.usn + "'";
    let query = config.connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.redirect('login', {error: 'user '});
        } else {
            var ans = psw_varify(req, res, result[0]);
            if (ans)
                print("welcome!!");
            else
                print("no user found!");
        }
    });
}

function psw_varify(req,res,result) {
   if(req.body.psw!=result.body.password)
       return 0;
   return 1;
}



