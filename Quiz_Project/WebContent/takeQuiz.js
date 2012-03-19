$(document).ready(function(){
	fillQuizListByCategory("ALL");
	
	$("#quizSelector").change(function() {
		fillQuizListByCategory($(this).val());
	});
	
	$(".quizRowClickable").live("click", function(){
		location.href="quizInfo.jsp?quizID=" + $($(this).find("input").get(0)).val();
	});

	$(".quizDelete").live("click", function(){
		var quizID = $($(this).parent().find("input").get(0)).val();
		$(this).html("working...");
		deleteQuiz(quizID);
	});
	
	$(".quizReset").live("click", function(){
		var quizID = $($(this).parent().find("input").get(0)).val();
		$(this).html("working...");
		resetQuiz(quizID);
		
	});
	
	
	$("#allCategoriesIcon").click(function(){
		fillQuizListByCategory("ALL");
		$("#quizSelector").val("ALL");
	});
	$("#historyIcon").click(function(){
		fillQuizListByCategory("HISTORY");
		$("#quizSelector").val("HISTORY");
	});
	$("#geographyIcon").click(function(){
		fillQuizListByCategory("GEOGRAPHY");
		$("#quizSelector").val("GEOGRAPHY");
	});
	$("#entertainmentIcon").click(function(){
		fillQuizListByCategory("ENTERTAINMENT");
		$("#quizSelector").val("ENTERTAINMENT");
	});
	$("#mathIcon").click(function(){
		fillQuizListByCategory("MATH_AND_SCIENCE");
		$("#quizSelector").val("MATH_AND_SCIENCE");
	});
	$("#literatureIcon").click(function(){
		fillQuizListByCategory("LITERATURE");
		$("#quizSelector").val("LITERATURE");
	});
	$("#sportsIcon").click(function(){
		fillQuizListByCategory("SPORTS");
		$("#quizSelector").val("SPORTS");
	});
	$("#languageIcon").click(function(){
		fillQuizListByCategory("LANGUAGE");
		$("#quizSelector").val("LANGUAGE");
	});
	$("#justForFunIcon").click(function(){
		fillQuizListByCategory("JUST_FOR_FUN");
		$("#quizSelector").val("JUST_FOR_FUN");
	});
	$("#religionIcon").click(function(){
		fillQuizListByCategory("RELIGION");
		$("#quizSelector").val("RELIGION");
	});
	$("#moviesIcon").click(function(){
		fillQuizListByCategory("MOVIES");
		$("#quizSelector").val("MOVIES");
	});
	$("#televisionIcon").click(function(){
		fillQuizListByCategory("TELEVISION");
		$("#quizSelector").val("TELEVISION");
	});


});

function fillQuizListByCategory(category){
	$("#quizList").load("RetrieveQuizListServlet", {"category":category});
}

function deleteQuiz(quizID){
	$.ajax({
		url:"AdminDeleteQuizServlet",
		data: {
			"quizID": parseInt(quizID)
		},
		success:function(){
			$("#quizRow" + quizID).slideToggle();
		}
	});
}

function resetQuiz(quizID){
	$.ajax({
		url:"AdminResetQuizServlet",
		data: {
			"quizID": parseInt(quizID)
		},
		success:function(){
			$("#quizRow" + quizID).find(".quizReset").html("Cleared");
		}
	});
}