// /* global $ */

$(document).ready(function(){	
	$('#statusInput').keypress((event) =>{
		if(event.which == 13){
			if($('#statusInput').val().length > 0){
				createStatus();
			}
		}
	});
});

//create function
function createStatus(){
	var userInput = $('#statusInput').val();
	$.post('/api/status', {status: userInput})
	.then((newStatus) => {
		addStatus(newStatus)
	})
	.catch((err) =>{
	 console.log(err)
	})
}