function initInputReady( from ) {
    conversationVariables.stage2 = false;
    conversationVariables.stage3 = false;
    // tia's eyelids werren't closing properly this below is a failsafe to reset them.
    movementController( movementObject.abs.blank, 1, 1 );
    
    //$('#textInputContainer').show();
    //hideTextStuff();
    //hideVolumeBar();
    //$('#textInput').val( boxVal );
    //$('#textInput').focus();
    //$('#recordBtnsCont').show();
    
    // removes speech bubble after user has a few second to read it
    $('.record-btn').prop( "disabled", false );

    //setLastSent();
    //$('#controllerContainer').fadeIn( 1000 );

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

    //playback buttons disabled until recording done
    $('#recordBtnsCont').fadeIn(1000)
    //hide correctTranscript
    $('#correctTranscript').hide();
    //hide back button
    $('#backErrorSelection').hide();
    // hide forward button
    $('#forwardErrorSelection').hide();
    
    $('#backCorrection').hide();
    $('#submitCorrectedErrors').hide();
    
    addPreviousSentences( conversationVariables.conversation_dict, 0 );

    //openOverlay();

    //  for development
    //$('#talkBtn').prop( "disabled", false).show();
    //showOptionBtns();
    //$('#whatsWrongBtn').hide()
    //$('#showCorrectionBtn').css('display', 'flex')

}

function makeStringSentFromArray( s ) {

    let sentString = "";
    console.log('s:', s)
    s.forEach( function( wordArray ) {

        sentString += wordArray[ 0 ] + " ";

    });

    return sentString.trim();

}

//function setLastSent() {

   //if ( Object.keys(conversationVariables.sentences).length > 0 ) {
    
        //conversationVariables.last_sent = conversationVariables.sentences[Object.keys(conversationVariables.sentences).length - 1];

    //} else {

        //conversationVariables.last_sent = null;

    //}

//}













