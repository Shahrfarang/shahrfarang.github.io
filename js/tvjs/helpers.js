"use strict";

function create_row(row_array,y) {
	try {
		//console.log("start row function")
		if(row_array.length<=0)
			return;

		var height = 150;
		var width = 400;
		if(row_array[0].row_type === RowType.slider){
			// create slider
			create_row_slider(row_array,y);
			return;
		}
		else if(row_array[0].row_type === RowType.ads_big ){
			width = $('#rows_cnt').width()*1.0;
			width = width - 20 ;
			height = width/3 ;
		}
		else if(row_array[0].row_type === RowType.ads_small){
			width = $('#rows_cnt').width()*1.0;
			width = width - 20 ;
			height = width/9 ;
		}
		else if(row_array[0].row_type === RowType.large){
			//width = window.innerWidth*0.45;
			width = $('#rows_cnt').width()*0.45;
			height = width/2 ;
		}
		else if(row_array[0].row_type === RowType.medium){
			//width = window.innerWidth*0.30;
			width = $('#rows_cnt').width()*0.30;
			height = width/2 ;
		}
		else if(row_array[0].row_type === RowType.small){
			//width = window.innerWidth*0.22;
			width = $('#rows_cnt').width()*0.22;
			height = width/2 ;
		}
		else if(row_array[0].row_type === RowType.grid4){
			//width = window.innerWidth*0.22;
			width = ($('#rows_cnt').width()-72)*0.24;
			height = width/2 ;
		}
		else if(row_array[0].row_type === RowType.grid3){
			width = ($('#rows_cnt').width()-60)*0.32;
			height = width/2 ;
		}
		else if(row_array[0].row_type === RowType.vertical_serial){
			//width = window.innerWidth*0.30;
			width = $('#rows_cnt').width()*0.20;
			height = width*533/400 ;
		}
		else{
			return;
		}


		var div = document.getElementById("row_template").cloneNode(true);
		div.style.display = "";
		div.setAttribute("id", "row"+y);
		if(row_array[0].row_type === RowType.grid4 || row_array[0].row_type === RowType.grid3){
			//div.classList.remove("item-container");
			//div.classList.add("row");
			div.style.marginTop="10px";
		}


		 var header = document.getElementById("item_header_template").cloneNode(true);
		 header.style.display = "";
		 header.setAttribute("id", "header"+y);
		 set_item_header_data(header,row_array,0,y);

		var ul = div.querySelector("#ul_template");
		ul.setAttribute("id", "ul"+y);
		ul.style.height = height+'px';
		for (let index = 0; index < row_array.length; index++) {
			var li = ul.querySelector("#li_template").cloneNode(true);
			li.style.display = "";
			li.style.width = width+'px';
			li.setAttribute("id", "x"+index+"y"+y);
			var item = li.querySelector("#item_template").cloneNode(true);
			li.querySelector("#item_template").remove();
			item.style.display = "";
			set_item_data(item,row_array[index],index,y);
			li.appendChild(item);
			ul.appendChild(li);
		}
		ul.querySelector("#li_template").remove();
		div.appendChild(ul);
		if(row_array[0].row_type !== RowType.grid4 && row_array[0].row_type !== RowType.grid3){
			document.getElementById("rows_cnt").appendChild(header);
		}
		document.getElementById("rows_cnt").appendChild(div);
	}
	catch(err) {
		console.log(err);
	}
}

function create_row_slider(row_array,y ) {
	try {
		var div = document.getElementById("row_slider_template").cloneNode(true);
		//div.style.display = "";
		var has_data = false;
		div.setAttribute("id", "row"+y);
		for (let index = 0; index < row_array.length; index++) {
			has_data = true;
			var item = div.querySelector("#item_slider_template").cloneNode(true);
			item.style.display = "";
			item.setAttribute("id", "x"+index+"y"+y);
			set_item_slide_data(item,row_array[index],index,y);
			div.appendChild(item);

		}
		div.querySelector("#item_slider_template").remove();
		document.getElementById("rows_cnt").appendChild(div);
		//active_slider("row"+y);


		// Promise.all([document.getElementById("image_x0y"+y)].filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
		// 	console.log("imaaaage");
		// 	console.log(y);
		// 	active_slider("row"+y);
		// });


		setTimeout(function() {
			div.style.display = "";
			active_slider("row"+y);
		}, 250);
		setTimeout(function() {
			div.style.display = "";
			active_slider("row"+y);
		}, 500);
		setTimeout(function() {
			div.style.display = "";
			active_slider("row"+y);
		}, 750);
		setTimeout(function() {
			div.style.display = "";
			active_slider("row"+y);
		}, 1000);

	}
	catch(err) {
		console.log(err);
	}
}

