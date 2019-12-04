function showOptionBtns() {

    recTimes.showOptionBtns = Date.now() / 1000;
    $('.option-btn').prop( "disabled", false);
    //console.log('in showOptionBtns');

    // incase not reset from previous time
    $('#showCorrectionBtn').hide();
    $('#whatsWrongBtn').css('display', 'flex')
    $('#tryAgainBtn').show();
    $('#nextSentenceBtn').show();

    $('#optionBtns').fadeIn( 1000 )

}

function tryAgain() {

    recTimes.clickOptionBtn = Date.now() / 1000;
    //let sent = conversationVariables.sentences[ conversationVariables.ind_of_conversation_dict.completed_sentences[ 0 ] ].sentence;

    //conversationVariables.tiaLookingAtStudent = false;
    returnToLaptop('try again');

    //$('#prevSents').fadeTo( 500, 1 );
    $('#optionBtns').fadeOut( 500 )
    $('#recordBtnsCont').fadeIn( 1000 )

    $.ajax({
        url: "/store_try_again",
        type: "GET",
        data: {'sentId': conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id},
        success: function(json) {
        },
        error: function() {
          //console.log("that's wrong");
        },
        
    });

}

function whatsWrong() {

    //recTimes.clickOptionBtn = Date.now() / 1000;

    $.ajax({
        url: "/store_whats_wrong",
        type: "GET",
        data: {'sentId': conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id},
        success: function(json) {
        },
        error: function() {
          //console.log("that's wrong");
        },
        
    });
    // dont want user to click more buttons
    $('.option-btn').prop( "disabled", true);
    $('#optionBtns').fadeOut( 500 )

    conversationVariables.tapKeyForErrors = true;
    createSingleExpression( expressionObject.rel.confused, 0.5 )
        
    tiaLookAtLaptopAndType();

    checkForCorrections();

}

function showWrong() {

    $('#textInputContainer').fadeIn();
    $('#submittedNCorrectedSentenceCont').show()

    prepareToStopTyping();

}


function showCorrection() {

    //recTimes.clickShowCorrectionBtn = Date.now() / 1000;
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
          //console.log("that's wrong");
        },
        
    });
        
    conversationVariables.tapKeyForCorrection = true;
    tiaLookAtLaptopAndType();

    setTimeout( function() {

        prepareToStopTyping();

    }, 2000 );

}

function nextSentence() {

    recTimes.clickNextSentenceBtn = Date.now() / 1000;
    $('#optionBtns').fadeOut( 500 );
    $('.option-btn').prop( "disabled", true);
    $('#sentenceShowHolder').hide;

    returnToLaptop();

    let sentId = conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id
    $.ajax({
        url: "/store_next_sentence",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
        },
        error: function() {
          //console.log("that's wrong");
        },
        
    });

    $('#submittedNCorrectedSentenceCont').fadeOut( 500, clearSubmittedNCorrectedSentences )

}

function clearSubmittedNCorrectedSentences() {

    $('#submittedSentence').empty();
    $( '#correctedSentence' ).empty();

}

function returnToLaptop( from ) {

    //recTimes.returnToLaptop = Date.now() / 1000;
    //console.log( 'in return to laptop');
    movementController( movementObject.abs.blank, 0.5, 1 );
    //addPreviousSentences( conversationVariables.conversation_dict, 0 );
    initInputReady( from )

    expressionController( expressionObject.abs.neutral, tiaTimings.changeExpressionDuration );

    //sendTimesToServer();

}


