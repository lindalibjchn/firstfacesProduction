function listenToSpeechSynthesis( intensity ) {

    if ( intensity === 0 ) {

        movementController( movementObject.abs.listenToSpeechNormal, 0.5, 0.5 )

    } else if ( intensity === 1 ) {

        movementController( movementObject.abs.listenToSpeechNormal, 0.75, 0.75 )

    } else {

        movementController( movementObject.abs.listenToSpeechIntent, 1, 1 )

    }

    expressionController( expressionObject.abs.speechRecognition, 0.3 )

}

function returnFromListenToSpeechSynthesis() {

    movementController( movementObject.abs.blank, 1, 1 );
    setTimeout( function() {
        
        // if no sound comes through, don't tap or show empty transcripts
        if ( conversationVariables.alternatives[ 0 ].transcript === "" ) {

            setTimeout( function() {

                initShake(0.2, 0.5)
                setTimeout( dealWithBlankTranscription, 1500 );

            }, 1000);

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
    movementController( movementObject.abs.flinch, tiaTimings.flinchDuration, tiaTimings.flinchDuration, moveCb=function(){ 
        
        setTimeout( function() {

                //hideVolumeBar();//always hide it even if not shown, same as if statement
                expressionController( expressionObject.abs.blank, 1 ) 
                movementController( movementObject.abs.blank, 0.5, 1.5, moveCb=function(){tiaSpeak( "veryLoud", cont=true, speakCb=function(){
                 
                        conversationVariables.interference = false;  
                        canvasContext.fillStyle = "#33ff00";
                   
                    })
                
                });

            }, tiaTimings.delayAfterFlinch );

        }

    )

}

function subsequentFlinches() {
    console.log('in subsequentFlinches');

    expressionController( expressionObject.abs.halfFlinch, tiaTimings.flinchDuration / 4, expressCb=function(){
       
        setTimeout( function() {

            expressionController( expressionObject.abs.speechRecognition, tiaTimings.flinchDuration, expressCb=function(){
         
                setTimeout( beginDrawingVolumeBar, 1000 );

            } ); 

        }, tiaTimings.delayAfterFlinch / 4 )    

    });

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

