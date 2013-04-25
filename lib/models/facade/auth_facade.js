var sechash = require("sechash")
var User = require("../../model.js").User;

var authFacade = {
    auth: function(req, res){
      try {
        if (req.body && req.body.userid && req.body.pass) {
          // Find user by userid
          User.find({userid: req.body.userid}, function (err, users) {
            if (err) throw "[ERROR] User find err";
            if (users.length == 0) {
              // New user
              var hash = sechash.basicHash('sha1', req.body.pass);  // random salt
              var user = new User();
              user.userid     = req.body.userid;
              user.hash       = hash;
              user.created_at = new Date();
              user.save(function (err) {
                console.log("create!!");
                console.log(err);
                if (err) throw "[ERROR] User save error.";
                res.send("New user added!");
              });
            } else if (users.length == 1) {
              // Known user
              if (sechash.testBasicHash('sha1', req.body.pass, users[0].hash)) {
                console.log("login success!!");
                res.send("Login success");
              } else {
                res.send("Login failed.");
              }
            } else {
              throw "[ERROR] Found users with same userid";
            }
          });
        } else {
          throw "[ERROR] No post body"
        }
      } catch (e) {
        console.log(e);
        res.send('Internal Server Error');
      }
    }
}
module.exports = authFacade;