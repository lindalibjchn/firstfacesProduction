var clickableObjects = [];


function onClick(event) {
    alert("Clicked");
    disable_click();
    if(event.clientY >= $('#tiaHolder').offset()['top'] && event.clientY <= $('#tiaHolder').offset()['top']+$('#tiaHolder').height()){
        y_pos = event.clientY-$('#tiaHolder').offset()['top'];
    }else{
        enable_click();
        return
    }
    event.preventDefault();
    if($('#popup-btn').hasClass("clicked")){
        return;
    }
    if(waitingVariables.wait_on_foo){
        return;
    }




    var vector = new THREE.Vector3(
        ( event.clientX / $('#tiaHolder').width() ) * 2 - 1,
      - ( y_pos/ $('#tiaHolder').height() ) * 2 + 1,
        -1
    );
    vector.unproject(camera );

     var ray = new THREE.Raycaster( camera.position,
                             vector.sub( camera.position ).normalize() );


    var intersects = ray.intersectObjects( clickableObjects);

    if(waitingVariables.products_showing){
        hide_products();
        delay = 300;
    } else {
        delay = 0;
    }
    if( waitingVariables.click_me){
        $("#hidden-title-category").fadeOut(300);
        waitingVariables.click_me = false;
    }
    setTimeout(function(){
        if ( intersects.length > 0 ) {
            console.log(intersects[0].object.name)
            if(intersects[0].object.name == 'mFace' || intersects[0].object.name == 'mHair' || intersects[0].object.name.substring(0,4) == 'mEye'){
                if(!waitingVariables.zoomed){
                    flash_head(200);
                    setTimeout(function(){
                        zoom(300,camera_values.face);
                        waitingVariables.zoomed = true;
                        setTimeout(function(){
                            if(intersects[0].object.name == 'mHair'){
                                flash_hair(300);
                                show_title('Hair',wait=300,time=500,st_callback=show_hair);
                            }
                            if(intersects[0].object.name.substring(0,4) == 'mEye'){
                                flash_eyes(time=200)
                                show_title('Eyes',wait=300,time=500,st_callback=show_eyes);
                            }
                            else{
                                enable_click();
                            }
                        },300);
                    },200);
                }
                else{
                    if(intersects[0].object.name == 'mHair'){
                        flash_hair(300);
                        show_title('Hair',wait=300,time=500,st_callback=show_hair);
                    }
                    if(intersects[0].object.name.substring(0,4) == 'mEye'){
                        flash_eyes(time=200)
                        show_title('Eyes',wait=300,time=500,st_callback=show_eyes);
                    }
                    else{
                        enable_click();
                    }
                }
            }
          if(intersects[0].object.name == 'mBody'){

                 if(waitingVariables.zoomed){
                    console.log("here");
                    zoom(300,camera_values.original);
                    waitingVariables.zoomed = false;
                    setTimeout(function(){
                       flash_clothes(200);
                        show_title('Clothing',wait=300,time=500, st_callback= show_clothes);
                    },300);
                 }
                 else{
                    flash_clothes(200);
                    show_title('Clothing',wait=300,time=500, st_callback= show_clothes);
                 }
          }
        }
        else{
            if(waitingVariables.zoomed){
                zoom(300,camera_values.original);
                waitingVariables.zoomed = false;
                hide_products();
                setTimeout(function(){
                    if(waitingVariables.attributes.gif_bool){
                        flash_background(200);
                    } else {
                        flash_gif(200);
                    }
                    setTimeout(function(){
                        show_title('backgrounds',wait=300,time=500,st_callback=show_backgrounds);
                    },200);
                },300);
            } else {
                if(waitingVariables.attributes.gif_bool){
                    flash_background(200);
                } else {
                    flash_gif(200);
                }
                setTimeout(function(){
                    show_title('backgrounds',wait=300,time=500,st_callback=show_backgrounds);
                },200);



            }
        }
    },delay);

}

function show_backgrounds(time=500, st_callback=function(){} ){
    waitingVariables.products_showing = true;
    var type = 'backgrounds';
    var subtype = "colours"
    $('#product-cont').fadeOut(time);

    setTimeout(function(){
        $('#product-cont').hide();
        $('#product-cont').empty().removeClass("tile");
        change_options([['Colours', 'colours'], ['Animated','gifs']], type);
        for(x in waitingVariables.products[type][subtype]){
            $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
        }
        fix_img_size();
        $('#product-category-options').css("display", "flex").hide().fadeIn(time);
         $('#product-cont').fadeIn(time);
        setTimeout(function(){
            enable_click();
        },time);
    },time);
}

