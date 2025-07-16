"use strict";

load_data();
function load_data() {
	document.getElementById("support_image").src = localStorage.getItem("support_image");
}

function enter_clicked(){

	set_back_stack_index(back_stack_index-1);
	sessionStorage.setItem("back_clicked","1");
	history.back();

}

function back_clicked()
{

	set_back_stack_index(back_stack_index-1);
	sessionStorage.setItem("back_clicked","1");
	history.back();
}