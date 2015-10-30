var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

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



// authenticate user (when user logs in)
userSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 this.findOne({email: email}, function (err, foundUser) {
   console.log(foundUser);
   if (foundUser === null) {
   	callback('Can\'t find user with email ' + email); }
   		else if (foundUser.checkPassword(password)) {
   		callback(null, foundUser);
   	} else {
   		callback("Error: incorrect password", null);
   	}

   	});
};
userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};


   


var User = mongoose.model('User', userSchema);
module.exports = User;