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

    let newInd = Object.keys(conversationVariables.sentences).length;
    conversationVariables.ind_of_last_sent = newInd;
    conversationVariables.sentences[ newInd ] = sentMeta;
    conversationVariables.last_sent = conversationVariables.sentences[ newInd ];
    conversationVariables.blob_no_text = false;

}

function preparePromptForTiaSpeak() {

   if ( ['P', 'M', 'B'].includes( conversationVariables.last_sent.judgement ) ) {

        synthesisObject.data.prompt = conversationVariables.last_sent.forPrompt;
        synthesisObject.data.prompt.URLs.forEach( function( URL, ind, arr ) {

            arr[ ind ] = prefixURL + arr[ ind ]; 
    
        })

    } else if ( conversationVariables.last_sent.judgement === 'D' ) {

       synthesisObject.data.prompt = synthesisObject.data.iDontUnderstand;

    } else {

       synthesisObject.data.prompt = synthesisObject.data.moreThanThree;

    }

}

function prepareExpression() {

    if ( conversationVariables.last_sent.judgement === "B" || conversationVariables.last_sent.judgement === "C" || conversationVariables.last_sent.judgement === "P" || conversationVariables.last_sent.judgement === "M" ) {

        if ( conversationVariables.last_sent.judgement === "M" ) {

            createSingleExpression( expressionObject.rel.confused, 0.5 )

        } else {

            changeExpression();

        }

    } else if ( conversationVariables.last_sent.judgement === "D" ) {

        createSingleExpression( expressionObject.rel.confused, 1 )

    } else if ( conversationVariables.last_sent.judgement === "3" ) {

        createSingleExpression( expressionObject.rel.confused, 0.75 )

    } else if ( conversationVariables.last_sent.judgement === "I" ) {

        createSingleExpression( expressionObject.rel.confused, 1 )

    }
                
}

