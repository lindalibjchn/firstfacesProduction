function hide_tia(){
    $('#tiaHolder').hide();
    $('#gifHolder').hide();
    $('#demoHolder').css('background-color','#E3DBDB');
}

function fade_in_tia(delay=500,time=800,st_callback=function(){}){
    setTimeout(function(){
        $('#tiaHolder').fadeIn(time);
        $('#gifHolder').fadeIn(time);
        setTimeout(function(){
            st_callback();
        },time+delay);
    },delay);
}

function flash_everything(time=200,delay=50,st_callback=function(){}){
    /*if(waitingVariables.attributes.gif_bool){
        flash_background(time);
    } else {
        flash_gif(time);
    }

    setTimeout(function(){
        flash_clothes(time);
        setTimeout(function(){
            flash_hair(time);
            setTimeout(function(){
                flash_eyes(time);
                setTimeout(function(){
                    st_callback();
                },time);
            },time+delay);
        },time+delay);
    },time+delay);*/
}


function load_shop(){
    hide_tia();
    disable
    fade_in_tia(time=800,delay=500);
    setTimeout
}