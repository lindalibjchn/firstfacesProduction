$(window).on( 'load', function() {
    showTutorialCompleteDashboard()

    if ( ! waitingVariables.tutorial_complete ) {

        setTimeout(function(){
            fade_in_tutorial()
        },1000);
        $( '#tutorialNotDoneButton' ).click( function(){

            console.log(' in click tutorial button' )
            bookConversation( enterTutorial=true );
            //window.location.href = prefixURL + "conversation_student/" + waitingVariables.tutorial_conversation_id.toString();

        })

    }

    var cont_height = getContHeight();
    $('.cont_').css("height",cont_height);



});

function showTutorialCompleteDashboard() {

    addAvailablesToTimetable( waitingVariables.availables, first=true )
    if ( waitingVariables.currently_in_class ) {

        waitingVariables.conversation_id = waitingVariables.conversations[ 0 ].id;
        $('.enter-button-text').text('continue');

    }

}

function enterConversation() {

    window.location.href = prefixURL + "conversation_student/" + waitingVariables.conversation_id.toString();

}

var prefixURL;
function definePrefixURL() {

    if ( waitingVariables.in_development ) {

        prefixURL = "http://127.0.0.1:8000/"

    } else {

        prefixURL = "https://erle.ucd.ie/"

    }

}
definePrefixURL();

const mediaLocation = "media/";




function getContHeight(){
    return $('#footer').offset()['top'] - parseInt($('#navbar').css('height'));
}

function fade_in_tutorial(){
    $("#tutorialNotDoneContainer").css("display","flex").show();
    $('#tutorialNotDoneBackground').animate({opacity: 0.8}, 1000);
    $('#tutorialNotDoneInnerContainer').animate({opacity: 1}, 1200);
    setTimeout(function(){
        $('#popup-btn').fadeIn(300);
    },900);

}