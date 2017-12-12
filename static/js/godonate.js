$(document).ready(function(){

	// $('#signupsegment').hide();

	// $('#signupbtn1').click(function(event){
	// 	event.preventDefault();
	// 	$('#loginsegment').hide();
	// 	// $('#signupsegment').show()
	// 	$('#signupsegment').show(1000);
	// });

	

	$('#loginbtn').click(function(event) {
  		event.preventDefault();
	
		$.ajax({
		type: "POST",
		url: "validate",
		dataType : "json",
		data: {
			"username": $("#username").val(),
			"password": $("#password").val(),
			"csrfmiddlewaretoken": $("[name='csrfmiddlewaretoken']").val()
		},
		success : function(data) { 
			if (data.success){
				window.location.href = data.url;
			}
			else{
				alert(data.errors);
			}
		}
	});
	}); 

	$('#signupbtn').click(function(event){

		$.ajax({
			type : "POST",
			url : "adduser",
			dataType : "json",
			data: {
				"username" :$("#username").val(),
		    	"firstname": $("#firstname").val(),
		    	"lastname": $("#lastname").val(),
				"email": $("#email").val(),
				"password":$("#password").val(),
				"gender":$("[name='gender']").val(),
				"csrfmiddlewaretoken": $("[name='csrfmiddlewaretoken']").val(),
			},
			success : function(data){
				if (data.success){
					alert('User SignedUp Successfully');
	;				window.location.href = data.url;
				}
				else{
					alert(data.error);
				}
			}
		});
	});

	$('.formcancel').click(function(event){
	    $(".createcamp").slideUp("slow");

	});
	

	$('.progress').progress('set progress', parseInt($(".percent").val()));

	$('.ui.dropdown').dropdown();

 	$('.ui.accordion').accordion();

	$('.textinput').children().keyup(function(event){
		var wallet = parseInt($(".wallet").val());
		var total = 0;	
		$('.singleamount').each(function(){
			if ($(this).val().length == 0){
				total += 0;
			}
			else{
				total += parseInt($(this).val());
			}
			if (total > wallet){

				amt = total - wallet;
				exceed = parseInt($(this).val()) - amt;
				$('.donatebuttonmanually').prop('disabled', true);
				alert('you have only $' + exceed + ' left in your wallet').delay(1000).fadeOut();
			}
			else{
				$('.donatebuttonmanually').prop('disabled', false);
			}

		});
		$(".fval").text(total);

		// alert(wallet);
	});		


});