/********Common Functions********/
var answerCount =0;
var questionNo = 0;

//keeps a track of how many questions have been created by user. Will be updated when a question is deleted
var questionsCreated = 0;

function createQuestion(){
	//console.log("In create Question");
	var quizCategory = $("#quizType").val();
	
	if(quizCategory == "QR"){
		createQR();
	}else if(quizCategory == "PR"){
		createPR();
	}else if(quizCategory == "FIB"){
		createFIB();
	}else if(quizCategory =="MC"){
		createMC();
	}else if(quizCategory =="MCMA"){
		createMCMA();
	}else{
		createM();
	}
}

function addButtonClicked(){
	var quizCategory = $("#quizType").val();
	//console.log(quizCategory);
	if(quizCategory == "QR"){
		createQR();
	}else if(quizCategory == "PR"){
		createPR();
	}else if(quizCategory == "FIB"){
		createFIB();
	}else if(quizCategory == "MC"){
		createMC();
	}else if(quizCategory == "MCMA"){
		createMCMA();
	}else if(quizCategory == "M"){
		createM();
	}
}

/*$(document).ready(
	function(){
		$('#saveQuizButton').on("click", function(e){
			e.preventDefault();
			formValidate();
			return false;
		});
	});*/


/***************QR related functions*****************/

/*
 * createQR: This function adds a new QR to the "questions" div. 
 */

function createQR(type){
	//keeps a track of this question number
	this.questionNo = questionNo;
	var questionContainer = $('<div id="questionContainer_QR_'+questionNo+'"></div>').attr("class", "questionContainer");
	var questionDiv = $('<div class="questionDiv"></div>');
	var clear = $('<div class="clear"></div>');
	var question = $('<div class=leftDiv>Question:</div><div class=rightDiv><input type="text" name="Question_QR_'+questionNo+'" id="Question_QR_'+questionNo+'"/></div>');
	
	var orderCheckBox = $('<div class="clear"></div><div class="leftDiv"></div><div class="rightDiv"><div class="radio"><input type="checkbox" name="question_QR_'+questionNo+'_order" value="ordered"></div><div class="radioText">Order Answers</div></div>');
	
	var time = $('<div class="clear"></div><div class="leftDiv">Time:</div><div class="rightDiv"><input type="text" class="timeBox" name="question_QR_'+questionNo+'_time">(in seconds, 0 if not timed)</div>');
	
	var toolBar = $("<div id=\"toolBar\"></div>");
	var delQuestionButton = $("<button id=\"trashButton\" type=\"button\"/>")
					.on("click", function(){
						var questionToBeDeleted = $(this).parent().parent().attr('id');
 						$("#"+questionToBeDeleted).remove();
 						questionsCreated--;
					});
	
	toolBar.append(delQuestionButton);
	toolBar.append(clear);
	questionContainer.append(toolBar);
	
	var addAnswerButton = $("<input type=\"button\" value=\"Add Answer\" class=\"addAnswerButton\">")
	.on("click", function(e){
		//get the parent container's question no
		var parentId = $(this).parent().parent().attr("id");
		var questionContainerLength = ("questionContainer_QR_").length;
		var qtNo = parentId.substring(questionContainerLength);
		
		//create an answer div
		var clear = $('<div class="clear"></div>');
		var answerDiv = $('<div class="answerDiv"></div>');
		var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><input name="question_QR_'+qtNo+'_answer_'+answerCount+'" type="text" id=\"question_QR_'+qtNo+'_answer_'+answerCount+'"/></div>');
		 var buttonDel = $('<input type="button" class="button" value="X"></input>')
			.on("click",function(event){
				 $(this).parent().remove();
			});
		 answerDiv.append(clear);
		 answerDiv.append(answer);
		 answerDiv.append(buttonDel);
		 answerDiv.append(clear);
		 
		 $(this).parent().parent().append(answerDiv);
		 answerCount++;
	});
	
	questionDiv.append(question);
	questionDiv.append(addAnswerButton);
	//questionDiv.append(clear);
	questionDiv.append(orderCheckBox);
	questionDiv.append(time);
	//questionDiv.append(clear);
	questionContainer.append(questionDiv);
	
	var answerDiv = $('<div class="answerDiv"></div>');
	var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><input type="text"  name=\"question_QR_'+questionNo+'_answer_'+answerCount+'" id=\"question_QR_'+questionNo+'_answer_'+answerCount+'"/></div>');
	 var buttonDel = $('<input type="button" class="button" value="X"></input>')
		.on("click",function(event){
			//console.log("Del clicked");
			 $(this).parent().remove();
			//$("#"+elementToBeDeleted).remove();
		});
	answerDiv.append(answer);
	answerDiv.append(buttonDel);
	answerDiv.append(clear);
	
	questionContainer.append(answerDiv);
	
	questionContainer.append(clear);
	
	$("#questions").append(questionContainer);
	
	questionNo++;
	answerCount++;
}



