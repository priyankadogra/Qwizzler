<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*" %>
<%@ page import="Shared.*" %>
<% User user = (User) request.getSession().getAttribute("user");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	
	<title>Qwizzler - Friends</title>
	
	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="friends.css"/>
	<link rel="stylesheet" type="text/css" href="profilePage.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="theme.js" type="text/javascript"></script>
	<script src="friends.js" type="text/javascript"></script>
</head>
<body>
	<%@ include file="topBar.jsp" %>
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
		</div>
	</div>
	<div id="mainContent">
		<div class="centerer">
			<input type="text" id="sendReceiver" placeholder="Find user" />
			<div id="friends">
			
			</div>
		</div>
	</div>
</body>
</html>