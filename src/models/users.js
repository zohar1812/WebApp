const config = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\config.js');

const getUser = function getUser(userName){
    let sql = `Select * from users where id = ${userName}`;
    let query = config.connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/update', {
            title : 'user is',
            user : result[0]
        });
    });
}

const saveNewUser = function saveUser(data,res) {
    let sql = "INSERT INTO users SET ?";
    let query = config.connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
}


// const updatePassword = function(userName,newPassword){
//     let sql = `update users SET password = ''+newPassword where username =${userName}`;
//     let query = config.connection.query(sql,(err, results) => {
//         if(err) throw err;
//         res.redirect('/');
//     });
// }

exports.saveUser = saveNewUser;
exports.getUser = getUser;