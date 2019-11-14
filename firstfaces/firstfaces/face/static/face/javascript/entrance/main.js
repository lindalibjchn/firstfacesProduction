$(window).on( 'load', function() {

    runUCDGif();

    // login dropdown
    $("#logInDropdown").on( "click", showLogInDropdown )
    $("#closeSignInContainer").on( "click", hideLogInDropdown )
    //$("#signUpBtn").on( "click", showSignUpForm )
    
    // log in
    $( "#loginForm" ).on( "submit", function( event ) {
     
        event.preventDefault();
        console.log("in prevent default for login submission");
        logIn()
        
    });

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
   
});

function runUCDGif() {

    $("#foregroundImage").hide();
    $("#foregroundImageNoHarp").show();
    $("#foregroundImageGif").show();

    setTimeout( function() {
    
        $( '#infoSentenceContainer' ).css( 'visibility', 'visible' );
        displayTextNVideos();

    }, 2000 )

}

function displayTextNVideos() {

    $( '#text0' ).fadeIn( 1500, function() {
        
        $( '#text1' ).fadeIn( 1500, function() {
       
            $('#text2' ).fadeIn( 1500, function() {
                
                $( '.info-card' ).fadeIn( 1500 );

            });

        });
        
    }); 

}

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
}

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















