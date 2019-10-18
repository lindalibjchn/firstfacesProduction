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

    movementController( movementObject.abs.confused, tiaTimings.movementToConfusedDuration / 2, tiaTimings.movementToConfusedDuration )
    expressionController( expressionObject.abs.confused, tiaTimings.changeExpressionToConfusedDuration, showOptionBtns );

}

function runPrompt( judg ) {

    addPreviousSentences( conversationVariables.conversation_dict, 0 );

    //recTimes.prePrepareForPromptSpeech =  Date.now() / 1000;
    // return to talking pos
    console.log('in prePrepareForPromptSpeech');
    
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

    tiaSpeak( 'prompt', cont=false );
    synthesisObject.speakDirectlyAfterComingBackFromThinking = true;

}