function change_options(keys,type){
    $('#product-category-options').empty()
    for(i=0;i<keys.length;i++){
        if(i==0){
            temp = "<div class='option active' id='"+keys[i][1]+"' onclick='option_click(\""+keys[i][1]+"\",\""+type+"\")'>"+keys[i][0]+"</div>"
        } else {
            temp = "<div class='option' id='"+keys[i][1]+"'  onclick='option_click(\""+keys[i][1]+"\",\""+type+"\")'>"+keys[i][0]+"</div>"
            temp = "<div class='option' id='"+keys[i][1]+"'  onclick='option_click(\""+keys[i][1]+"\",\""+type+"\")'>"+keys[i][0]+"</div>"
        }
        $('#product-category-options').append(temp);
    }
}

function option_click(subtype,type){
    alert("option_clicked()");
    time = 800
    $('.option').hide();
    $('.option').removeClass("active");
    $('#'+subtype).addClass("active");
    $('.product').fadeOut(time);
    setTimeout(function(){
        $('product-cont').empty()
        for(x in waitingVariables.products[type][subtype]){
            $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
        }
        fix_img_size();
         $('#product-cont').fadeIn(time);
         $('.option').fadeIn(time);
         setTimeout(function(){enable_click();},time)
    },time+100);

}


function hide_products(time=300){
    console.log("In hide products")
   $('#product-cont').fadeOut(time);
   $('#product-category-options').fadeOut(time);
   setTimeout(function(){
          $('#product-cont').empty();
          //$('#product-cont').addClass("tile");
           $('#product-cont').fadeIn(time);
          waitingVariables.products_showing = false;
   },time);
}
function show_title(text, wait=0, time=300, st_callback=function(){}){

    setTimeout(function(){
        alert("In show title")
        $('#product-cont').empty();
        $('#product-cont').append("<div style='height:100%; width:100%; display:flex; justify-content:center; align-items:center;'><p id='hidden-title-category' style=\"font-family:'Oswald', sans-serif; display:none; text-transform: uppercase; font-size: 25px; color: #102858;\">"+text+"</p></div>");
        $("#hidden-title-category").fadeIn(time);
        setTimeout(function(){
            $("#hidden-title-category").fadeOut(time);
            setTimeout(function(){
                st_callback();
            },time);
        },time*2);
    },wait);
}


function show_eyes(time=500, st_callback=function(){} ){

    waitingVariables.products_showing = true;
    var type = 'eyes';
    var subtype = "colours";
    $('#product-cont').fadeOut(time);
    setTimeout(function(){
        $('#product-cont').hide();
        $('#product-cont').empty().removeClass("tile");
        change_options([['Colours', 'colours']], type);
        for(x in waitingVariables.products[type][subtype]){
            $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
        }
        fix_img_size();
        $('#product-category-options').css("display", "flex").hide().fadeIn(time);
         $('#product-cont').fadeIn(time);
        setTimeout(function(){
           enable_click();
        },time);
    },time);
}

function show_clothes(time=500, st_callback=function(){} ){
    waitingVariables.products_showing = true;
    var type = 'clothes';
    $('#product-cont').fadeOut(time);
    setTimeout(function(){
        $('#product-cont').hide();
        $('#product-category-options').css("display", "flex").hide().fadeIn(time);
        change_options([['Colours', 'colours']], type);
        $('#product-cont').empty();
        type = "clothes"
        subtype = "colours";
        for(x in waitingVariables.products[type][subtype]){
            $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
        }
        fix_img_size();
        $('#product-cont').removeClass("tile").fadeIn(time);
        setTimeout(function(){
            enable_click();
        },time);
    },time);

}

function disable_click(wait=0){
    alert("disabled");
    setTimeout(function(){
        waitingVariables.wait_on_foo = true;
    },wait);
}


function enable_click(wait=0){
    alert("enabled");
    setTimeout(function(){
        waitingVariables.wait_on_foo = false;
    },wait);
}

function show_hair(time=500, st_callback=function(){}){
   waitingVariables.products_showing = true;
    var type = 'hair';
    var subtype = "colours";
    $('#product-cont').fadeOut(time);
    setTimeout(function(){
        $('#product-cont').hide();
        change_options([['Colours', 'colours']], type);
        $('#product-cont').empty().removeClass("tile");
        for(x in waitingVariables.products[type][subtype]){
            $('#product-cont').append(waitingVariables.products[type][subtype][x].html)
        }
        fix_img_size();
        $('#product-category-options').css("display", "flex").hide().fadeIn(time);
        $('#product-cont').fadeIn(time);
        setTimeout(function(){
            st_callback();
        },time);
    },time);
}





function show_click_me(time=300){
    disable_click()
    $('#product-cont').empty();
    $('#product-cont').append("<div style='height:100%; width:100%; display:flex; justify-content:center; align-items:center;'><p id='hidden-title-category' style=\"font-family:'Oswald', sans-serif; display:none; text-transform: uppercase; font-size: 25px; color: #102858;\">CLick Saoirse</p></div>");
    $("#hidden-title-category").fadeIn(time);
    waitingVariables.click_me = true;
    setTimeout(function(){
        enable_click();
    }, time);
}