/***************Picture Response******************/
function createPR(del){
	
	var questionContainer = $('<div id="questionContainer_PR_'+questionNo+'"></div>').attr("class", "questionContainer");
	var questionDiv = $('<div class="questionDiv"></div>');
	var clear = $('<div class="clear"></div>');
	var question = $('<div class=leftDiv>Question:</div><div class=rightDiv><input type="text" id="Question_PR_'+questionNo+'" name="Question_PR_'+questionNo+'"/></div>');
	
	var orderCheckBox = $('<div class="clear"></div><div class="leftDiv"></div><div class="rightDiv"><div class="radio"><input type="checkbox" value="ordered" id="question_PR_'+questionNo+'_order" name="question_PR_'+questionNo+'_order"/></div><div class="radioText">Order Answers</div></div>');
	
	var toolBar = $("<div id=\"toolBar\"></div>");
	var delQuestionButton = $("<button id=\"trashButton\" type=\"button\"/>")
					.on("click", function(){
						var questionToBeDeleted = $(this).parent().parent().attr('id');
 						$("#"+questionToBeDeleted).remove();
 						questionsCreated--;
					});
	
	toolBar.append(delQuestionButton);
	toolBar.append(clear);
	questionContainer.append(toolBar);
	
	//create a text box for uploading images
	var imageTextBox = $('<div class="clear"></div><div class="leftDiv">Image Link:</div><div class="rightDiv"><input type="text" id=\"question_PR_'+questionNo+'_imageLink" name=\"question_PR_'+questionNo+'_imageLink"/></div>');
	
	var time = $('<div class="clear"></div><div class="leftDiv">Time:</div><div class="rightDiv"><input type="text" class="timeBox" name="question_PR_'+questionNo+'_time">(in seconds, 0 if not timed)</div>');
	
	var addAnswerButton = $("<input type=\"button\" value=\"Add Answer\" class=\"addAnswerButton\">")
	.on("click",function(e){
		//get the parent container's question no
		var parentId = $(this).parent().parent().attr("id");
		var questionContainerLength = ("questionContainer_PR_").length;
		var qtNo = parentId.substring(questionContainerLength);
		
		//create an answer div
		var clear = $('<div class="clear"></div>');
		var answerDiv = $('<div class="answerDiv"></div>');
		var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><input type="text" id=\"question_PR_'+qtNo+'_answer_'+answerCount+'" name=\"question_PR_'+qtNo+'_answer_'+answerCount+'"/></div>');
		 var buttonDel = $('<input type="button" class="button" value="X"></input>')
			.on("click",function(event){
				 $(this).parent().remove();
			});
		 answerDiv.append(clear);
		 answerDiv.append(answer);
		 answerDiv.append(buttonDel);
		 answerDiv.append(clear);
		 $(this).parent().parent().append(answerDiv);
		 answerCount++;
	});
	
	questionDiv.append(question);
	questionDiv.append(addAnswerButton);
	questionDiv.append(imageTextBox);
	questionDiv.append(clear);
	questionDiv.append(orderCheckBox);
	questionDiv.append(time);
	questionContainer.append(questionDiv);
	
	var answerDiv = $('<div class="answerDiv"></div>');
	var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><input type="text" name=\"question_PR_'+questionNo+'_answer_'+answerCount+'" id=\"question_PR_'+questionNo+'_answer_'+answerCount+'"/></div>');
	 var buttonDel = $('<input type="button" class="button" value="X"></input>')
		.on("click",function(event){
			//console.log("Del clicked");
			 $(this).parent().remove();
			//$("#"+elementToBeDeleted).remove();
		});
	answerDiv.append(answer);
	answerDiv.append(buttonDel);
	answerDiv.append(clear);
	
	questionContainer.append(answerDiv);
	
	questionContainer.append(clear);
	
	$("#questions").append(questionContainer);
	
	questionNo++;
	answerCount++;
}

