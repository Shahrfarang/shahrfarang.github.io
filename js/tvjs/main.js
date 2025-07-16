"use strict";

//Initialize function
var api_url = "https://panel.shahrefarang.live/api/v3/";
var timer_right_key = null;
var timer_left_key = null;
var timer_forward_key = null;
var timer_backward_key = null;




var init = function () {
    // TODO:: Do your initialization job
    console.log('init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });





    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
		const long_press_event = new CustomEvent("long_press_event", {
			detail: {
				keyCode: e.keyCode,
			},
			bubbles: true,
			cancelable: true,
			composed: false,
		});
    	switch(e.keyCode){
			case 415: //Play
				play_clicked();
				break;
			case 413: //Stop
				stop_clicked();
				break;
			case 19: //Pause
				pause_clicked();
				break;

			case 417: //key FastForward
				if(timer_forward_key !== null) return;
				timer_forward_key = window.setInterval(function() {
					document.dispatchEvent(long_press_event);
				}, 1000);
				forward_clicked();
				break;


			case 412: //key REWIND
				if(timer_backward_key !== null) return;
				timer_backward_key = window.setInterval(function() {
					document.dispatchEvent(long_press_event);
				}, 1000);
				backward_clicked();
				break;


			case 10252: //PlayPause
				play_pause_clicked();
				break;
			case 37: //LEFT arrow
				if(timer_left_key !== null) return;
				timer_left_key = window.setInterval(function() {
					document.dispatchEvent(long_press_event);
				}, 1000);
				left_clicked();
				break;
			case 38: //UP arrow
				up_clicked();
				e.preventDefault();
				break;
			case 39: //RIGHT arrow
				if(timer_right_key !== null) return;
				timer_right_key = window.setInterval(function() {
					document.dispatchEvent(long_press_event);
				}, 1000);
				right_clicked();
				break;
			case 40: //DOWN arrow
				down_clicked();
				e.preventDefault();
				break;
			case 13: //OK button
				enter_clicked();
				break;

			//==================== ****************** back
			//==================== ****************** back
			case 10009: //RETURN button
			back_clicked();
				break;
			case 166: //RETURN button
				back_clicked();
				break;
			case 0: //RETURN button
				back_clicked();
				break;
			// case 27: //scape button
			// 	back_clicked();
			// 	break;
			default:
				console.log('Key code : ' + e.keyCode);
				break;
			}
    }
	,{
			capture: true,   // this disables arrow key scrolling in modern Chrome
			passive: false   // this is optional, my code works without it
		}
	);




	document.addEventListener('keyup', function(e) {
			const long_press_cancel_event = new CustomEvent("long_press_cancel_event", {
				detail: {
					keyCode: e.keyCode,
				},
				bubbles: true,
				cancelable: true,
				composed: false,
			});
			switch(e.keyCode){

				case 417: //key FastForward
					// if (!player.seeking && player.currentTime + seekJump < player.seekable.end(0)) {
					// 	player.currentTime += seekJump;
					// }
					if(timer_forward_key === null) return;
					window.clearTimeout(timer_forward_key);
					timer_forward_key = null;
					document.dispatchEvent(long_press_cancel_event);
					break;


				case 412: //key REWIND
					// if (!player.seeking && player.currentTime - seekJump > player.seekable.start(0)) {
					// 	player.currentTime -= seekJump;
					// }
					if(timer_backward_key === null) return;
					window.clearTimeout(timer_backward_key);
					timer_backward_key = null;
					document.dispatchEvent(long_press_cancel_event);
					break;

				case 37: //LEFT arrow
					if(timer_left_key === null) return;
					window.clearTimeout(timer_left_key);
					timer_left_key = null;
					document.dispatchEvent(long_press_cancel_event);
					break;

				case 39: //RIGHT arrow

					console.log("right up");
					if(timer_right_key === null) return;
					window.clearTimeout(timer_right_key);
					timer_right_key = null;
					document.dispatchEvent(long_press_cancel_event);
					break;
				default:
					console.log('Key code : ' + e.keyCode);
					break;
			}
		}

	);



};



// window.onload can work without <body onload="">
window.onload = init;









