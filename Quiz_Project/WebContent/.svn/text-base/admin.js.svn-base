$(document).ready(function(){
	//hide panels
	$("#quizzes").hide();
	$("#announcements").hide();
	$("#reportedQuizzes").hide();
	
	fillQuizListByCategory("ALL");
	
	$("#usersButton").click(function(){
		$("#users").show();
		$("#quizzes").hide();
		$("#announcements").hide();
		$("#reportedQuizzes").hide();
	});
	
	$("#quizzesButton").click(function(){
		$("#quizzes").show();
		$("#users").hide();
		$("#announcements").hide();
		$("#reportedQuizzes").hide();
	});
	
	$("#reportedQuizzesButton").click(function(){
		$("#reportedQuizzes").show();
		$("#quizzes").hide();
		$("#users").hide();
		$("#announcements").hide();
	});
	
	$("#announcementsButton").click(function(){
		$("#announcements").show();
		$("#quizzes").hide();
		$("#users").hide();
		$("#reportedQuizzes").hide();
	});
	
	$("#quizSelector").change(function() {
		fillQuizListByCategory($(this).val());
	});
	
	$(".quizRowClickable").live("click", function(){
		location.href="quizInfo.jsp?quizID=" + $($(this).find("input").get(0)).val();
	});
	
});

function deleteUser(userID){
	$.ajax({
		url:"AdminDeleteUserServlet",
		data: {
			"userID":userID
		}
	});
}

function promoteUser(userID){
	$.ajax({
		url:"AdminPromoteUserServlet",
		data: {
			"userID":userID
		}
	});
}

function fillQuizListByCategory(category){
	$("#quizList").load("AdminRetrieveQuizListServlet", {"category":category});
}

function deleteQuiz(quizID){
	$.ajax({
		url:"AdminDeleteQuizServlet",
		data: {
			"quizID":quizID
		},
		success: function(){
			$("#quizList").load("AdminRetrieveQuizListServlet", {"category":$("#quizSelector").val()});
		}
	});
}

function resetQuiz(quizID){
	$.ajax({
		url:"AdminResetQuizServlet",
		data: {
			"quizID":quizID
		}
	});
}