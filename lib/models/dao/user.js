/**
 * User.js
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
    userid:     {type: String, unique: true},
    hash:       String,
    created_at: Date
});


UserSchema.pre('save', function (next){
    console.log("save done!!");
    next();
});

module.exports = mongoose.model('User', UserSchema);
