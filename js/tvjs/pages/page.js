"use strict";


load_data();
function load_data() {


    var page = getUrlParameter('page');
    var ws_url = "";
    main_data.push([{"row_type":-1,"item_type":ItemType.reload_btn}]);
    last_row_x_array.push(0);

    if(page === PageType.home.toString()){
        set_back_stack_index(0);
        active_drawer_y = 0;
        current_page = PageType.home;
        ws_url = api_url+"get_home_page?recent_played="+get_recently_played_str()+"&favorite="+get_favorite_str();
    }
    else if(page === PageType.serial.toString()){
        active_drawer_y = 1;
        current_page = PageType.serial;
        ws_url = api_url+"get_serial_page?recent_played="+get_recently_played_str()+"&favorite="+get_favorite_str();
    }
    else if(page === PageType.live.toString()){
        active_drawer_y = 2;
        current_page = PageType.live;
        ws_url = api_url+"get_live_page?recent_played="+get_recently_played_str()+"&favorite="+get_favorite_str();
    }
    else if(page === PageType.movie.toString()){
        active_drawer_y = 3;
        current_page = PageType.movie;
        ws_url = api_url+"get_movie_page?recent_played="+get_recently_played_str()+"&favorite="+get_favorite_str();

    }



    set_current_page(active_drawer_y);
    page_has_keyboard = false ;
    show_loading();
    $.get(ws_url)
        .done(function(data) {
            dismiss_loading();
            unset_reload_btn(0,0);
            //console.log(data);
            main_data = [];
            var jobj = JSON.parse(data);
            for(var i =0 ; i<jobj.length ; i++){
                var row = parse_row(jobj[i]);
                if(row.length>0){
                    main_data.push(row);
                    last_row_x_array.push(0);
                }
            }
            for (let index = 0; index < main_data.length; index++){
                create_row(main_data[index],index);
            }
            if(!is_drawer_active)
            	active_item(x,y);
        })
        .fail(function(jqXHR){
            dismiss_loading();
            show_error("");
        });



    try {
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        if(localStorage.getItem("send_info_day")!==day && client_id!==""){

            localStorage.setItem("send_info_day",day);
            var url = api_url+"set_client_info?client_id="+encodeURIComponent(client_id)+"&country_code="+country_code+"&time_zone="+timezone+"&device_type=4";
            $.get(url)
                .done(function(data) {
                    console.log("data_sent");
                })
                .fail(function(jqXHR){
                    console.log("data_send_failed");
                });
        }
    }catch (e) {}


}