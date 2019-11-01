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

        runIncorrect();

    //} else if ( [ "D", "3" ].includes( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement ) ) {

        //runBadSentences( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement );

    } else {

        runPrompt( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement );

    }
    
}

function runIncorrect() {

    movementController( movementObject.abs.confused, tiaTimings.movementToConfusedDuration / 2, tiaTimings.movementToConfusedDuration )
    expressionController( expressionObject.abs.confused, tiaTimings.changeExpressionToConfusedDuration, showOptionBtns );

}

//function runBadSentences() {

    //addPreviousSentences( conversationVariables.conversation_dict, 0 );
    //expressionController( expressionObject.calculated, tiaTimings.returnFromThinkingDuration / 2 );

//}

function runPrompt( judg ) {

    addPreviousSentences( conversationVariables.conversation_dict, 0 );

    //recTimes.prePrepareForPromptSpeech =  Date.now() / 1000;
    // return to talking pos
    
    movementController( movementObject.abs.blank, tiaTimings.returnFromThinkingDuration / 2, tiaTimings.returnFromThinkingDuration, function() {
       
        if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].nod_shake !== null ) {
    
            nodOrShakeHead();

        } else {

            setTimeout( function() {

                tiaSpeakAfterReturningFromThinking();

            }, tiaTimings.delayAfterReturningfromThinkingBeforeSpeak );

        }

    });

    expressionController( expressionObject.calculated, tiaTimings.returnFromThinkingDuration / 2 );

}

function nodOrShakeHead() {
    
    //recTimes.nodOrShakeHead =  Date.now() / 1000;
    
    let X = conversationVariables.conversation_dict.completed_sentences[ 0 ].nod_shake[ 0 ];
    let Y = conversationVariables.conversation_dict.completed_sentences[ 0 ].nod_shake[ 1 ];
    if ( X > 0 ) {

        initNod( -Y, 1 - X, tiaSpeakAfterReturningFromThinking );

    } else {

        initShake( -Y, 1 + X, tiaSpeakAfterReturningFromThinking );

    }

}

function tiaSpeakAfterReturningFromThinking() {

    if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "D" ) {

        tiaSpeak( 'iDontUnderstand', cont=true );

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "3" ) {

        tiaSpeak( 'moreThanThree', cont=true );

    } else {

        tiaSpeak( 'prompt', cont=false );
        
    }
        
    synthesisObject.speakDirectlyAfterComingBackFromThinking = true;

}
