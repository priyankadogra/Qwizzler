$(document).ready(function(){
	
	loadFullFriendList();
	
	$("#sendReceiver").live("keyup", function() {
		if($("#sendReceiver").val().length == 0){
			loadFullFriendList();
		} else {
			if($("#sendReceiver").val().length > 2){
				$("#sendReceiver").attr("disabled", "disabled");
				$("#friends").append("<img src='loading.gif' />");
				$.ajax({
					url:"UserSuggestionsServlet",
					data: {
						"typed":$("#sendReceiver").val()
					},
					dataType: "html",
					success: function(data){
						$("#friends").html(data);
						$("#sendReceiver").removeAttr("disabled");
					}
				});
			}
		}
		
	});
	
	//$("#userAchievements").load('ProfilePageServlet?fetch=getUserAchievements&userToDisplay='+$("#userToDisplay").val());
	
	//$("#friends").load('ProfilePageServlet?fetch=getFriends&userToDisplay='+$("#userToDisplay").val());

});

function loadFullFriendList(){
	$("#friends").append("loading friends <img src='loading.gif' />");
	$("#friends").load("FetchFriendsServlet");
}
	