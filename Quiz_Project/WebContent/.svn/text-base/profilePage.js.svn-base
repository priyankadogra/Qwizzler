$(document).ready(function(){
	$("#profileGlimpse").load('ProfilePageServlet?fetch=getUserDetails&userToDisplay='+$("#userToDisplay").val(), 
		function(){
			$("#friends").load('ProfilePageServlet?fetch=getFriends&userToDisplay='+$("#userToDisplay").val(),
				function(){
					$("#userAchievements").load('ProfilePageServlet?fetch=getUserAchievements&userToDisplay='+$("#userToDisplay").val(),
						function(){
						$("#quizzes").load('ProfilePageServlet?fetch=getQuizzesCreated&userToDisplay='+$("#userToDisplay").val());
					});
				});
		});
});

function addFriendButton(){
	$("#friendButton").load('AddFriendServlet?userToDisplay='+$("#userToDisplay").val(),
		function(response){
			$('#friendButton').hide();
			$('#profileInfo').append(response);
	});
}

function delFriendButton(){
	$("#delFriendButton").load('DeleteFriendServlet?userToDelete='+$("#userToDisplay").val(),
		function(response){
			$('#delFriendButton').hide();
			$('#friendButton').show();
	});
}