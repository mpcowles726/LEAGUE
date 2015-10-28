
$(document).ready(function() {
console.log('clientside js connected');


var signupData = $("#signup-form").serialize();
console.log(signupData);

var loginData = $("#login-form").serialize();
console.log(loginData);

$('#signup-form').submit(function() {
	console.log('submitted');

  $.post('/users', signupData, function(response){
    console.log(response);
  });
});

$('#login-form').submit(function () {
	$.post('/sessions', loginData, function(response) {
		console.log(response);
	});
});



});