console.log(__dirname);

var path = require('path');
var auth = require(path.resolve(__dirname, '../lib/models/facade/auth_facade'));
/**
 * login
 */

exports.login = function(req, res, next){
    auth.login(req, res, function(){
        next();
    });
};






/*
var User = require("../lib/models/dao/user.js");
var sechash = require("sechash");
module.exports = function(req, res, next){
    var method = req.method.toLowerCase();  // メソッド名取得
    var user = req.body.userid;
    var pwd = req.body.pass;
    var logout = (method === 'delete');
    var login = (method === 'post' && user);
console.log(method);
    routes = req.app.routes[method];
console.log(routes);
    if(!routes){ next(); return;}
    if(login || logout){
        routes.forEach(function(route){
            if(!(req.url.match(route.regexp))){
                // urlマッチしない場合
                req.method = 'GET';
            }
        });
    }
    if(logout){
        delete req.session.user;
    }
    if(login){
        User.find({userid:user}, function(err, users){
            if(users.length == 0){
                // 返り値なし
                req.url = '/';
                console.log("user not found");
            }else{
                if(sechash.testBasicHash('sha1', pwd, users[0].hash)){
                    req.session.flg = true;
                    req.session.user = {
                        userid: users[0].userid,
                        pwd : users[0].hash
                    }
                    console.log("login success!!");
                }else{
                    req.url = '/';
                    console.log("login error");
                }
            }
        });
        if(!req.session.user){
            req.url = '/';
        }
    }
    next();
}
*/



