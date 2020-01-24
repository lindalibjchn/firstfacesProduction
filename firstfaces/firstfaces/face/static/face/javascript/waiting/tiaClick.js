var clickableObjects = [];


function onClick(event) {

    event.preventDefault();
    if($('#popup-btn').hasClass("clicked")){
        return;
    }
    if(waitingVariables.wait_on_foo){
        return;
    }


    if(event.clientY >= $('#tiaHolder').offset()['top'] && event.clientY <= $('#tiaHolder').offset()['top']+$('#tiaHolder').height()){
        y_pos = event.clientY-$('#tiaHolder').offset()['top'];
    }else{
        return
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
                    flash_background(200);
                    show_title('backgrounds',wait=300,time=500,st_callback=show_backgrounds);
                },300);
            } else {
                flash_background(200);
                show_title('backgrounds',wait=300,time=500,st_callback=show_backgrounds);

            }
        }
    },delay);
}

function show_backgrounds(time=500, st_callback=function(){} ){
    waitingVariables.products_showing = true;
    var type = 'backgrounds';

    $('#product-cont').fadeOut(time);
    setTimeout(function(){
         $('#product-cont').hide();

        $('#product-cont').empty().removeClass("tile");
        for(x in waitingVariables.products[type]){
            $('#product-cont').append(waitingVariables.products[type][x].html)
        }
        $('#product-category-options').css("display", "flex").hide().fadeIn(time);
         $('#product-cont').fadeIn(time);
        setTimeout(function(){
            st_callback();
        },time);
    },time);
}

function change_options(keys){
    $('#product-category-options').empty()
    for(i=0;i<keys.length;i++){
        if(i==0){
            temp = "<div class='option active' onclick='option_click(\""+keys[i]+"\")' id='"+keys[i]+"'>"+keys[i]+"</div>"
        } else {
            temp = "<div class='option' id='"+keys[i]+"'  onclick='option_click(\""+keys[i]+"\")'>"+keys[i]+"</div>"
        }
        $('#product-category-options').append(temp);
    }
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
    console.log("In show title")
    disable_click()
    setTimeout(function(){
        $('#product-cont').empty();
        $('#product-cont').append("<div style='height:100%; width:100%; display:flex; justify-content:center; align-items:center;'><p id='hidden-title-category' style=\"font-family:'Oswald', sans-serif; display:none; text-transform: uppercase; font-size: 25px; color: #102858;\">"+text+"</p></div>");
        $("#hidden-title-category").fadeIn(time);
        setTimeout(function(){
            $("#hidden-title-category").fadeOut(time);
            setTimeout(function(){
                st_callback(st_callback=enable_click);
            },time);
        },time*2);
    },wait);
}


function show_eyes(time=500, st_callback=function(){} ){

    waitingVariables.products_showing = true;
    var type = 'eyes';

    $('#product-cont').fadeOut(time);
    setTimeout(function(){
         $('#product-cont').hide();

        $('#product-cont').empty().removeClass("tile");
        for(x in waitingVariables.products[type]){
            $('#product-cont').append(waitingVariables.products[type][x].html)
        }
        $('#product-category-options').css("display", "flex").hide().fadeIn(time);
         $('#product-cont').fadeIn(time);
        setTimeout(function(){
            st_callback();
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
         $('#product-cont').empty();
        for(x in waitingVariables.products[type]){
            $('#product-cont').append(waitingVariables.products[type][x].html)
        }
        $('#product-cont').removeClass("tile").fadeIn(time);
        setTimeout(function(){
            st_callback();
        },time);
    },time);

}

function disable_click(wait=0){
    setTimeout(function(){
        waitingVariables.wait_on_foo = true;
    },wait);
}
function enable_click(wait=0){
    setTimeout(function(){
        waitingVariables.wait_on_foo = false;
    },wait);
}

function show_hair(time=500, st_callback=function(){}){
   waitingVariables.products_showing = true;
    var type = 'hair';

    $('#product-cont').fadeOut(time);
    setTimeout(function(){
         $('#product-cont').hide();

        $('#product-cont').empty().removeClass("tile");
        for(x in waitingVariables.products[type]){
            $('#product-cont').append(waitingVariables.products[type][x].html)
        }
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

function option_click(id){
    $('.option').removeClass("active");
    $('#'+id).addClass("active");

}

