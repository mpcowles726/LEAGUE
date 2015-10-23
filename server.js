//REQUIREMENTS
var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser');



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









//LISTENING ON PORT 3000
app.listen(3000, function () {
	console.log('listening on port 3000');
});
