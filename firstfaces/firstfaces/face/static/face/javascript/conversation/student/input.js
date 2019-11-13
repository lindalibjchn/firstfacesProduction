function initInputReady( from ) {
    conversationVariables.stage2 = false;
    conversationVariables.stage3 = false;
    // tia's eyelids werren't closing properly this below is a failsafe to reset them.
    movementController( movementObject.abs.blank, 1, 1 );
    hideOverlayStuff();   
    buttonsMicrophoneOnly();
    
    if ( from === 'try again' ) {

        $( '#textInputContainer' ).fadeIn();
        $( '#sentenceShowHolder').fadeIn();
        $('.play-btn').hide();
        let sentString = makeStringSentFromArray(conversationVariables.conversation_dict.completed_sentences[0].sentence);
        reset_text( sentString );

    } else {

        $( '#sentenceShowHolder').hide();
        $('.play-btn').prop( "disabled", true).hide();
    
    }

    addPreviousSentences( conversationVariables.conversation_dict, 0 );

}

function hideOverlayStuff() {

    //playback buttons disabled until recording done
    //$('#recordBtnsCont').fadeIn(1000)
    //hide correctTranscript
    $('#correctTranscript').hide();
    //hide back button
    $('#backErrorSelection').hide();
    // hide forward button
    $('#forwardErrorSelection').hide();
    
    $('#backCorrection').hide();
    $('#submitCorrectedErrors').hide();

}
 
function makeStringSentFromArray( s ) {

    let sentString = "";
    console.log('s:', s)
    s.forEach( function( wordArray ) {

        sentString += wordArray[ 0 ] + " ";

    });

    return sentString.trim();

}














