<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<title>Qwizzler - Login</title>
	
	<link rel="stylesheet" type="text/css" href="theme.css"/>
	<link rel="stylesheet" type="text/css" href="login.css"/>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="login.js" type="text/javascript"></script>
</head>
<body>
	<div id="topBar"></div>
	<div id="blueBar">
		<div class="centerer">
			<div id="bigLogo"></div>
		</div>
	</div>
	<div id="mainContent" class="centerer">
		<div id="loginContainer" class="loginPageContainer shadowed">
			<h2>
				Login 
				<% 
					if(request.getAttribute("loginFail") != null)
						out.print(" Failed - Try Again");
				%>
			</h2>
			<form action="LoginServlet" method="post" onsubmit="return validateLogin()">
				<label>
					<span>User Name:</span>
					<strong id="loginUserNameErr">Please enter username</strong>
					<input type="text" name="userName" id="loginUserName"/>
				</label>
				<label>
					<span>Password:</span>
					<strong id="loginPwErr">Please enter password</strong>
					<input type="password" name="password" id="loginPassword"/>
				</label>
				<button id="createButton" class="navButton" type="button">Create New Account</button>
				<button type="submit">Login</button>
			</form>
		</div>
		<div id="newAccountContainer" class="loginPageContainer shadowed">
			<h2>Create New Account</h2>
			<form action="CreateAccountServlet" method="post" onsubmit="return validateCreate()">
				<label id="nameInputs">
					<div><span>Name:</span>
					<strong id="nameErr"></strong></div>
					<input type="text" name="firstName" id="firstName" placeholder="First"/>
					<input type="text" name="lastName" id="lastName" placeholder="Last"/>
				</label>
				<label>
					<span>User Name:</span>
					<strong id="userNameErr"></strong>
					<input type="text" name="userName" id="userNameField"/>
				</label>
				<label>
					<span>Password:</span>
					<strong id="pwErr"></strong>
					<input type="password" name="password" id="pw"/>
				</label>
				<label>
					<span>Confirm Password:</span>
					<strong id="pwConfErr"></strong>
					<input type="password" name="passwordConfirm" id="pwConf"/>
				</label>
				<button id="backToLoginButton" class="navButton" type="button">Back</button>
				<button type="submit">Submit</button>
			</form>
		</div>
	</div>
</body>
</html>