var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	fname: String,
	username: String,
	password: String,
	image: {
		type: String,
		default: 'https://img.pngio.com/user-logos-user-logo-png-1920_1280.png'
	}
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);