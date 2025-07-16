"use strict";

var x=0;
var y=0;
var last_x=0;
var last_y=0;
var last_row_x_array = [];
var main_data=[];
var is_delay = false ;
var current_page = 1;
// ===== drawer
//var drawer_data=new Array(6);
var drawer_length=6;
var is_drawer_active = false ;
var active_drawer_y  = -1 ;
var drawer_y  = 0 ;

// ===== dialog
var is_dialog_active = false;
var dialog_x = 0;
var dialog_btn_count = 2;
var dialog_id = "";


// ===== keyboard
var is_keyboard_active = false;
var page_has_keyboard = false ;
var search_str ="";
var is_back_clicked = false ;



// ===== device info
var client_id = "";
var country_code = false ;
var timezone ="";
var device_ip ="";


function save_states()
{
	var current_states = [
		x,
		y,
		last_x,
		last_y,
		last_row_x_array,
		is_drawer_active,
		active_drawer_y,
		drawer_y,
		is_dialog_active,
		dialog_x,
		is_keyboard_active,
		search_str,
		dialog_btn_count,
		dialog_id,
	];

	sessionStorage.setItem(window.location.toString(),JSON.stringify(current_states));




}

function restore_states()
{
	try{
		var current_states =JSON.parse(sessionStorage.getItem(window.location.toString()));

		console.log(current_states);
		x = current_states[0];
		y = current_states[1];
		last_x = current_states[2];
		last_y = current_states[3];
		last_row_x_array = current_states[4];
		is_drawer_active = current_states[5];
		active_drawer_y = current_states[6];
		drawer_y = current_states[7];
		is_dialog_active = current_states[8];
		dialog_x = current_states[9];
		is_keyboard_active = current_states[10];
		search_str = current_states[11];
		dialog_btn_count = current_states[12];
		dialog_id = current_states[13];

	}catch (e){}



}





function enter_clicked(){

	// var value = localStorage.getItem('test');
	// if(value == null)
	// 	value = 0 ;
	// value ++ ;
	// localStorage.setItem('test', value);
	// alert(""+value);
	//window.location.replace("setting.html");

	//====================
	//location.href = "setting.html";


	//show_dialog("test","sssss","yes","no");
	if(is_keyboard_active){
		keyboard_enter_clicked();
	}else{
		do_action();
	}

}





function right_clicked(){
	if(is_keyboard_active)
	{
		keyboard_right_clicked();
		return;
	}
	if(is_dialog_active)
	{
		dialog_x++;
		if(dialog_x>=dialog_btn_count)
			dialog_x = dialog_btn_count-1 ;
		set_active_dialog_btn();
		return;
	}
	if(is_delay)
		return;
	if(is_drawer_active){
		is_drawer_active = false ;
		active_item(x,y);
		deactive_drawer_item(drawer_y)
	}else{
		last_x = x;
		last_y = y ;
		x = x + 1 ;
		if(x>=main_data[y].length)
			x =0
		deactive_item(last_x,last_y);
		active_item(x,y);
		//scrollX();
		//scrollY();
		if(main_data[y][x].row_type === RowType.slider){
			$("#row"+y).slick('slickNext');
			is_delay = true;
			//sleep(200).then(() => {is_delay = false });
			setTimeout(function() {
				is_delay = false
			}, 200);
		}
	}

}
function left_clicked(){
	if(is_keyboard_active)
	{
		keyboard_left_clicked();
		return;
	}
	if(is_delay)
		return;
	if(is_dialog_active)
	{
		dialog_x--;
		if(dialog_x<0)
			dialog_x = 0 ;
		set_active_dialog_btn();
		return;
	}
	if(x>0)
	{
		last_x = x;
		last_y = y ;
		x = x - 1 ;
		deactive_item(last_x,last_y);
		active_item(x,y);
		//scrollX();
		//scrollY()
		if(main_data[y][x].row_type === RowType.slider){
			$("#row"+y).slick('slickPrev');
			is_delay = true;
			setTimeout(function() {
				is_delay = false
			}, 200);
			//sleep(200).then(() => {is_delay = false });
		}
	}else{
		if(page_has_keyboard){
			is_keyboard_active = true ;
			deactive_item(x,y);
			active_keyboard_btn(keyboard_x,keyboard_y);
		}else{
			is_drawer_active = true ;
			deactive_item(x,y);
			active_drawer_item(drawer_y)
		}

	}

}

