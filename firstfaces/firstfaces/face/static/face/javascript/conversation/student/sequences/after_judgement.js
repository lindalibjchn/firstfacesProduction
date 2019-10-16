function runAfterJudgement() {

    //recTimes.runAfterJudgement =  Date.now() / 1000;
    
    //if ( conversationVariables.last_sent.judgement === "C" ) {

        //if ( conversationVariables.last_sent.nod !== null ) {
                
            //nodOrShakeHead()
            //setTimeout( function(){
            
                //expressionController( expressionObject.half, tiaTimings.toTalkExpressionDuration );
                
                //setTimeout( returnToLaptop, tiaTimings.toTalkExpressionDuration );
            
            //}, nodShakeDur );

        //} else {

            //setTimeout( function() {

                //setTimeout( function(){
                
                    //expressionController( expressionObject.half, tiaTimings.toTalkExpressionDuration );
                    
                    //setTimeout( returnToLaptop, tiaTimings.toTalkExpressionDuration );
                
                //}, nodShakeDur );

            //}, tiaTimings.delayBeforeReturnToLaptop );

        //}
        

    if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "I" ) {

    } else {

        //if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].nod !== null ) {

            //nodOrShakeHead()
            //setTimeout( prePrepareForPromptSpeech, nodShakeDur );

        //} else {

        runPrompt( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement );

    }
    
}

//function getNodSpeedInString() {

    //let nodSpeed = conversationVariables.conversation_dict.completed_sentences[ 0 ]['nodSpeed']
    
    //if ( nodSpeed <= 0.33 ) {

        //return '0.75'

    //} else if ( nodSpeed > 0.33 && nodSpeed <= 0.66 ) {

        //return '0.5'

    //} else {

        //return '0.25'

    //}

//}

//function returnFromThinking() {

    //expressionController( calculatedExpression, tiaTimings.changeExpressionDuration );

    //setTimeout( function() {

        //movementController( movementObject.abs.blank, tiaTimings.returnFromThinkingDuration / 2, tiaTimings.returnFromThinkingDuration );

        //setTimeout( runAfterJudgement, tiaTimings.returnFromThinkingDuration * 750 ); // want nod to happen before movement back ends
    
    //}, tiaTimings.changeExpressionDuration );

//} 

function runIncorrect() {

    movementController( movementObject.abs.confused, tiaTimings.movementToConfusedDuration / 2, tiaTimings.movementToConfusedDuration, function() {
        
        expressionController( expressionObject.abs.confused, tiaTimings.changeExpressionDuration, showOptionBtns );

    })

}

function runPrompt( judg ) {

    addPreviousSentences( conversationVariables.conversation_dict, 0 );

    recTimes.prePrepareForPromptSpeech =  Date.now() / 1000;
    // return to talking pos
    console.log('in prePrepareForPromptSpeech');
    
    movementController( movementObject.abs.blank, tiaTimings.returnFromThinkingDuration / 2, tiaTimings.returnFromThinkingDuration, function() {
       
        if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].nod_shake !== null ) {
    
            nodOrShakeHead();

        } else {

            tiaSpeak( 'prompt', cont=false );

        }

    });

    expressionController( expressionObject.calculated, tiaTimings.returnFromThinkingDuration / 2 );

}

function nodOrShakeHead() {
    
    //recTimes.nodOrShakeHead =  Date.now() / 1000;
    
    let X = conversationVariables.conversation_dict.completed_sentences[ 0 ].nod_shake[ 0 ];
    let Y = conversationVariables.conversation_dict.completed_sentences[ 0 ].nod_shake[ 1 ];
    if ( X > 0 ) {

        initNod( -Y, 1 - X, function() { tiaSpeak( 'prompt', cont=false ) });

    } else {

        initShake( -Y, 1 + X, function() { tiaSpeak( 'prompt', cont=false ) } );

    }

}

