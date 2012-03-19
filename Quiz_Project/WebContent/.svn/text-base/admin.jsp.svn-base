<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<%@ page import="Shared.*" %>
    <%//if(!((Shared.User)request.getAttribute("user")).isAdmin)
    	//response.sendRedirect("index.jsp");
	%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Qwizzler - Admin Tools</title>

	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="admin.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="admin.js" type="text/javascript"></script>
</head>
<body>
	<%@ include file="topBar.jsp"%>
	<div id="blueBar">
		<div class="centerer">
			<div id="siteStatisticsContainer">
				<h2>Site Statistics</h2>
				<%
				out.println("<p> Number of users: " +User.numUsers()+ "</p>");
				out.println("<p> Number of quizzes: " +Quiz.numQuizzes()+ "</p>");
				out.println("<p> Number of performances: " +Quiz.numQuizzesTaken()+ "</p>");
				%>
			</div>
			<div id="announcementsContainer">
				<h2>Announcements</h2>
				<div id="announcementsFeed">
				<%
				List<Announcement> announcements = Announcement.loadAnnouncements(5);
				if(announcements != null){
					for(Announcement a: announcements){
						out.println("<div class=\"announceRow\">");
						out.println("<div class=\"announceRowInfo\">");
						out.println("<span class=\"announceRowUser\">" + a.fromUserID + " </span>");
						out.println("<span class=\"announceRowTime\">" + a.timeStamp + ":</span>");
						out.println("</div>");
						out.println("<div class=\"announceRowText\">" + a.text + "</div>");
						out.println("</div>");
					}
				}
				%>
				</div>
			</div>
		</div>
	</div>
	<div id="mainContent">
		<div class="centerer">
			<div id="controlBar">
				<button type="button" id="usersButton">Adjust Users</button>
				<button type="button" id="quizzesButton">Adjust Quizzes</button>
				<button type="button" id="reportedQuizzesButton">Reported Quizzes</button>
				<button type="button" id="announcementsButton">Make Announcement</button>
			</div>
			
			<div id="users" class="content">
				<%
				List<User> users = User.loadListUsers();
				for(User user:users){
					out.println("<div class=\"userRow\">");
					out.println("<div class=\"userID\">" + user.userID + "</div>");
					out.println("<div class=\"userIsAdmin\">");
					if(user.isAdmin) out.println("Admin");
					else out.println("Member");
					out.println("</div>");
					out.println("<div class=\"userDelete\"><a href=\"javascript:deleteUser(\'" + user.userID + "\')\">Delete</a></div>");
					out.println("<div class=\"userPromote\"><a href=\"javascript:promoteUser(\'" + user.userID + "\')\">Make Admin</a></div>");
					out.println("</div>");
				}
				%>
			</div>
			
			<div id="quizzes" class="content">
				<select id="quizSelector">
					<option value="ALL">View All</option>
					<option value="HISTORY">History</option>
					<option value="GEOGRAPHY">Geography</option>
					<option value="ENTERTAINMENT">Entertainment</option>
					<option value="MATH_AND_SCIENCE">Math and Science</option>
					<option value="LITERATURE">Literature</option>
					<option value="SPORTS">Sports</option>
					<option value="LANGUAGE">Language</option>
					<option value="JUST_FOR_FUN">Just For Fun</option>
					<option value="RELIGION">Religion</option>
					<option value="MOVIES">Movies</option>
					<option value="TELEVISION">Television</option>
				</select>
				<div id="quizList">
				
				</div>
			</div>
			<div id="reportedQuizzes" class="content">
				<%
					List<Quiz> reportedQuizzes = Quiz.loadReportedQuizzes();
					
					for(Quiz q:reportedQuizzes){
						out.println("<div class=\"quizRow\">");
						out.println("<div class=\"quizRowClickable\">");
						out.println("<input type=\"hidden\" value=\"" + q.quizID + "\" />");
						out.println("<div class=\"quizTitle\">" + q.title + "</div>");
						out.println("</div>");
						out.println("<div class=\"quizDelete\"><a href=\"javascript:deleteQuiz(\'" + q.quizID + "\')\">Delete</a></div>");
						out.println("</div>");
					}
				%>
			</div>
			<div id="announcements" class="content">
			<h1>Make an announcement!!</h1>
			<form action="MakeAnnouncementServlet" method="get">
				<textarea name="body"></textarea>
				<button type="submit">Submit</button>
			</form>
			</div>
		</div>
	</div>
</body>
</html>