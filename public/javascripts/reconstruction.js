const users = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\src\\models\\users.js');
const user = require('C:\\Users\\Nastya\\WebstormProjects\\WebApp\\src\\models\\users.js');

function recover(req, res, resultProcessorCallBack) {
        user.getUserByName(req.body.username, function (userFromDb) {
                let result;
                if(userFromDb.length == 0){
                        result = {
                                id: null,
                                error: 'No such user exists'
                        }
                }else {
                        result = {
                               user: userFromDb
                        }
                }
                resultProcessorCallBack(result);

        })
}

function validAns(ans,userAns) {
        if(ans == userAns){
                return true;
        }
        return false;
}

function updatePassword(userName,password){

        user.updateUserPassword(userName,password);
}
module.exports.recover= recover;
module.exports.validAns=validAns;