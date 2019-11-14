function talkToTia() {

    buttonsHideAllContainers();
    tiaLeanToListen();
    
}

function tiaLeanToListen() {

    expressionController( expressionObject.abs.listening, 0.3) 
    movementController( movementObject.abs.listenToSpeechNormal, tiaTimings.leanToListenToSpeechDuration, tiaTimings.leanToListenToSpeechDuration, speakWords );

}

function speakWords() {

    recTimes.startSpeak = Date.now() / 1000;
    
    if(conversationVariables.usePlayAud){
        
        // temporary fix
        if ( !conversationVariables.FAFailed ) {
        
            play_audio();

        }
        conversationVariables.usePlayAud = false;
    
    } else {
        
        if ( !conversationVariables.FAFailed ) {
        
            aud.play();
        
        }

    }
    conversationVariables.FAFailed = false;
    setTimeout( goToThinkingPos, conversationVariables.sentence_being_recorded_audio.totalAudioLength );
        
}


function goToThinkingPos() {

    recTimes.finishSpeak = Date.now() / 1000;

    expressionController( expressionObject.abs.talkBase, tiaTimings.toThinkDuration );
    movementController( movementObject.abs.thinkSentenceArmNeutral, tiaTimings.toThinkDuration / 2, tiaTimings.toThinkDuration, function() {
        
        setTimeout( initAddThoughtBubbles, tiaTimings.delayToAddThoughtBubbles );

    })

}

function resetSentenceBeingRecorded() {

    conversationVariables.sentence_being_recorded = null;
    conversationVariables.sentence_being_recorded_audio = null;

}
