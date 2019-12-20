function dealWithTutorialSpeakingEvents() {

    console.log('in dealWithTutorialSpeakingEvents');

    if ( conversationVariables.tutorialStep === '041' && synthesisObject.sentenceNo === 3 ) { 
        conversationVariables.sentence_being_recorded_audio.alternatives = [{transcript: "I feel bad because I have a coat"}]
        //}
        //conversationVariables.sentence_being_recorded = {
            //conv_id: conversationVariables.conversation_dict.id
        //}
        dealWithAfterTap();

    }

}
