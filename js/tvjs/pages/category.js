"use strict";

load_data();
function load_data() {

    var category_id = getUrlParameter('category_id');
    var category_image = getUrlParameter('category_image');
    main_data.push([{"row_type":-1,"item_type":ItemType.reload_btn}]);
    last_row_x_array.push(0);
    document.getElementById("category_image").src = category_image;
    current_page = PageType.category;
    var ws_url = api_url+"get_category?uuid="+category_id;
    page_has_keyboard = false ;
    show_loading();


    $.get(ws_url)
        .done(function(data) {
            dismiss_loading();
            unset_reload_btn(0,0);
            main_data = [];
            var jobj = JSON.parse(data);
            console.log(jobj);
            for(var i =0 ; i<jobj.length ; i++){
                var row = parse_row(jobj[i]);
                if(row.length>0){
                    if(row[0].row_title ==="All Items"){
                        for (var j =0;j<row.length;j++)
                            row[j].row_type = RowType.grid4;
                        var temp_array = get_grid_arrays(row);
                        for (var j =0;j<temp_array.length;j++){
                            main_data.push(temp_array[j]);
                            last_row_x_array.push(0);
                        }
                    }else{
                        main_data.push(row);
                        last_row_x_array.push(0);
                    }

                }
            }
            for (let index = 0; index < main_data.length; index++){
                create_row(main_data[index],index);
            }
            active_item(x,y);
        })
        .fail(function(jqXHR){
            dismiss_loading();
            show_error("");
        });


    // $.get(ws_url, function(data, status, xhr){
    //     dismiss_loading();
    //     if(xhr.status ===200){
    //
    //         unset_reload_btn();
    //         main_data = [];
    //         var jobj = JSON.parse(data);
    //         console.log(jobj);
    //         for(var i =0 ; i<jobj.length ; i++){
    //             var row = parse_row(jobj[i]);
    //             if(row.length>0){
    //                 if(row[0].row_title ==="All Items"){
    //                     for (var j =0;j<row.length;j++)
    //                         row[j].row_type = RowType.grid4;
    //                     var temp_array = get_grid_arrays(row);
    //                     for (var j =0;j<temp_array.length;j++){
    //                         main_data.push(temp_array[j]);
    //                         last_row_x_array.push(0);
    //                     }
    //                 }else{
    //                     main_data.push(row);
    //                     last_row_x_array.push(0);
    //                 }
    //
    //             }
    //         }
    //         for (let index = 0; index < main_data.length; index++){
    //             create_row(main_data[index],index);
    //         }
    //         active_item(x,y);
    //     }else{
    //         show_error();
    //     }
    // });

}