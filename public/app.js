// /* global $ */

$(document).ready(function(){	
		$('#statusInput').keypress(function(event){
			if(event.which == 13){
				createStatus();
			}
		});
	});

//create function
	function createStatus(){
		var userInput = $('#statusInput').val();
		$.post('/api/status', {status: userInput})
		.then(function(newStatus){
			addStatus(newStatus)
		 })
  		.catch(function(err){
   		 console.log(err);
  		})
	}