function get_grid_arrays(row_array) {
	try {
		var size = 4 ;
		if(row_array.length<=0)
			return [];
		if(row_array[0].row_type === RowType.grid4)
			size = 4
		else if(row_array[0].row_type === RowType.grid3)
			size = 3
		var chunk = [] ;
		while (row_array.length > 0) {
			var temp = row_array.splice(0,size);
			chunk.push(temp);
		}
		return chunk;
	}
	catch(err) {
		console.log(err);
	}
}

function set_item_data(element , data,x ,y ) {
	try {

		//element.children[0].src = data.image;

		element.children[0].src = "images/tv/blank.png";
		element.children[0].classList.add("lazyload");
		element.children[0].setAttribute('data-src',data.image);
		element.children[0].setAttribute('data-sizes',"lazyload");
	}
	catch(err) {
		console.log(err);
	}
}

function set_item_header_data(element , data,x,y) {
	try {
		var text1 = element.querySelector("#row_text1_template");
		var text2 = element.querySelector("#row_text2_template");
		var text3 = element.querySelector("#row_text3_template");
		text1.innerHTML = data[0].row_title;
		text3.innerHTML = "";
		var number = x+1;
		text2.innerHTML = number+" of "+data.length ;
	}
	catch(err) {
		console.log(err);
	}
}

function set_item_slide_data(element , data,x,y) {
	try {
		var image = element.querySelector("#item_slider_image_template");
		var text = element.querySelector("#item_slider_text_template");
		var a = element.querySelector("#item_slider_a_template");
		image.src = data.image;
		text.innerHTML = "";
		image.setAttribute("id", "image_x"+x+"y"+y);

	}
	catch(err) {
		console.log(err);
	}
}


function active_item(x,y) {
	try {
		if(main_data[y][x].row_type === RowType.slider){
			$("#image_x"+x+"y"+y).addClass("item-selected");
		}else{
			$("#x"+x+"y"+y).addClass("item-selected");
			try {
				if(main_data[y][x].item_type === ItemType.fav_btn){
					document.getElementById("x"+x+"y"+y).style.backgroundColor = "#ffffff";
				}
			}catch (e) {}
		}
		scrollX();
		scrollY();
		set_item_header_data(document.getElementById("header"+y),main_data[y],x,y);

	}
	catch(err) {
		console.log(err);
	}
}

function deactive_item(x,y) {
	try {
		if(main_data[y][x].row_type === RowType.slider){
			$("#image_x"+x+"y"+y).removeClass("item-selected");

		}else{
			$("#x"+x+"y"+y).removeClass("item-selected");
			if(main_data[y][x].item_type === ItemType.fav_btn){
				document.getElementById("x"+x+"y"+y).style.backgroundColor = "#6C7179";
			}
		}

	}
	catch(err) {
		console.log(err);
	}
}

function set_current_page(y) {
	try {

		document.getElementById("drawer_item"+y).querySelector("img").src ="images/tv/menu"+y+"_on.png";
		document.getElementById("drawer_item"+y).querySelector("div").style.color ="#6810fc";
	}
	catch(err) {
		console.log(err);
	}
}


function active_drawer_item(drawer_y) {
	try {
		$("#drawer_item"+drawer_y).addClass("item-selected");
	}
	catch(err) {
		console.log(err);
	}
}

function deactive_drawer_item(drawer_y) {
	try {
		$("#drawer_item"+drawer_y).removeClass("item-selected");
	}
	catch(err) {
		console.log(err);
	}
}






function show_dialog(id ,btn_count ,yes_text, no_text ,bg_url) {
	try {
		dialog_id = id;
		dialog_btn_count = btn_count;
		is_dialog_active = true ;
		//document.getElementById("dialog_title").innerHTML = title ;
		//document.getElementById("dialog_text").innerHTML = text ;
		document.getElementById("dialog_yes_text").innerHTML = yes_text ;
		document.getElementById("dialog_no_text").innerHTML = no_text ;
		document.getElementById("dialog_bg").style.backgroundImage = "url('"+bg_url+"')" ;
		if(dialog_btn_count===1){
			document.getElementById("dialog_btn_no").style.display="none";

		}

		set_active_dialog_btn();
		$('#dialog_cnt').modal('show');
	}
	catch(err) {
		is_dialog_active = false ;
		console.log(err);
	}
}

function hide_dialog() {
	try {

		$('#dialog_cnt').modal('hide');
		is_dialog_active = false ;
		dialog_x = 0 ;
	}
	catch(err) {
		is_dialog_active = false ;
		console.log(err);
	}
}

