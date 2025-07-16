"use strict";
//var recently_played = [];
var recently_max = 100;
function add_item_to_recently_played(id){
    if(id ==="" || id ===null)
        return;
    var json_str = localStorage.getItem("recently_played");
    if(json_str === null || json_str==="")
        json_str = "[]";
    //var recently_played = JSON.stringify(json_str);
    var recently_played = JSON.parse(json_str);
    if(recently_played.length >= recently_max)
        recently_played.shift();
    if(recently_played.includes(id))
    {
        const index = recently_played.indexOf(id);
        recently_played.splice(index, 1);
        // ES6***
        //recently_played = recently_played.filter(x => x !== id);
    }

    recently_played.push(id);
    localStorage.setItem("recently_played",JSON.stringify(recently_played))
}

function get_recently_played_str(){
    var json_str = localStorage.getItem("recently_played");
    if(json_str === null || json_str==="")
        json_str = "[]";
    //var recently_played = JSON.stringify(json_str);
    var recently_played = JSON.parse(json_str);
    var str = "";
    for(var i =0 ; i<recently_played.length;i++){
        if(i === (recently_played.length-1)){
            str=str+recently_played[i];
        }else{
            str=str+recently_played[i]+"*";
        }
    }
    return str;
}


function get_favorite_str(){
    var json_str = localStorage.getItem("favorite");
    if(json_str === null || json_str==="")
        json_str = "[]";
    //var recently_played = JSON.stringify(json_str);
    var favorite_array = JSON.parse(json_str);
    var str = "";
    for(var i =0 ; i<favorite_array.length;i++){
        if(i === (favorite_array.length-1)){
            str=str+favorite_array[i];
        }else{
            str=str+favorite_array[i]+"*";
        }
    }
    return str;
}