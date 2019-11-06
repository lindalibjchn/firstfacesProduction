function readyBtns() {
 
    Chart.defaults.global.animation.duration = 2000;

    setUpAudioBtns();

    setUpFinishClassBtns();

    setUpPreviousSentsBtns()

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
    
    $('#listenNextSentenceBtn').on( 'click', listenToNextSentence )

}

function setUpFinishClassBtns() {

    $('#finishClassIconContainer').on( 'click', function() {

        addOverallData( conversationVariables.conversation_dict.completed_sentences );
        $('#prevSentsIconContainer').fadeIn();
        $('#prevSentsContainer').hide();
        showTime();
        //$('#prevSentsIconContainer').fadeOut();
        $('#finishClassIcon').fadeOut();
        $('#timeElapsedCont').fadeIn();
        $('#dataNFinish').show();
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

function setUpPreviousSentsBtns() {

    $('#prevSentsIconContainer').on( 'click', function() {

        closeTimeOverlayCont();
        //$('#prevSentsContainer0').fadeIn();
        $('#prevSentsContainer').fadeIn();
        $('#prevSentsIconContainer').hide();
        //updateScroll( document.getElementById('prevSentsInnerContainer0') );
        addData( 'grammar', 'article');

    });

    $('#sentencesTitleContainer').on( 'click', function() {

        addData( 'sentences' );

    } );

    $('#grammarTitleContainer').on( 'click', function() {

        addData( 'grammar', 'article');

    } );

    //$('#pronunciationTitleContainer').on( 'click', function() {

        //addData( 'pronunciation', 'phrase');

    //} );

    $('#articlesTabContainer').on( 'click', function() {

        addData( 'grammar', 'article');

    } );

    //$('#verbsTabContainer').on( 'click', function() {

        //addData( 'grammar', 'verb');

    //} );

    //$('#prepositionsTabContainer').on( 'click', function() {

        //addData( 'grammar', 'preposition');

    //} );

    //$('#phrasesTabContainer').on( 'click', function() {

        //addData( 'pronunciation', 'phrase');

    //} );

    //$('#wordsTabContainer').on( 'click', function() {

        //addData( 'pronunciation', 'word');

    //} );

    //$('#phonemesTabContainer').on( 'click', function() {

        //addData( 'pronunciation', 'phoneme');

    //} );

}




