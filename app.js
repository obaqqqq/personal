
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , path = require('path')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./conf/config')[env]
  , mongoose = require('mongoose');


// mongo connect
mongoose.connect(config.db);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 2000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cookie phrase'));
  app.use(express.session({
    cookie: {
      secure:true,
      maxAge: 60000 * 20},
    secret: 'keyboard cat'
  }));
  // app.use(express.csrf());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function csrf(req, res, next){
  res.locals.token = req.session._csrf;
  next();
}

/*
app.get('/', csrf, function(req, res){
  if(req.session.flg===true){
    console.log("test");
    routes.success(req, res);
  }else{
    routes.index(req, res);
  }
});

app.get('/check', csrf, function(req, res){
  if(req.session.flg===true){
    routes.success(req, res);
  }else{
    routes.check(req, res);
  }
});
app.post('/check', csrf, function(req, res){
  if(req.session.flg===true){
    routes.success(req, res);
  }else{
    routes.check(req, res);
  }
})



app.post('/', csrf, function(req, res){
  console.log(req.session);
  if(req.session.flg===true){
    routes.success(req, res);
  }else{
    routes.index(req, res);
  }
});


*/


app.get('/', function(req, res){
  if(req.session.flg===true){
    routes.success(req, res);
  }else{
    routes.index(req, res);
  }
})

app.post('/check', routes.check);

// app.get('/', csrf, routes.index);
// app.post('/', csrf, function(req, res){
//   if(req.session.flg){
//     res.write("test");
//     routes.index;
//   }else{
//     res.write("test");
//     routes.index;
//   }
// });

app.get('/users', csrf, user.list);

var options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

https.createServer(options, app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



// https.createServer(options, function(req, res){
//     console.log("Express server listening on port " + app.get('port'));
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(app.get('port'));


// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });
