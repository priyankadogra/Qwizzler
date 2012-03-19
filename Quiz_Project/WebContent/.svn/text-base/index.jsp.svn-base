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
	<title>Qwizzler - Home</title>
	
	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="index.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="index.js" type="text/javascript"></script>
</head>
<body>
	<%@ include file="topBar.jsp"%>
	<div id="blueBar">
		<div class="centerer">
			<div id="profileGlimpse">
				<div id="profilePic">
					<a href="profilePage.jsp?userToDisplay=<%=user.userID %>"><img src="<%=user.imageURL %>" class="shadowed"/></a>
				</div>
				<div id="profileInfo">
					<a href="profilePage.jsp?userToDisplay=<%= user.userID %>"><strong><%=user.firstName %> <%=user.lastName %></strong></a>
					<br />
					<span>Quizzes taken: <%=user.numQuizzesTaken %></span>
					<br />
					<span>Quizzes created: <%=user.numQuizzesCreated %></span>
					<br />
				
					<%
					try {
						out.println("<a href=\"friends.jsp\">" + user.loadFriends().size() + " friends</a>");
					} catch (java.sql.SQLException e) {
						e.printStackTrace();
					}
					%>
					<br />
					<%
					try {
						out.println("<a href=\"inbox.jsp\">" + user.numUnreadMessages() + " unread messages</a>");
					} catch (java.sql.SQLException e) {
						e.printStackTrace();
					}
					out.println("<br />");
					%>
				</div>
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
			<div id="topPart">
				<div id="leftBar">
					<div id="createdQuizDashboard">
					<%
					List<Quiz> createdQuizzes = user.loadQuizzesCreated();
					out.println("<h2>My Quizzes</h2>");
					for(int i =0; i < createdQuizzes.size(); i++){
						Quiz q = createdQuizzes.get(i);
						out.println("<div id=\"quizRow" + q.quizID + "\" class=\"quizRow\">");
						out.println("<div class=\"quizRowName quizRowClickable\">" + q.title + "<input type='hidden' value='" + q.quizID + "' /></div>");
						out.println("<div class=\"quizRowEdit\"><a href=\"#\">Edit</a></div>");
						out.println("<div class=\"quizRowDelete\"><a href=\"javascript:deleteQuiz(" + q.quizID + ")\">Delete</a></div>");
						out.println("</div>");
					}
					%>
					</div>
					<div id="socialLists">
						<div id="popularQuizzes">
						<%
						out.println("<h2>Most Popular Quizzes</h2>");
						List<Quiz> popularQuizzes = Quiz.loadPopularQuizzes(10);
						for(int i =0; i < popularQuizzes.size(); i++){
							Quiz q = popularQuizzes.get(i);
							out.println("<div class=\"quizRow quizRowClickable\">");
							out.println("<div class=\"quizRowName\">" + q.title + "</div>");
							out.println("<input type='hidden' value='" + q.quizID + "' />");
							out.println("</div>");
						}
						%>
						</div>
						<div id="friendsQuizActivities">
						<%
						out.println("<h2>Friends' Quizzes</h2>");
						List<Quiz> friendsQuizzes = user.loadFriendQuizzes(15);
						for(int i =0; i < friendsQuizzes.size(); i++){
							Quiz q = friendsQuizzes.get(i);
							out.println("<div class=\"quizRow quizRowClickable\">");
							out.println("<div class=\"quizRowName\">"+ q.title + "</div>");
							out.println("<input type='hidden' value='" + q.quizID + "' />");
							out.println("</div>");
						}
						%>
						</div>
					</div>
				</div>
				<div id="recentlyCreatedQuizzes">
				<%
				out.println("<h2>Recently Created Quizzes</h2>");
				List<Quiz> recentQuizzes = Quiz.loadRecentQuizzes(20);
				for(int i =0; i < recentQuizzes.size(); i++){
					Quiz q = recentQuizzes.get(i);
					out.println("<div class=\"quizRow quizRowClickable\">");
					out.println("<div class=\"quizRowName\">" + q.title + "</div>");
					out.println("<input type='hidden' value='" + q.quizID + "' />");
					out.println("</div>");
				}
				%>
				</div>
			</div>
			<div id="performances">
				<div id="myPerformance">
				<%
					out.println("<h2>My Performances</h2>");
					List<Performance> myPerformance = user.loadPerformances(10);
					for(int i =0; i < myPerformance.size(); i++){
						Performance p = myPerformance.get(i);
						out.println("<div class=\"quizRow\">");
						out.println("<div class=\"quizRowName\"> I scored "+p.score+" on quiz <a href=\"quizInfo.jsp?quizID="+p.quizID+"\">"+ Quiz.loadQuiz(p.quizID).title + "</a> on "+p.timeStamp+".</div>");
					out.println("</div>");
					}
				%>
				</div>
				
				<div id="friendsPerformance">
				<%
					out.println("<h2>Friend's Performances</h2>");
					List<Performance> friendsPerformance = user.loadFriendPerformances(10);
					for(int i =0; i < friendsPerformance.size(); i++){
						Performance p = friendsPerformance.get(i);
						out.println("<div class=\"quizRow\">");
						out.println("<div class=\"quizRowName\"><a href=\"profilePage.jsp?userToDisplay="+p.userID+"\">"+ p.userID + "</a> scored "+p.score+" on <a href=\"quizInfo.jsp?quizID="+p.quizID+"\">"+ Quiz.loadQuiz(p.quizID).title + "</a> on "+p.timeStamp+".</div>");
						out.println("</div>");
					}
				
				%>
				</div>
			</div>
		</div>
	</div>
	

</body>
</html>