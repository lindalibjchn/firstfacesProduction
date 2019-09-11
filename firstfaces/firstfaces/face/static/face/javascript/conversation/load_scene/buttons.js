function readyBtns() {
 
    aud = document.getElementById('soundClip');
    
    $( '#recordVoiceBtn' ).on( 'click', onRecord );
    $( '#reRecordBtn' ).on( 'click', onRecord );
    $( '#stopRecordVoiceBtn' ).on( 'click', onStopClick );
    $( '#stopRecordBtn' ).on( 'click', onStopClick );
    
    //stop = document.getElementById( 'stopRecordVoiceBtn' );

    //recordModal = document.getElementById('reRecordBtn');
    //stopModal = document.getElementById('stopRecordBtn');
    
    //stop.onclick = onStopClick;
    //stopModal.onclick = onStopClick;    			

    //record.onclick = onRecord;
    //recordModal.onclick = onRecord;		


    //// LISTEN AND TALK

    $('#listenVoiceBtn').on( 'click', function() {

        aud.play();

    });

    $('#talkBtn').on( 'click', sendSentToServer );
    
    //// LISTEN TO TIAS NEXT SENTENCE

    $('#listenNextSentenceBtn').on( 'click', listenToNextSentence )

    //// PREVIOUS SENTENCES

    $('#prevSentsIconContainer').on( 'click', function() {

        $('#prevSentsContainer').fadeIn();
        $('#prevSentsIconContainer').hide();

    });


    //// FINISH CLASS

    $('#finishClassIconContainer').on( 'click', function() {

        showTime();
        $('#prevSentsIconContainer').hide();
        $('#finishClassIconContainer').hide();
        $('#dataNFinish').show();
        $('#timeOverlayContainer').fadeIn();

    });

    $('#finishClassBtnPre').on( 'click', function() {

        $('#dataNFinish').hide();
        $('#confirmFinish').fadeIn();

    } );

    $('#finishClassBtn').on( 'click', function() {

        $('#confirmFinish').hide();

        if ( conversationVariables.ind_of_last_sent === null ) {
        
            endClassNoSentences()

        } else {

            endClass();

        }
            
    });

    $('#cancelFinishClassBtn').on( 'click', function() {

        $('#confirmFinish').hide();
        $('#dataNFinish').show();
        $('#finishClassBtnPre').show();
    
    } );

    //$('.input-btn').on( 'click', function() {

        //$( '#listenVoiceBtn' ).hide();

    //} );


    //// ERROR INTERACTION BUTTONS

    $('#tryAgainBtn').on( 'click', tryAgain );
    $('#whatsWrongBtn').on( 'click', whatsWrong );
    $('#showCorrectionBtn').on( 'click', showCorrection );
    $('#nextSentenceBtn').on( 'click', nextSentence );

}
