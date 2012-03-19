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
	<title>Qwizzler - Quiz Results</title>

	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="quizResults.css"/>
	<link rel="stylesheet" type="text/css" href="quizInfo.css"/>
	<link rel="stylesheet" type="text/css" href="inbox.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="quizResults.js" type="text/javascript"></script>
</head>
<body>
	<%@ include file="topBar.jsp" %>
	<div id="blueBar">
		<div id="header" class="centerer">
			<div id="titleDiv">
				<input type="hidden" id="quizID" value="<%=quiz.quizID%>"/>
				<input type="hidden" id="quizName" value="<%=quiz.title%>"/>
				<div class="clearfix">
					<button type="button" id="likesButton">Like</button>
					<button type="button" id="dislikesButton">Dislike</button>
					<div id="likesResult"><span></span></div>
					<button id="reportButton" type="button" onclick="javascript:reportQuiz(<%=quiz.quizID %>)">Report</button>
				</div>
				<span id="title"><%=quiz.title %></span>
				<span id="owner">By <a href="profilePage.jsp?userToDisplay=<%=quiz.owner%>"><%=quiz.owner %></a></span>
			</div>
			<div id="leftInfo">
				<p><%=quiz.description %></p>
			</div>
			
			<span><%=quiz.category %></span><br/>
			Your score was: <%=request.getAttribute("score") %>
			<br />
			You took <% 
						Integer ms = (Integer) request.getAttribute("timeTaken");
						out.print(((double)ms) / 1000);
					%> seconds
			<br/>
			<button type="button" onclick="challengeAFriend()" id="challengeFriend">Challenge A Friend!</button>
			<br />
			<br />
			<button type="button" onclick="javascript:location.href='quizInfo.jsp?quizID=<%=quiz.quizID %>';" id="challengeFriend">Retake Quiz</button>
		</div>
	</div>
	<div id="mainContent">
		<div class="centerer">
					
			<div id="stats">
				<div class="statsContainer">
					<h2>Statistics</h2>
					<span>Taken <%=quiz.numTaken() %> times</span>
					<br />
					<span>Average score: <%=quiz.averageScore() %></span>
					<br />
					<span>Average completion time: <%=(quiz.averageCompletionTime() / 1000) %> seconds</span>
					<br />
				</div>
				<div id="topPerformances" class="statsContainer">
					<h2>Top Scores</h2>
					<h4><span class="tpFilter active">Overall</span><span class="tpFilter">Today</span></h4>
					<ul id="tpOverall">
						<%
							List<Performance> topScores = quiz.loadTopPerformances(10);
							if(topScores.size() < 1) out.println("<li>No scores yet.</li>");
							for(Performance p:topScores){
								out.println("<li><a href=\"profilePage.jsp?userToDisplay=" + p.userID +"\">" + p.userID + "</a>");
								out.println("<br />");
								out.println("@ " + p.timeStamp);
								out.println("<br />");
								out.println("Scored " + p.score + " in " + (((double)p.timeInSeconds) / 1000) + " seconds");
								out.println("</li>");
							}
						%>
					</ul>
					<ul id="tpToday">
						<%
							List<Performance> topScoresDay = quiz.loadTopPerformancesInLastDay();
							if(topScoresDay.size() < 1) out.println("<li>No scores yet.</li>");
							for(Performance p:topScoresDay){
								out.println("<li><a href=\"profilePage.jsp?userToDisplay=" + p.userID +"\">" + p.userID + "</a>");
								out.println("<br />");
								out.println("@ " + p.timeStamp);
								out.println("<br />");
								out.println("Scored " + p.score + " in " + (((double)p.timeInSeconds) / 1000) + " seconds");
								out.println("</li>");							
							}
						%>
					</ul>
				</div>
				<div id="userQuizHistory" class="statsContainer">
					<h2>My Scores</h2>
					<ul>
						<%
							List<Performance> myScores = quiz.loadPerformancesForUser(curUser.userID);
							if(myScores.size() < 1) out.println("<li>No scores yet.</li>");
							for(Performance p:myScores){
								out.println("<li>@ " + p.timeStamp);
								out.println("<br />");
								out.println("Scored " + p.score + " in " + (((double)p.timeInSeconds) / 1000) + " seconds");
								out.println("</li>");	
							}
						%>
					</ul>
				</div>
				<div id="userQuizHistory" class="statsContainer last">
					<h2>Recent Scores</h2>
					<ul>
						<%
							List<Performance> recentScores = quiz.loadRecentPerformances(10);
							if(recentScores.size() < 1) out.println("<li>No scores yet.</li>");
							for(Performance p:recentScores){
								out.println("<li><a href=\"profilePage.jsp?userToDisplay=" + p.userID +"\">" + p.userID + "</a>");
								out.println("<br />");
								out.println("@ " + p.timeStamp);
								out.println("<br />");
								out.println("Scored " + p.score + " in " + (((double)p.timeInSeconds) / 1000) + " seconds");
								out.println("</li>");							}
						%>
					</ul>
				</div>
			</div>
		</div>
	</div>
</body>
</html>