function set_active_dialog_btn() {
	try {

		console.log("dialog_x");
		document.getElementById("dialog_btn_yes").style.backgroundColor ="#6C7179";
		document.getElementById("dialog_btn_no").style.backgroundColor ="#6C7179";
		if(dialog_x===1){

			document.getElementById("dialog_btn_no").style.backgroundColor ="#6810fc";
		}else{
			document.getElementById("dialog_btn_yes").style.backgroundColor ="#6810fc";

		}
	}
	catch(err) {
		console.log(err);
	}
}



function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function active_slider(id){
	jQuery('#'+id).slick({
		centerMode: true,
		centerPadding: '300px',
		slidesToShow: 1,
		nextArrow: '<button class="NextArrow"><i class="ri-arrow-right-s-line"></i></button>',
		prevArrow: '<button class="PreArrow"><i class="ri-arrow-left-s-line"></i></button>',
		arrows:true,
		dots:false,
		focusOnSelect: true,
		adaptiveHeight: true,
		speed:200,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '20px',
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '20px',
					slidesToShow: 1
				}
			}
		]
	});
}



function show_loading() {
	try {
		document.getElementById("loading_cnt").style.display="";
		document.getElementById("btn_cnt").style.display="none";
		document.getElementById("error_cnt").style.display="none";
	}catch (err){}

}

function dismiss_loading() {
	try {
		document.getElementById("loading_cnt").style.display="none";
		document.getElementById("btn_cnt").style.display="none";
		document.getElementById("error_cnt").style.display="none";
	}catch (err){}

}

function show_error(msg) {
	try {
		document.getElementById("loading_cnt").style.display="none";
		document.getElementById("btn_cnt").style.display="";
		document.getElementById("error_cnt").style.display="";
		if(msg!==""){
			document.getElementById("error_msg").innerHTML=msg;
		}
	}catch (err){}

}

function unset_reload_btn(x , y ) {
	var id = "x"+x+"y"+y;
	document.getElementById(id).setAttribute("id", "reload_btn");
	main_data.splice(y, 1);
	last_row_x_array.splice(y, 1);
}


// var getUrlParameter = function getUrlParameter(sParam) {
// 	var sPageURL = window.location.search.substring(1),
// 		sURLVariables = sPageURL.split('&'),
// 		sParameterName,
// 		i;
//
// 	for (i = 0; i < sURLVariables.length; i++) {
// 		sParameterName = sURLVariables[i].split('=');
//
// 		if (sParameterName[0] === sParam) {
// 			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
// 		}
// 	}
// 	return false;
// };

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var	sURLVariables = sPageURL.split('&');
	var 	sParameterName ="";
	var 	i =0;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
}



// PLayer ======================================================
// PLayer ======================================================
// PLayer ======================================================

function show_player(){
	document.getElementById("player_frame").src = "player/player.html";
	document.getElementById("player_frame").style.display= "";
	document.getElementById("player_frame").contentWindow.focus();
}

function hide_player(){
	document.getElementById("player_frame").style.display= "none";
}

// Scrolls ======================================================
// Scrolls ======================================================
// Scrolls ======================================================
// Scrolls ======================================================

function scrollX(){
	var active = $('#'+"x"+x+"y"+y);
	var left = active.position().left;
	var div = $("#row"+y);

	var currScroll= div.scrollLeft();
	var contWidth = div.width()/2;
	var activeOuterWidth = active.outerWidth()/2;
	left= left + currScroll - contWidth + activeOuterWidth;

	div.animate( {
		scrollLeft: left// drawer margin
	},'fast');



}

function scrollY(){

	var offset = 0
	try {
		offset = $("#row0").position().top;
	}catch (e){}
	var active = $("#row"+y);
	console.log(active.position());
	//window.scroll(0, active.position().top);
	$("html, body").animate({ scrollTop: active.position().top-offset }, 'fast');

}





// parsers ======================================================
// parsers ======================================================
// parsers ======================================================
// parsers ======================================================





function parse_row(jrow) {
	var row = [];
	var row_title = jrow["name"];
	var row_type = jrow["size"];
	var list = jrow["list"];
	for(var i =0 ; i<list.length ; i++){
		var item = parse_item(list[i],row_title,row_type);
		row.push(item);
	}
	return row;
}

function parse_item(jitem,row_title, row_type ) {
	return {
		row_type: row_type,
		row_title: row_title,
		id: jitem["id"],
		title: jitem["title"],
		content: jitem["content"],
		image: jitem["image"],
		video_type: jitem["video_type"],
		url: jitem["url"],
		detail_image: jitem["detail_image"],
		quality: jitem["quality"],
		item_type: jitem["item_type"],
	};
}