/*
 * Creates a FIB
 */
function createFIB(){
	
	var questionContainer = $('<div id="questionContainer_FIB_'+questionNo+'"></div>').attr("class", "questionContainer");
	var questionDiv = $('<div class="questionDiv"></div>');
	var clear = $('<div class="clear"></div>');
	var question = $('<div class=leftDiv>Question:</div><div class=rightDiv><input type="text" id="Question_FIB_'+questionNo+'" name="Question_FIB_'+questionNo+'"/></div>');
	
	var orderCheckBox = $('<div class="clear"></div><div class="leftDiv"></div><div class="rightDiv"><div class="radio"><input type="checkbox" name="question_FIB_'+questionNo+'_order" value="ordered" id="question_FIB_'+questionNo+'_order"/></div><div class="radioText">Order Answers</div></div>');
	
	var time = $('<div class="clear"></div><div class="leftDiv">Time:</div><div class="rightDiv"><input type="text" class="timeBox" name="question_FIB_'+questionNo+'_time">(in seconds, 0 if not timed)</div>');
	
	var toolBar = $("<div id=\"toolBar\"></div>");
	var delQuestionButton = $("<button id=\"trashButton\" type=\"button\"/>")
					.on("click", function(){
						var questionToBeDeleted = $(this).parent().parent().attr('id');
 						$("#"+questionToBeDeleted).remove();
 						questionsCreated--;
					});
	
	toolBar.append(delQuestionButton);
	toolBar.append(clear);
	questionContainer.append(toolBar);
	
	var addAnswerButton = $("<input type=\"button\" value=\"Add Answer\" class=\"addAnswerButton\">")
	.on("click",function(e){
		//get the parent container's question no
		var parentId = $(this).parent().parent().attr("id");
		var questionContainerLength = ("questionContainer_FIB_").length;
		var qtNo = parentId.substring(questionContainerLength);
		
		//create an answer div
		var clear = $('<div class="clear"></div>');
		var answerDiv = $('<div class="answerDiv"></div>');
		var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><input type="text" name=\"question_FIB_'+qtNo+'_answer_'+answerCount+'" id=\"question_FIB_'+qtNo+'_answer_'+answerCount+'"/></div>');
		 var buttonDel = $('<input type="button" class="button" value="X"></input>')
			.on("click",function(event){
				 $(this).parent().remove();
			});
		 answerDiv.append(clear);
		 answerDiv.append(answer);
		 answerDiv.append(buttonDel);
		 answerDiv.append(clear);
		 
		 $(this).parent().parent().append(answerDiv);
		 answerCount++;
	});
	
	questionDiv.append(question);
	questionDiv.append(addAnswerButton);
	questionDiv.append(orderCheckBox);
	questionDiv.append(time);
	questionDiv.append(clear);
	questionContainer.append(questionDiv);
	
	var answerDiv = $('<div class="answerDiv"></div>');
	var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><input type="text" name=\"question_FIB_'+questionNo+'_answer_'+answerCount+'" id=\"question_FIB_'+questionNo+'_answer_'+answerCount+'"/></div>');
	 var buttonDel = $('<input type="button" class="button" value="X"></input>')
		.on("click",function(event){
			//console.log("Del clicked");
			 $(this).parent().remove();
			//$("#"+elementToBeDeleted).remove();
		});
	answerDiv.append(answer);
	answerDiv.append(buttonDel);
	answerDiv.append(clear);
	
	questionContainer.append(answerDiv);
	
	questionContainer.append(clear);
	
	$("#questions").append(questionContainer);
	
	questionNo++;
	answerCount++;
}

