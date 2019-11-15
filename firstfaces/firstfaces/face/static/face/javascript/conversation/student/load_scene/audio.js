function readyAudio() {

    // checks that user's browser allows microphone access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        
        startAudioStream();
            
    } else {

        console.log('getUserMedia not supported on your browser!');
    
    }

}

function startAudioStream() {

    //console.log( 'in start audio stream' )
    navigator.mediaDevices.getUserMedia( AUDIO_N_VIDEO_SETTINGS ).then( function( stream ) {
 
        conversationVariables.stream = stream; // make it globally accessible to simplify all else
        conversationVariables.audio = true; // ??
        mediaRecorder = new MediaRecorder( conversationVariables.stream );
        //console.log('mediaRecorder:', mediaRecorder)
        chunks = []; // ??

        mediaRecorder.ondataavailable = function( e ) {

            chunks.push( e.data );

        }

        mediaRecorder.onstop = onMediaRecorderStop;
            
    })

    // Error callback
    .catch(function(err) {
        console.log('The following getUserMedia error occured: ' + err);
        conversationVariables.audio = false;
        alert("If you want to speak to Tia, you must allow your microphone to be used. Click the lock, or small 'i' next to the web address and then change the settings to allow the microphone.");
    });

}

function onRecord() {

    resetOnRecordVariables();
    dealWithInputBtns();
    mediaRecorder.start();
    initMicVolumeBar(); // <volume-meter.js>
    tiaLeanToListenToRecording();
    recorder15sTimeout = setTimeout( checkIfClickedStop, 15000 );

}

function resetOnRecordVariables() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    conversationVariables.interference = false; // start with no interference which can change if clipping occurs
    // identifies main recording and allow return of mic button if user says nothing
    conversationVariables.mainRecord = true; // ??
    // will check that the user has clicked the stop button by timing them and using this boolean
    conversationVariables.recording = true;
    chunks = [];

}

function dealWithInputBtns() {

    buttonsAfterMicClicked();

    if ( conversationVariables.stage2 || conversationVariables.stage3 ) {
        
        $('#submitOverlay').hide();
    
        if (conversationVariables.stage2 ) {

            $('#keyboardOverlay').hide();
            $('#spectrogramBtn').hide();

        }

    }
    
}

function tiaLeanToListenToRecording() {

    // tia leans to listen, more so at later stages
    if ( conversationVariables.stage2 ) {

        listenToRecording( 1 );

    } else if ( conversationVariables.stage3 ) {
    
        listenToRecording( 2 );
        $('#backOverlay').hide();

    } else {

        listenToRecording( 0 );

    }

}

function checkIfClickedStop() {

    // double check the boolean is true
    if ( conversationVariables.recording ) {

        conversationVariables.over15secs = true;

        hideVolumeBar();

        onStopClick();

        //alert('You have 15 seconds to say each sentence. If it is a very long sentence, try breaking it up into smaller sentences.')
           
        //movementController( movementObject.abs.blank, 1, 1, function() {

            //buttonsMicrophoneOnly();

        //})

    }

}

// put this in a function so that I can call it later if the user doesn't click stop after X seconds.
function onStopClick() {

    clearTimeout( recorder15sTimeout );

    // little delay as some users click too soon
    setTimeout( function() {

        mediaRecorder.stop();
    
    }, 250 )

    conversationVariables.recording = false;

    buttonsHideAllStop();


}

function onMediaRecorderStop() {
 
    if ( conversationVariables.over15secs ) {

        conversationVariables.over15secs = false;
        alert( 'you have 15 seconds to say each sentence' );

    }

    // i first interference then dont need to do any of this stuff
    if ( !conversationVariables.interference ) {

        hideVolumeBar();

        //$('#talkBtn').prop( "disabled", true )
        conversationVariables.blob = new Blob(chunks, { type : 'audio/webm; codecs: opus' });

        // create audiourl for easy replay
        var audioURL = window.URL.createObjectURL(conversationVariables.blob);
        aud.src = audioURL;

        tiaLookAtLaptopAndType();

        if( !conversationVariables.stage2 && !conversationVariables.stage3 ) {
            
            sendBlobToServer( conversationVariables.blob );
            
        } else {
            
            if( conversationVariables.stage2 ){
                    
                sendErrorBlobToServer( conversationVariables.blob );
            
            } else {
                console.log("Correct Stage 3 Call Made");
                sendAttemptBlob( conversationVariables.blob );
            
            }

        }
        
    }

}