function up_clicked(){

	if(is_keyboard_active)
	{
		keyboard_up_clicked();
		return;
	}
	if(is_dialog_active)
		return;
	if(is_drawer_active){
		if(drawer_y>0){
			deactive_drawer_item(drawer_y)
			drawer_y--;
			active_drawer_item(drawer_y)
		}
	}else{
		if(y>0)
		{
			last_x = x;
			last_y = y ;
			last_row_x_array[y] = x;
			y-- ;
			x = last_row_x_array[y];
		}
		deactive_item(last_x,last_y);
		active_item(x,y);
		//scrollY();
		//scrollX();
	}

}

function down_clicked(){

	if(is_keyboard_active)
	{
		keyboard_down_clicked();
		return;
	}
	if(is_dialog_active)
		return;
	if(is_drawer_active){
		if(drawer_y<(drawer_length-1)){
			deactive_drawer_item(drawer_y)
			drawer_y++;
			active_drawer_item(drawer_y)
		}
	}else{
		if(y<main_data.length-1)
		{
			last_x = x;
			last_y = y ;
			last_row_x_array[y] = x;
			y++ ;
			x = last_row_x_array[y]
		}


		deactive_item(last_x,last_y);
		active_item(x,y);
		//scrollY();
		//scrollX();
	}

}



function do_action()
{


	if(is_drawer_active){
		if(drawer_y ===0 && active_drawer_y !== 0){
			save_states();
			clear_stack();
		}
		else if(drawer_y ===1 && active_drawer_y !== 1){
			save_states();
			sessionStorage.setItem("goto_page","page.html?page="+PageType.serial);
			clear_stack();
			set_back_stack_index(1);
			//location.href = "page.html?page="+PageType.serial;
		}
		else if(drawer_y ===2 && active_drawer_y !== 2){
			save_states();
			sessionStorage.setItem("goto_page","page.html?page="+PageType.live);
			clear_stack();
			set_back_stack_index(1);
			//location.href = "page.html?page="+PageType.live;
		}
		else if(drawer_y ===3 && active_drawer_y !== 3){
			save_states();
			sessionStorage.setItem("goto_page","page.html?page="+PageType.movie);
			clear_stack();
			set_back_stack_index(1);
			//location.href = "page.html?page="+PageType.movie;

		}
		else if(drawer_y ===4 && active_drawer_y !== 4){
			save_states();
			sessionStorage.setItem("goto_page","search.html");
			clear_stack();
			set_back_stack_index(1);
			//location.href = "search.html";

		}
		else if(drawer_y ===5 && active_drawer_y !== 5){
			save_states();
			sessionStorage.setItem("goto_page","support.html");
			clear_stack();
			set_back_stack_index(1);
			//location.href = "support.html";

		}
	}
	else if(is_dialog_active){
		try {
			main_dialog_click();
			dialog_click();
		}catch (e) {}
	}
	else{

		if(main_data[y][x].item_type === ItemType.category){
			save_states();
			set_back_stack_index(back_stack_index+1);
			location.href = "category.html?category_id="+main_data[y][x].id+"&category_image="+encodeURIComponent(main_data[y][x].image);
		}
		else if(main_data[y][x].item_type === ItemType.serial){
			save_states();
			set_back_stack_index(back_stack_index+1);
			sessionStorage.setItem("serial_title",main_data[y][x].title);
			location.href = "serial.html?serial_id="+main_data[y][x].id+"&serial_image="+encodeURIComponent(main_data[y][x].image)+"&detail_image="+encodeURIComponent(main_data[y][x].detail_image);
		}
		else if(main_data[y][x].item_type === ItemType.reload_btn){
			load_data();
		}
		else if(main_data[y][x].item_type === ItemType.fav_btn){
			fav_clicked();
		}
		else if(main_data[y][x].item_type === ItemType.live || main_data[y][x].item_type === ItemType.movie){
			save_states();
			var playlist_array = [main_data[y][x]];
			sessionStorage.setItem("playlist",JSON.stringify(playlist_array));
			if(main_data[y][x].item_type === ItemType.movie){
				var resume_time = parseInt(localStorage.getItem("resume_movie"+main_data[y][x].id));
				if(isNaN(resume_time))
				{
					show_player();
				}else{
					show_dialog("resume",2,"ادامه","پخش از ابتدا","images/tv/tizen_resume.png");

				}
			}else{
				show_player();
			}


		}
		else if(main_data[y][x].item_type === ItemType.episode){
			save_states();
			var playlist_array = get_playlist();
			sessionStorage.setItem("playlist",JSON.stringify(playlist_array));
			var resume_time = parseInt(localStorage.getItem("resume_episode"+main_data[y][x].id));
			if(isNaN(resume_time))
			{
				show_player();
			}else{
				show_dialog("resume",2,"ادامه","پخش از ابتدا","images/tv/tizen_resume.png");

			}

		}
	}

}


