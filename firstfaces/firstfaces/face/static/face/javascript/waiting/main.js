$(window).on( 'load', function() {

    addAvailablesToTimetable( waitingVariables.availables )
    addAllScores( waitingVariables.conversations )
    showConversationSentences( 0 );
    $('#pronunciationClearOverlayArea').click( hidePronunciationDataContainer );

});

function enterConversation() {

    window.location.href = "/conversation_student/" + waitingVariables.conversation_id.toString();

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






