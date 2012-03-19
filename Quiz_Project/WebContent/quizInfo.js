/**
 * 
 */

$(document).ready(function(){
	
	$("#tpToday").hide();
	
	$(".tpFilter").click(function(){
		var str = $(this).html();
		if($(this).html() == "Overall"){
			$(this).addClass("active");
			$(this).siblings(".tpFilter").removeClass("active");
			$("#tpOverall").show();
			$("#tpToday").hide();
		} else {
			$(this).addClass("active");
			$(this).siblings(".tpFilter").removeClass("active");
			$("#tpOverall").hide();
			$("#tpToday").show();
		}
	});
	
	$("#likesResult").hide();
	
	$("#likesButton").click(function(){
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

function deleteQuiz(quizID){
	$.ajax({
		url:"AdminDeleteQuizServlet",
		data: {
			"quizID":quizID
		},
		success: function(){
			location.href="takeQuiz.jsp";
		}
	});
}

function reportQuiz(quizID){
	$.ajax({
		url:"ReportQuizServlet",
		data: {
			"quizID":quizID
		},
		success: function(){
			location.href="takeQuiz.jsp";
		}
	});
}

function takeQuiz(quizID){
	location.href="quiz.jsp?quizID=" + quizID;
}