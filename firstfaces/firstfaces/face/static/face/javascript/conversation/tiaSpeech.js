function tiaSpeak( tiaSays, callback ) {

    showSpeechBubble( tiaSays, tiaTimings.speechBubbleFadeInDuration )
    synthesisObject.synthAudio.play()

    initTalk();

    setTimeout( function() {
        
        callback();
        
        setTimeout( resetTalk, 800 );

    }, synthesisObject.synthAudio.duration * 1000 ); 

}

function showSpeechBubble( sentence, duration ) {

    $('#speakingWordsInside').text( sentence );
    $('#speechBubbleInnerContainer').fadeIn( duration );

}

function removeSpeechBubble( duration ) {

    $( '#speechBubbleInnerContainer' ).fadeOut( 
            
        duration, 
        function() { $( '#speakingWordsInside' ).text( '' ) }
    
    );

}

