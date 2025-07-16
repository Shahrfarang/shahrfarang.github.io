"use strict";
var keyboard_x=0;
var keyboard_y=0;
var last_keyboard_x=0;
var last_keyboard_y=0;
var keyboard_language ="en";



function keyboard_enter_clicked(){
	var search_tv = document.getElementById("search_tv");
	var btn = document.getElementById(keyboard_language+"key_x"+keyboard_x+"y"+keyboard_y);
	if((keyboard_language==="en" && keyboard_x ===0 && keyboard_y ===6) || (keyboard_language==="fa" && keyboard_x ===2 && keyboard_y ===7)){
		// space
		value_change();
	}
	else if((keyboard_language==="en" && keyboard_x ===2 && keyboard_y ===6) || (keyboard_language==="fa" && keyboard_x ===0 && keyboard_y ===7)){
		// backspace
		search_tv.value = search_tv.value.substring(0,search_tv.value.length-1);
		value_change();
	}
	else if(keyboard_language==="en" && keyboard_x ===1 && keyboard_y ===6){
		// switch to fa
		document.getElementById("fa_keyboard").style.display = "";
		document.getElementById("en_keyboard").style.display = "none";
		deactive_keyboard_btn(keyboard_x,keyboard_y);
		keyboard_language = "fa";
		keyboard_x = 1;
		keyboard_y = 7;
		last_keyboard_y =keyboard_y;
		last_keyboard_x =keyboard_x;
		active_keyboard_btn(keyboard_x,keyboard_y);

	}
	else if(keyboard_language==="fa" && keyboard_x ===1 && keyboard_y ===7){
		// switch to en
		document.getElementById("fa_keyboard").style.display = "none";
		document.getElementById("en_keyboard").style.display = "";
		deactive_keyboard_btn(keyboard_x,keyboard_y);
		keyboard_language = "en";
		keyboard_x = 1;
		keyboard_y = 6;
		last_keyboard_y =keyboard_y;
		last_keyboard_x =keyboard_x;
		active_keyboard_btn(keyboard_x,keyboard_y);
	}else{
		search_tv.value = search_tv.value+ btn.innerHTML.trim();
		value_change();
	}

}





function keyboard_right_clicked(){

	if(keyboard_language ==="en"){
		if(keyboard_y===6){
			if(keyboard_x<2){
				last_keyboard_x = keyboard_x ;
				last_keyboard_y = keyboard_y ;
				keyboard_x++;
			}else{
				is_keyboard_active = false ;
				//======
				deactive_keyboard_btn(keyboard_x,keyboard_y);
				active_item(x,y);
				return;
			}
		}else{
			if(keyboard_x<5){
				last_keyboard_x = keyboard_x ;
				last_keyboard_y = keyboard_y ;
				keyboard_x++;
			}else{
				is_keyboard_active = false ;
				// =======
				deactive_keyboard_btn(keyboard_x,keyboard_y);
				active_item(x,y);
				return;
			}
		}
	}else{
		if(keyboard_y===7){
			if(keyboard_x<3){
				last_keyboard_x = keyboard_x ;
				last_keyboard_y = keyboard_y ;
				keyboard_x++;
			}else{
				is_keyboard_active = false ;
				// =======
				deactive_keyboard_btn(keyboard_x,keyboard_y);
				active_item(x,y);
				return;
			}
		}else{
			if(keyboard_x<5){
				last_keyboard_x = keyboard_x ;
				last_keyboard_y = keyboard_y ;
				keyboard_x++;
			}else{
				is_keyboard_active = false ;
				// =======
				deactive_keyboard_btn(keyboard_x,keyboard_y);
				active_item(x,y);
				return;
			}
		}
	}

	active_keyboard_btn(keyboard_x,keyboard_y);
	deactive_keyboard_btn(last_keyboard_x,last_keyboard_y);
}
function keyboard_left_clicked(){

	if(keyboard_x>0)
	{
		last_keyboard_x = keyboard_x ;
		last_keyboard_y = keyboard_y ;
		keyboard_x--;
		active_keyboard_btn(keyboard_x,keyboard_y);
		deactive_keyboard_btn(last_keyboard_x,last_keyboard_y);
	}
}

