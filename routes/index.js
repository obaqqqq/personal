
/*
 * GET home page.
 */

exports.index = function(req, res){
    var authFacade = require("../lib/models/facade/auth_facade");
    !req.body.userid || authFacade.auth(req, res, function(req, res){
        console.log("callback!!");
        res.render('success', {title:'Express'});
    });
    res.render('index', { title: 'Express' });
};


exports.check = function(req, res){
    var authFacade = require("../lib/models/facade/auth_facade");
    authFacade.auth(req, res, function(req){
        console.log(req);
    });
    console.log(req.sessionID);
    console.log(req.session.flg);
    console.log("check!");
    res.redirect('/');
    // res.render('success', {title: 'Express'});
}


/*
 * GET success page.
 */

exports.success = function(req, res){
    console.log("success!!");
    res.render('success', { title: 'Express' });
};








