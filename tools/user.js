/**
 * tools user.js
 */
var mongoose = require('mongoose')
    ,env = process.env.NODE_ENV || 'development'
    ,config = require('../conf/config')[env]
    ,Schema   = mongoose.Schema
    ,sechash = require("sechash");

// mongo connect
mongoose.connect(config.db);

var UserSchema = new Schema({
    userid:     {type: String, unique: true},
    hash:       String,
    created_at: Date
});

var User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function (next){
    console.log("save done!!");
    next();
});


var test = [
    {userid: 'test1', hash:sechash.basicHash('sha1', 'test1'), created_at:new Date()}
    ,{userid: 'test2', hash:sechash.basicHash('sha1', 'test2'), created_at:new Date()}
];

User.create(test, function(err, res){
    if(err) console.log(err);
    mongoose.disconnect();
});






