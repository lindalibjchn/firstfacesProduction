function dealWithTutorialSpeakingEvents() {

    console.log('in dealWithTutorialSpeakingEvents');

    if ( conversationVariables.tutorialStep === '041' && synthesisObject.sentenceNo === 3 ) { 
        conversationVariables.sentence_being_recorded_audio.alternatives = [{transcript: "I feel bad because I have a coat"}]
        //}
        //conversationVariables.sentence_being_recorded = {
            //conv_id: conversationVariables.conversation_dict.id
        //}
        dealWithAfterTap();

    } else if ( conversationVariables.tutorialStep === '081' && synthesisObject.sentenceNo === 0 ) {
        
        synthesisObject.talking = false;
        console.log('in speech_Events tutorialStep === 081 ');
        //setTimeout( updateSentenceNumberAndAudioSrc, 900 );
        createSingleExpression( expressionObject.rel.sad, 1.6 )

    } else if ( conversationVariables.tutorialStep === '082' ) {
        
        createSingleExpression( expressionObject.rel.happy, 1.6 )

    } else if ( conversationVariables.tutorialStep === '083' ) {
        
        createSingleExpression( expressionObject.rel.surprise, 1.6 )

    } else if ( conversationVariables.tutorialStep === '084' ) {
        
        createSingleExpression( expressionObject.rel.content, 1.6 )

    } else if ( conversationVariables.tutorialStep === '085' ) {
        
        createSingleExpression( expressionObject.rel.fear, 1.6 )

    } else if ( conversationVariables.tutorialStep === '086' ) {
        
        createSingleExpression( expressionObject.rel.disgust, 1.6 )

    }

}
