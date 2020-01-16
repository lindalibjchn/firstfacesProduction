var sheight, swidth;
var tiaH, tiaW;
var remH
function setHeight(){
    //get products
    get_backgrounds();
    get_balance();

    swidth = $(document).width()
    sheight = ($('#footer').offset()['top'] - ($('#shop-balance').offset()['top']+$('#shop-balance').height()));
    tiaH = Math.round(sheight*0.6);
    $('#demoHolder').css({"height":tiaH, 'width':swidth});

    tiaW = swidth;

    $('#tiaHolder').css({"height":"100%", 'width':'100%', 'border-bottom': '3px solid #102858'});
    remH = sheight - tiaH;
    pd_h = Math.round(sheight*0.4)
    $('#product_description').css({"height":pd_h+"px", "width":'100%'});
    $('#product_description').hide();
    btnH = Math.round(sheight*0.12);
    product_h = Math.round(sheight*0.28);
    $('.product-category').css('height',product_h+"px");
    btnP = Math.round(((swidth*.95) - (btnH*5))/6 )
    $('#category-btns').css('height',btnH+"px")
    btnH = Math.round(btnH*0.9);
    fH = Math.round(btnH*.6);
    $('.product-btn-cat-img').css({'max-height':fH+"px"})
    $('.product-category-button').css({"height":btnH+"px", 'width':btnH+"px", "margin-left":btnP+"px", "font-size":fH+"px"});
    $('.last-btn').css("margin-right",btnP+"px");

};

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
                "brow-colour":json.BrowC
            }
            createTia("tiaHolder", tiaH, tiaW);
        },
        error: function() {
          console.log("Error_Getting_Stock");
        },
    });
}


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

$('.product-category-button').click(function(){
    var type = $(this).attr('id');
    $('.product-category-cont').empty();
    for(x in waitingVariables.products[type]){
       $('.product-category-cont').append(waitingVariables.products[type][x].html)

    }
});

function hide_shop_content(){
    $('.product-category').fadeOut(300);
    $('#category-btns').fadeOut(300);
    return
}
function show_shop_content(){
    $('.product-category').fadeIn(300);
    $('#category-btns').fadeIn(300);
    return
}


function show_description(name,color,price){
    hide_shop_content();
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
        if(waitingVariables.products.backgrounds[id].class == 'locked'){
            $('#'+id).effect("shake", {distance:5, times: 3},300);
            return;
        }

        if( waitingVariables.products.backgrounds[id].class == 'owned'){
            price ='<i style="color:green;" class="fa fa-check" ></i>'
            txt = "equip";
        }
        else{
            price = '<p>'+waitingVariables.products.backgrounds[id].price+"</p>";
            txt = "buy";
        }
        $('#buy_equip_btn').text(txt);
        $('#product_description_back_btn').click(function(){unclicked_background();});
        show_description(waitingVariables.products.backgrounds[id].name, '#'+waitingVariables.products.backgrounds[id].hex, price)
        animate_background_colour(waitingVariables.attributes["background-colour"],waitingVariables.products.backgrounds[id].hex,600);

}

function unclicked_background(){
        hide_description()
        animate_background_colour(decimal_rgb_hex(renderer.getClearColor()),waitingVariables.attributes['background-colour'],600);

}

function decimal_rgb_hex(st){
    temp = [st['r']*255, st['g']*255, st['b']*255]
    return rgb_to_hex(temp);
}



function get_transition_colors(start_hex, end_hex, time){
    intervals = Math.round(time/16.666666667)-1;
    var start_rgb = hex_to_rgb(start_hex);
    var end_rgb = hex_to_rgb(end_hex);

    r_dist = end_rgb[0] - start_rgb[0] ;
    g_dist = end_rgb[1] - start_rgb[1];
    b_dist = end_rgb[2] - start_rgb[2];
    console.log(r_dist, g_dist, b_dist, intervals)
    r_change = r_dist/intervals;
    g_change = g_dist/intervals;
    b_change = b_dist/intervals;

    out = [start_rgb];
    for(i=1;i<intervals;i++){
        out.push([out[i-1][0]+r_change, out[i-1][1]+g_change, out[i-1][2]+b_change])
    }
    out.push(end_rgb);
    console.log(out)
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
    },16.666666667);
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
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
}

function equip_background(){
    let fd = new FormData();
    fd.append(id)
     $.ajax({
        url: "/equip_background",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            $('#shop-balance').text(json.balance);
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });

}
