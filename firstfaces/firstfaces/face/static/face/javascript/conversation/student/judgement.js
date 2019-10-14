function judgementReceived( sentMeta ) {

    thinkingEyesObject.bool = false;
    blinkControllerObject.bool = false;
    conversationVariables.awaitingJudgement = false;

    updateConversationVariablesWithNewSentence( sentMeta );
    preparePromptForTiaSpeak();
    prepareExpression();
    removeThoughtBubbles( tiaTimings.removeThoughtBubbleDuration, runAfterJudgement );

}

function updateConversationVariablesWithNewSentence( sentMeta ) {

    conversationVariables.conversation_dict.completed_sentences.unshift( sentMeta );
    conversationVariables.sentence_awaiting_judgement = {}

}

function preparePromptForTiaSpeak() {

   if ( ['P', 'M', 'B'].includes( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement ) ) {

        synthesisObject.data.prompt = conversationVariables.conversation_dict.completed_sentences[ 0 ].forPrompt;
        synthesisObject.data.prompt.URLs.forEach( function( URL, ind, arr ) {

            arr[ ind ] = prefixURL + arr[ ind ]; 
    
        })

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === 'D' ) {

       synthesisObject.data.prompt = synthesisObject.data.iDontUnderstand;

    } else {

       synthesisObject.data.prompt = synthesisObject.data.moreThanThree;

    }

}

function prepareExpression() {

    if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "B" || conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "C" || conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "P" || conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) {

        if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) {

            createSingleExpression( expressionObject.rel.confused, 0.5 )

        } else {

            changeExpression( conversationVariables.conversation_dict.completed_sentences[ 0 ]['emotion'], conversationVariables.conversation_dict.completed_sentences[ 0 ]['surprise'] );

        }

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "D" ) {

        createSingleExpression( expressionObject.rel.confused, 1 )

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "3" ) {

        createSingleExpression( expressionObject.rel.confused, 0.75 )

    } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "I" ) {

        createSingleExpression( expressionObject.rel.confused, 1 )

    }
                
}

