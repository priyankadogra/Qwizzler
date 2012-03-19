$(document).ready(function(){
	$("#likesButton").click(function(){
		//$("#likesResult span").html("<img src='loading.gif'/>");
		$("#likesButton").hide();
		$("#dislikesButton").hide();
		$.ajax({
			url:"LikeDislikeServlet",
			data: {
				'likeDislike':'true',
				'quizID':$("#quizID").val()
			},
			success: function(data){
				$("#likesResult span").html("Liked");
				$("#likesResult").show();
			}
		});
	});
	$("#dislikesButton").click(function(){
		//$("#likesResult span").html("<img src='loading.gif'/>");
		$("#likesButton").hide();
		$("#dislikesButton").hide();
		$.ajax({
			url:"LikeDislikeServlet",
			data: {
				'likeDislike':'false',
				'quizID':$("#quizID").val()
			},
			success: function(data){
				$("#likesResult span").html("Disliked");
				$("#likesResult").show();
			}
		});
	});
});



/************Challenging A Friend***************/

function challengeAFriend(){
	$.ajax({
		url:"GetFriendsForChallengeServlet",
		dataType: "html",
		success: function(data){
					createPopUp(data);
				}
	});
}

function createPopUp(data){
	var quizID = $("#quizID").val();
	var quizName = $("#quizName").val();
	
	var newMessage ="<form method=\"post\" action=\"SendChallengeServlet\">" +
		"<input type=\"hidden\" name=\"quizID\" value=\""+quizID+"\"/>"+
		"<span id=\"newMessageTitle\">New Challenge</span><br/>" +
		"Select friends to challenge:<br/>" +
		data+
		"<button type=\"button\" id=\"popUpCancelButton\">Cancel</button>" +
		"<button type=\"submit\">Send</button>" +
		"</div>" +
	"</form>";

	buildPopUp(newMessage);
}
