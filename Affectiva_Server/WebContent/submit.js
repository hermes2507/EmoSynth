function submit() {
	$('#submit').click(function()
		{
		$.ajax({
			url: InterCom,
			type:'POST',
			data:
			{
				email: email_address,
				message: message
			},
        /**success: function(msg)
        {
        		alert('Email Sent');
        	}**/
    	});
	});
}