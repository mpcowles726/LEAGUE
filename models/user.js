var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
	email: String,
	passwordDigest: String
});

userSchema.statics.createSecure = function (email, password, callback) {
	var UserModel = this;

bcrypt.genSalt(function (err, salt) {
	console.log('salt: ', salt);
	bcrypt.hash(password, salt, function (err, hash) {
		UserModel.create({
			email: email,
			passwordDigest: hash
		}, callback);
		});
	});
};

var User = mongoose.model('User', userSchema);


module.exports = User;