function back_clicked()
{

	if(back_stack_index>0){
		set_back_stack_index(back_stack_index-1);
		sessionStorage.setItem("back_clicked","1");
		history.back();
	}else{
		tizen.application.getCurrentApplication().exit();
	}
}


function main_dialog_click()
{

	if(dialog_id ==="resume"){
		if(dialog_x ===0){
			sessionStorage.setItem("should_resume_media","1");
		}
		hide_dialog();
		show_player();
	}

}






init();
function init(){

	try {
		var perfEntries = performance.getEntriesByType("navigation");
		if (perfEntries[0].type === "back_forward") {
			restore_states();
			is_back_clicked = true ;
			if(is_drawer_active)
				active_drawer_item(drawer_y);
		}
	}catch (e){
		if(sessionStorage.getItem("back_clicked") ==="1"){
			sessionStorage.setItem("back_clicked","0");
			is_back_clicked = true ;
			restore_states();
			if(is_drawer_active)
				active_drawer_item(drawer_y);
		}
	}

	if( sessionStorage.getItem("goto_page")!=="" && sessionStorage.getItem("goto_page")!==null){
		var path = sessionStorage.getItem("goto_page") ;
		sessionStorage.setItem("goto_page","");
		set_back_stack_index(1);
		location.href = path;
	}

	try {
		timezone = tizen.time.getLocalTimezone()+"";
		tizen.systeminfo.getPropertyValue("LOCALE", onSuccessCallback, onErrorCallback);
		//var tizenId = tizen.systeminfo.getCapability('http://tizen.org/system/tizenid');
		//console.log("iddddd  "+tizenId);
	} catch (e) {
	}


	
	try {
		  	client_id = webapis.appcommon.getUuid();
		} catch (e) {
		  // if(e.message.indexOf('undefined') == -1) {
			//   console.log(" Uuid value = Errrr");
		  // } else {
			//   console.log(" Uuid value = Errrr2");
		  // }
			try {
				client_id = tizen.systeminfo.getCapability('http://tizen.org/system/tizenid');
			}catch (e2) {}
		}
}


function onErrorCallback(error) {
    //alert("Not supported: " + error.message);
}
function onSuccessCallback(device) {
	country_code = device.country+"";
	//alert("Language =" + device.language + " Country = " + device.country);
	//alert("Country: " + device.country);
	//alert("Language: " + device.language);
}

window.onmessage = function(e) { // inside the parent
	if (e.data == 'hide_player') {
		hide_player();
	}
};

