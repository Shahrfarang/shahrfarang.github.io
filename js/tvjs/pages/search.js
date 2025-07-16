
"use strict";
init_search();

function init_search() {


    console.log("search init");
    active_drawer_y = 4;
    current_page = PageType.search;
    //set_current_page(active_drawer_y);
    //show_loading();

    // document.getElementById("search_tv").addEventListener('change', function (evt) {
    //     console.log(document.getElementById("search_tv").value);
    // });
    // setTimeout(function() {
    //     div.style.display = "";
    //     active_slider("row"+y);
    // }, 100);


    if(search_str!=="")
    {
        console.log("xxxxx ===== "+x);
        console.log("yyyyy ===== "+y);
        send_request(search_str);
    }






}


function value_change(){
    console.log("empty..................");
    search_str  = document.getElementById("search_tv").value;
    $("#rows_cnt").empty();
    if(search_str!=="")
    {
        show_loading();
    }
    else{
        dismiss_loading();
    }

    setTimeout(function() {
        if(search_str === document.getElementById("search_tv").value && search_str!==""){
            send_request(search_str);
        }
    }, 1000);
}

function send_request(search_str){
    show_loading();
    var ws_url = api_url+"get_search?title="+encodeURIComponent(search_str);

    $.get(ws_url)
        .done(function(data) {
            dismiss_loading();
            main_data = [];

            var jobj = JSON.parse(data);
            jobj = jobj[0];
            var list_array = [];
            var list = jobj["list"];
            for(var i =0 ; i<list.length ; i++){
                var item = parse_item(list[i],"",RowType.grid3);
                list_array.push(item);
            }
            main_data = get_grid_arrays(list_array);
            for (let index = 0; index < main_data.length; index++){
                last_row_x_array.push(0);
                create_row(main_data[index],index);
            }
            if(!is_keyboard_active)
                active_item(x,y);
        })
        .fail(function(jqXHR){
            dismiss_loading();
            show_error("");
        });

    // $.get(ws_url, function(data, status, xhr){
    //     dismiss_loading();
    //     if(xhr.status ===200){
    //         main_data = [];
    //
    //         var jobj = JSON.parse(data);
    //         jobj = jobj[0];
    //         var list_array = [];
    //         var list = jobj["list"];
    //         for(var i =0 ; i<list.length ; i++){
    //             var item = parse_item(list[i],"",RowType.grid3);
    //             list_array.push(item);
    //         }
    //         main_data = get_grid_arrays(list_array);
    //         for (let index = 0; index < main_data.length; index++){
    //             last_row_x_array.push(0);
    //             create_row(main_data[index],index);
    //         }
    //
    //     }else{
    //         show_error();
    //     }
    // });
}