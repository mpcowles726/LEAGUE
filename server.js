//REQUIREMENTS
var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	db = require('./models/user.js'),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	ejs = require('ejs'),
	session = require('express-session');
	
  	require('dotenv').load();

 mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/LEAGUE");

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

app.get('/profile', function (req, res) {
	res.render('profile');
});


//CREATE USER ROUTE
app.post('/users', function (req, res) {
	console.log('request body: ', req.body);
	db.createSecure(req.body.email, req.body.password, function (err, user) {
		if (err) {
			res.send (err);

		} 
		console.log("the user from createSecure:", user);
		req.session.userId = user._id;
			res.redirect('/profile');	



	});
	//res.redirect('/');
});



//ROUTE TO FIND A USER
app.get('/users', function (req, res) {
		db.findById(req.params.user_id, function (err, user) {
			if(err)
				res.send(err);
			
			res.json(user);
		});
	});



//LOGIN ROUTES
app.post('/session', function (req, res) {
	console.log(req.body);
	db.authenticate(req.body.email, req.body.password, function (err, user) {
	if (err) {
		res.send(err);
	} else if (user) {
	req.session.userId = user._Id;
	console.log(user);
    res.redirect('/profile');
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
		db.findOne({_id: req.session.userId}), function (err, currentUser) {
			if (err) {
				console.log('database error: ' , err);
				res.redirect('/');
			} 
				console.log('loading profile of ', currentUser);
				res.render('profile.ejs', ({currentUser: currentUser}));
			
		};
	}
});

// OAUTH FLOW









//LISTENING ON PORT 3000
app.listen(process.env.PORT || 3000, function () {
	console.log('server started on localhost:3000');
});


