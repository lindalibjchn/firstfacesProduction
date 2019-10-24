///MAIN ENTER FUNCTION WHICH CALLS ALL OTHERS

function initTiaEnterGreeting() {

    conversationVariables.entranceSequence = true;
    
    setTimeout( function() {
        
        conversationVariables.tiaTyping = false;
        
        setTimeout( function() {
        
            tiaLookUp();

        }, 750 );

    }, 750 );

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

            tiaSpeak( 'greatToSee', cont=false, askAboutEmotion );
        
        } else {
            
            tiaSpeak( 'welcomeToFirst', cont=false, askAboutEmotion );
            
        }

    }, 500 )

}

function askAboutEmotion() {

    tiaSpeak( 'howAreYou', cont=false, showInitEmotionQuestions );

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

    if ( emotion === "happy" ) {

        calculatedExpressions = createCalculatedExpression([expressionObject.rel.happy, expressionObject.rel.content], 0.95, 0.6, 0.2)
        //calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 0 ] );
        //calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 1 ] );
        
        //expressionController( calculatedExpression, tiaTimings.changeExpression );

        //synthesisObject.pitch = 1;
        //synthesisObject.speaking_rate = 0.95;

        //if ( conversationVariables['prev_topic'] !== null && conversationVariables.first_full_class !== true ) {

            //speechBubbleObject.sentence = " That's great! Last time you talked about '" + conversationVariables['prev_topic'] + "' and your score was " + conversationVariables.prev_score.toString() + ". Would you like to continue with the same topic, or choose something different?";

        //} else {

            //speechBubbleObject.sentence = " That's great! What would you like to talk about today?";
    
        //}

       //setTimeout( function() {

            //initNod( 0.4, '0.5' )

            //setTimeout( askTopic, 2500 );

        //}, tiaTimings.changeExpression );

    } else if ( emotion === "ok" ) {

        calculatedExpressions = createCalculatedExpression([expressionObject.rel.content, expressionObject.rel.happy], 0.98, 0.5, 0);
        //calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[0] );
        //calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[1] );
        //expressionController( calculatedExpression, tiaTimings.changeExpression );
    
    } else if ( emotion === "sad" ) {

        calculatedExpressions = createCalculatedExpression([expressionObject.rel.sad, expressionObject.rel.fear], 0.98, 0.5, 0);
        //calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[0] );
        //calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[1] );
        //expressionController( calculatedExpression, tiaTimings.changeExpression );
    
        //synthesisObject.pitch = -2;
        //synthesisObject.speaking_rate = 0.8;

        //if ( conversationVariables['prev_topic'] !== null && conversationVariables.first_full_class !== true ) {

            //speechBubbleObject.sentence = " I'm sorry to hear that! Last time you talked about '" + conversationVariables['prev_topic'] + "' and your score was " + conversationVariables.prev_score.toString() + ". Would you like to continue with the same topic, or choose something different?";

        //} else {

            //speechBubbleObject.sentence = " I'm sorry to hear that! What would you like to talk about today?";
    
        //}
    }

    calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 0 ] );
    calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 1 ] );
    expressionController( calculatedExpression, tiaTimings.changeExpression );

    setTimeout( function() {

        initNod( 0.4, '0.5' )

        setTimeout( askTopic, 2000 );

    }, tiaTimings.changeExpression * 1000 );

    //synthesisObject.text = speechBubbleObject.sentence
    //sendTTS( synthesisObject.text, true );

    

}


function askTopic() {

    // remove emotion questions container, making sure to unbind the click event to avoid multiple clicks
    expressionController( calculatedTalkExpression, '1');
    //setTimeout( function() {

        //tiaSpeak( speechBubbleObject.sentence, needSendTTS=false, speakTopic );
        
    //}, 1500 );

    synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "what_would_you_like_to_talk_about_today.wav";
    
    setTimeout( function() {

        tiaSpeak( "What would you like to talk about today?", speakTopic )

    }, 1200 );

}

