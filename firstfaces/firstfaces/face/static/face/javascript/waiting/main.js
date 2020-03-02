$(window).on( 'load', function() {
    showTutorialCompleteDashboard()
    if(waitingVariables.experimental_group != "control"){
        $('#balance_header').text(waitingVariables.balance);
    }
    if ( ! waitingVariables.tutorial_complete ) {

        setTimeout(function(){
            fade_in_tutorial()
        },1000);
        $( '#tutorialNotDoneButton' ).click( function(){

            console.log(' in click tutorial button' )
            bookConversation( enterTutorial=true );
            $( '#tutorialNotDoneInnerContainer' ).hide();
            //window.location.href = prefixURL + "conversation_student/" + waitingVariables.tutorial_conversation_id.toString();

        })

    }

    var cont_height = getContHeight();
    $('.cont_').css("height",cont_height);

    waitingVariables.finishedConversationsNotTutorial = waitingVariables.conversations.filter( function( obj ) {
        
        //console.log('obj:', obj)
        return obj.topic !== 'tutorial' && obj.completed_sentences.length !== 0;

    })

    if ( waitingVariables.finishedConversationsNotTutorial.length === 1 ) {

        waitingVariables.flashPoints = true;
        setTimeout( flashPoints, 1000 );

    }

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


$('#harp_img').click(function(){
    AnimateRotate(360,"#harp_img",500)
});


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

function click_save(id, description=""){
    let fd = new FormData();
    fd.append('element',id);
    fd.append('description',description);
    $.ajax({
        url: "/waiting_click",
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

