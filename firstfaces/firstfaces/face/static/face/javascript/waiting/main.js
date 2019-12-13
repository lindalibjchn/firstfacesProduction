$(window).on( 'load', function() {

    addAvailablesToTimetable( waitingVariables.availables )
    addAllScores( waitingVariables.conversations )
    if ( waitingVariables.conversations.length !== 0 ) {
        
        showConversationSentences( 0 );
        //setUpPreviousSentsBtns( waitingVariables.conversations[0].completed_sentences )
        //addData( 'sentences', waitingVariables.conversations[0].completed_sentences )
    
    }
    $('#pronunciationClearOverlayArea').click( hidePronunciationDataContainer );
    if ( waitingVariables.currently_in_class ) {

        waitingVariables.conversation_id = waitingVariables.conversations[ 0 ].id

    }

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






