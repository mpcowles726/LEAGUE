
$(document).ready(function() {
console.log('clientside js connected');
$(".partials").children().hide();

$("#playerList").children().on("click", function(e){
	e.preventDefault();
	console.log("help");
	$(".partials").children().hide();
	console.log(this);
	var classString = ".partials ." + $(this).attr('class');
	console.log(classString);
	$(classString).show();

	//$(".Marcus").show();
//	$(classString).show();
})
// var franklin = ('<% include (./partials/Franklin) %>');
	
// $("#Franklin").click(function () {
// 	$("#partials").append(franklin);

	
	
// });
	
	







});
