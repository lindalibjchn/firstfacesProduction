/*$(window).on( 'load', function() {

    //runUCDGif();

    // login dropdown
    //$("#logInDropdown").on( "click", showLogInDropdown )
    //$("#closeSignInContainer").on( "click", hideLogInDropdown )
    //$("#signUpBtn").on( "click", showSignUpForm )
    
    // log in
    /*$( "#loginForm" ).on( "submit", function( event ) {
     
        event.preventDefault();
        console.log("in prevent default for login submission");
        logIn()
        
    });*/

    // sign up User
    //$( "#infoBtn" ).on( "click", function() { 
        //console.log("in info button");

        //if ( $('input[name="infoAgreement"]').is(':checked') ) {

            //console.log('i infoAgreement');
            //$('#info').fadeOut( 500, function(){ $('#consent').fadeIn( 500 ) } );

        //} else {

            //alert( "please click the box to state you have read the information sheet and watched the 'How To' video" );

        //}

    //});

    //$( "#consentBtn" ).on( "click", function() { 
        //console.log("in consent button");

        //if ( $('.consentChecks:checked').length === $('.consentChecks').length ) {

            //$('#consent').fadeOut( 500, function(){ $('#learnerID').fadeIn( 500 ) } );

        //} else {

            //alert( "please check all the boxes to indicate your consent" );

        //}

    //});

    // sign up User
    //$( "#signUpUserForm" ).on( "submit", function( event ) {
     
        //event.preventDefault();
        //console.log("in prevent default for signUpUserForm submission");
        //signUpUser();
        
    //});
   
    //$( "#signUpForm" ).on( "submit", function( event ) {
     
        //event.preventDefault();
        //console.log("in prevent default for signUpForm submission");
        //registerProfile();
        
    //});
   
//});
$( document ).ready(function(){
    setHeight();
    visitor_save();
    close_alert(0,0);
    load_screen();
    cycle_feedback();

    //Log-IN


});

var dist = 0;
function setHeight(){
    console.log("Here")
    swidth = $(document).width()
    tp = parseInt($('#navbar').css('height'));
    sheight = ($('#footer').offset()['top'] - tp);
    dist = sheight+6;

    $('#overforeground').css({"height":sheight, 'top':tp});
    $('#foregroundContainer').css("height",sheight);
    $('#contact_cont').css({"height":sheight, "top":tp});
    $('#su_cont').css({"height":sheight, "top":tp});
};

function load_screen(){
    $('.hide2').hide();
    $('#text0').css('opacity','0');
    $('#text1').css('opacity','0');
    $('#text2').css('opacity','0');
    time1 = 500;
    time2 = 1000;
    sent_time = 500;
    time3 = time1 + (time2*4);
    $('.video_holder').hide();

    $('#foregroundAllWhiteAllWhiteAllWhite').fadeOut( time2 );
    $('.video-cont').css({"background":"#D3D3D3", "opacity":"0.15"});

    setTimeout(function(){
        $('.hide1').show();
        setTimeout(function(){
            $('#text0').animate({opacity: 1}, sent_time);
            setTimeout(function(){
                $('#text1').animate({opacity: 1}, sent_time);
                setTimeout(function(){
                    $('#text2').animate({opacity: 1}, sent_time);
                },time2);
            },time2);
        },time2);
    },time1);
    setTimeout(function(){
        $('.hide2').fadeIn(sent_time*2);
        $('.video-cont').animate({opacity: 1}, sent_time*2);
        $('.video_holder').fadeIn(sent_time*2);
    },time3);

}

function close_alert(time1=500,time2=700){
    $('#alert_box').fadeOut(time1);

    setTimeout(function(){
        $('#overforeground').fadeOut(time2);
        $('#overfooter').fadeOut(time2);
        $('#navbar-grey-cover').fadeOut(time2);
    },0);

}
function open_alert(){
    $('#alert_box').hide()

    $('#overforeground').fadeIn(700);
    $('#overfooter').fadeIn(700);
    $('#navbar-grey-cover').fadeIn(700);
    setTimeout(function(){
        $('#alert_box').fadeIn(500);
    },0);
}
$('#navbar-grey-cover').click(close_alert);
$('#overfooter').click(close_alert);
$('#overforeground-cont').click(close_alert);




