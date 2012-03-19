/**
 * This file contains all the javascript needed to control the
 * pop up boxes.
 */

$(document).ready(function(){
	$("body").append("<div id=\"popUpWrapper\"></div>");
	$("#popUpWrapper").hide();
	
	$("#popUpWrapper").click(function(e){
		if($(event.target).parents("#popUpContent").length < 1){
			if(!$(event.target).is("#popUpContent")){
				removePopUp();
			}
		}
	});
	
	$("#popUpCancel").live("click", function(){
		removePopUp();
	});
	
	$("#popUpCancelButton").live("click", function() {
		removePopUp();
	});
	
});

function buildPopUp(content){
	$("body").append("<div id=\"dimmedOverlay\"></div>");
	$("#popUpWrapper").append("<div id=\"popUpContent\" class=\"shadowed\"></div>");
	$("#popUpContent").append("<div id=\"popUpCancel\"></div>");
	$("#popUpContent").append(content);
	$("#popUpWrapper").show();
}

function removePopUp(){
	$("#popUpWrapper").html("").hide();
	$("#dimmedOverlay").remove();
}