/*
 * Create a MC question
 * */

function createMC(){
	
	//keeps a track of the question number for this particular question and passes this value to the addAnswer event handler
	this.questionNo = questionNo;
	
	var questionContainer = $('<div id="questionContainer_MC_'+questionNo+'"></div>').attr("class", "questionContainer");
	var questionDiv = $('<div class="questionDiv"></div>');
	var clear = $('<div class="clear"></div>');
	var question = $('<div class=leftDiv>Question:</div><div class=rightDiv><input type="text" name="Question_MC_'+questionNo+'" id="Question_MC_'+questionNo+'"/></div>');
	
	var time = $('<div class="clear"></div><div class="leftDiv">Time:</div><div class="rightDiv"><input type="text" class="timeBox" name="question_MC_'+questionNo+'_time">(in seconds, 0 if not timed)</div>');
	
	var toolBar = $("<div id=\"toolBar\"></div>");
	var delQuestionButton = $("<button id=\"trashButton\" type=\"button\"/>")
					.on("click", function(){
						var questionToBeDeleted = $(this).parent().parent().attr('id');
 						$("#"+questionToBeDeleted).remove();
 						questionsCreated--;
					});
	
	toolBar.append(delQuestionButton);
	toolBar.append(clear);
	questionContainer.append(toolBar);
	
	var addAnswerButton = $("<input type=\"button\" value=\"Add Answer\" class=\"addAnswerButton\">")
	.on('click', function(e){
		//get the parent container's question no
		var parentId = $(this).parent().parent().attr("id");
		var questionContainerLength = ("questionContainer_MC_").length;
		var qtNo = parentId.substring(questionContainerLength);
		
		//create an answer div
		var clear = $('<div class="clear"></div>');
		var answerDiv = $('<div class="answerDiv"></div>');
		var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><div class="radio"><input type="radio" name="question_MC_'+qtNo+'_radiobox" value="question_MC_'+qtNo+'_answer_'+answerCount+'"/></div><div class="radioText"><input type="text" name=\"question_MC_'+qtNo+'_answer_'+answerCount+'"/></div></div>');
		 var buttonDel = $('<input type="button" class="button" value="X"></input>')
			.on("click",function(event){
				 $(this).parent().remove();
			});
		 answerDiv.append(clear);
		 answerDiv.append(answer);
		 answerDiv.append(buttonDel);
		 answerDiv.append(clear);
		 
		 $(this).parent().parent().append(answerDiv);
		 answerCount++;
	});
	
	questionDiv.append(question);
	questionDiv.append(addAnswerButton);
	questionDiv.append(time);
	questionDiv.append(clear);
	questionContainer.append(questionDiv);
	
	var answerDiv = $('<div class="answerDiv"></div>');
	var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><div class="radio"><input type="radio" value="question_MC_'+questionNo+'_answer_'+answerCount+'" name="question_MC_'+questionNo+'_radiobox"/></div><div class="radioText"><input type="text" name="question_MC_'+questionNo+'_answer_'+answerCount+'"/></div></div>');
	 var buttonDel = $('<input type="button" class="button" value="X"></input>')
		.on("click",function(event){
			//console.log("Del clicked");
			 $(this).parent().remove();
			//$("#"+elementToBeDeleted).remove();
		});
	answerDiv.append(answer);
	answerDiv.append(buttonDel);
	answerDiv.append(clear);
	
	questionContainer.append(answerDiv);
	
	questionContainer.append(clear);
	
	$("#questions").append(questionContainer);
	
	questionNo++;
	answerCount++;
}

