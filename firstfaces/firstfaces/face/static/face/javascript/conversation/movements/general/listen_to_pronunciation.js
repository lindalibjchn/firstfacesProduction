function listenToSpeechSynthesis( intensity ) {

    if ( intensity === 0 ) {

        movementController( movementObject.abs.speechRecognitionInput01, 7, 0.75 )

    } else if ( intensity === 1 ) {

        movementController( movementObject.abs.speechRecognitionInput02, 1, 1 )

    } else {

        movementController( movementObject.abs.speechRecognitionInput03, 1.2, 1.25 )

    }

    expressionController( expressionObject.abs.speechRecognition, 0.3 )

}

function returnFromListenToSpeechSynthesis() {

    movementController( movementObject.abs.blank, 1, 1 );
    setTimeout( function() {
        
        // if no sound comes through, don't tap or show empty transcripts
        if ( conversationVariables.alternatives[ 0 ].transcript === "" ) {
        
            if ( conversationVariables.tutorial === false ) {

                setTimeout( function() {

                    initShake(0.2, 0.5)
                    setTimeout( dealWithBlankTranscription, 1500 );

                }, 1000);
        
            }

        } else {
           // reset this as main recording is complete with a transcription
           conversationVariables.mainRecord = false;
            
            $('#closeOverlayArea').prop( "disabled", true);
            $('#submitOverlay').prop( "disabled", true);
            tapKeyFull();
    
            setTimeout( function() {

                expressionController( expressionObject.abs.neutral, 0.5 )
            
                //setTimeout( function() {

                    //$('#recordVoiceBtn').show();
                
                //}, 1000 );

            }, 300);

        }

    }, 200 );

}

function returnFromListenToErrorAttemptWithSpectrograph() {

    movementController( movementObject.abs.laptop, 0.75, 1.5 );

}


function firstFlinch() {

    onStopClick();

    expressionController( expressionObject.abs.flinch, tiaTimings.flinchDuration / 2 )//express discomfort 
    movementController( movementObject.abs.flinch, tiaTimings.flinchDuration, tiaTimings.flinchDuration);
    
    //// delay the expression and movement by a bit to create more realistic encounter
    setTimeout( function() {

        hideVolumeBar();//always hide it even if not shown, same as if statement
        movementController( movementObject.abs.flinch, 0.2, 0.4);
        expressionController( expressionObject.abs.flinch, 0.1 ) 

        setTimeout( function() {

            synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "that_was_very_loud.wav"
    
            tiaSpeak( "That was very loud. Please be careful with the microphone volume", function() {
    
                $('#recordVoiceBtn').show();
            })

        }, 1500 )

    }, tiaTimings.flinchDuration * 1000 + tiaTimings.delayAfterFlinch );

}

function dealWithBlankTranscription() {

    $('#recordBtnsCont').hide();


    synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "im_sorry_but_i_didnt_hear_anything.wav";
    tiaSpeak( "I'm sorry, but I didn't hear anything. Could you try again?", function() {
     
        $('#recordVoiceBtn').show();
        conversationVariables.mainRecord = false;

        $('#recordBtnsCont').fadeIn();
        //removeSpeechBubble();

    } );

}

