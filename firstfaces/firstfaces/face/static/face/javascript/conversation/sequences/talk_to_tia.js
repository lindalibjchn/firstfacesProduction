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
        
        play_audio()      
        conversationVariables.usePlayAud = false;
    
    } else {
        
        aud.play();
        
    }
    
    setTimeout( goToThinkingPos, conversationVariables.totalAudioLength );
        
}


function goToThinkingPos() {

    recTimes.finishSpeak = Date.now() / 1000;

    expressionController( expressionObject.abs.talkBase, tiaTimings.toThinkDuration );
    movementController( movementObject.abs.thinkSentenceArmNeutral, tiaTimings.toThinkDuration / 2, tiaTimings.toThinkDuration, initAddThoughtBubbles );

}

//function moveArmToThinking() {

   //movementController( movementObject.abs.thinkSentenceArmNeutral, tiaTimings.moveArmToThinkPosDuration, tiaTimings.moveArmToThinkPosDuration, initAddThoughtBubbles ); 


//}

