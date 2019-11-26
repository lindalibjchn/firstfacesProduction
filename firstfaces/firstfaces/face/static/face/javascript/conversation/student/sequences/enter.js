///MAIN ENTER FUNCTION WHICH CALLS ALL OTHERS

function initTiaEnterGreeting() {

    conversationVariables.entranceSequence = true;
    resetTextBoxNInputButtons();
    
    setTimeout( function() {
        
        conversationVariables.tiaTyping = false;
        
        setTimeout( function() {
        
            tiaLookUp();

        }, 750 );

    }, 750 );

}

function resetTextBoxNInputButtons() {

    $( '#sentenceShowHolder').hide();
    $('.play-btn').prop( "disabled", true).hide();
    $('#correctTranscript').hide();
    //hide back button
    $('#backErrorSelection').hide();
    // hide forward button
    $('#forwardErrorSelection').hide();
    
    $('#backCorrection').hide();
    $('#submitCorrectedErrors').hide();

}

function tiaLookUp() {

    createSingleExpression( expressionObject.rel.happy, 0.75 );
    movementController( movementObject.abs.blank, 0.5, 1.2 );
    
    setTimeout( function() {
        
        expressionController( expressionObject.calculated, 0.8, tiaSpeakGreetings );

    }, 1000 )

}

function tiaSpeakGreetings() {

    setTimeout( function() {

        if ( conversationVariables.first_conversation ) {

            tiaSpeak( 'welcome_to_your_first_class_at_ERLE', cont=false, askAboutEmotion );
        
        } else {
            
            tiaSpeak( "it's_great_to_see_you_again", cont=false, askAboutEmotion );
            
        }

    }, 500 )

}

function askAboutEmotion() {

    tiaSpeak( 'how_are_you_feeling_today', cont=false, showInitEmotionQuestions );

}
        

function showInitEmotionQuestions() {

    console.log('in showInitEmotionQuestions');
    $('#emotionQuestionsCont').fadeIn( tiaTimings.speechBubbleFadeInDuration );

    // allow emotions to be clickable
    $('.emojis').on( 'click', storeEmotion );

}

function goToAskTopic( emotion ) {

    console.log(' go ask topic ' );
    // remove speech bubble to ask which topic
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    var calculatedExpressions;

    if ( emotion === "4" ) {

        createSingleExpression( expressionObject.rel.happy, 1 );

    } else if ( emotion === "3" ) {

        createSingleExpression( expressionObject.rel.content, 0.75 );
    
    } else if ( emotion === "2" ) {

        createSingleExpression( expressionObject.rel.blank, 1 );
    
    } else if ( emotion === "1" ) {

        createSingleExpression( expressionObject.rel.sad, 0.5 );
    
    } else if ( emotion === "0" ) {

        createSingleExpression( expressionObject.rel.fear, 0.5 );
    
    }

    expressionController( expressionObject.calculated, 0.7, function() {

        initNod( 0.4, 0.3, function() {
            
            talkAbout( emotion );
                
        } );

    } );

}


//function empathise( emotion_ ) {


    //// remove emotion questions container, making sure to unbind the click event to avoid multiple clicks
    //if ( emotion_ > 2 ) {

        //tiaSpeak( "thatsGreat", cont=false, talkAbout );

    //} else if ( emotion_ == 2 ) {

        //talkAbout();

    //} else {

        //tiaSpeak( "sorryToHear", cont=false, talkAbout );

    //}

//}

function talkAbout() {

    tiaSpeak( "what_would_you_like_to_talk_about_today?", cont=false, showTopicChoices );

}

function showTopicChoices() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#myChoice').on( 'click', showPreChoiceTextInput );
    $('#myEmotion').on( 'click', function() { 
        
        storeTopic( 'emotion' ); 
        
        $('#myEmotion').css( {
        
            'background-color': 'white',
            'color': '#102858',
            'border': '2px solid #102858',
        
        } );

    } );

    $('#topicChoicesCont').fadeIn( tiaTimings.speechBubbleFadeInDuration );

}

function showPreChoiceTextInput() {

    $('#myChoice').css( {
    
        'background-color': 'white',
        'color': '#102858',
        'border': '2px solid #102858',
    
    } )

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    $('#topicChoicesCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration, function() {
        
        tiaSpeak( "you_must_type_your_choice_in_the_box_below", cont=false, showChoiceTextInput );
    
    } );

}

function showChoiceTextInput() {

    $('#sentenceShowHolder').hide();
    $('#textInputContainer').show();
    $('#textInputBoxContCont').show();
    //$('#textInputContainer').fadeIn( tiaTimings.speechBubbleFadeInDuration );
    $('#textInput').focus();

    $('#submitTopicBtnCont').fadeIn( tiaTimings.speechBubbleFadeInDuration );
    $('#submitOwnTopicBtn').on( 'click', getOwnTopicFromTextbox );
    
}

function getOwnTopicFromTextbox() {

    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    let ownTopic = document.getElementById( "textInput" ).value
    
    $('#textInputContainer').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    $('#textInput').value = '';
    $('#textInputBoxInnerCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    $('#submitTopicBtnCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration )

    if ( ownTopic === '' ) {

        showPreChoiceTextInput();

    } else {

        storeTopic( ownTopic );

    }

}

function afterStoreTopic() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        initNod( 0.4, 0.3, beginTalking );

    }, tiaTimings.speechBubbleFadeOutDuration );

}

function beginTalking() {
        
    tiaSpeak( "begin_when_you_are_ready", cont=false, finalSpeak );

    setTimeout( function() {
    
        movementController( movementObject.abs.armBegin, 1, 1 );
    
    }, 1000 );

}

function finalSpeak() {

    setTimeout( function() {

        expressionController( expressionObject.abs.neutral, 1 );
        talkObject.learning = true;
        //movementController( movementObject.abs.arm, 1, 1 );
        setTimeout(initInputReady, 1000)

    }, tiaTimings.speechBubbleFadeOutDuration );

}


