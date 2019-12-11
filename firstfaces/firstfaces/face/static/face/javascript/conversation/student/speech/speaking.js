function tiaPrepareToSpeak( tiaSays, speakCb=function(){},  playbackRate=0.9) {

    synthesisObject.sentenceNo = 0;
    synthesisObject.now = synthesisObject.data[ tiaSays ];
    synthesisObject.audio.src = synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
    synthesisObject.audio.playbackRate = playbackRate;
    synthesisObject.callback = speakCb;
    buttonsListenNextSentence();

}

function tiaSpeakButtonEvent() {

    buttonsHideAllContainers();
    if ( synthesisObject.sentenceNo === 0 ) {

        prepareHeadBobAndTalkingBoolOnFirstSentence()

    }
    tiaSpeakIndividualSentences();
    synthesisObject.audio.play();

}

function prepareHeadBobAndTalkingBoolOnFirstSentence() {

    headXRandomTiltObject.startCount = mainCount;
    headYRandomTiltObject.startCount = mainCount;
    synthesisObject.talking = true; 

}

function tiaSpeakIndividualSentences() {
    
  //console.log( 'now in tiaSpeakIndividualSentences:', synthesisObject.now );

    synthesisObject.now.phoneCount = 0;
    synthesisObject.now.visemeOverrun = 0;

    if(conversationVariables.stage3){
        var new_duration = synthesisObject.now.duration / ((parseInt(document.getElementById("myRange").value)+20)/100);
      //console.log(new_duration);
        synthesisObject.audioS3.src = synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
        synthesisObject.audioS3.playbackRate = conversationVariables.playspeed;
        synthesisObject.now.newDuration = new_duration;
        synthesisObject.now.noOfPhones = synthesisObject.now.visemes[ synthesisObject.sentenceNo ].length;
        synthesisObject.now.noOfFrames = Math.floor( (new_duration/1000) * 60 )
        synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );
        synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;
        synthesisObject.gotNewDuration = true;
        //breatheObject.singleBreath.outCount = new_duration
        animateFirstPhoneSlowly();
        synthesisObject.audioS3.play();
    }
    else{

        initSingleBreath( 1, breatheObject.speakingBreathMult, tiaTimings.durationOfFirstSpeakingPhones );
        setTimeout( function () {
         
            let breatheOutDuration = Math.max( 0.5, synthesisObject.audio.duration - 1.5 )
            initSingleBreath( -1, breatheObject.speakingBreathMult, breatheOutDuration );   
            
        }, tiaTimings.durationOfFirstSpeakingPhones * 1100 )
        console.log('sentenceNo:', synthesisObject.sentenceNo);
        showSpeechBubbleNText();
        animatePhonesInOrder();
    }

}

function showSpeechBubbleNText() {

    if ( synthesisObject.sentenceNo === 0 ) { // only fade in bubble firt time

        showSpeechBubble( synthesisObject.now.texts[ 0 ], tiaTimings.speechBubbleFadeInDuration )
    
    } else {

        showSpeechText( synthesisObject.now.texts[ synthesisObject.sentenceNo ], tiaTimings.speechTextFadeInDuration )

    }

}

function animatePhonesInOrder() {

    //console.log( 'in animatePhonesInOrder:', synthesisObject.now );
    if ( synthesisObject.now.phoneCount < synthesisObject.now.noOfPhones ) {

        pronunciationController( expressionObject.abs[ synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ][ 'Viseme' ] ], synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ][ 'end' ], animatePhonesInOrder )
        synthesisObject.now.phoneCount += 1;

    } else if ( synthesisObject.now.phoneCount === synthesisObject.now.noOfPhones ) { 
        
        if ( !conversationVariables.promptSpeaking ) {
        
            if ( synthesisObject.sentenceNo === synthesisObject.now.texts.length - 1 ) {
    
                endTiaTalking();

            } else {

                expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {

                    setTimeout( updateSentenceNumberAndAudioSrc, 500 );
               
                });    

            }

        } else {

            //if last sentence then just show mic, but if more sentences to come then show 'next' button
            if ( synthesisObject.sentenceNo === synthesisObject.now.texts.length - 1 ) {
        
                if ( conversationVariables.promptSpeaking && conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                    expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {
                        
                        buttonsListenNextSentenceWaiting();
                        checkIfNewPromptArrived();

                    } );

                } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) { 
                
                    if ( synthesisObject.sentenceNo === 0 ) {

                        expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {
                            
                            buttonsListenNextSentence();

                        } );
                
                    } else {

                        endTiaTalking();

                    }

                } else {

                    endTiaTalking();

                }
            
            } else {

                expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {

                    setTimeout( updateSentenceNumberAndAudioSrc, 500 );
               
                });    

            }

        }

    }

}

