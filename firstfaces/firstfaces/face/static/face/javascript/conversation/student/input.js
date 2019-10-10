function initInputReady( from ) {
    conversationVariables.stage2 = false;
    conversationVariables.stage3 = false;
    //$('#textInputContainer').show();
    //hideTextStuff();
    //hideVolumeBar();
    //$('#textInput').val( boxVal );
    //$('#textInput').focus();
    //$('#recordBtnsCont').show();
    
    // removes speech bubble after user has a few second to read it
    if ( conversationVariables.tutorial === false ) {

        $('.record-btn').prop( "disabled", false );
    
    }

    //setLastSent();
    //$('#controllerContainer').fadeIn( 1000 );

    if ( from === 'try again' ) {

        $( '#textInputContainer' ).fadeIn();
        $( '#sentenceShowHolder').fadeIn();
        $('.play-btn').hide();
        reset_text(conversationVariables.preSent)

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
    
    //openOverlay();

    //  for development
    //$('#talkBtn').prop( "disabled", false).show();
    //showOptionBtns();
    //$('#whatsWrongBtn').hide()
    //$('#showCorrectionBtn').css('display', 'flex')

    //if ( conversationVariables.tutorial === false ) {

     //$('#textInput').bind('input propertychange', function() {

            //$('#playRobot').show();
            //$('#talkBtn').prop( "disabled", false );

        //});

    //}

}


//function setLastSent() {

   //if ( Object.keys(conversationVariables.sentences).length > 0 ) {
    
        //conversationVariables.last_sent = conversationVariables.sentences[Object.keys(conversationVariables.sentences).length - 1];

    //} else {

        //conversationVariables.last_sent = null;

    //}

//}













