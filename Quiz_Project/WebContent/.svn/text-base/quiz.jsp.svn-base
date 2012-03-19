<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<%@ page import="Shared.*" %>
<%
	int quizID = Integer.parseInt(request.getParameter("quizID"));
  	Quiz quiz = Quiz.loadQuiz(quizID);
  	User curUser = (User) request.getSession().getAttribute("user");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Qwizzler - <%=quiz.title %></title>
	
	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="quiz.css"/>
	<link rel="stylesheet" type="text/css" href="jquery.countdown.css"/>
	<link href='http://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="jquery-ui-1.8.18.custom.min.js"></script>
	<script type="text/javascript" src="jquery.countdown.min.js"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="quiz.js" type="text/javascript"></script>
	
</head>
<body>
	<%@ include file="topBar.jsp" %>
	<div id="blueBar">
		<div id="header" class="centerer">
			<div id="titleDiv">
					<span id="title"><%=quiz.title %></span>
					<span id="owner">By <a href="profilePage.jsp?userToDisplay=<%=quiz.owner %>"><%=quiz.owner %></a></span>
				</div>
				<div id="headerInfo">
					<span>
					<%
						if(quiz.timeInSeconds != 0){
							String minutes = Integer.toString(quiz.timeInSeconds / 60);
							int seconds = quiz.timeInSeconds % 60;
							String secondsString;
							if(seconds < 10){
								secondsString = "0" + seconds;
							} else {
								secondsString = Integer.toString(seconds);
							}
							out.println(minutes + ":" + secondsString + " to complete ");
					  	}
					  %>
					  <%=quiz.loadQuestions().size() %> questions<% if(quiz.timeInSeconds == 0) out.print(", untimed"); %>
					  </span>
				</div>
				<div id="timer"></div>
				<button type="button" id="startButton" onclick="javascript:startQuiz(<%=quizID %>, <%=quiz.isMultiplePage %>, <%=quiz.timeInSeconds %>)">Start Quiz</button>
		</div>
	</div>
	<input type="hidden" id="curQuizID" value="<%=quizID %>" />
	<div id="mainContent">
		<div class="centerer">
			<div id="quizQuestions">
			</div>
		</div>
	</div>
</body>
</html>