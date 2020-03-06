function dealWithTutorialSpeakingEvents() {

    //console.log('in dealWithTutorialSpeakingEvents');

    if ( conversationVariables.tutorialStep === 0 ) {
    
        if ( synthesisObject.sentenceNo === 0 ) {


        }

    } else if ( conversationVariables.tutorialStep === '041' ) {
        
        if ( synthesisObject.sentenceNo === 0 ) {



        } else if ( synthesisObject.sentenceNo === 5 ) {

            conversationVariables.sentence_being_recorded_audio.alternatives = [{transcript: "I feel bad because I catch a coat"}]
            //}
            //conversationVariables.sentence_being_recorded = {
                //conv_id: conversationVariables.conversation_dict.id
            //}
            dealWithAfterTap();

        }


    } else if ( conversationVariables.tutorialStep === '141' ) {

        if ( synthesisObject.sentenceNo === 0 ) {

            $('#textInputContainer').fadeOut();

        } else if ( synthesisObject.sentenceNo === 2 ) {
        
            synthesisObject.talking = false;
            //setTimeout( updateSentenceNumberAndAudioSrc, 900 );
            createSingleExpression( expressionObject.rel.sad, 1.8 )

        }

    } else if ( conversationVariables.tutorialStep === '142' ) {
        
        createSingleExpression( expressionObject.rel.happy, 1.8 )

    } else if ( conversationVariables.tutorialStep === '143' ) {
        
        createSingleExpression( expressionObject.rel.surprise, 1.8 )

    } else if ( conversationVariables.tutorialStep === '144' ) {
        
        createSingleExpression( expressionObject.rel.content, 1.8 )

    } else if ( conversationVariables.tutorialStep === '145' ) {
        
        createSingleExpression( expressionObject.rel.fear, 1.8 )

    } else if ( conversationVariables.tutorialStep === '146' ) {
        
        createSingleExpression( expressionObject.rel.disgust, 1.8 )

    }

}
