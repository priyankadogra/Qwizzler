
var startTime;
var timeTaken;
var curScore;
var quizID;

$("document").ready(function(){
	quizID = $("#curQuizID").val();
	
	$(".checkButton").live("click", function(){
		$(this).hide();
		var urlString = $(this).parent().parent().parent().attr("action") + "&";
		$(this).parent().siblings().find("input").each(function(){
			urlString += $(this).attr("name") + "=" + $(this).val() + "&";
		});
		$(this).parent().siblings(".questionAnswers").load(urlString);
		$(this).siblings(".nextButton, .finishButton").show();
	});
	
	$(".checkButtonMC").live("click", function(){
		$(this).hide();
		var urlString = $(this).parent().parent().parent().attr("action") + "&";
		$(this).parent().siblings().find(":radio:checked").each(function(){
			urlString += $(this).attr("name") + "=" + $(this).val() + "&";
		});
		$(this).parent().siblings(".questionAnswers").load(urlString);
		$(this).siblings(".nextButton, .finishButton").show();
	});
	
	$(".finishButton").live("click", function(){
		finishInstantCorrectionQuiz();
	});
	
	$(".startTimedQuestion").live("click", function() {
		$(this).hide();
		$($(this).siblings(".questionTimer").get(0)).countdown({
			until: +$(this).siblings("input").get(0).value,
			format: 'MS',
			onExpiry: function(){
				$(this).parent().parent().parent().next(".questionOuterContainer").show();
				$(this).parent().parent().parent().hide();
			},
			layout: '<span>{mnn}{sep}{snn}</span>',
			onTick: function(periods) { 
			    if(periods[6] <= 5){
			    	$(this).css("color", "red");
			    }
			}
		});
		$(this).parent().siblings(".timerValue").hide();
		$(this).parent().siblings(".questionContainer").show();
	});
	
});

function startQuiz(quizID, isMultiPage, time){
	$("#quizQuestions").load("LoadQuizServlet", {"quizID":quizID, "isMultiPage": isMultiPage}, function() {
		if(time != "0"){
			$("#timer").countdown({
				until: +time,
				format: 'MS',
				onExpiry: function(){
					if($("#singlePageForm").length > 0){
						$("#singlePageForm").submit();
					} else {
						finishInstantCorrectionQuiz();
					}
				},
				layout: '<span>{mnn}{sep}{snn}</span>',
				onTick: function(periods) { 
				    if(periods[6] < 10){
				    	$("#timer").css("color", "red");
				    }
				}
			});
		}
		$("#startButton").hide();
		var d = new Date();
		startTime = d.getTime();
	});
}


function showNext(cur, next){
	$("#questionOuterContainer" + cur).hide();
	$("#questionOuterContainer" + next).show();
}

function sortMatching(){
	var d = new Date();
	$("#timeTaken").val(d.getTime() - startTime);
	$(".sortable").each(function() {
		var counter = 0;
		$("li", this).each(function(){
			 $(this).children("input").attr("name", $($(this).parent().siblings("input").get(0)).val() + "-" + counter); 
			 counter++;
		});
	});
}

function sortMatchingSingle(i){
	var sortable = $("#question" + i).find(".sortable").get(0);
	var counter = 0;
	$("li", sortable).each(function(){
		 $(this).children("input").attr("name", $($(this).parent().siblings("input").get(0)).val() + "-" + counter); 
		 counter++;
	});
}

function finishInstantCorrectionQuiz(){
	$("#quizQuestions").wrap('<form action="GradeQuizServlet?quizID=' + quizID + '" method="post" id="wrapperForm" />');
	$("#wrapperForm").append("<input type=\"hidden\" name=\"timeTaken\" id=\"timeTaken\" value=\"\" />");
	var d = new Date();
	$("#timeTaken").val(d.getTime() - startTime);
	$("#wrapperForm").submit();
}