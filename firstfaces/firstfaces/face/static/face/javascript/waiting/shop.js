var sheight, swidth;
var tiaH, tiaW;
var remH
var tiaEyes = Object.keys(waitingVariables.products.eyes.colours);
var Interval_Value = 1000/30;

function setHeight(){
    //get products

    get_balance();
    tiaEyes = Object.keys(waitingVariables.products.eyes.colours);


    swidth = $(document).width()
    sheight = waitingVariables.dist*0.95;
    tiaH = Math.round(sheight*0.7);
    tiaW = Math.round(swidth*.95);
    $('#demoHolderCont').css({"height":tiaH, "margin-top":sheight*0.025});
    $('#demoHolder').css({"height":tiaH, 'width':tiaW});


    $('#tiaHolder').css({"height":"100%", 'width':'100%'});
    remH = sheight - tiaH;
    pd_h = Math.round(sheight*0.30)
    $('#product_description').css({"height":pd_h+"px", "width":'100%'});
    $('#product_description').hide();
    $('.product-category').css('height',pd_h+"px");
    img_hw = pd_h*0.42380*.95;
    $('.background-color-img').css({'height':img_hw+"px", "width":img_hw+"px"})


    waitingVariables.zoomed = false;
    show_click_me()

};

function fix_img_size(){
    img_h = $('.product-category').height()*0.324*.85;
    img_w = 72*.85
    if(img_h > img_w){
        $('.background-color-img').css({'height':img_w+"px", "width":img_w+"px"});
    } else {
        $('.background-color-img').css({'height':img_h+"px", "width":img_h+"px"});
    }

}


