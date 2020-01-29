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
    load_screen();
    cycle_feedback();
});
var dist = 0;
function setHeight(){
    console.log("Here")
    swidth = $(document).width()
    sheight = ($('#footer').offset()['top'] - parseInt($('#navbar').css('height')));
    dist = sheight+6;
    $('#overforeground').css({"height":sheight, 'top':parseInt($('#navbar').css('height'))});
    $('#foregroundContainer').css("height",sheight);
};

function load_screen(){
    $('.hide2').hide();
    $('#text0').css('opacity','0');
    $('#text1').css('opacity','0');
    $('#text2').css('opacity','0');
    time1 = 200;
    time2 = 1300;
    sent_time = 500;
    time3 = time1 + (time2*4);
    $('.video_holder').hide();
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

function close_alert(){
    $('#overforeground').fadeOut(700);
}
function open_alert(){
    $('#overforeground').fadeIn(700);
}


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
/*
function showLogInDropdown() {

    $('#closeSignInContainer').fadeIn();
    $('#signInContainer').fadeIn();

}

function hideLogInDropdown() {

    console.log('hide login dropdown');
    $('#closeSignInContainer').fadeOut();
    $('#signInContainer').fadeOut();

}

function logIn() {
    
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

                $("#misMatch").text("your username or password didn't match. Please try again.").slideDown( 1000 );
                $("username").val('');

            }

        },
        error: function() {
            console.log("that's shite");
        },
    });
}*/

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







