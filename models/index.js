var mongoose = require('mongoose');
var User = require('./user');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/LEAGUE");
module.exports.User = User;

var test = mongoose.connection;
	
	test.on('error', console.error.bind(console, 'connection error'));
	test.once('open', function (callback) {
		console.log('CONNECTED TO MONGO');
		console.log('');
		console.log('ALL GOOD');
	});