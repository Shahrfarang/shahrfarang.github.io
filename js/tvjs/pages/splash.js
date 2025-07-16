"use strict";

load_data();


function load_data() {

	setTimeout(function() {
		//window.location.replace("page.html?page="+PageType.home);
		//window.location.replace("player2/player.html");
	}, 100);

	var page = getUrlParameter('page');
	var time_zone ="US/Central";
	var current_version ="1.0.0";

	try{
		time_zone= tizen.time.getLocalTimezone();
	}
	catch (e) {}

	try{
		var packageInfo = tizen.package.getPackageInfo('iJ4qmAbHxG');
		current_version = packageInfo.version;
		//console.log(packageInfo);
	}
	catch (e) {}
	current_version = current_version.replace(".","");
	current_version = current_version.replace(".","");
	current_version = parseInt(current_version);

	var ws_url = api_url+"splash?device_type=4&time_zone="+time_zone;
	main_data.push([{"row_type":-1,"item_type":ItemType.reload_btn}]);
	last_row_x_array.push(0);
	page_has_keyboard = false ;
	show_loading();
	$.get(ws_url)
		.done(function(data) {
			dismiss_loading();
			//unset_reload_btn();
			main_data = [];
			var jobj = JSON.parse(data);

			var min_version = jobj["update_dialog"]['min_version'];
			var update_image = jobj["update_dialog"]['update_image'];
			min_version = min_version.replace(".","");
			min_version = min_version.replace(".","");
			min_version = parseInt(min_version);


			var ban = jobj["ban_dialog"]['ban'];
			var ban_image = jobj["ban_dialog"]['ban_image'];

			var promotion_show = jobj["promotion_dialog"]['promotion_show'];
			var promotion_image = jobj["promotion_dialog"]['promotion_image'];



			localStorage.setItem("support_image",jobj["support"]);

			if(current_version<min_version){
				show_dialog("update",1,"خروج","",update_image);
			}
			else if(ban ===1 ) {
				show_dialog("ban",1,"خروج","",ban_image);
			}
			else if(promotion_show ===1 ) {
				show_dialog("promotion",1,"ادامه","",promotion_image);
			}else{
				window.location.replace("page.html?page="+PageType.home);


			}
		})
		.fail(function(jqXHR){
			dismiss_loading();
			show_error("");
		});


}


function dialog_click(){
	if(dialog_id ==="ban"){
		tizen.application.getCurrentApplication().exit();
	}
	else if(dialog_id ==="promotion"){
		window.location.replace("page.html?page="+PageType.home);
	}
	else if(dialog_id ==="update"){
		tizen.application.getCurrentApplication().exit();
	}
}