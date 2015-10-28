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

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 this.findOne({email: email}, function (err, foundUser) {
   console.log(foundUser);

   // throw error if can't find user
   if (!foundUser) {
     console.log('No user with email ' + email);
     callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
   // if we found a user, check if password is correct
   } else if (foundUser.checkPassword(password)) {
     callback(null, foundUser);
   } else {
     callback("Error: incorrect password", null);
   }
 });
};

var User = mongoose.model('User', userSchema);


module.exports = User;