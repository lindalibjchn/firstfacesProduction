function listenToRecording( intensity ) {

    if ( intensity === 0 ) {

        movementController( movementObject.abs.listenToSpeechNormal, 0.75, 0.75 )

    } else if ( intensity === 1 ) {

        movementController( movementObject.abs.listenToSpeechNormal, 1, 1 )

    } else {

        movementController( movementObject.abs.listenToSpeechIntent, 1, 1 )

    }

    expressionController( expressionObject.abs.speechRecognition, 0.3 )

}

//function returnFromListenToRecording() {

    //movementController( movementObject.abs.laptop_glance, 0.5, 1, function() { 
        
        //// if no sound comes through, don't tap or show empty transcripts
        //if ( conversationVariables.sentence_being_recorded_audio.alternatives[ 0 ].transcript === "" ) {

            //dealWithBlankTranscription();

        //} else {
           //// reset this as main recording is complete with a transcription
            //conversationVariables.mainRecord = false;
            //conversationVariables.returnFromMainRecording = true;
            
            //$('#closeOverlayArea').prop( "disabled", true);
            //$('#submitOverlay').prop( "disabled", true);
    
        //}

    //});
    
    //tapKeyFull();

//}

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

    tiaSpeak( "iCouldntHear", cont=true, speakCb=function() {
     
        $('#recordVoiceBtn').show();
        conversationVariables.mainRecord = false;

        $('#recordBtnsCont').fadeIn();
        //removeSpeechBubble();

    } );

}

