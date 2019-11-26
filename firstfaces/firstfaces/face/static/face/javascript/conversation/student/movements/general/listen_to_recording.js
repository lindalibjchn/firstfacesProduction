function listenToRecording( intensity ) {

    if ( intensity === 0 ) {

        movementController( movementObject.abs.listenToSpeechNormal, 0.5, 0.75 )

    } else if ( intensity === 1 ) {

        movementController( movementObject.abs.listenToSpeechNormal, 0.75, 1 )

    } else {

        movementController( movementObject.abs.listenToSpeechIntent, 0.75, 1 )

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

            hideVolumeBar();//always hide it even if not shown, same as if statement
            expressionController( expressionObject.abs.blank, 1 ) 
            movementController( movementObject.abs.blank, 0.5, 1.5, moveCb=function(){tiaSpeak( "that_was_very_loud", cont=true, speakCb=function(){
             
                    conversationVariables.interference = false;  
                    canvasContext.fillStyle = "#33ff00";
               
                })
            
            });

        }, tiaTimings.delayAfterFlinch );

    })

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

    tiaSpeak( "I_couldn't_hear_anything", cont=true, speakCb=function() {
     
        $('#recordVoiceBtn').show();
        conversationVariables.mainRecord = false;

        $('#recordBtnsCont').fadeIn();
        //removeSpeechBubble();

    } );

}

function nodHeadAndSaySameAfterIdenticalTranscription() {

    initNod( 0.3, 0.35 );
     
    setTimeout( function() {

        expressionController(expressionObject.abs.talkBase, 0.2, function() {

            expressionController(expressionObject.abs.s, 0.1, function() {
                
                expressionController(expressionObject.abs.e, 0.1, function() {

                    expressionController(expressionObject.abs.b, 0.1, function() {

                        expressionController(expressionObject.abs.blank, 0.5, function() {

                        })

                    })

                });
                
            })
            
        });

    }, 300 );

}



