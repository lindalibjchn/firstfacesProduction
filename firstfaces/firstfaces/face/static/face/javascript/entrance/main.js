
$(window).on( 'load', function() {

    if ( !!window.chrome !== true ) {

        alert( "Erle is currently optomised for Google Chrome only. On other browsers, it may not work properly. If you wish to use Erle, please consider downloading and using Chrome.");

    }

    // begins the loading of objects
    init();
    
    // login dropdown
    $("#logInDropdown").on( "click", showLogInDropdown )
    
    // log in
    $( "#loginForm" ).on( "submit", function( event ) {
     
        event.preventDefault();
        console.log("in prevent default for login submission");
        logIn()
        
    });

    $("#buttonLeft").hide();
    // info slide
    $("#buttonLeft").on( "click", function(){swapCards( "left" )} );
    $("#buttonRight").on( "click", function(){swapCards( "right" )} );
    
});

function showLogInDropdown() {

    let x = document.getElementById( "signInCont" );

    if ( x.className.indexOf( "w3-show" ) == -1 ) {

        x.className += " w3-show";

    } else {

        x.className = x.className.replace( " w3-show", "" );

    }

}

function logIn() {
    
    $("#misMatch").hide();
    // below is from stackoverflow to change serialized form data into nice json
    let search = $("#loginForm").serialize();
    let formData = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

    console.log('formData:', formData);

    $.ajax({
        url: "/login",
        type: "POST",
        data: formData,
        success: function(json) {
            if ( json.loggedIn ) {
                
                $("#signInCont").removeClass( "w3-show" );
                enterSchool();

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

function swapCards( direction ) {

    if ( currentSlide === 0 ) {
     
        if ( direction === "right" ) {

            currentSlide = 1;

            $( "#info-main" ).fadeOut( 1000, function(){$( "#info-talk" ).fadeIn( 2000 )} );
            $( "#buttonLeft" ).show();

        }   
        
    } else if ( currentSlide === 1 ) {
     
        if ( direction === "left" ) {

            currentSlide = 0;

            $( "#info-talk" ).fadeOut( 1000, function(){$( "#info-main" ).fadeIn( 2000 )} );
            $( "#buttonLeft" ).hide();

        }

        if ( direction === "right" ) {

            currentSlide = 2;

            $( "#info-talk" ).fadeOut( 1000, function(){$( "#info-join" ).fadeIn( 2000 )} );
            $( "#buttonRight" ).hide();

        }

    } else if ( currentSlide === 2 ) {
     
        if ( direction === "left" ) {

            currentSlide = 1;

            $( "#info-join" ).fadeOut( 1000, function(){$( "#info-talk" ).fadeIn( 2000 )} );
            $( "#buttonRight" ).show();

        }

    }

}