function createMCMA(){
	
	var questionContainer = $('<div id="questionContainer_MCMA_'+questionNo+'"></div>').attr("class", "questionContainer");
	var questionDiv = $('<div class="questionDiv"></div>');
	var clear = $('<div class="clear"></div>');
	var question = $('<div class=leftDiv>Question:</div><div class=rightDiv><input type="text" name="Question_MCMA_'+questionNo+'" id="Question_MCMA_'+questionNo+'"/></div>');
	
	var time = $('<div class="clear"></div><div class="leftDiv">Time:</div><div class="rightDiv"><input type="text" class="timeBox" name="question_MCMA_'+questionNo+'_time">(in seconds, 0 if not timed)</div>');
	
	var toolBar = $("<div id=\"toolBar\"></div>");
	var delQuestionButton = $("<button id=\"trashButton\" type=\"button\"/>")
					.on("click", function(){
						var questionToBeDeleted = $(this).parent().parent().attr('id');
 						$("#"+questionToBeDeleted).remove();
 						questionsCreated--;
					});
	
	toolBar.append(delQuestionButton);
	toolBar.append(clear);
	questionContainer.append(toolBar);
	
	var addAnswerButton = $("<input type=\"button\" value=\"Add Answer\" class=\"addAnswerButton\">")
	.on("click", function(e){
		//get the parent container's question no
		var parentId = $(this).parent().parent().attr("id");
		var questionContainerLength = ("questionContainer_MCMA_").length;
		var qtNo = parentId.substring(questionContainerLength);
		
		//create an answer div
		var clear = $('<div class="clear"></div>');
		var answerDiv = $('<div class="answerDiv"></div>');
		var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><div class="radio"><input type="checkbox" name="question_MCMA_'+qtNo+'_checkbox" value="question_MCMA_'+qtNo+'_answer_'+answerCount+'"/></div><div class="radioText"><input type="text" name="question_MCMA_'+qtNo+'_answer_'+answerCount+'" id=\"question_MCMA_'+qtNo+'_answer_'+answerCount+'"/></div></div>');
		 var buttonDel = $('<input type="button" class="button" value="X"></input>')
			.on("click",function(event){
				 $(this).parent().remove();
			});
		 answerDiv.append(clear);
		 answerDiv.append(answer);
		 answerDiv.append(buttonDel);
		 answerDiv.append(clear);
		 
		 $(this).parent().parent().append(answerDiv);
		 answerCount++;
	});
	
	questionDiv.append(question);
	questionDiv.append(addAnswerButton);
	questionDiv.append(time);
	questionDiv.append(clear);
	questionContainer.append(questionDiv);
	
	var answerDiv = $('<div class="answerDiv"></div>');
	var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><div class="radio"><input type="checkbox" name="question_MCMA_'+questionNo+'_checkbox" value="question_MCMA_'+questionNo+'_answer_'+answerCount+'"></div><div class="radioText"><input type="text" name="question_MCMA_'+questionNo+'_answer_'+answerCount+'" id="question_MCMA_'+questionNo+'_answer_'+answerCount+'"/></div></div>');
	 var buttonDel = $('<input type="button" class="button" value="X"></input>')
		.on("click",function(event){
			//console.log("Del clicked");
			 $(this).parent().remove();
			//$("#"+elementToBeDeleted).remove();
		});
	answerDiv.append(answer);
	answerDiv.append(buttonDel);
	answerDiv.append(clear);
	
	questionContainer.append(answerDiv);
	
	questionContainer.append(clear);
	
	$("#questions").append(questionContainer);
	
	questionNo++;
	answerCount++;
}

