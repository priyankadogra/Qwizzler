$(document).ready(function() {
	//load popUp script
	$($("head").get(0)).append("<script src=\"popUps.js\" type=\"text/javascript\"></scri" + "pt>");
	
	/*************Navigation bar*****************/
	setUpNavigationFunctionality();
	
	/***************Profile Settings********************/
	setUpSettingsFunctionality();
	
});

function setUpNavigationFunctionality(){
	$("#settingsGear").load("PopulateSettingsServlet");
	
	$("#smallLogo").click(function(){
		window.location.href="index.jsp";
	});
	
	$("#settingsGear").click(function(){
		$("#settingsBox").toggle();
	});
	
	$("#makeQuiz").click(function() {
		window.location.href="makeQuiz.jsp";
	});
	
	$("#takeQuiz").click(function() {
		window.location.href="takeQuiz.jsp";
	});
	
	$("#mailIcon").click(function(){
		window.location.href="inbox.jsp";
	});
	
	$("#friendsIcon").click(function(){
		window.location.href="friends.jsp";
	});
}

function setUpSettingsFunctionality(){
	$("#passwordSave").live("click", function() {
		$("#pwResult").load("ChangeUserInfoServlet", {"pw":$("#password").val()}, function(){
			$("#pwResult").delay(1500).fadeOut(500);
		});
	});
	
	$("#firstNameSave").live("click", function() {
		$("#fnameResult").load("ChangeUserInfoServlet", {"fname":$("#firstName").val()}, function(){
			$("#fnameResult").delay(1500).fadeOut(500);
		});
	});
	
	$("#lastNameSave").live("click", function() {
		$("#lnameResult").load("ChangeUserInfoServlet", {"lname":$("#lastName").val()}, function(){
			$("#lnameResult").delay(1500).fadeOut(500);
		});
	});
	
	$("#imageURLSave").live("click", function() {
		$("#urlResult").load("ChangeUserInfoServlet", {"image":$("#imageURL").val()}, function(){
			$("#urlResult").delay(1500).fadeOut(500);
		});
	});
}

function profileSettings(){
	$.ajax({
		url:"ProfileSettingsServlet",
		dataType: "html",
		success: function(data){
			buildPopUp(data);
		}
	});
}

function removeNL(s){ 
	return s.replace(/[\n\r\t]/g,""); 
}

function addslashes(str) {
	str=str.replace(/\\/g,'\\\\');
	str=str.replace(/\'/g,'\\\'');
	str=str.replace(/\"/g,'\\"');
	str=str.replace(/\0/g,'\\0');
	return str;
}

function fixApostraphes(){
	$('input:text').each(function(){
		var text = $(this).val();
		$(this).val(addslashes(text));
	});
}