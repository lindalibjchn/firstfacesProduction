function judgementReceived( sentMeta ) {

    conversationVariables.awaitingJudgement = false;

    updateConversationVariablesWithNewSentence( sentMeta );
    
    preparePromptForTiaSpeak();

    prepareExpression();
    
    thinkingEyesObject.bool = false
    removeThoughtBubbles( tiaTimings.removeThoughtBubbleDuration )
    runAfterJudgement();

}

function updateConversationVariablesWithNewSentence( sentMeta ) {

    let newInd = Object.keys(conversationVariables.sentences).length;
    sentMeta.emotion = JSON.parse(sentMeta.emotion);
    conversationVariables.sentences[ newInd ] = sentMeta;
    conversationVariables.sentences[ newInd ].sentence = JSON.parse( sentMeta.sentence );
    conversationVariables.sentences[ newInd ].indexes = JSON.parse( sentMeta.indexes );
    //conversationVariables.sentences[ newInd ].prompt = sentMeta.prompt;

    conversationVariables.id_of_last_sent = newInd;
    //conversationVariables.tiaToSay = sentMeta.tiaToSay;
    
    conversationVariables.last_sent = conversationVariables.sentences[ newInd ];
    //conversationVariables.last_sent.sentence = sentMeta.sentence;
    //conversationVariables.last_sent.indexes = sentMeta.indexes;
    //conversationVariables.last_sent.prompt = sentMeta.prompt;

    // keeps state of sentence
    conversationVariables.blob_no_text = false;

}

function preparePromptForTiaSpeak() {

   if ( ['P', 'M', 'B'].includes( conversationVariables.last_sent.judgement ) ) {

       synthesisObject.data.prompt = conversationVariables.last_sent.forPrompt;

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

