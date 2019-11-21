function showWrongSentence() {

    console.log('in showWrongSentence');
    conversationVariables.sentenceForHighlighting = getSentenceWithSpacesInArray( conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence )

    for ( w=0; w < conversationVariables.sentenceForHighlighting.length; w++ ) {

        if ( conversationVariables.sentenceForHighlighting[ w ] === ' ' ) {


            $('#submittedSentence').append(

                "<div class='wrong-words wrong-words-spaces' id='wrongWord_" + w.toString() + "'>" + "*</div>"

            );

        
        } else {

            $('#submittedSentence').append(

                "<div class='wrong-words wrong-words-words' id='wrongWord_" + w.toString() + "'>" + conversationVariables.sentenceForHighlighting[ w ] + "</div>"

            );

        }

    };


    highlightWrong();
        
}

