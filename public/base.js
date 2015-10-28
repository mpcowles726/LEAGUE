
$(document).ready(function() {
console.log('clientside js connected');




var loginData = $("#login-form").serialize();
console.log(loginData);


$('#signup-form').submit(function() {
	var signupData = $("#signup-form").serialize();
//	console.log(signupData);
	console.log('submitted');

  $.post('/users', signupData, function(response){
    console.log(response);
  }).done( console.log('done')  );
}).validate();

$('#login-form').submit(function () {
	$.post('/api/sessions', loginData, function(response) {
		console.log(response);
	}).validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: true
		},
	});
});



});