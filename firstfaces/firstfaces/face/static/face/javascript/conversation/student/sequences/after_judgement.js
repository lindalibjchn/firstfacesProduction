function runAfterJudgement() {

    resetSentenceBeingRecorded();
    conversationVariables.correctSentence = false;

    if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "I" ) {

        runIncorrect();

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

        tiaPrepareToSpeak( "I_don't_understand_what_you_said" );

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "3" ) {

        tiaPrepareToSpeak( "There_are_more_than_three_errors_in_your_sentence" );

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "P" ) {

        // no prompts
        if ( $.isEmptyObject(conversationVariables.conversation_dict.completed_sentences[0].prompts) ) {

            setTimeout( function() {

                expressionController( expressionObject.quarter, tiaTimings.changeExpressionDuration, function() {

                    initInputReady( 'prompt empty',  showPtsBool=true );

                });

            }, 1000 );

        } else {

            synthesisObject.speakingPrompt = 0;
            createPromptFromServerPrompts();
            conversationVariables.promptSpeaking = true;
            conversationVariables.correctSentence = true;
            tiaPrepareToSpeak( "prompt" );
            
            if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                synthesisObject.awaiting_next_prompt_count = 0;
                synthesisObject.awaiting_next_prompt_from_server_count = 0;
                setTimeout( getNextPrompt, 2000 );

            }

        }

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) {

        conversationVariables.promptSpeaking = true;
        synthesisObject.data["I'm_not_sure_what_you_mean_by..."].texts[1] = conversationVariables.conversation_dict.completed_sentences[0].prompts[ 3 ].text
        synthesisObject.data["I'm_not_sure_what_you_mean_by..."].URLs[1] = conversationVariables.conversation_dict.completed_sentences[0].prompts[ 3 ].URL
        synthesisObject.data["I'm_not_sure_what_you_mean_by..."].visemes[1] = conversationVariables.conversation_dict.completed_sentences[0].prompts[ 3 ].visemes
        tiaPrepareToSpeak( "I'm_not_sure_what_you_mean_by..." );
        
    }
        
    synthesisObject.speakDirectlyAfterComingBackFromThinking = true;

}
