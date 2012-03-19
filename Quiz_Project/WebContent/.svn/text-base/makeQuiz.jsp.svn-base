<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<%@ page import="Shared.*" %>

<% User user = (User) request.getSession().getAttribute("user");
	%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Make A Quiz</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="theme.css" />
	<link rel="stylesheet" type="text/css" href="index.css"/>
	<link rel="stylesheet" type="text/css" href="makeQuiz.css" />
	<script src="theme.js" type="text/javascript"></script>
	<script src="makeQuiz.js" type="text/javascript"></script>
</head>
<body>
	<%@include file="topBar.jsp"%>
	<form action="CreateQuizServlet" method="get" onsubmit="fixApostraphes()">
		<div id="blueBar">
			<div class="centerer">
				<div id="quizDescription">
					<input type="text" id="quizTitle" name="quizTitle" placeholder="Quiz Title"/>
					<select class="selectField" name="quizCategory" id="quizCategory">
						<option value="HISTORY">History</option>
						<option value="GEOGRAPHY">Geography</option>
						<option value="ENTERTAINMENT">Entertainment</option>
						<option value="MATH_AND_SCIENCE">Math and Science</option>
						<option value="LITERATURE">Literature</option>
						<option value="SPORTS">Sports</option>
						<option value="LANGUAGE">Language</option>
						<option value="JUST_FOR_FUN" selected="selected">Just For Fun</option>
						<option value="RELIGION">Religion</option>
						<option value="MOVIES">Movies</option>
						<option value="TELEVISION">Television</option>
					</select>
					<input type="text" name="timedQuiz" id="timedQuiz" placeholder="Time in seconds (e.g. 50), 0 if not timed"/>
					<textarea id="quizDesc" name="quizDesc" placeholder="Quiz Description"></textarea>
				</div>
				<div class="quizOption">
					<div class="optionContainer clearfix"><div class="optionText">Should quiz be random:</div><div class="option"> <input type="checkbox" name="isRandom" value="isRandom"></div></div>
					<div class="optionContainer clearfix"><div class="optionText">Quiz has Multiple pages:</div><div class="option"> <input type="checkbox" name="isMultiple" value="isMultiple"></div></div>
					<div class="optionContainer clearfix"><div class="optionText">Allow Practice session:</div><div class="option"><input type="checkbox" name="isPracticeEnabled" value="isPracticeEnabled"></div></div>
					<div class="optionContainer clearfix"><div class="optionText">Enable Corrections:</div><div class="option"><input type="checkbox" name="isImmediateCorrectionEnabled" value="isImmediateCorrectionEnabled"></div></div> 
				</div>
			</div>
		</div>
		<div id="mainContent">
			<div class="centerer">
					<div id="questionSelector"><br/>
					<div class="questionInstructions">
						<h3>Instructions for creating a question:</h3>
						<p>Select the question type from the drop down menu and click on <strong>Create Button</strong>.</p>
						<p>To create multiple answers for a question click on <strong>Add Answer</strong> button.<br/></p>
						<p>To order answers, check the <strong>Order Answers</strong> checkbox.</p>
						<p>To add variations of an answer, please separate variations with a "<strong>,</strong> ". 
						For example for the question- "Who was the first President of USA?"<br/>
						Possible answers are: Washington , George Washington</p>
						<br/>
					</div>
					<h3>Questions:</h3>
						<div class = "leftDiv">Question Type:</div>
						<div class="rightDiv">
							<select class="selectField" id="quizType">
								<option value="QR" selected="selected">Question Response</option>
								<option value="PR">Picture Response</option>
								<option value="FIB">Fill in the Blanks</option>
								<option value="MC">Multiple Choice</option>
								<option value="MCMA">Multiple Choice Multiple Answer</option>
								<option value="M">Matching</option>
							</select>
						</div>
							<button type="button" onclick="addButtonClicked()" id="createQuestion">Create Question</button>
							<div class="clear"></div>	
					</div>
					<div class="clear">
					</div>
					<div id="questions">
					</div>
					<div class="clear">
					</div>
					<div class="saveQuiz">
						<button type="submit" id="saveQuizButton">Save Quiz</button>
					</div>
			</div>
		</div>
	</form>
</body>
</html>