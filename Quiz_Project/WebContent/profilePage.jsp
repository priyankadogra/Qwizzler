<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		
		<title><%=request.getParameter("userToDisplay")%>'s Profile</title>
		
		<link rel="stylesheet" type="text/css" href="theme.css" />
		<link rel="stylesheet" type="text/css" href="profilePage.css" />
		
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
		<script src="theme.js" type="text/javascript"></script>
		<script src="profilePage.js" type="text/javascript"></script>
	</head>
<body>
	<%@ include file="topBar.jsp"%>
	<div id="blueBar">
	<input type="hidden" id="userToDisplay" value="<%=request.getParameter("userToDisplay") %>">
		<div class="centerer">
			<div id="profileGlimpse"></div>
			<div id="userAchievements" class="shadowed-inner"></div>
			<div class="clear"></div>
		</div>
	</div>
	<div id="mainContent">
		<div class="centerer">
			<div class="shadowed" id="quizzes">
				<h1> Quizzes Created</h1>
			</div>
			<div class="friends" id="friends"><br/></div>
		</div>
	</div>
</body>
</html>