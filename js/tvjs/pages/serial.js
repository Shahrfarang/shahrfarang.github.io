"use strict";
var serial_id = 0;
load_data();
function load_data() {


    // var perfEntries = performance.getEntriesByType("navigation");
    // if (perfEntries[0].type !== "back_forward") {
    //     x=0;
    //     y=1;
    // }


    serial_id = getUrlParameter('serial_id');
    //add_item_to_recently_played(serial_id);
    var serial_image = getUrlParameter('serial_image');
    var detail_image = getUrlParameter('detail_image');

    main_data.push([{"row_type":-1,"item_type":ItemType.fav_btn}]);
    last_row_x_array.push(0);
    main_data.push([{"row_type":-1,"item_type":ItemType.reload_btn}]);
    last_row_x_array.push(0);
    set_fav_view();
    document.getElementById("serial_image").src = serial_image;
    if(detail_image!=="" && detail_image!==null && detail_image!=="null")
        document.getElementById("detail_image").src = detail_image;
    else
        document.getElementById("detail_image").src = "images/tv/detail_image_defualt.png";
    current_page = PageType.serial_item;
    var ws_url = api_url+"get_serial?uuid="+serial_id;
    page_has_keyboard = false ;
    show_loading();
    $.get(ws_url)
        .done(function(data) {
            var last_played_episode = parseInt(localStorage.getItem("last_played_episode"+serial_id));
            if(isNaN(last_played_episode))
                last_played_episode = 0 ;
            dismiss_loading();
            unset_reload_btn(0,1);
            var jobj = JSON.parse(data);
            for(var i =0 ; i<jobj.length ; i++){
                var row = parse_row(jobj[i]);
                if(row.length>0){

                    for (var j =0;j<row.length;j++){
                        row[j].item_type = ItemType.episode;
                        row[j].row_type = RowType.vertical_serial;
                        row[j].item_id = serial_id;
                    }
                    main_data.push(row);
                    last_row_x_array.push(0);
                }
            }
            for (let index = 0; index < main_data.length; index++){
                if(last_played_episode!==0){
                    for(let i = 0; i < main_data[index].length; i++){
                        if(last_played_episode ===main_data[index][i].id  ){
                            y = index;
                            x= i;
                        }
                    }
                }
                create_row(main_data[index],index);
            }

            active_item(x,y);
        })
        .fail(function(jqXHR){
            dismiss_loading();
            show_error("");
        });




}


function get_playlist()
{
    var playlist_array = [];
    var start_to_add = false;
    //var episode_id = Number(localStorage.getItem("serial_"+serial_id));
    var episode_id = main_data[y][x].id;

    if(episode_id===null || episode_id===0 || isNaN(episode_id)){
        start_to_add =true;
    }

    for(var i=0 ; i<main_data.length;i++){

        for(var j =0;j<main_data[i].length;j++){
            try {
                if(main_data[i][j].id===episode_id){
                    start_to_add = true;
                }
            }catch (e){}

            if(start_to_add && main_data[i][j].item_type === ItemType.episode){
                playlist_array.push(main_data[i][j]);
            }
        }
    }
    if(playlist_array.length === 0){
        start_to_add = true ;
        for(var i=0 ; i<main_data.length;i++){
            for(var j =0;j<main_data[i].length;j++){
                if(start_to_add && main_data[i][j].item_type === ItemType.episode ){
                    playlist_array.push(main_data[i][j]);
                }
            }
        }
    }
    console.log(playlist_array);
    return playlist_array;
}








function fav_clicked(){
    if(is_favorite(serial_id)){
        remove_item_from_favorite(serial_id);
    }else{
        add_item_to_favorite(serial_id);
    }
    set_fav_view();
}
function set_fav_view()
{
    if(is_favorite(serial_id)){
        document.getElementById("fav_text1").innerHTML = "حذف";
        document.getElementById("fav_text2").innerHTML = " از لیست منتخب";
        document.getElementById("fav_image").src = "images/tv/fav_on.png";
        document.getElementById("fav_image").src = "images/tv/fav_on.png";

        //document.getElementById("x0y0").style.backgroundColor = "#ffffff";

    }else{
        document.getElementById("fav_text1").innerHTML = "افزودن";
        document.getElementById("fav_text2").innerHTML = " به لیست منتخب";
        document.getElementById("fav_image").src = "images/tv/fav_off.png";
        //document.getElementById("x0y0").style.backgroundColor = "#6C7179";
    }
}


function get_fav_array()
{
    var json_str = localStorage.getItem("favorite");
    if(json_str === null || json_str==="")
        json_str = "[]";
    return JSON.parse(json_str);
}

function add_item_to_favorite(id){
    if(id ==="" || id ===null)
        return;
    var favorite_array = get_fav_array();
    if(favorite_array.length >= 1000)
        favorite_array.shift();
    favorite_array.push(id);
    localStorage.setItem("favorite",JSON.stringify(favorite_array));
}


function remove_item_from_favorite(id){
    if(id ==="" || id ===null)
        return;
    var favorite_array = get_fav_array();
    favorite_array = favorite_array.filter(x => x !== id);
    localStorage.setItem("favorite",JSON.stringify(favorite_array));
}


function is_favorite(id){
    if(id ==="" || id ===null)
        return;
    var favorite_array = get_fav_array();
    return favorite_array.includes(id);
}