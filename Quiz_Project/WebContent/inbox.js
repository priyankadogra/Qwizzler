/************String Constants***************/
var newMessage ="<form method=\"post\" action=\"SendNoteServlet\" onsubmit='fixApostraphes()'>" +
					"<span id=\"newMessageTitle\">New Message</span>" +
					"<input type=\"text\" name=\"receiver\" id=\"sendReceiver\" placeholder=\"To\" />" +
					"<div id=\"receiverSuggestions\"></div>" +
					"<input type=\"text\" name=\"subject\" id=\"sendSubject\" placeholder=\"Subject\" />" +
					"<textarea name=\"body\" id=\"newMessageTextArea\"></textarea>" +
					"<div id=\"messageButtons\">" +
					"<button type=\"button\" id=\"popUpCancelButton\">Cancel</button>" +
					"<button type=\"submit\">Send</button>" +
					"</div>" +
				"</form>";

/************Set Up Function***************/
$(document).ready(function(){
	
	retrieveMessages();
	
	$("#refreshButton").click(function(){
		$("#mailControlBar").append("<img src=\"loading.gif\" id=\"loadingImage\" />");
		retrieveMessages();
		$("#loadingImage").remove();
	});
	
	
	
	$("#newButton").click(function(){
		buildPopUp(newMessage);
		
	});
	
	$("#deleteButton").click(function(){
		$("#mailControlBar").append("<img src=\"loading.gif\" id=\"loadingImage\" />");
		var $checkedArr = $("input:checked");
		var fname = "DeleteMessagesServlet?len=" + $checkedArr.length;
		$checkedArr.each(function(index){
			fname += "&" + index + "=" + $($checkedArr[index]).val();
		});
		$("#messageList").load(fname, function(){
			retrieveMessages();
			$("#loadingImage").remove();
		});
	});
	
	$("#replyButton").live("click", function(){
		var receiver = $("#viewMessageFrom").html();
		var subject = "RE: " + $("#viewMessageSubject").html();
		removePopUp();
		buildPopUp(newMessage);
		$("#sendReceiver").val(receiver);
		$("#sendSubject").val(subject);
	});
	
	$("#takeQuizButton").live("click", function(){
		var quizID = $("#quizToTake").val();
		removePopUp();
		location.href = "quizInfo.jsp?quizID=" + quizID;
	});
	
	$("#acceptButton").live("click", function(){
		var requester = removeNL($("#viewMessageFrom span").html());
		removePopUp();
		$.ajax({
			url:"AddAsFriendServlet",
			data: {
				"otherUser":requester
			},
			success: function(data){
				
			}
		});
	});
	
	$("#sendReceiver").live("keyup", function() {
		if($("#sendReceiver").val().length > 2){
			$("#sendReceiver").attr("disabled", "disabled");
			$("#receiverSuggestions").append("<img src='loading.gif' />");
			$.ajax({
				url:"SuggestReceiverServlet",
				data: {
					"typed":$("#sendReceiver").val()
				},
				dataType: "html",
				success: function(data){
					$("#receiverSuggestions").html(data);
					$("#sendReceiver").removeAttr("disabled");
				}
			});
		}
		
	});
	
	/*$(".inboxRow").live("mouseenter", function(){
		$(this).css("background-color", "#88CFE6");
	});
	$(".inboxRow").live("mouseleave", function(){
		$(this).css("background-color", "transparent");
	});*/
	
	$(".inboxRowClickable").live("click", function(){
		viewMessage($($($(this).siblings(".checkBox").get(0)).find("input").get(0)).val());
	});
	
	$(".autocompleteRow").live("mouseenter", function(){
		$(this).css("background-color", "#88CFE6");
	});
	$(".autocompleteRow").live("mouseleave", function(){
		$(this).css("background-color", "transparent");
	});
	
	$(".autocompleteRow").live("click", function(){
		$("#sendReceiver").val($($(this).find("input").get(0)).val());
		$("#receiverSuggestions").html("");
	});
});

/*****************Other/Helper functions**********************/

/* Pulls the messages from the server, stores
 * them in the Session, and then calls the
 * populateInbox function to display them on
 * the screen.
 */
function retrieveMessages(){
	$("#messageList").load("LoadMessagesIntoSessionServlet", populateInbox);
}

/* Calls a servlet that returns the list of messages as an
 * HTML table.
 */
function populateInbox(){
	$("#messageList").load("RetrieveInboxServlet");
}

/* Loads the content of a message into a popup box.
 */
function viewMessage(i){
	$.ajax({
		url:"FetchMessageServlet?index=" + i,
		dataType: "html",
		success: function(data){
			buildPopUp(data);
			retrieveMessages();
		}
	});
}

function replyMessage(){
	
}
