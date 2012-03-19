<%@page import="Shared.User"%>
<div id="topBar">
	<div class="centerer">
		<div id="smallLogo"></div>
		<div id="topBarLinks">
			<div id="makeQuiz" class="quizLink">
				<span>Make a Quiz</span>
			</div>
			<div id="takeQuiz" class="quizLink">
				<span>Take a Quiz</span>
			</div>
		</div>
		
		<div id="settingsGear">
			<div id="settingsBox">
			</div>
		</div>
		<div id="mailIcon">
			<% 
				if(((User)request.getSession().getAttribute("user")).numUnreadMessages() != 0)
				out.println("<span>" + ((User)request.getSession().getAttribute("user")).numUnreadMessages() + "</span>");
			%>
		</div>
		<div id="friendsIcon">
		</div>
	</div>
</div>