function judgementReceived( sentMeta ) {

    thinkingEyesObject.bool = false;
    blinkControllerObject.bool = false;
    conversationVariables.awaitingJudgement = false;

    updateConversationVariablesWithNewSentence( sentMeta );
    prepareExpression();
    removeThoughtBubbles( tiaTimings.removeThoughtBubbleDuration, runAfterJudgement );

}

function updateConversationVariablesWithNewSentence( sentMeta ) {

    conversationVariables.conversation_dict.completed_sentences.unshift( sentMeta );
    conversationVariables.sentence_awaiting_judgement = {}

}

function createPromptFromServerPrompts() {

    synthesisObject.data.prompt = {

        'URLs': [],
        'texts': [],
        'visemes': [],
    
    }

    Object.keys( conversationVariables.conversation_dict.completed_sentences[ 0 ].prompts ).forEach( function( p ) {

        synthesisObject.data.prompt.URLs.push( conversationVariables.conversation_dict.completed_sentences[ 0 ].prompts[ p ].URL );
        synthesisObject.data.prompt.texts.push( conversationVariables.conversation_dict.completed_sentences[ 0 ].prompts[ p ].text );
        synthesisObject.data.prompt.visemes.push( conversationVariables.conversation_dict.completed_sentences[ 0 ].prompts[ p ].visemes );

    })
    
    if ( synthesisObject.now !== undefined ) {

        synthesisObject.now.URLs = synthesisObject.data.prompt.URLs;
        synthesisObject.now.texts = synthesisObject.data.prompt.texts; 
        synthesisObject.now.visemes = synthesisObject.data.prompt.visemes;

    } else {

        console.log('synthesisObject.now === undefined') 

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