function keyboard_up_clicked(){
	if(keyboard_y>0)
	{
		last_keyboard_y = keyboard_y ;
		last_keyboard_x = keyboard_x ;
		keyboard_y--;
		active_keyboard_btn(keyboard_x,keyboard_y);
		deactive_keyboard_btn(last_keyboard_x,last_keyboard_y);
	}

}

function keyboard_down_clicked(){
	if(keyboard_language ==="en"){
		if(keyboard_y === 5){
			if(keyboard_x ===0 || keyboard_x ===1 || keyboard_x ===2){
				last_keyboard_x = keyboard_x ;
				keyboard_x = 0;
				last_keyboard_y = keyboard_y ;
				keyboard_y ++ ;
			}
			else if(keyboard_x ===3 ){
				last_keyboard_x = keyboard_x ;
				keyboard_x = 1;
				last_keyboard_y = keyboard_y ;
				keyboard_y ++ ;
			}
			else if(keyboard_x ===4 ){
				last_keyboard_x = keyboard_x ;
				keyboard_x = 2;
				last_keyboard_y = keyboard_y ;
				keyboard_y ++ ;
			}
			else if(keyboard_x ===5 ){
				last_keyboard_x = keyboard_x ;
				keyboard_x = 2;
				last_keyboard_y = keyboard_y ;
				keyboard_y ++ ;
			}else{
				last_keyboard_y = keyboard_y ;
				last_keyboard_x = keyboard_x ;
				keyboard_y ++ ;
			}
		}
		else if(keyboard_y < 5){
			last_keyboard_y = keyboard_y ;
			last_keyboard_x = keyboard_x ;
			keyboard_y ++ ;
		}
	}else{
		if(keyboard_y === 6){
			if(keyboard_x ===2 || keyboard_x ===3 || keyboard_x ===4){
				last_keyboard_x = keyboard_x ;
				keyboard_x = 2;
				last_keyboard_y = keyboard_y ;
				keyboard_y ++ ;
			}
			else if(keyboard_x ===5){
				last_keyboard_x = keyboard_x ;
				keyboard_x = 3;
				last_keyboard_y = keyboard_y ;
				keyboard_y ++ ;
			}
			else{
				last_keyboard_y = keyboard_y ;
				last_keyboard_x = keyboard_x ;
				keyboard_y ++ ;
			}
		}
		else if(keyboard_y < 6){
			last_keyboard_y = keyboard_y ;
			last_keyboard_x = keyboard_x ;
			keyboard_y ++ ;
		}
	}

	active_keyboard_btn(keyboard_x,keyboard_y);
	deactive_keyboard_btn(last_keyboard_x,last_keyboard_y);

}




keyboard_init();
function keyboard_init(){

	page_has_keyboard = true ;

	var btn_width = $('#enkey_x0y0').width();
	if(btn_width ===0 )
		btn_width = $('#fakey_x0y0').width();
	$('#enkey_x0y6').width(btn_width * 3 +4) ; // fix space en width
	$('#enkey_x0y6').height(btn_width)

	$('#fakey_x2y7').width(btn_width * 3 +4) ;  // fix space en width
	$('#fakey_x2y7').height(btn_width)


	$('.keyboard-btn').each(function() {
		$(this).height(btn_width);
	});
	if(!is_back_clicked){
		is_keyboard_active = true ;
		active_keyboard_btn(0,0);
	}



	// $( document ).ready(function() {
	// 	//$(".keyboard-btn").height($(".keyboard-btn").width())
	// 	//console.log($(".keyboard-btn")[0].height());
	//
	// });
}







function active_keyboard_btn(kx,ky) {
	try {
		console.log("active"+ "x:"+ kx+" y:"+ky);
		$("#"+keyboard_language+"key_x"+kx+"y"+ky).addClass("item-selected");
	}
	catch(err) {
		console.log(err)
	}
}

function deactive_keyboard_btn(kx,ky) {
	try {
		console.log("Deactive"+ "x:"+ kx+" y:"+ky);
		$("#"+keyboard_language+"key_x"+kx+"y"+ky).removeClass("item-selected");
	}
	catch(err) {
		console.log(err)
	}
}