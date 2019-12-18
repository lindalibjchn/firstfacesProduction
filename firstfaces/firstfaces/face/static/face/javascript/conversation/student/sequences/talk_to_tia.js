function talkToTia() {

    buttonsHideAllContainers();
    tiaLeanToListen();
    
}

function tiaLeanToListen() {

    expressionController( expressionObject.abs.listening, 0.3) 
    movementController( movementObject.abs.listenToSpeechNormal, tiaTimings.leanToListenToSpeechDuration, tiaTimings.leanToListenToSpeechDuration );

}

function goToThinkingPos() {

    recTimes.finishSpeak = Date.now() / 1000;

    expressionController( expressionObject.abs.talkBase, tiaTimings.toThinkDuration );
    movementController( movementObject.abs.thinkSentenceArmNeutral, tiaTimings.toThinkDuration / 2, tiaTimings.toThinkDuration, function() {
        
        setTimeout( initAddThoughtBubbles, tiaTimings.delayToAddThoughtBubbles );

    })

}

function resetSentenceBeingRecorded() {
    if(conversationVariables.trying_again){
        conversationVariables.previous_sent_conv_id =  conversationVariables.sentence_being_recorded.conv_id;
        conversationVariables.previous_sent_Aud_Fname  = conversationVariables.sentence_being_recorded_audio.Aud_Fname;
        conversationVariables.previous_sent_currentAudID  = conversationVariables.sentence_being_recorded_audio.currentAudID;
        conversationVariables.previous_sent_totalAudioLength  = conversationVariables.sentence_being_recorded_audio.totalAudioLength;
        conversationVariables.previous_sent_sent_id = conversationVariables.sentence_being_recorded.sent_id;
    }
    conversationVariables.sentence_being_recorded_audio = null;
    conversationVariables.sentence_being_recorded = null;

}
