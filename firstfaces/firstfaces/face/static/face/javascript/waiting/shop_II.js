
function flash_eyes(time=300, wait=0, st_callback=function(){}){
    start_hex = decimal_rgb_hex(tiaObject['mEyeL'+waitingVariables.attributes.eyes].material[0].color)
    setTimeout(function(){
        animate_eye_colour(start_hex, "FFFFFF",time);
        setTimeout(function(){
            animate_eye_colour('FFFFFF', start_hex,time);
            setTimeout(function(){
                st_callback();
            },time);
        },time);

    },wait);
}

function animate_eye_colour(start_hex, end_hex, time){
    var colours = get_transition_colors(start_hex, end_hex, time)
    change_eye_color_with_delay(0,colours,colours.length);
}
function change_eye_color_with_delay(i,colours,end){
    setTimeout(function(){
        change_eye(colours[i])
        i++;
        if(i < end){
            change_eye_color_with_delay(i,colours,end);
        }
    },16.666666667);
}


function fadeBackground(time=300, wait=0, st_callback=function(){}, reversed=false){
        intervals = Math.round(time/16.666666667)-1;
        var colour =  new THREE.Color(parseInt('0x'+decimal_rgb_hex(renderer.getClearColor()),16));
        diff = 1/intervals;
        vals = [1];
        for(i=1;i<intervals;i++){
            vals.push(vals[i-1]-diff);
        }
        console.log(vals);
        vals.push(0);
        if(reversed){
            vals = vals.reverse();
            console.log("HERE")
        }
        console.log(vals);
        fade_background_with_delay(0, vals, colour, vals.length);
}
function fade_background_with_delay(i, vals, hex, end){
    setTimeout(function(){
        renderer.setClearColor( hex , vals[i]);
        i++;
        if(i < end){
            fade_background_with_delay(i, vals, hex, end);
        }
    },16.666666667);
}

var gif_prefix = prefixURL+"media/gifs/";

function set_background_as_gif(gif,time=300){
    $('#gifHolder').hide().attr("src",gif_prefix+gif).fadeIn(time);
}
function switch_to_gif(gif,time=300){
    fadeBackground(time);
    set_background_as_gif(gif,time=time)
}

function clicked_gif(id){
        st = 'gifs'
        if(waitingVariables.products.backgrounds[st][id].class == 'locked'){
            $('#'+id).effect("shake", {distance:5, times: 3},300);
            return;
        }
        disable_click();
        if( waitingVariables.products.backgrounds[st][id].class == 'owned'){
            price ='<i style="color:green;" class="fa fa-check" ></i>'
            txt = "equip";
            $('#buy_equip_btn').attr('onclick','equip_background("'+id+'")');
        }
        else{
            price = '<p>'+waitingVariables.products.backgrounds[st][id].price+"</p>";
            txt = "buy";
            $('#buy_equip_btn').attr('onclick','buy_background("'+id+'")');
        }
        $('#buy_equip_btn').text(txt);

        $('#product_description_back_btn').click(function(){unclicked_gif();});
        show_description(waitingVariables.products.backgrounds[st][id].name, '#'+waitingVariables.products.backgrounds[st][id].hex, price)
        switch_to_gif(waitingVariables.products.backgrounds[st][id].filename,600);

}

function unclicked_gif(){
    hide_description()
    fadeBackground(time=600,0,function(){},true);
        setTimeout(function(){
            enable_click();
        },600);

}

function flash_gif(){
    //flash background to slighty brighter less opaque colour
}
function transition_gif_gif(){
}