function createM(){
	
	var questionContainer = $('<div id="questionContainer_M_'+questionNo+'"></div>').attr("class", "questionContainer");
	var questionDiv = $('<div class="questionDiv"></div>');
	var clear = $('<div class="clear"></div>');
	var question = $('<div class=leftDiv>Question:</div><div class=rightDiv><input type="text" name="Question_M_'+questionNo+'" id="Question_M_'+questionNo+'"/></div>');
	
	var time = $('<div class="clear"></div><div class="leftDiv">Time:</div><div class="rightDiv"><input type="text" class="timeBox" name="question_M_'+questionNo+'_time">(in seconds, 0 if not timed)</div>');
	
	var toolBar = $("<div id=\"toolBar\"></div>");
	var delQuestionButton = $("<button id=\"trashButton\" type=\"button\"/>")
					.on("click", function(){
						var questionToBeDeleted = $(this).parent().parent().attr('id');
 						$("#"+questionToBeDeleted).remove();
 						questionsCreated--;
					});
	
	toolBar.append(delQuestionButton);
	toolBar.append(clear);
	questionContainer.append(toolBar);
	
	var addAnswerButton = $("<input type=\"button\" value=\"Add Answer\" class=\"addAnswerButton\">")
	.on("click", function(e){
		//get the parent container's question no
		var parentId = $(this).parent().parent().attr("id");
		var questionContainerLength = ("questionContainer_M_").length;
		var qtNo = parentId.substring(questionContainerLength);
		
		//create an answer div
		var clear = $('<div class="clear"></div>');
		var answerDiv = $('<div class="answerDiv"></div>');
		var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><div class="leftMatch"><input type="text" name="question_M_'+qtNo+'_leftMatch_'+answerCount+'" id="question_M_'+qtNo+'_leftMatch_'+answerCount+'"/></div><div class="rightMatch"><input type="text" name=\"question_M_'+qtNo+'_rightMatch_'+answerCount+'" id=\"question_M_'+qtNo+'_rightMatch_'+answerCount+'"/></div></div>');
		 var buttonDel = $('<input type="button" class="button" value="X"></input>')
			.on("click",function(event){
				 $(this).parent().remove();
			});
		 answerDiv.append(clear);
		 answerDiv.append(answer);
		 answerDiv.append(buttonDel);
		 answerDiv.append(clear);
		 
		 $(this).parent().parent().append(answerDiv);
		 answerCount++;
	});
	
	questionDiv.append(question);
	questionDiv.append(addAnswerButton);
	questionDiv.append(time);
	questionDiv.append(clear);
	questionContainer.append(questionDiv);
	
	var answerDiv = $('<div class="answerDiv"></div>');
	var answer = $('<div class="leftDiv">Answer:</div><div class="rightDiv"><div class="leftMatch"><input type="text" name="question_M_'+questionNo+'_leftMatch_'+answerCount+'" id="question_M_'+questionNo+'_leftMatch_'+answerCount+'"></div><div class="rightMatch"><input type="text" name=\"question_M_'+questionNo+'_rightMatch_'+answerCount+'" id=\"question_M_'+questionNo+'_rightMatch_'+answerCount+'"/></div></div>');
	 var buttonDel = $('<input type="button" class="button" value="X"></input>')
		.on("click",function(event){
			//console.log("Del clicked");
			 $(this).parent().remove();
			//$("#"+elementToBeDeleted).remove();
		});
	answerDiv.append(answer);
	answerDiv.append(buttonDel);
	answerDiv.append(clear);
	
	questionContainer.append(answerDiv);
	
	questionContainer.append(clear);
	
	$("#questions").append(questionContainer);
	questionNo++;
	answerCount++;
}

/***************Form Validations*******************/
function formValidate(){
	console.log("formValidate");
	//ensure that the Title of the quiz has been entered
	if($("#quizTitle").val() == ""){
		console.log("Please enter a title for the quiz.");
	}
	
	//fetch all the questions and then perform a check.
	$("#questions > div").each(function(i, elem){
		console.log(i);
		
		//if(startsWith(elem.id, "questionContainer_QR_"))
	});
}
