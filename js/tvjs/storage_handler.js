"use strict";
function localStorageSpace(){
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024))  : 0;
};


function clean_storage()
{
    var favorite_array = get_fav_array();
    localStorage.clear();
    localStorage.setItem("favorite",JSON.stringify(favorite_array));
}

if(localStorageSpace()>5000)
    clean_storage();