$('#faq-btn').click(function(){
    $('#popup-btn').click();
    setTimeout(function(){
        open_alert();
    },200)
});

$('#main-logo').click(function(){
    $('#foregroundContainer').show();
    $('#contact_cont').hide();
    $('#su_cont').hide();
    reset_contact();
    if($('#popup-btn').hasClass("clicked")){
        $('#popup-btn').click();
    }
});
$('#home-btn').click(function(){
    $('#foregroundContainer').show();
    $('#contact_cont').hide();
    $('#su_cont').hide();
    reset_contact();
    if($('#popup-btn').hasClass("clicked")){
        $('#popup-btn').click();
    }
});
$('#harpIMG').click(function(){
    $('#foregroundContainer').show();
    $('#contact_cont').hide();
    $('#su_cont').hide();
    reset_contact();
    if($('#popup-btn').hasClass("clicked")){
        $('#popup-btn').click();
    }
});



$('#contact-btn').click(function(){
    reset_contact();
    $('#foregroundContainer').hide();
    $('#su_cont').hide();
    $('#contact_cont').show();
    $('#popup-btn').click();
});

$('#email-icon').click(function(){
    reset_contact();
    $('#foregroundContainer').hide();
    $('#contact_cont').show();
     if($('#popup-btn').hasClass("clicked")){
        $('#popup-btn').click();
    }
});

$('#contact_send').click(function(){
    fields = ["email","name","message"];




     errors = false
     valid = ValidateEmail($('#email').text().trim())
     if (!valid || $('#email').hasClass("not_typed")){
        $('#email').removeClass('shadow').removeClass("filled").addClass('incorrect_filled');
        $('#email_error').show();
        errors = true;
    }
    else{
        $('#email').removeClass('shadow').removeClass("incorrect_filled").addClass('filled')
        $('#email_error').hide();
        email = $('#email').text().trim();
      }

    valid = ValidateOthers($('#'+"name").text().trim())
    if (!valid || $('#name').hasClass("not_typed")){
        $('#'+"name").removeClass('shadow').removeClass("filled").addClass('incorrect_filled');
        $('#'+"name"+'_error').show();
        errors = true;
    }else{
        $('#'+"name").removeClass('shadow').removeClass("incorrect_filled").addClass('filled');
        $('#'+"name"+'_error').hide();
        name = $('#name').text().trim();
    }

    valid = ValidateOthers($('#'+"message").text().trim())
    if (!valid || $('#message').hasClass("not_typed")){
        $('#'+"message").removeClass('shadow').removeClass("filled").addClass('incorrect_filled');
        $('#'+"message"+'_error').show();
        errors = true;
    }else{
        $('#'+"message").removeClass('shadow').removeClass("incorrect_filled").addClass('filled');
        $('#'+"message"+'_error').hide();
        message = $('#message').text().trim();
    }

    if(!errors){
        $('#contact_send').hide();
        send_contact(name,message,email)
    }
    else{

    }

})

var previous_field = ""
$('._field').click(function(){
    if(previous_field != ""){
        if(previous_field == "email"){
            valid = ValidateEmail($('#email').text().trim())
            if (!valid){
                $('#email').removeClass('shadow').removeClass("filled").addClass('incorrect_filled');
                 $('#email_error').show();
            }
            else{
                $('#email').removeClass('shadow').removeClass("incorrect_filled").addClass('filled')
                $('#email_error').hide();
            }
        }
        if(previous_field == "name" || previous_field == "message"){
            valid = ValidateOthers($('#'+previous_field).text().trim())
            if (!valid){
                $('#'+previous_field).removeClass('shadow').removeClass("filled").addClass('incorrect_filled');
                $('#'+previous_field+'_error').show();
            }
            else{

                $('#'+previous_field).removeClass('shadow').removeClass("incorrect_filled").addClass('filled');
                $('#'+previous_field+'_error').hide();
            }
        }

    }
    if($(this).hasClass("not_typed")){
        $(this).removeClass("not_typed");
        $($(this).children()[0]).css('opacity','1').empty().attr("contentEditable","true").focus();
        console.log(previous_field)
        previous_field = this.id
    } else {
        $($(this).children()[0]).focus();
        previous_field = this.id
    }
});

