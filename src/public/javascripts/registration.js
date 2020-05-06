const config = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\config.js');
const users = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\src\\models\\users.js');


function registrationUser(req,res){
    let data;
    if(req.body.studentID != null){
    data = {id:req.body.ID, name: req.body.name, lastName: req.body.lastName, studentID: req.body.studentID,
        userName: req.body.username, password: req.body.password,type:'student',ans:req.body.ans};
    }
    else{
        data = {id: req.body.ID, name: req.body.name, lastName: req.body.lastName,
            userName: req.body.username, password: req.body.password ,type:'regular',ans:req.body.ans};
    }
    users.saveUser(data,res);
}



module.exports.registrationUser = registrationUser;