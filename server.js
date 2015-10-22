//REQUIREMENTS
var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser');

require('dotenv').load();

var FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
console.log(FOOTBALL_API_KEY);

//CONFIG
//SET EJS AS VIEW ENGINE
app.set('view engine', 'ejs');
//SERVE JS AND CSS FILES
app.use('/static', express.static('public'));
//BODY PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index');
});










app.listen(3000, function () {
	console.log('listening on port 3000');
});