function speakTopic() {

    //if ( conversationVariables['prev_topic'] !== null && conversationVariables.first_full_class !== true ) {

        //showContinueOrNew();

    //} else {

        showTopicChoices();

    //}

}

//function showContinueOrNew() {

    //// allow topics to be clickable and follow logic depending on their needs
    //$('#continueBtn').on( 'click', function() { 
        
        //$('#continueNewChoices').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
        //storeTopic( 'same' ) 
    
    //} );

    //$('#newBtn').on( 'click', function() { 
    
        //$('#continueNewChoices').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
        //setTimeout( speakTopicChoices, tiaTimings.speechBubbleFadeInDuration * 2 );

    //} );

    //$('#continueNewChoices').fadeIn( tiaTimings.speechBubbleFadeInDuration );

//}

function showTopicChoices() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#myChoice').on( 'click', showPreChoiceTextInput );
    $('#myEmotion').on( 'click', function() { storeTopic( 'emotion' ) } );
    //$('#todaysNewsArticle').on( 'click', askIfReadNews );

    $('#topicChoicesCont').fadeIn( tiaTimings.speechBubbleFadeInDuration );

}

function showPreChoiceTextInput() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //speechBubbleObject.sentence = "Please type your topic below";
    //synthesisObject.text = speechBubbleObject.sentence

    $('#topicChoicesCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );

    synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "type_your_topic_in_the_box_below.wav";
    setTimeout( function() {
        
        tiaSpeak( "Type your topic in the box below", showChoiceTextInput)
    
    }, 500);

}

function showChoiceTextInput() {

    $('#textInputBoxInnerCont').show();
    $('#textInputBox').show();
    $('#textInputContainer').fadeIn( tiaTimings.speechBubbleFadeInDuration );
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

        dealWithEmptyTopic()

    } else {

        storeTopic( ownTopic );

    }

}

function dealWithEmptyTopic() {

    //speechBubbleObject.sentence = "You must type a topic in the box below";
    //synthesisObject.text = speechBubbleObject.sentence

    synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "you_must_type_your_choice_of_topic_in_the_box_below.wav";
        
    tiaSpeak( "You must type your choice of topic in the box below", showChoiceTextInput)
    

    //setTimeout( function() {tiaSpeak( speechBubbleObject.sentence, needSendTTS=true, showChoiceTextInput)}, 1500);

}

//function askIfReadNews() {
    
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //$('#topicChoicesCont').fadeOut( tiaTimings.speechBubbleFadeInDuration );

    //setTimeout( function() {

        //tiaSpeak( "Did you read today's article? It's title is: '" + conversationVariables.headline + "'", needSendTTS=true, function() { 
            
            //showDoubleBtn( "Yes, I read it", "no, I didn't read it", 
                    
                //function(){ 
                    
                    //removeDoubleBtn();
                    //storeTopic( 'news: ' + conversationVariables.headline ) 
                
                //},

                //function(){ tellNewsTitle() } ) 
        
        //} );

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 );

//}

//function tellNewsTitle() {

    //removeDoubleBtn();
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    //setTimeout( function() {

        //tiaSpeak( "You need to read the article before coming to class. In the waiting area, if you click the laptop, you can see today's article. Click 'finish class' on the top right to go back to the waiting area. Read the article and then start the class again.", needSendTTS=true )
            
    //}, tiaTimings.speechBubbleFadeOutDuration * 2 );

//}


function beginTalking() {

    synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "ok_please_begin_when_you_are_ready.wav";
        
    tiaSpeak( "Ok, please begin when you are ready", finalSpeak)

    setTimeout( function() {
    
        initArmIndicate('right', 1.2, 'low', 0.75);
    
    }, 1000 );

}

function finalSpeak() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        expressionController( expressionObject.abs.neutral, 0.75 );
        talkObject.learning = true;
        initArmIndicate('right', 0, 'low', 0.75);
        setTimeout(initInputReady, 1000)

    }, tiaTimings.speechBubbleFadeOutDuration );

}






