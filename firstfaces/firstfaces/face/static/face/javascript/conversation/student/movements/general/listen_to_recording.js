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

    console.log('in firstFlinch');

    onStopClick();

    expressionController( expressionObject.abs.flinch, tiaTimings.flinchDuration / 2 )//express discomfort 
    movementController( movementObject.abs.flinch, tiaTimings.flinchDuration, tiaTimings.flinchDuration, moveCb=function(){ 
        
        setTimeout( function() {

            //stopDrawingVolumeBar();//always hide it even if not shown, same as if statement
            expressionController( expressionObject.abs.blank, 1 ) 
            movementController( movementObject.abs.blank, 0.5, 1.5, moveCb=function(){
                
                tiaPrepareToSpeak( "That_was_very_loud", speakCb=function(){
             
                    conversationVariables.interference = false;  
                    //canvasContext.fillStyle = "#33ff00";
               
                })
            
                hideVolumeBar();
            
            });

        }, tiaTimings.delayAfterFlinch );

    })

}

function subsequentFlinches() {
    
    console.log('in subsequentFlinches');
    conversationVariables.interference = false;

    expressionController( expressionObject.abs.halfFlinch, tiaTimings.flinchDuration / 4, expressCb=function(){
       
        canvasContext.fillStyle = "#33ff00";
        setTimeout( function() {

            expressionController( expressionObject.abs.speechRecognition, tiaTimings.flinchDuration, expressCb=function(){

            } ); 

        }, tiaTimings.delayAfterFlinch / 4 )    

    });

}

function dealWithBlankTranscription() {

    if (!conversationVariables.tutorial && !conversationVariables.stage2 ) {

        $('#recordBtnsCont').hide();
        $('#upperSentenceHolder').empty();
        $('#lowerSentenceHolder').empty();
        conversationVariables.blankTranscription = true;
        console.log('in dealWithBlankTranscription')
        tiaPrepareToSpeak( "I_couldn't_hear_anything", speakCb=function() {
         
            //$('#recordVoiceBtn').show();
            conversationVariables.mainRecord = false;

            //$('#recordBtnsCont').fadeIn();
            //removeSpeechBubble();

        } );

    } else {

        if ( conversationVariables.tutorialStep === '021' ) {

            tutorialOption031();

        } else if ( conversationVariables.tutorialStep === '051' ) {

            tutorialOption061();

        }


    }

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