function updateSentenceNumberAndAudioSrc() {

    synthesisObject.sentenceNo += 1;
    synthesisObject.audio.src = /* prefixURL + */ synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
    buttonsListenNextSentence();

}

function checkIfNewPromptArrived() {

    if ( synthesisObject.newPromptArrived ) {

        synthesisObject.newPromptArrived = false;
        updateSentenceNumberAndAudioSrc();
        buttonsListenNextSentence();

    } else {

        if ( synthesisObject.awaiting_next_prompt_count < 20 ) {

            if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                console.log( 'awaiting_next_prompt_count in checkIfNewPromptArrived:', synthesisObject.awaiting_next_prompt_count );
                synthesisObject.awaiting_next_prompt_count += 1;
                setTimeout( checkIfNewPromptArrived, 1000 );

            } else {

                endTiaTalking();

            }

        } else {

            endTiaTalking();

        }

    }

}

function endTiaTalking() {

    synthesisObject.talking = false;
    conversationVariables.promptSpeaking = false;
    expressionController( expressionObject.half, tiaTimings.durationOfReturnToExpressionAfterVeryLastSpeakingPhone );
    movementController( movementObject.abs.blank, 1, 1, function() {

        synthesisObject.callback();

        if ( !conversationVariables.entranceSequence ) {

            setTimeout( function() {
            
                removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration * 3 );
                initInputReady();
                $('#prevSentsIconContainer').css('font-size', '17px');
                setTimeout( function() {

                    $('#prevSentsIconContainer').css('font-size', '15px');

                }, tiaTimings.speechBubbleFadeOutDuration * 3 )

            }, 1000 );

        }
        
    });

}


function pronunciationController( expressionTo, phoneEndTime, cb ) {

    let weightedPhoneEndTime = phoneEndTime / synthesisObject.audio.playbackRate;
    //console.log('in pronunciation controller')
    //console.log( 'phoneEndTime:', phoneEndTime );
    //console.log( 'phonneCount:', synthesisObject.now.phoneCount );
    expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
    expressionObject.now = getAbsoluteCoordsOfExpressionNow();
    expressionObject.movement = createRelativeExpression( expressionTo );
    expressionObject.callback = cb;
    //initPronunciation();
    
    let phoneLength;
    if ( synthesisObject.now.phoneCount === 0 ) {
    
        phoneLength = weightedPhoneEndTime
    
    } else {

        phoneLength = weightedPhoneEndTime - synthesisObject.previousWeightedPhoneEndTime;

    }
    
    //console.log( 'phoneLength:', phoneLength );
    synthesisObject.previousWeightedPhoneEndTime = weightedPhoneEndTime;
    
    let frames = Math.round( phoneLength * 6 ) / 100;
    //console.log( 'frames:', frames );
    let framesPlusOverrun = Math.round( phoneLength * 6 - 100 * synthesisObject.now.visemeOverrun ) / 100;
    //console.log( 'framesPlusOverrun:', framesPlusOverrun );
    let decimals = Math.round( 100 * ( framesPlusOverrun % 1 ) ) / 100;
    //console.log( 'decimals:', decimals );
    let overrun = 0;
    if ( decimals < 0.5 ) {
        overrun = decimals;
    } else {
        overrun = - Math.round( 100 * ( Math.abs( 1 - decimals ) ) ) / 100;
    }
    //console.log( 'overrun:', overrun );
    synthesisObject.now.visemeOverrun = overrun;

    let roundedFrames = Math.round( framesPlusOverrun );
    //console.log( 'roundedFames:', roundedFrames );
    expressionObject.sinLength = roundedFrames; 
    //console.log( 'sinLength:', expressionObject.sinLength );
    expressionObject.sin = sineArrays[ expressionObject.sinLength ];
    expressionObject.startCount = mainCount;
    expressionObject.bool = true;

}

//// general all-purpose method for all expressions
function initPronunciation() {


}

function showSpeechBubble( sentence, duration, cb ) {

    $('#speakingWordsInside').text( sentence );
    $('#speechBubbleInnerContainer').fadeIn( duration, cb );

}

function removeSpeechBubble( duration ) {

    $( '#speechBubbleInnerContainer' ).fadeOut( 
            
        duration, 
        function() { $( '#speakingWordsInside' ).text( '' ) }
    
    );

}

function showSpeechText( sentence, duration, cb ) {

    $('#speakingWordsInside').text( sentence );
    $('#speakingWordsInside').fadeIn( duration, cb );

}

function removeSpeechText( duration, cb ) {

    $( '#speakingWordsInside' ).fadeOut( 
            
        duration, 
        function() { 
            $( '#speakingWordsInside' ).text( '' )
            cb();
        }
    
    );

}






