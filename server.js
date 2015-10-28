//REQUIREMENTS
var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	db = require('./models'),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	ejs = require('ejs'),
	session = require('express-session');
	
  	require('dotenv').load();

 mongoose.connect(process.env.MONGOLAB_URL || process.env.MONGOHQ_URL || "mongodb://localhost/LEAGUE");

//CONFIG

//SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');
//SERVE JS AND CSS FILES
app.use(express.static('public'));
//BODY PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
//SET SESSIONS OPTIONS
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'SuperSecretCookie',
	cookie: {maxAge: 30 * 60 * 1000}}));


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
	db.User.createSecure(req.body.email, req.body.password, function (err, user) {
		if (err)
			res.send (err);



	});
	//res.redirect('/');
});

app.get('/users', function (req, res) {
		User.find(function (err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
});

//ROUTE TO FIND A USER
app.get('/users', function (req, res) {
		db.User.findById(req.params.user_id, function (err, user) {
			if(err)
				res.send(err);
			res.json(user);
		});
	});

app.get('/profile', function (req, res) {
	db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
		res.render('index.ejs', {user: currentUser});
	});
});

//LOGIN ROUTES
app.post('/sessions', function (req, res) {
	console.log(req);
	User.authenticate(req.body.email, req.body.password, function (err, user) {
	if (err) {
		res.send(err);
	} else if (user) {
	req.sessions.user = user;
	console.log(user);
    res.redirect('/');
  }
});
});

//LOGOUT ROUTE
app.get('/logout', function (req, res) {
	req.session.userId = null;
	res.redirect('/');
});

//ROUTE TO USER PROFILE PAGE
app.get('/profile', function (req, res) {
	if (req.session.userId === undefined) {
		console.log('user not found');
		res.redirect('/');
	} else {
		User.findOne({Name: req.session.userId}), function (err, currentUser) {
			if (err) {
				console.log('database error: ' , err);
				res.redirect('/');
			} else {
				console.log('loading profile of ', currentUser);
				res.render('/profile');
			}
		}
	}
});







//LISTENING ON PORT 3000
app.listen(process.env.PORT || 5000);


