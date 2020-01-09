function readyBtns() {
 
    Chart.defaults.global.animation.duration = 2000;

    setUpAudioBtns();

    setUpFinishClassBtns();

    setUpPreviousSentsBtns(conversationVariables.conversation_dict.completed_sentences)

    //// PREVIOUS SENTENCES


    //// FINISH CLASS

    //$('.input-btn').on( 'click', function() {

        //$( '#listenVoiceBtn' ).hide();

    //} );


    //// ERROR INTERACTION BUTTONS

    $('#tryAgainBtn').on( 'click', tryAgain );
    $('#whatsWrongBtn').on( 'click', whatsWrong );
    $('#showCorrectionBtn').on( 'click', showCorrection );
    $('#nextSentenceBtn').on( 'click', nextSentence );


    if ( !conversationVariables.tutorial_complete ) {

        hideTopButtons();

    } else if ( conversationVariables.conversation_dict.completed_sentences.length === 0 ) {

        $( '#prevSentsIconContainer' ).hide();

    }

}

function setUpAudioBtns() {

    aud = document.getElementById('soundClip');
    
    $( '#recordVoiceBtn' ).on( 'click', onRecord );
    $( '#reRecordBtn' ).on( 'click', onRecord );
    $( '#stopRecordVoiceBtn' ).on( 'click', onStopClick );
    $( '#stopRecordBtn' ).on( 'click', onStopClick );

    $('#listenVoiceBtn').on( 'click', function() {

        aud.play();

    });

    $('#talkBtn').on( 'click', sendSentToServer );
    
    $('#listenNextSentenceBtn').on( 'click', tiaSpeakButtonEvent )

}

function setUpFinishClassBtns() {

    $('#finishClassIconContainer').on( 'click', function() {


        if ( conversationVariables.conversation_dict.completed_sentences.length !== 0 ) {

            addOverallData( conversationVariables.conversation_dict.completed_sentences );
            $('#prevSentsIconContainer').fadeIn();
        
        }

        $('#prevSentsContainer').hide();
        showTime();
        //$('#prevSentsIconContainer').fadeOut();
        $('#finishClassIcon').fadeOut();
        $('#timeElapsedCont').fadeIn();
        $('#dataNFinish').show();
        //getPronunciationErrors();
        $('#timeOverlayContainer').fadeIn();
        $('#closeOverlayArea').prop( "disabled", false );

    });

    $('#finishClassBtnPre').on( 'click', function() {

        if ( conversationVariables.ind_of_last_sent === null ) {
        
            endConversationNoSentences();

        } else {

            $('#dataNFinish').hide();
            $('#confirmFinishContainer').fadeIn();

        }

    } );

    $('.rateStar').click( function() {

        let star = $("input[name='rateName']:checked").val()
        conversationVariables.ratings = {

            'stars': parseInt( star ) - 1,

        }

        $( '#ratingContainer' ).fadeOut( function() {

            $('.emojis').css('background-color', '#1fb030');
            $('.emojis').on( 'click', storeFinalEmotion );
            $( '#feelNowContainer' ).fadeIn();

        } );

    } );

    $( '#finishClassBtn' ).click( function() {

        conversationVariables.ratings.comment = $('#commentBoxInput').val();
        $('#commentBoxInput').val(' ');
        endConversation();

    });

}