//function displaySpeechBubblePrompt() {

    //recTimes.displaySpeechBubblePrompt = Date.now() / 1000;
    ////want to fade in the text a bit later
    ////$('#speakingWords').hide()
    ////$('#speechBubbleCont').fadeIn( tiaTimings.speechBubbleFadeInDuration );

    
    ////if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "P" ) {
            
        ////$('#speakingWordsInside').text( conversationVariables.conversation_dict.completed_sentences[ 0 ].prompt );

    ////} else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "B" ) {

        ////let text = createBetterTextForPromptBox( conversationVariables.conversation_dict.completed_sentences[ 0 ] );
        ////$('#speakingWordsInside').text( text );
    
    ////} else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) {

        ////let text = createMeanByTextForPromptBox( conversationVariables.conversation_dict.completed_sentences[ 0 ] );
        ////$('#speakingWordsInside').text( text );
        
    ////} else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "3" ) {

        ////let text = "There are more than 3 mistakes in your sentence. Could you simplify and try again?";
        ////$('#speakingWordsInside').text( text );

    ////} else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "D" ) {

        ////let text = "I'm sorry but I don't understand what you said.";
        ////$('#speakingWordsInside').text( text );
    
    ////}

    //setTimeout( function() {

        //$('#speakingWords').fadeIn( tiaTimings.speechBubbleFadeInDuration );

        //recTimes.tiaStartTalking = Date.now() / 1000;
        ////synthesisObject.endCount = synthesisObject.synthAudio.duration * 60* 0.75;
        
        ////tiaSpeakCount = 0;
        ////initTalk();

        ////synthesisObject.synthAudio.play()
        ////synthesisObject.synthAudio.onended = returnToLaptop;
        
        //tiaSpeak( conversationVariables.tiaToSay, function() {

            //if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "D" || conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "3" || conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) {

                //returnToLaptop( 'try again' );

            //}

        //});

        //conversationVariables.promptSpeaking = true;
            
    //}, tiaTimings.toTalkExpressionDuration * 1000 );

//}
    
function returnToLaptop( from ) {

    recTimes.returnToLaptop = Date.now() / 1000;
    //console.log( 'in return to laptop');
    //movementController( movementObject.abs.blank, 0.5, 1 );
    addPreviousSentences( conversationVariables.conversation_dict, 0 );
    initInputReady( from )

    //expressionController( expressionObject.abs.neutral, tiaTimings.changeExpressionDuration * 2 );

    //if ( conversationVariables.classOver && conversationVariables.endClassSequenceStarted !== true ) {

        //console.log('\n\n\nend class return to laptop tia looking at student\n\n\n');
        //endClas
        //conversationVariables.endClassSequenceStarted = true;

    //} else {

        //initInputReady()
        ////showQuestionStreak();
        //recTimes.initInputReady = Date.now() / 1000;
        //sendTimesToServer();

    //}
    
}

// show in prevSent
//function addToPrevSents() {

    //// create new box in prevSent
    ////appendExchange( conversationVariables.conversation_dict.completed_sentences[ 0 ] );
    ////scrollBottom();
    //loadPrevSents( scrollBottom );
    //setTimeout( function() {
        //$('#prevSents').fadeTo( 500, 1 )
    //}, 2200 );
    //console.log('in addToPrevSents');

//}


//var reading = false;
//function waitForWrongSlices() {

    //let sentId = conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id

    //$.ajax({
        //url: "/wait_for_correction",
        //type: "GET",
        //data: {'sentId': sentId},
        //success: function(json) {

            //if ( json.indexes !== null ) {

                //conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes = JSON.parse( json.indexes );

                //conversationVariables.conversation_dict.completed_sentences[ 0 ].correction = JSON.parse( json.correction );
                
                //// no longer turning to board in mobile so comment out
                //// turnToBoardToShowErrors();
                //// tap key instead
                //tapKeyToShowErrors();

            //} else {

                //backNReadALine();

            //}

        //},
        //error: function() {
            //console.log("that's wrong");
        //},
        
    //});

//}

function tapKeyToShowErrors() {

    conversationVariables.tapKeyForErrors = true;
    tapKeyFull();

}