function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function ValidateOthers(text)
{
 if(text.trim() != "")
  {
    return (true)
  }
    return (false)
}

function send_contact(name,message,email){
    let fd = new FormData();
    fd.append("name",name);
    fd.append("email",email);
    fd.append("message",message);

     $.ajax({
        url: "/contact_us",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
           $('#cont-contact').fadeOut(300);
          animate_color_colour("top-half-contact-before","04A644",800)
          animate_color_colour("top-half-contact","04A644",800)
          setTimeout(function(){
            $('#congrats-body').css("display","flex").hide().fadeIn(500);
          },300);
          $('#contact_send').show()
        },
        error: function() {
          console.log("Error Sending Email");
        },
    });
}

function get_transition_colors(start_hex, end_hex, time){
    intervals = Math.round(time/16.666666667)-1;
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
function get_curr_hex(id){
    rgb = $('#'+id).css("background-color").substring(4, $('#'+id).css("background-color").length - 1).split(',').map(function(x){return parseInt(x,10)});
    return rgb_to_hex(rgb);
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

function animate_color_colour(id, end_hex, time){
    var colours = get_transition_colors(get_curr_hex(id), end_hex, time)
    change_color_with_delay(0,colours,id ,colours.length);
}
function change_color_with_delay(i,colours,id,end){
    setTimeout(function(){
        change_background(colours[i],id)
        i++;
        if(i < end){
            change_color_with_delay(i,colours,id,end);
        }
    },16.666666667);
}
function change_background(color,id){
    $('#'+id).css("background-color",color);
}


$('#closeSignInContainer').click(function(){$('#signInContainer').hide()})

/*
function runUCDGif() {

    $("#foregroundImage").hide();
    $("#foregroundImageNoHarp").show();
    $("#foregroundImageGif").show();

    setTimeout( function() {
    
        $( '#infoSentenceContainer' ).css( 'visibility', 'visible' );
        displayTextNVideos();

    }, 2000 )

}
*/
/*function displayTextNVideos() {

    $( '#text0' ).fadeIn( 1500, function() {
        
        $( '#text1' ).fadeIn( 1500, function() {
       
            $('#text2' ).fadeIn( 1500, function() {
                
                $( '.info-card' ).fadeIn( 1500 );

            });

        });
        
    }); 

}*/

function showLogInDropdown() {

    $('#closeSignInContainer').fadeIn();
    $('#signInContainer').fadeIn();

}

$('#signup-btn').click(function(){
    $('#foregroundContainer').hide();
    $('#su_cont').show();
    $('#popup-btn').click();
});


function hideLogInDropdown() {

    console.log('hide login dropdown');
    $('#closeSignInContainer').fadeOut();
    $('#signInContainer').fadeOut();

}

$( "#loginForm" ).on( "submit", function( event ) {

        event.preventDefault();
        console.log("in prevent default for login submission");
        logIn()

    });

function visitor_save(){
    let fd = new FormData();

    $.ajax({
        url: "/site_access",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {
            console.log("success")
        },
        error: function() {
            console.log("Failure")
        },
    });
}


function logIn(){
    
    $("#misMatch").hide();
    // below is from stackoverflow to change serialized form data into nice json
    let search = $("#loginForm").serialize();
    let formData = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

    $.ajax({
        url: "/login",
        type: "POST",
        data: formData,
        success: function(json) {
            if ( json.loggedIn ) {
                
                window.location.href = "/waiting"

            } else {

                $("#misMatch").text("your username or password didn't match. Please try again.").show();
                $("username").val('');

            }

        },
        error: function() {
            console.log("that's shite");
        },
    });
}
$('#signin-btn').click(function(){
    $('#popup-btn').click();
    setTimeout(function(){
        showLogInDropdown();
    },200)
});


//function registerProfile() {

    //console.log('in register');
    //let search = $("#signUpForm").serialize();
    //let formData = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    //console.log('formData:', formData);

    //$.ajax({
        //url: "/sign_up",
        //type: "GET",
        //data: formData,
        //success: function(json) {

            //$('#signUpBackground').fadeOut( 500, enterSchool );

        //},
        //error: function() {
            //console.log("that's shite");
        //},
    //});

//}

//function signUpUser() {

    //let search = $("#signUpUserForm").serialize();
    //let formData = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    //console.log('formData:', formData);

    //$.ajax({
        //url: "/sign_up_user",
        //type: "POST",
        //data: formData,
        //success: function(json) {
            //if ( json.usernameUnique ) {
                
                //console.log('unique');
                
                //if ( json.passwordOK ) {

                    //console.log('password is ok');

                    //username = formData.username
                    //// go to profile entry

                    //$('#learnerID').fadeOut( 500, function(){ $('#profile').fadeIn( 500 )});

                //} else {

                    //alert('Password must be at least 8 characters, not too simple, and not similar to your username.')

                //}

            //} else {

                //// give error message
                //alert('that username is taken. Please choose another.')

            //}

        //},
        //error: function() {
            //console.log("that's shite");
        //},
    //});
//}

//function showSignUpForm() {

    //console.log('in showSignUpForm');
    //$('#signUpBackground').fadeIn( 500 );

//}

//function removeSignUp() {

   //$('#signUpBackground').fadeOut( 500 ); 

//}



var curr_feedback = 1;

function cycle_feedback(){
    next_feedback = curr_feedback+1;
    if(next_feedback > 3){
        next_feedback -= 3;
    }
    $('#feedback_'+curr_feedback).fadeOut(600);
    setTimeout(function(){
        $('#feedback_'+next_feedback).fadeIn(600);
        setTimeout(function(){
            curr_feedback = next_feedback;
            cycle_feedback()
        }, 3600);
    }, 600);
}

function reset_contact(){
    $('._field').removeClass('incorrect_filled').removeClass("filled").addClass('shadow');
    $('.error_msg').hide()

    $('._field').each(function(i, obj) {
       $(obj).addClass("not_typed");
       if(obj.id == 'name'){
            $($(obj).children()[0]).css('opacity','0.8').empty().attr("contentEditable","false").text("Your Full Name")
       }else if(obj.id == 'email') {
            $($(obj).children()[0]).css('opacity','0.8').empty().attr("contentEditable","false").text("Please enter valid email");
       } else {
            $($(obj).children()[0]).css('opacity','0.8').empty().attr("contentEditable","false").text("Please enter message");
       }
    });
    $('#cont-contact').show();
    $('#congrats-body').hide();
    animate_color_colour("top-half-contact-before","0089CF",0)
    animate_color_colour("top-half-contact","0089CF",0)
}

$('#popup-btn').click(function(){


    if($('#popup-btn').hasClass("clicked")){
        $('#logo-left-cont').fadeIn(200);
        setTimeout(function(){$('#popup').hide();},200);
        $('#popup').animate({height:'0'},200);
        AnimateRotate(180,"#popup-btn",200);
        $('#popup-btn').removeClass("clicked");
    }else{
        $('#logo-left-cont').fadeOut(200);
        $('#popup').show();
        $('#popup').animate({height: dist.toString()+"px"},200);
        AnimateRotate(90,"#popup-btn",200);
        $('#popup-btn').addClass("clicked");
    }
});

function AnimateRotate(angle,id,duration) {
    // caching the object for performance reasons
    var $elem = $(id);

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: angle}, {
        duration: duration,
        step: function(now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}







