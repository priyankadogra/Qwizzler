$(document).ready(function(){
	
	$(".quizRowClickable").live("click", function() {
		location.href = "quizInfo.jsp?quizID=" + $(this).find("input").get(0).value;
	});
	
});

function deleteQuiz(quizID){
	$("#quizRow" + quizID).find(".quizRowDelete").html("working...");
	$.ajax({
		url:"AdminDeleteQuizServlet",
		data: {
			"quizID":quizID
		},
		success: function(){
			$("#quizRow" + quizID).slideToggle();
		}
	});
}