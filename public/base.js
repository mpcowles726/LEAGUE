
$(document).ready(function() {
console.log('clientside js connected');


var signupData = $("#signup-form").serialize();
console.log(signupData);

$('#signup-form').submit(function() {
	console.log('submitted');

  $.post('/users', signupData, function(response){
    console.log(response);
  });
});





});