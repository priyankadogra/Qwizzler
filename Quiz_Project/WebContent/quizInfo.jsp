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
	<title>Qwizzler - <%=quiz.title %> Info</title>
	
	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="quizInfo.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="quizInfo.js" type="text/javascript"></script>
</head>
<body>
	<%@ include file="topBar.jsp" %>
	<div id="blueBar">
		<input type="hidden" id="quizID" value="<%=quizID %>" />
		<div id="header" class="centerer">
			<div id="titleDiv">
				<span id="title"><%=quiz.title %></span>
				<span id="owner">By <a href="profilePage.jsp?userToDisplay=<%=quiz.owner %>"><%=quiz.owner %></a></span>
				<div id="likeDislikeButtons">
					<button type="button" id="likesButton">Like</button>
					<button type="button" id="dislikesButton">Dislike</button>
					
				</div>
				<div id="likesResult">
					<span></span>
				</div>
			</div>
		
			<div id="headerInfo">
				<span><%=quiz.numLikes %> likes, <%=quiz.numDislikes %> dislikes</span>
				<div id="likesDislikes">
					<% 	double totalRatings = quiz.numLikes + quiz.numDislikes;
						if(totalRatings == 0) totalRatings = 1;
					%>
					<div id="likes" style="width:<%=(((double)quiz.numLikes) / totalRatings) * 100 %>%;"></div>
					<div id="dislikes" style="width:<%=(((double)quiz.numDislikes) / totalRatings) * 100 %>%;"></div>
				</div>
				<span>Created <%=quiz.timeStamp %> in <%=quiz.category %></span>
				<br />
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
				  <%=quiz.loadQuestions().size() %> questions <% if(quiz.timeInSeconds == 0) out.print("untimed"); %>
				  </span>
				<p><i><%=quiz.description %></i></p>
			</div>
			
			<div id="variableButtons">
				<%
					if(curUser.isAdmin || quiz.owner.equals(curUser.userID)){
						out.println("<button type=\"button\" onclick=\"javascript:deleteQuiz(" + quiz.quizID + ")\">Delete</button>");
					}
				
					if(curUser.userID.equals(quiz.owner)){
						out.println("<button type=\"button\">Edit</button>");
					}
				%>
				<button type="button" onclick="javascript:reportQuiz(<%=quiz.quizID %>)">Report</button>
			</div>
			<div id="actions">
				<button type="button" onclick="javascript:takeQuiz(<%=quizID %>)" id="takeButton">Take Quiz</button>
				<%
					if(quiz.isPracticeEnabled){
						out.println("<button type=\"button\" id=\"practiceButton\">Practice Quiz</button>");
					}
				%>
			</div>
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