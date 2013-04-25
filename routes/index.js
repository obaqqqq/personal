
/*
 * GET home page.
 */

exports.index = function(req, res){
    var authFacade = require("../lib/models/facade/auth_facade");
    !req.body.userid || authFacade.auth(req, res);
    res.render('index', { title: 'Express' });
};