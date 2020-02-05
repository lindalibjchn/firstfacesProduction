$(window).on( 'load', function() {

    if ( waitingVariables.tutorial_complete ) {

        addAvailablesToTimetable( waitingVariables.availables )

        if ( waitingVariables.conversations.length !== 0 ) {
        
            if ( !(waitingVariables.conversations.length === 1 && waitingVariables.currently_in_class ) ) { 

                //$( '#prevSentsWaitingContainer' ).css( 'display', 'flex' );
                //addAllScores( waitingVariables.conversations )
                //showConversationSentences( 0 );
                //setUpPreviousSentsBtns( waitingVariables.conversations[0].completed_sentences )
                //addData( 'sentences', waitingVariables.conversations[0].completed_sentences )
        
            }

        }
        $('#pronunciationClearOverlayArea').click( hidePronunciationDataContainer );
        if ( waitingVariables.currently_in_class ) {

            waitingVariables.conversation_id = waitingVariables.conversations[ 0 ].id

        }

    } else {

        $( '#tutorialNotDoneButton' ).click( function(){

            console.log(' in click tutorial button' )
            bookConversation( enterTutorial=true );
            //window.location.href = prefixURL + "conversation_student/" + waitingVariables.tutorial_conversation_id.toString();

        })

    }

});

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






