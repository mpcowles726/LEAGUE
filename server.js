//REQUIREMENTS
var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	User = require('./models/user'),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	ejs = require('ejs');

mongoose.connect('mongodb://localhost/league');

//CONFIG
//SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');
//SERVE JS AND CSS FILES
app.use(express.static('public'));
//BODY PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index');
});
//SIGNUP ROUTE
app.get('/signup', function (req, res) {
	res.render('signup');
});

//LOGIN ROUTE
app.get('/login', function (req,res) {
	res.render('login');
}); 


//CREATE USER ROUTE
app.post('/users', function (req, res) {
	console.log('request body: ', req.body);
	User.createSecure(req.body.email, req.body.password, function (err, user) {
		res.json(user);
	});
		});

app.get('/users', function (req, res) {
		User.find(function (err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
});
app.get('/users', function (req, res) {
		User.findById(req.params.user_id, function (err, user) {
			if(err)
				res.send(err);
			res.json(user);
		});
	});

//LOGIN ROUTES
app.post('/sesions', function (req, res) {
	console.log(req);
	User.authenticate(req.body.email, req.body.password, function (err, user) {
    res.json(user);
  });
});








//LISTENING ON PORT 3000
app.listen(3000, function () {
	console.log('listening on port 3000');
});