function equip_eyes(id){
    let fd = new FormData();
    fd.append("id_",id);
     $.ajax({
        url: "/equip_eyes",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            waitingVariables.attributes['eyes'] = id;
            waitingVariables.products.eyes = json.eyes
            type = 'eyes';
            subtype = "colours";
            $('#product-cont').empty();
            for(x in waitingVariables.products[type][subtype]){
                $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
            }
            fix_img_size();
            unclicked_eyes();
        },
        error: function() {
          console.log("Error Getting Balance");

        },
    });
}
function buy_eyes(id){
    let fd = new FormData();
    fd.append("id_",id);
    fd.append("price",waitingVariables.products.eyes.colours[id].price);
     $.ajax({
        url: "/buy_eyes",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            $('#shop-balance').text(json.balance);
             $('#balance_header').text(json.balance);
            //Show fake red balance appear then move down and fade out
            waitingVariables.attributes['eyes'] = id;
            waitingVariables.products.eyes = json.eyes
            type = 'eyes';
            subtype = "colours";
            $('#product-cont').empty();
            for(x in waitingVariables.products[type][subtype]){
                $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
            }
            fix_img_size();
            unclicked_eyes();

        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}


function equip_background(id){
    let fd = new FormData();
    fd.append("id_",id);
     $.ajax({
        url: "/equip_background",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            // Change class of equipped to equipped
            // Remove previously equipped class
            hex = waitingVariables.products.backgrounds['colours'][id].hex;
            waitingVariables.attributes['background-colour'] = hex;
            waitingVariables.attributes.gif_bool = true;
            waitingVariables.products.backgrounds.colours = json.backgrounds
            type = 'backgrounds';
            $('#product-cont').empty();
            for(x in waitingVariables.products[type]['colours']){
                $('#product-cont').append(waitingVariables.products[type]['colours'][x].html)
            }
            fix_img_size();
            unclicked_background();
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}

function equip_gif(id){
    let fd = new FormData();
    fd.append("id_",id);
     $.ajax({
        url: "/equip_background_gif",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            // Change class of equipped to equipped
            // Remove previously equipped class
            hex = waitingVariables.products.backgrounds['gifs'][id].hex;
            waitingVariables.attributes['gif'] = id;
            waitingVariables.products.backgrounds.gifs = json.backgrounds
            waitingVariables.attributes.gif_bool = false;
            type = 'backgrounds';
            $('#product-cont').empty();
            for(x in waitingVariables.products[type]['gifs']){
                $('#product-cont').append(waitingVariables.products[type]['gifs'][x].html)
            }
            fix_img_size();
            unclicked_gif();
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}


function equip_clothes(id){
    let fd = new FormData();
    fd.append("id_",id);
     $.ajax({
        url: "/equip_clothes",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            // Change class of equipped to equipped
            // Remove previously equipped class
            hex = waitingVariables.products.clothes.colours[id].hex;
            waitingVariables.attributes['clothes-colour'] = hex;
            waitingVariables.products.clothes = json.clothes
            type = 'clothes';
            subtype = "colours"
            $('#product-cont').empty();
            for(x in waitingVariables.products[type][subtype]){
                $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
            }
            fix_img_size()
            unclicked_clothes();
        },
        error: function() {
          console.log("Error Getting Clothes");
        },
    });
}

function buy_clothes(id){
    let fd = new FormData();
    fd.append("id_",id);
    fd.append("price",waitingVariables.products.clothes.colours[id].price);
     $.ajax({
        url: "/buy_clothes",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            hex = waitingVariables.products.clothes.colours[id].hex;
            $('#shop-balance').text(json.balance);
             $('#balance_header').text(json.balance);
            //Show fake red balance appear then move down and fade out
            waitingVariables.attributes['clothes-colour'] = hex;
            waitingVariables.products.clothes = json.clothes
            $('.product-category-cont').empty();
            type = 'clothes';
            subtype = "colours"
            $('#product-cont').empty();
            for(x in waitingVariables.products[type][subtype]){
                $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
            }
            fix_img_size()
            unclicked_clothes();

        },
        error: function() {
          console.log("Error Getting Clothes");
        },
    });
}



function buy_background(id){
    let fd = new FormData();
    fd.append("id_",id);
    fd.append("price",waitingVariables.products.backgrounds.colours[id].price);
     $.ajax({
        url: "/buy_background",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            hex = waitingVariables.products.backgrounds.colours[id].hex;
            $('#shop-balance').text(json.balance);
             $('#balance_header').text(json.balance);
            //Show fake red balance appear then move down and fade out
            waitingVariables.attributes['background-colour'] = hex;
            waitingVariables.attributes.gif_bool = true;
            waitingVariables.products.backgrounds.colours = json.backgrounds
            $('.product-category-cont').empty();
            type = 'backgrounds';
            sub_type = "colours"
            for(x in waitingVariables.products[type]){
                $('.product-category-cont').append(waitingVariables.products[type][sub_type][x].html)
            }
            unclicked_gif();

        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}

function buy_gif(id){
    let fd = new FormData();
    fd.append("id_",id);
    fd.append("price",waitingVariables.products.backgrounds.gifs[id].price);
     $.ajax({
        url: "/buy_background_gif",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            $('#shop-balance').text(json.balance);
            $('#balance_header').text(json.balance);
            //Show fake red balance appear then move down and fade out
            waitingVariables.attributes['gif'] = id;
            waitingVariables.attributes['gif_bool'] = false;
            waitingVariables.products.backgrounds.gifs = json.backgrounds
            $('.product-category-cont').empty();
            type = 'backgrounds';
            sub_type = "gifs"
            for(x in waitingVariables.products[type]){
                $('.product-category-cont').append(waitingVariables.products[type][sub_type][x].html)
            }
            unclicked_background();

        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}



function get_tia_attributes(){

    let fd = new FormData();
     $.ajax({
        url: "/get_attributes",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            // Set up Tia Attribute Json
            waitingVariables.attributes ={
                "background-colour":json.BC,
                "background-colour-id":json.BC_id,
                "hair-colour-id":json.HC_id,
                "hair-colour":json.HairC,
                "brow-colour":json.BrowC,
                "clothes-colour":json.CC,
                "clothes-id":json.CC_id,
                "eyes":json.eyes,
                "gif_bool":json.gif_bool,
                "gif":json.gif

            }
            createTia("tiaHolder", tiaH, tiaW);
        },
        error: function() {
          console.log("Error_Getting_Stock");
        },
    });
}

//Functions for getting products
function get_backgrounds(){
    let fd = new FormData();
     $.ajax({
        url: "/get_background_colors",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            waitingVariables.products.backgrounds = json.backgrounds
        },
        error: function() {
          console.log("Error_Getting_Stock");
        },
    });
}

function get_eyes(){
    let fd = new FormData();
     $.ajax({
        url: "/get_eye_colors",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            waitingVariables.products.eyes = json.eyes
            tiaEyes =  Object.keys(waitingVariables.products.eyes.colours);
        },
        error: function() {
          console.log("Error getting eyes");
        },
    });
}

function get_hairColours(){
    let fd = new FormData();
     $.ajax({
        url: "/get_hair_colors",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            waitingVariables.products.hair = json.hair
            console.log("Success")
        },
        error: function() {
          console.log("Errorr getting hair");
        },
    });
}
function get_clothingColours(){
    let fd = new FormData();
     $.ajax({
        url: "/get_clothes_colors",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            waitingVariables.products.clothes = json.clothes
        },
        error: function() {
          console.log("Error_Getting_Stock");
        },
    });
}

function equip_hair(id){
    let fd = new FormData();
    fd.append("id_",id);
     $.ajax({
        url: "/equip_hair",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            // Change class of equipped to equipped
            // Remove previously equipped class
            hex_hair = waitingVariables.products.hair.colours[id].hex_hair;
            hex_brow = waitingVariables.products.hair.colours[id].hex_brow;
            waitingVariables.attributes['hair-colour'] = hex_hair;
            waitingVariables.attributes['brow-colour'] = hex_brow;
            get_hairColours();
            waitingVariables.products.hair = json.hair
            type = 'hair';
            subtype = "colours";
            $('.product-category-cont').empty();
            for(x in waitingVariables.products[type][subtype]){
                $('.product-category-cont').append(waitingVariables.products[type][subtype][x].html)
            }
            fix_img_size();
            unclicked_hair();
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}

function buy_hair(id){
    let fd = new FormData();
    fd.append("id_",id);
    fd.append("price",waitingVariables.products.hair.colours[id].price);
     $.ajax({
        url: "/buy_hair",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            hex_hair = waitingVariables.products.hair.colours[id].hex_hair;
            hex_brow = waitingVariables.products.hair.colours[id].hex_brow;
            waitingVariables.attributes['hair-colour'] = hex_hair;
            waitingVariables.attributes['brow-colour'] = hex_brow;
            $('#shop-balance').text(json.balance);
             $('#balance_header').text(json.balance);
            //Show fake red balance appear then move down and fade out
            waitingVariables.products.hair = json.hair
            $('.product-category-cont').empty();
            type = 'hair';
            subtype = "colours";
            for(x in waitingVariables.products[type][subtype]){
                $('.product-category-cont').append(waitingVariables.products[type][subtype][x].html)
            }
            fix_img_size();
            unclicked_hair();

        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}

$('.product-category-button').click(function(){
    var type = $(this).attr('id');
    $('.product-category-cont').empty();
    for(x in waitingVariables.products[type]){
       $('.product-category-cont').append(waitingVariables.products[type][x].html)
    }
});

function hide_shop_content(){
    $('.product-category').fadeOut(300);
    return
}
function show_shop_content(){
    $('.product-category').fadeIn(300);
    $('#category-btns').fadeIn(300);
    return
}


function show_description(name,color,price){
    hide_shop_content();
    setTimeout(function(){
        $('#product_description_price').hide();
        $('#product_description_title').hide();
        $('#product_description_back').hide();
        $('#product_description_btns').hide();
        $('#product_description').show();
        $('#product_description_title').css('color',color);
        $('#buy_equip_btn').css('background-color',color);
        $('#product_description_price').empty()
        $('#product_description_title').empty()
        setTimeout(function(){
             $('#product_description_price').append(price).fadeIn(600);
             $('#product_description_title').text(name).fadeIn(600);
             $('#product_description_back').fadeIn(600);
             $('#product_description_btns').fadeIn(600);
        },800);
    },300);
}
function hide_description(){
    $('#product_description_price').fadeOut(300);
    $('#product_description_title').fadeOut(300);
    $('#product_description_back').fadeOut(300);
    $('#product_description_btns').fadeOut(300);
    setTimeout(function(){
        $('#product_description').hide();
         $('#product_description_price').empty()
        $('#product_description_title').empty()
    },300);

    setTimeout(function(){
        show_shop_content()
    },300);


}

function flash_border(){
     $('.flash').addClass("green-border");
     setTimeout(function(){$('.flash').removeClass("green-border").addClass("no-border")},500);
     $('.flash').fadeTo(1000, 1);
}

function clicked_background(id){
        st = 'colours'
        if(waitingVariables.products.backgrounds[st][id].class == 'locked'){
            //$('#'+id).effect("shake", {distance:5, times: 3},300);
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

        $('#product_description_back_btn').click(function(){unclicked_background();});
        show_description(waitingVariables.products.backgrounds[st][id].name, '#'+waitingVariables.products.backgrounds[st][id].hex, price)
        animate_background_colour(waitingVariables.attributes["background-colour"],waitingVariables.products.backgrounds[st][id].hex,600);
}

function clicked_clothes(id){
        if(waitingVariables.products.clothes.colours[id].class == 'locked'){
            //$('#'+id).effect("shake", {distance:5, times: 3},300);
            return;
        }
        disable_click();
        if( waitingVariables.products.clothes.colours[id].class == 'owned'){
            price ='<i style="color:green;" class="fa fa-check" ></i>'
            txt = "equip";
            $('#buy_equip_btn').attr('onclick','equip_clothes("'+id+'")');
        }
        else{
            price = '<p>'+waitingVariables.products.clothes.colours[id].price+"</p>";
            txt = "buy";
            $('#buy_equip_btn').attr('onclick','buy_clothes("'+id+'")');
        }
        $('#buy_equip_btn').text(txt);
        $('#product_description_back_btn').click(function(){unclicked_clothes();});
        show_description(waitingVariables.products.clothes.colours[id].name, '#'+waitingVariables.products.clothes.colours[id].hex, price)
        animate_clothes_colour(waitingVariables.attributes["clothes-colour"],waitingVariables.products.clothes.colours[id].hex,600);
}

function clicked_hair(id){
        if(waitingVariables.products.hair.colours[id].class == 'locked'){
            //$('#'+id).effect("shake", {distance:5, times: 3},300);
            return;
        }
        disable_click();
        if( waitingVariables.products.hair.colours[id].class == 'owned'){
            price ='<i style="color:green;" class="fa fa-check" ></i>'
            txt = "equip";
            $('#buy_equip_btn').attr('onclick','equip_hair("'+id+'")');
        }
        else{
            price = '<p>'+waitingVariables.products.hair.colours[id].price+"</p>";
            txt = "buy";
            $('#buy_equip_btn').attr('onclick','buy_hair("'+id+'")');
        }
        $('#buy_equip_btn').text(txt);

        $('#product_description_back_btn').click(function(){unclicked_hair();});
        show_description(waitingVariables.products.hair.colours[id].name, '#'+waitingVariables.products.hair.colours[id].hex_hair, price)
        animate_hair_colour(waitingVariables.attributes['hair-colour'], waitingVariables.attributes['brow-colour'] ,waitingVariables.products.hair.colours[id].hex_hair, waitingVariables.products.hair.colours[id].hex_brow,600);
}
function unclicked_hair(){
        hide_description();
        animate_hair_colour(decimal_rgb_hex(tiaObject.mHair.material[0].color), decimal_rgb_hex(tiaObject.mFace.material[2].color),waitingVariables.attributes['hair-colour'], waitingVariables.attributes['brow-colour'],600);
        setTimeout(function(){enable_click();},600);
}
function unclicked_clothes(){
        hide_description();
        animate_clothes_colour(decimal_rgb_hex(tiaObject.mBody.material[0].color),waitingVariables.attributes['clothes-colour'],600);
        setTimeout(function(){enable_click();},600);
}



function get_balance(){
    let fd = new FormData();
     $.ajax({
        url: "/get_balance",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            $('#shop-balance').text(json.balance);
            $('#balance_header').text(json.balance);
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}

function unclicked_background(){
        hide_description()
        if(waitingVariables.attributes.gif_bool){
            animate_background_colour(decimal_rgb_hex(renderer.getClearColor()),waitingVariables.attributes['background-colour'],600);
        } else {
            switch_to_gif(waitingVariables.products.backgrounds['gifs'][waitingVariables.attributes.gif].filename,600);
        }
        setTimeout(function(){
            enable_click();
        },600);
}

function unclicked_gif(){
    hide_description()
        if(waitingVariables.attributes.gif_bool){
            animate_background_colour(decimal_rgb_hex(renderer.getClearColor()),waitingVariables.attributes['background-colour'],600);
        } else {
            switch_to_gif(waitingVariables.products.backgrounds['gifs'][waitingVariables.attributes.gif].filename,600);
        }
        setTimeout(function(){
            enable_click();
        },600);

}

function decimal_rgb_hex(st){
    temp = [st['r']*255, st['g']*255, st['b']*255]
    return rgb_to_hex(temp);
}

// Change Colours
function get_transition_colors(start_hex, end_hex, time){
    intervals = Math.round(time/Interval_Value)-2;
    var start_rgb = hex_to_rgb(start_hex);
    var end_rgb = hex_to_rgb(end_hex);

    r_dist = end_rgb[0] - start_rgb[0] ;
    g_dist = end_rgb[1] - start_rgb[1];
    b_dist = end_rgb[2] - start_rgb[2];
    r_change = r_dist/intervals;
    g_change = g_dist/intervals;
    b_change = b_dist/intervals;

    out = [start_rgb];
    for(i=1;i<intervals;i++){
        out.push([out[i-1][0]+r_change, out[i-1][1]+g_change, out[i-1][2]+b_change])
    }
    out.push(end_rgb);
    temp = [];
    for(i=0;i<out.length;i++){
        temp.push(rgb_to_hex(out[i]))
    }
    return temp
}
function hex_to_rgb(hex){
    var r = hex[0] + hex[1]
    var g = hex[2] + hex[3]
    var b = hex[4] + hex[5];
    r = parseInt("0x"+r);
    g = parseInt("0x"+g);
    b = parseInt("0x"+b);
    return [r,g,b]
}
function rgb_to_hex(rgb){
    r_h = parseInt(rgb[0],10).toString(16)
    if(r_h.length == 1){
        r_h = '0'+r_h
    }
    g_h = parseInt(rgb[1],10).toString(16)
    if(g_h.length == 1){
        g_h = '0'+g_h
    }
    b_h = parseInt(rgb[2],10).toString(16)
    if(b_h.length == 1){
        b_h = '0'+b_h
    }
    return r_h+g_h+b_h
}
function animate_background_colour(start_hex, end_hex, time){
    var colours = get_transition_colors(start_hex, end_hex, time)
    change_color_with_delay(0,colours,colours.length);
}
function change_color_with_delay(i,colours,end){
    setTimeout(function(){
        change_background(colours[i])
        i++;
        if(i < end){
            change_color_with_delay(i,colours,end);
        }
    },Interval_Value);
}

// Animate change in hair colour
function animate_hair_colour(curr_hex1, curr_hex2, end_hex1, end_hex2, time){
    var colours1 = get_transition_colors(curr_hex1, end_hex1, time);
    var colours2 = get_transition_colors(curr_hex2, end_hex2, time);
    change_hair_colour_with_delay(0, colours1, colours2, colours1.length);
}
function change_hair_colour_with_delay(i, colours1, colours2, end){
    setTimeout(function(){
        change_hair(colours1[i], colours2[i]);
        i++;
        if(i < end){
            change_hair_colour_with_delay(i, colours1, colours2, end);
        }
    },Interval_Value);
}
//Animate Clothing Colour change
function animate_clothes_colour(cur_hex, end_hex, time){
    var colours = get_transition_colors(cur_hex, end_hex, time);
    change_clothes_colour_with_delay(0, colours, colours.length);
}
function change_clothes_colour_with_delay(i,colours,end){
    setTimeout(function(){
        change_clothes(colours[i])
        i++;
        if(i < end){
            change_clothes_colour_with_delay(i,colours,end);
        }
    },Interval_Value);
}
// Animate face colour
function animate_face_colour(cur_hex, end_hex, time){
    var colours = get_transition_colors(cur_hex, end_hex, time);
    change_face_colour_with_delay(0, colours, colours.length);
}
function change_face_colour_with_delay(i,colours,end){
    setTimeout(function(){
        change_face(colours[i])
        i++;
        if(i < end){
            change_face_colour_with_delay(i,colours,end);
        }
    },Interval_Value);
}
//Animate Lip Colour
function animate_lip_colour(cur_hex, end_hex, time){
    var colours = get_transition_colors(cur_hex, end_hex, time);
    change_lip_colour_with_delay(0, colours, colours.length);
}
function change_lip_colour_with_delay(i,colours,end){
    setTimeout(function(){
        change_lips(colours[i]);
        i++;
        if(i < end){
            change_lip_colour_with_delay(i,colours,end);
        }
    },Interval_Value);
}


function get_lighter_colour(hex){
     value = hex_to_rgb(hex)
     new_r  = value[0] + Math.round(value[0]*.4)
     if(new_r > 255){
        new_r = 255;
     } else if (new_r < 0){
        new_r = 0
     }

     new_g  = value[1] + Math.round(value[1]*.4)
     if(new_g > 255){
        new_g = 255;
     } else if (new_g < 0){
        new_g = 0
     }
     new_b  = value[2] + Math.round(value[2]*.4)
     if(new_b > 255){
        new_b = 255;
     } else if (new_b < 0){
        new_b = 0
     }
     return rgb_to_hex([new_r, new_g, new_b])
}


// Functions to flash colour of object
function flash_background(time){
    if (waitingVariables.flashing_background){
        console.log("Already Flashing background");
        return
    }
    waitingVariables.flashing_background = true;
    curr = decimal_rgb_hex(renderer.getClearColor());
    lighter = get_lighter_colour(curr);
    animate_background_colour(curr, lighter, time);
    setTimeout(function(){
        animate_background_colour(lighter, curr, time);
    },time);
    setTimeout(function(){
        waitingVariables.flashing_background = false;
    },(time*2));
}

function flash_lips(time){
    if (waitingVariables.flashing_lips){
        console.log("Already Flashing Lips");
        return
    }
    waitingVariables.flashing_lips = true;
    curr = decimal_rgb_hex(tiaObject.mFace.material[1].color);
    lighter = get_lighter_colour(curr);
    animate_lip_colour(curr, lighter, time);
    setTimeout(function(){
        animate_lip_colour(lighter, curr, time);
    },time);
    setTimeout(function(){
        waitingVariables.flashing_lips = false;
    },(time*2));
}

function flash_clothes(time){
     if (waitingVariables.flashing_clothes){
        console.log("Already Flashing Clothes");
        return
    }
    waitingVariables.flashing_clothes = true;
    curr = decimal_rgb_hex(tiaObject.mBody.material[0].color);
    lighter = get_lighter_colour(curr);
    animate_clothes_colour(curr, lighter, time);
    setTimeout(function(){
        animate_clothes_colour(lighter, curr, time);
    },time);
    setTimeout(function(){
        waitingVariables.flashing_clothes = false;
    },(time*2));

}

function flash_face(time){
    if (waitingVariables.flashing_face){
        console.log("Already Flashing Face");
        return
    }
    waitingVariables.flashing_face = true;
    curr = decimal_rgb_hex(tiaObject.mFace.material[0].color);
    lighter = get_lighter_colour(curr);
    animate_face_colour(curr, lighter, time);
    setTimeout(function(){
        animate_face_colour(lighter, curr, time);
    },time);
    setTimeout(function(){
        waitingVariables.flashing_face = false;
    },(time*2));
}


function flash_hair(time){
    if (waitingVariables.flashing_hair){
        console.log("Already Flashing Hair");
        return
    }
    waitingVariables.flashing_hair = true;
    curr1 = decimal_rgb_hex(tiaObject.mHair.material[0].color);
    curr2 = decimal_rgb_hex(tiaObject.mFace.material[2].color);
    lighter1 = get_lighter_colour(curr1);
    lighter2 = get_lighter_colour(curr2);
    animate_hair_colour(curr1, curr2, lighter1, lighter2, time);
     setTimeout(function(){
        animate_hair_colour(lighter1, lighter2, curr1, curr2, time);
    },time);
    setTimeout(function(){
        waitingVariables.flashing_hair = false;
    },(time*2));
}

function flash_head(time=300){
    flash_face(time);
    flash_hair(time);
}


// Animate Camera Movements
var face_zoom_vals = [30,0.03,30];
var original_zoom_vals = [35, -0.1, 55];

var camera_values = {
    "face": {
        "position": {
            "y": 0,
            "z": 34,
            "x": 0
        },
        "rotation":{
            "y": 0,
            "z": -0.01,
            "x": 0
        },
        "fov":30
    },
    "original": {
        "position": {
            "y": -2,
            "z": 35,
            "x": 0
        },
        "rotation":{
            "y": 0,
            "z": 0,
            "x": -0.078
        },
        "fov":55
    },

}




function zoom(time, vals){
    intervals = Math.round(time/Interval_Value)-2;

    //Change position values
    curr_pos_x = camera.position.x;
    curr_pos_y = camera.position.y;
    curr_pos_z = camera.position.z;

    diff_pos_x = (vals['position']['x'] - curr_pos_x)/intervals;
    diff_pos_y = (vals['position']['y'] - curr_pos_y)/intervals;
    diff_pos_z = (vals['position']['z'] - curr_pos_z)/intervals;

    //Rotations
    curr_rot_x = camera.rotation.x;
    curr_rot_y = camera.rotation.y;
    curr_rot_z = camera.rotation.z;

    diff_rot_x = (vals['rotation']['x'] - curr_rot_x)/intervals;
    diff_rot_y = (vals['rotation']['y'] - curr_rot_y)/intervals;
    diff_rot_z = (vals['rotation']['z'] - curr_rot_z)/intervals;

    //FOV
    curr_fov = camera.fov

    diff_fov = (vals['fov'] - curr_fov)/intervals;


    out = [[
            curr_pos_x,
            curr_pos_y,
            curr_pos_z,
            curr_rot_x,
            curr_rot_y,
            curr_rot_z,
            curr_fov
          ]
    ]
    for(i=1;i<intervals;i++){
        temp = [
            out[i-1][0]+diff_pos_x,
            out[i-1][1]+diff_pos_y,
            out[i-1][2]+diff_pos_z,
            out[i-1][3]+diff_rot_x,
            out[i-1][4]+diff_rot_y,
            out[i-1][5]+diff_rot_z,
            out[i-1][6]+diff_fov
        ]
        out.push(temp);
    }
    out.push([
            vals['position']['x'],
            vals['position']['y'],
            vals['position']['z'],
            vals['rotation']['x'],
            vals['rotation']['y'],
            vals['rotation']['z'],
            vals['fov']

        ]);
    return animate_zoom(0,out,out.length);
}
function apply_camera_change(vals){
    //Change positions
    camera.position.x = vals[0]
    camera.position.y = vals[1]
    camera.position.z = vals[2]

    //Change Rotations
    camera.rotation.x = vals[3];
    camera.rotation.y = vals[4];
    camera.rotation.z = vals[5];

    //Change FOV
    camera.fov = vals[6];
    camera.updateProjectionMatrix();
}
function animate_zoom(i,vals,end){
    setTimeout(function(){
        apply_camera_change(vals[i])
        i++;
        if(i < end){
            animate_zoom(i,vals,end);
        }
    },Interval_Value);
}


function clicked_eye(id){

        if(waitingVariables.products.eyes.colours[id].class == 'locked'){
            //$('#'+id).effect("shake", {distance:5, times: 3},300);
            return;
        }

        if( waitingVariables.products.eyes.colours[id].class == 'owned'){
            price ='<i style="color:green;" class="fa fa-check" ></i>'
            txt = "equip";
            $('#buy_equip_btn').attr('onclick','equip_eyes("'+id+'")');
        }
        else{
            price = '<p>'+waitingVariables.products.eyes.colours[id].price+"</p>";
            txt = "buy";
            $('#buy_equip_btn').attr('onclick','buy_eyes("'+id+'")');
        }
        $('#buy_equip_btn').text(txt);

    $('#product_description_back_btn').click(function(){unclicked_eyes();});
    show_description(waitingVariables.products.eyes.colours[id].name, '#'+waitingVariables.products.eyes.colours[id].hex, price)

    disable_click();
    closeEyes(time=500);
    setTimeout(function(){
        change_eyes(id=id);
        openEyes(wait=400,st_callback=openEyesEmp());
        setTimeout(function(){
            openEyes(time=400);
        },900);
    },500);

}

function unclicked_eyes(){
    hide_description();
    closeEyes(time=300);
    setTimeout(function(){
        change_eyes(id=waitingVariables.attributes.eyes);
        openEyes(wait=300,st_callback=enable_click());
        setTimeout(function(){enable_click();},600);
    },300);
}

function closeEyes(time=200, st_callback=function(){}, wait=0, argument=""){
    if( eyelidObject.bool){
        setTimeout(function(){
            console.log("Waiting and retrying");
            closeEyes(time, st_callback, wait, argument);
            return
        },50);
    }
    setTimeout(function(){
        initMoveEyelids(-1,1,time/1000);
        setTimeout(function(){
            if(argument == ""){
                st_callback()
            }else{
                st_callback(argument)
            }

        },time/1000)
    },wait);
}

function change_eyes(id, st_callback=function(){}, argument=""){
     tiaObject['mEyeR'+id].visible = true;
     tiaObject['mEyeL'+id].visible = true;
     for(i=0;i<tiaEyes.length;i++){
        if(tiaEyes[i] != id.toString()){
            tiaObject['mEyeR'+tiaEyes[i]].visible = false;
            tiaObject['mEyeL'+tiaEyes[i]].visible = false;
        }
    }
    if(argument == ""){
        st_callback()
    }else{
        st_callback(argument)
    }
}



function openEyes(time=300, st_callback=function(){}, wait=0, argument=""){
    if( eyelidObject.bool){
        setTimeout(function(){
            console.log("Waiting and retrying");
            openEyes(time, st_callback, wait, argument);
            return
        },50);
    }
    setTimeout(function(){
        initMoveEyelids(0,0,time/1000);
        setTimeout(function(){
            if(argument == ""){
                st_callback()
            }else{
                st_callback(argument)
            }

        },time/1000)
    },wait);
}

function openEyesEmp(time=200, st_callback=function(){}, wait=0, argument=""){
    if( eyelidObject.bool){
        setTimeout(function(){
            console.log("Waiting and retrying");
            openEyes(time, st_callback, wait, argument);
            return
        },50);
    }
    setTimeout(function(){
       initMoveEyelids(0.1,-0.1,time/1000);
        setTimeout(function(){
            if(argument == ""){
                st_callback()
            }else{
                st_callback(argument)
            }

        },time/1000)
    },wait);
}

