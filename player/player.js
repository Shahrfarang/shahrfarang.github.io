"use strict";







var src_array = [];
var video_element = null ;
var player = null ;
var forward_speed = 1 ;
var forward_count = 0 ;
var isPlaying = true;
var should_resume_media = false ;
var resume_time = 0 ;
var showing_next_episode = false ;

var dialog_id = "";
var dialog_btn_count = 2;
var is_dialog_active = false ;
var dialog_x = 0 ;
var timeout_id1 ="";
var timeout_id2 ="";
var timeout_id3 ="";
var timeout_id4 ="";
var timeout_id5 ="";
var is_waiting = false ;


player_init();
function player_init(){


    src_array = JSON.parse(sessionStorage.getItem("playlist"));
    if(sessionStorage.getItem("should_resume_media") === "1")
    {
        sessionStorage.setItem("should_resume_media","0");
        should_resume_media = true;
        if(src_array[0].item_type === ItemType.episode){
            resume_time = parseInt(localStorage.getItem("resume_episode"+src_array[0].id));
        }
        else if(src_array[0].item_type === ItemType.movie){
            resume_time = parseInt(localStorage.getItem("resume_movie"+src_array[0].id));
        }

        if(isNaN(resume_time))
        {
            resume_time = 0 ;
            should_resume_media= false ;
        }
    }
    video_element = document.getElementById('video_element');
    player = videojs('video_element');
    init_source();
    player.load();
    //player.play();


}


function show_next_episode_dialog(){

    show_dialog("next_episode",2,"قسمت بعدی (5 ثانیه)","بازگشت","../images/tv/tizen_next_episode.png");

    timeout_id1 = setTimeout(function() {
        show_dialog("next_episode",2,"قسمت بعدی (4 ثانیه)","بازگشت","../images/tv/tizen_next_episode.png");
    }, 1000);
    timeout_id2 = setTimeout(function() {
        show_dialog("next_episode",2,"قسمت بعدی (3 ثانیه)","بازگشت","../images/tv/tizen_next_episode.png");
    }, 2000);
    timeout_id3 =setTimeout(function() {
        show_dialog("next_episode",2,"قسمت بعدی (2 ثانیه)","بازگشت","../images/tv/tizen_next_episode.png");
    }, 3000);
    timeout_id4 =setTimeout(function() {
        show_dialog("next_episode",2,"قسمت بعدی (1 ثانیه)","بازگشت","../images/tv/tizen_next_episode.png");
    }, 4000);

    timeout_id5 =setTimeout(function() {
        hide_dialog();
        next_episode();
    }, 5000);
}
function next_episode(){
    if(src_array.length>1){

        src_array.shift();
        pauseVid();
        video_element.video_element = 0;
        init_source();
        showing_next_episode = false ;
        player.load();
    }
}

function init_source(){
    var video_type = "video/mp4";
    if(src_array[0].video_type.toLowerCase() ==="m3u8" || src_array[0].video_type.toLowerCase() ==="hls"){
        video_type = "application/x-mpegURL";
    }
    else if(src_array[0].video_type.toLowerCase() ==="mkv" ){
        //video_type='video/x-matroska; codecs="theora, vorbis"';
    }

    if(src_array[0].item_type ===ItemType.episode ){
        localStorage.setItem("last_played_episode"+src_array[0].item_id,src_array[0].id);
    }
    add_item_to_recently_played(src_array[0].item_id);
    player.src({
        type: video_type.toString(),
        src: src_array[0].url

    });
    set_title();
}





video_element.onwaiting = function() {
    is_waiting = true ;
    document.getElementById("loading_cnt").style.display ="";
};

video_element.onplaying = function() {
    isPlaying = true;
    document.getElementById("loading_cnt").style.display ="none";
    is_waiting = false ;
};

video_element.onpause = function() {
    isPlaying = false;
};

function playVid() {
    //if (player.paused && !isPlaying)
    if (video_element.paused && !isPlaying)
    {
        return player.play();
    }
}

function pauseVid() {
    //if (!player.paused && isPlaying)
    if (!video_element.paused && isPlaying)
    {
        player.pause();
    }
}




// function up_clicked(){
//     var vol = video_element.volume +0.1;
//     if(vol>=1.0)
//         vol = 1.0;
//     video_element.volume = vol;
// }
// function down_clicked(){
//     var vol = video_element.volume -0.1;
//     if(vol<0.0)
//         vol = 0.0;
//     video_element.volume = vol;
// }


function enter_clicked(){
    console.log("enterrrrrrrrrrrr");
    play_pause_clicked();
}

function play_clicked(){
    playVid();
}


function stop_clicked(){
    pauseVid();
    video_element.video_element = 0;

}

function pause_clicked(){
    pauseVid();
}
function play_pause_clicked(){

    if (isPlaying) {
        console.log("isPlaying Play");
        pauseVid();
    } else {
        console.log("isPlaying Pause");
        playVid();
    }
}


function right_clicked(){
    if(is_dialog_active)
    {
        dialog_x++;
        if(dialog_x>=dialog_btn_count)
            dialog_x = dialog_btn_count-1 ;
        set_active_dialog_btn();
        return;
    }
    seek_to(10);

}
function left_clicked(){
    if(is_dialog_active)
    {
        dialog_x--;
        if(dialog_x<0)
            dialog_x = 0 ;
        set_active_dialog_btn();
        return;
    }
    seek_to(-10);
}


function forward_clicked(){
    seek_to(10);
}
function backward_clicked(){
    seek_to(-10);
}


function back_clicked(){
    stop_clicked();
    parent.focus();
    window.top.postMessage('hide_player', '*') //inside the iframe
}


