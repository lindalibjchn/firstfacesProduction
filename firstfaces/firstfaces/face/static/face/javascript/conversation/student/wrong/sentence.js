function showWrongSentence() {

    $('#textInputContainer').fadeIn();

    $('#submittedNCorrectedSentenceCont').show()

    for ( w=0; w < conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence.length; w++ ) {

        if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence[ w ] === ' ' ) {


            $('#submittedSentence').append(

                "<div class='wrong-words wrong-words-spaces' id='wrongWord_" + w.toString() + "'>" + "*</div>"

            );

        
        } else {

            $('#submittedSentence').append(

                "<div class='wrong-words wrong-words-words' id='wrongWord_" + w.toString() + "'>" + conversationVariables.conversation_dict.completed_sentences[ 0 ].sentence[ w ] + "</div>"

            );

        }

    };


    setTimeout(highlightWrong, 1500);
        
}

