
/*
 * GET home page.
 */

exports.index = function(req, res){
    // var authFacade = require("../lib/models/facade/auth_facade");
    // !req.body.userid || authFacade.auth(req, res, function(err, users){
    //     console.log("callback!!");
    //     // console.log(users);
    //     // res.render('success', {title:'Express'});
    //     // res.redirect('/');
    //     return ;
    // });
    res.render('index', { title: 'Express' });
};


exports.check = function(req, res){
    var authFacade = require("../lib/models/facade/auth_facade");
    authFacade.auth(req, res, function(req){
        console.log(req);
        res.redirect('/');
    });
}

exports.success = function(req, res){
    console.log("success!!");
    res.render('success', { title: 'Express' });
};








