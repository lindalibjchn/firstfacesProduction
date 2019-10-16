function showOptionBtns() {

    recTimes.showOptionBtns = Date.now() / 1000;
    $('.option-btn').prop( "disabled", false);
    //console.log('in showOptionBtns');

    // incase not reset from previous time
    $('#showCorrectionBtn').hide();
    $('#whatsWrongBtnBtn').css('display', 'flex')
    $('#tryAgainBtn').show();
    $('#nextSentenceBtn').show();

    $('#optionBtns').fadeIn( 1000 )

}

function tryAgain() {

    recTimes.clickOptionBtn = Date.now() / 1000;
    let sent = conversationVariables.sentences[ conversationVariables.ind_of_conversation_dict.completed_sentences[ 0 ] ].sentence;

    conversationVariables.tiaLookingAtStudent = false;
    returnToLaptop('try again');

    $('#prevSents').fadeTo( 500, 1 );
    $('#optionBtns').fadeOut( 500 )
    $('#recordBtnsCont').fadeIn( 1000 )

    let sentId = conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id
    $.ajax({
        url: "/store_try_again",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

}

function whatsWrong() {

    recTimes.clickOptionBtn = Date.now() / 1000;
    let sentId = conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id

    $.ajax({
        url: "/store_whats_wrong",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });
    // dont want user to click more buttons
    $('.option-btn').prop( "disabled", true);
    $('#optionBtns').fadeOut( 500 )
    
    //whenAllMovFinished( function() {

        movementController( movementObject.abs.laptop, '0.5', '1.5' );

    //});

    setTimeout( function() {
    
        backNReadALine();

    }, 3500 );

}

function showCorrection() {

    recTimes.clickShowCorrectionBtn = Date.now() / 1000;
    $('#showCorrectionBtn').prop( "disabled", true).fadeOut( 500 );
    $('#tryAgainBtn').prop( "disabled", true).fadeOut( 500 );
    $('#nextSentenceBtn').prop( "disabled", true).fadeOut( 500 );

    let sentId = conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id
    $.ajax({
        url: "/store_show_correction",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
            conversationVariables.conversation_dict.completed_sentences[ 0 ].show_correction = true;
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });
    setTimeout( function() {
        
        //initArmIndicate('right', 1, 'high', '0.75');
        conversationVariables.tapKeyForCorrection = true;
        tapKeyFull();
    
        setTimeout( function() {
        
            //showWrongSentence();

            setTimeout( function() {

                initArmIndicate('right', 0, 'high', '1.5');
        
            }, tiaTimings.armIndicate * 1000 )

        }, tiaTimings.armIndicate * 1000 )

    }, tiaTimings.armIndicate * 1000 );

}

function nextSentence() {

    recTimes.clickNextSentenceBtn = Date.now() / 1000;
    $('#optionBtns').fadeOut( 500 );
    $('.option-btn').prop( "disabled", true);
    $('#sentenceShowHolder').hide;

    if ( conversationVariables.lastSentToBeSent ) {

        conversationVariables.classOver = true;

    }

    conversationVariables.tiaLookingAtStudent = false;
    returnToLaptop();

    let sentId = conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id
    $.ajax({
        url: "/store_next_sentence",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

    $('#submittedNCorrectedSentenceCont').fadeOut( 500 )

}

