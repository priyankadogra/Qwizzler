$(document).ready(function(){
	$("#pwErr").hide();
	$("#loginUserNameErr").hide();
	$("#loginPwErr").hide();
	$("#newAccountContainer").hide();
	
	//form validation
	$("#pw").keyup(checkPasswords);
	$("#pwConf").keyup(checkPasswords);
	
	$("#userNameField").change(function(){
		$("#userNameErr").load("NameTakenServlet?userName=" + $("#userNameField").val());
	});
	
	$("#createButton").click(function(){
		$("#loginContainer").hide();
		$("#loginContainerWrong").hide();
		$("#newAccountContainer").show();
	});
	
	$("#backToLoginButton").click(function(){
		$("#newAccountContainer").hide();
		$("#loginContainer").show();
		$("#loginContainerWrong").show();
	});
});

/* Compares the password and the password confirmation.
 * Displays an error message if they don't match.
 */
function checkPasswords(){
	if($("#pw").val() != $("#pwConf").val()){
		$("#pwErr").html("Passwords must match").show();
	} else {
		$("#pwErr").hide();
	}
}

function validateLogin(){
	$("#loginUserNameErr").hide();
	$("#loginPwErr").hide();
	if($("#loginUserName").val() == ""){
		$("#loginUserNameErr").show();
		$("#loginUserName").focus();
		return false;
	}
	if($("#loginPassword").val() == ""){
		$("#loginPwErr").show();
		$("#loginPassword").focus();
		return false;
	}
	return true;
}

function validateCreate(){
	$("#nameErr").hide();
	$("#userNameErr").hide();
	$("#pwErr").hide();
	if($("#firstName").val() == ""){
		$("#nameErr").html("Please enter first name").show();
		$("#firstName").focus();
		return false;
	}
	if($("#lastName").val() == ""){
		$("#nameErr").html("Please enter last name").show();
		$("#lastName").focus();
		return false;
	}
	if($("#userNameField").val() == ""){
		$("#userNameErr").html("Please enter username").show();
		$("#userNameField").focus();
		return false;
	}
	if($("#pw").val() == ""){
		$("#pwErr").html("Please enter password").show();
		$("#pw").focus();
		return false;
	}
	return true;
}