// global_timer = setInterval(function () {
//     console.log("hi");
//     if(forward_x!=0){
//         player.pause();
//         seek_to(forward_x*10);
//     }
// }, 1000);


function seek_to(duration){
    if(src_array[0].video_type.toLowerCase() ==="m3u8" || src_array[0].video_type.toLowerCase() ==="hls")
        return;

    var seek_time = player.currentTime() + duration;
    if(seek_time<0)
        seek_time = 0 ;
    player.currentTime(seek_time);
    player.controls(true);
}





// document.getElementById("video_element").addEventListener('xxxxx', function(e) {
//         switch(e.keyCode){
//
//             case 417: //key FastForward
//
//                 break;
//
//
//             case 412: //key REWIND
//
//                 break;
//
//             case 37: //LEFT arrow
//
//                 break;
//
//             case 39: //RIGHT arrow
//
//                 console.log("right up");
//                 break;
//             default:
//                 console.log('Key code : ' + e.keyCode);
//                 break;
//         }
//     }
//
// );


document.addEventListener("long_press_event", function(e) {
    var img_hover = document.querySelector("#img_hover");
    img_hover.style.display = "";
    forward_count++;
    if(forward_count===3)
        forward_speed++;
    if(forward_count===6)
        forward_speed++;
    var seek_time = 45*forward_speed;
    var control_cnt = document.querySelector("#control_cnt");
    var player_title = document.querySelector("#player_title");
    control_cnt.style.display = "";
    player_title.style.display = "";
    if(e.detail.keyCode === 417 || e.detail.keyCode === 39)
    {
        document.getElementById("loading_cnt").style.display ="none";
        seek_to(seek_time);
        updateProgressBar();
        img_hover.src = "../images/tv/ff.png";

    }
    else if(e.detail.keyCode === 412 || e.detail.keyCode === 37){
        document.getElementById("loading_cnt").style.display ="none";
        seek_to(seek_time*-1);
        updateProgressBar();
        img_hover.src = "../images/tv/fb.png";
    }
});


document.addEventListener("long_press_cancel_event", function(e) {
    if(e.detail.keyCode === 417 || e.detail.keyCode === 39 || e.detail.keyCode === 412 || e.detail.keyCode === 37)
    {
        if(is_waiting){
            document.getElementById("loading_cnt").style.display ="";
        }
        forward_count=0;
        forward_speed = 1;
        var img_hover = document.querySelector("#img_hover");
        img_hover.style.display = "none";
    }
});

//============================ ui controls

video_element.addEventListener('timeupdate', updateProgressBar, false);
// Update the progress bar
function updateProgressBar() {
    if(src_array[0].video_type.toLowerCase() ==="m3u8" || src_array[0].video_type.toLowerCase() ==="hls")
        return;

    if(src_array.length>1 && (player.duration()-player.currentTime())<11 && showing_next_episode===false){
        showing_next_episode = true;
        show_next_episode_dialog();
    }
    if(src_array[0].item_type === ItemType.episode && player.currentTime()>120 && (player.duration()-player.currentTime())>300){
        localStorage.setItem("resume_episode"+src_array[0].id,player.currentTime()+"");
    }
    else if(src_array[0].item_type === ItemType.movie && player.currentTime()>120 && (player.duration()-player.currentTime())>300){
        localStorage.setItem("resume_movie"+src_array[0].id,player.currentTime()+"");
    }


    var duration = document.querySelector("#duration");
    var time = document.querySelector("#time");

    time.innerHTML = msToTime(player.currentTime()*1000);
    duration.innerHTML = msToTime(player.duration()*1000);


    var progressBar = document.querySelector("#progress_bar");
    var percentage = Math.floor((100 / player.duration()) * player.currentTime());
    progressBar.value = percentage;
    progressBar.innerHTML = percentage + '% played';
}

video_element.addEventListener('ended', function() {
    pauseVid();
    }, false);

video_element.addEventListener('play', function() {

    document.getElementById("loading_cnt").style.display ="none";
    is_waiting = false ;
    if(should_resume_media){
        should_resume_media = false ;
        seek_to(resume_time-10);
    }

    var image = document.querySelector("#play_img");
    image.src = "../images/tv/pause.png";

    var img_hover = document.querySelector("#img_hover");
    img_hover.src = "../images/tv/play.png";
    img_hover.style.display = "none";

    setTimeout(function() {
        var control_cnt = document.querySelector("#control_cnt");
        var player_title = document.querySelector("#player_title");
        control_cnt.style.display = "none";
        player_title.style.display = "none";
    }, 3000);
}, false);

video_element.addEventListener('pause', function() {
    var image = document.querySelector("#play_img");
    image.src = "../images/tv/play.png";
    var img_hover = document.querySelector("#img_hover");
    img_hover.src = "../images/tv/play.png";
    img_hover.style.display = "";

    var control_cnt = document.querySelector("#control_cnt");
    var player_title = document.querySelector("#player_title");
    control_cnt.style.display = "";
    player_title.style.display = "";
}, false);




//
// video_element.addEventListener('waiting', () => {
//     document.getElementById("loading_cnt").style.display ="";
// });











function msToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
}


function set_title(){
    var player_title = document.querySelector("#player_title");
    player_title.innerHTML = src_array[0].title;
    if(src_array[0].item_type === ItemType.episode){
        player_title.innerHTML = sessionStorage.getItem("serial_title")+" - " + src_array[0].title;
    }
}

function dialog_click(){

    if(dialog_id ==="next_episode"){
        hide_dialog();
        clearTimeout(timeout_id1);
        clearTimeout(timeout_id2);
        clearTimeout(timeout_id3);
        clearTimeout(timeout_id4);
        clearTimeout(timeout_id5);
        if(dialog_x===0){
            next_episode();
        }else{
            back_clicked();
        }
    }

}