
$(document).ready(function() {
console.log('clientside js connected');
var franklin = ('<% include (./partials/Franklin) %>');
	
$("#Franklin").click(function () {
	$("#partials").append(franklin);

	
	
});
	
	







});


ejs.render(string, options);