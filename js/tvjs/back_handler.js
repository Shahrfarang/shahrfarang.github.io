"use strict";
var back_stack_index=0;


back_stack_index = get_back_stack_index();
function set_back_stack_index(index)
{
    localStorage.setItem('back_stack_index',index.toString() );
    back_stack_index= index;
}

function get_back_stack_index()
{
    back_stack_index= Number(localStorage.getItem('back_stack_index'));
    if(isNaN(back_stack_index))
        back_stack_index = 0;
    return back_stack_index;
}

function clear_stack()
{
    var back_stack_length = history.length-1;
    // var i = 0;
    // while (back_stack_length>0){
    //     back_stack_length--;
    //     i--;
    // }
    // console.log("i : "+i);
    // console.log("index : "+back_stack_index);
    back_stack_index = 0 ;
    set_back_stack_index(back_stack_index);
    history.go(-back_stack_length);
}