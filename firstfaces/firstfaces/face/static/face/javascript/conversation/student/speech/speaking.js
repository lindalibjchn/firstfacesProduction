function tiaPrepareToSpeak( tiaSays, speakCb=function(){}, playbackRate=1) {

    synthesisObject.newPromptArrived = false;
    synthesisObject.sentenceNo = 0;
    synthesisObject.now = synthesisObject.data[ tiaSays ];
    synthesisObject.audio.src = prefixURL + 'media/' + synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
    synthesisObject.audio.playbackRate = playbackRate;
    synthesisObject.callback = speakCb;
    if ( conversationVariables.tutorial_complete ) {

        buttonsListenNextSentence();

    }

}

function tiaSpeakButtonEvent() {

    buttonsHideAllContainers();
    if ( synthesisObject.sentenceNo === 0 ) {

        prepareHeadBobAndTalkingBoolOnFirstSentence()

    }
    synthesisObject.audio.play();

    if ( appleDevice ) {
    
        //console.log('speaking in apple device: 100ms delay')
        setTimeout( tiaSpeakIndividualSentences, 1000 );

    } else {

        tiaSpeakIndividualSentences();

    }

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

    if ( !conversationVariables.stage3 ) {

        initSingleBreath( 1, breatheObject.speakingBreathMult, tiaTimings.durationOfFirstSpeakingPhones );
        setTimeout( function () {
         
            let breatheOutDuration = Math.max( 0.5, synthesisObject.audio.duration - 1.5 )
            initSingleBreath( -1, breatheObject.speakingBreathMult, breatheOutDuration );   
            
        }, tiaTimings.durationOfFirstSpeakingPhones * 1100 )
        //console.log('sentenceNo:', synthesisObject.sentenceNo);

    }

    showSpeechBubbleNText();
    animatePhonesInOrder();

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

        pronunciationController( expressionObject.abs[ synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ][ 'Viseme' ] ], synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ][ 'end' ], function() {
            
            
            synthesisObject.now.phoneCount += 1;
            animatePhonesInOrder()
                
        })

    } else if ( synthesisObject.now.phoneCount === synthesisObject.now.noOfPhones ) { 
        
        if ( !conversationVariables.promptSpeaking ) {
        
            continueStockPhrases();

        } else {

            continuePrompt();

        }

    }

}

function continueStockPhrases() {

    if ( synthesisObject.sentenceNo === synthesisObject.now.texts.length - 1 ) {

        if ( !conversationVariables.tutorial_complete ) {

            dealWithTutorialSpeakingEvents();

        }

        endTiaTalking();

    } else {

            
        expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {

            if ( !conversationVariables.tutorial_complete ) {
                
                dealWithTutorialSpeakingEvents();

            } 

            setTimeout( updateSentenceNumberAndAudioSrc, 500 );
       
        });

    }

}

function continuePrompt() {

    //console.log( '\nin continuePrompt\n' );
    //console.log( 'sentenceNo:', synthesisObject.sentenceNo );
    //console.log( 'sentenceNo:', synthesisObject.now );
    //console.log( '\nin continuePrompt\n' );
    //if last sentence then just show mic, but if more sentences to come then show 'next' button
    
    if ( synthesisObject.sentenceNo === synthesisObject.now.URLs.length - 1 ) {

        if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) { 
        
            speakJudgementM();

        } else {
            
            speakJudgementP();

        }

    } else {

        expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {

            setTimeout( updateSentenceNumberAndAudioSrc, 750 );
       
        });    

    }

}

function speakJudgementM() {

    if ( synthesisObject.sentenceNo === 0 ) {

        expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {
            
            buttonsListenNextSentence();

        } );

    } else {

        endTiaTalking();

    }

}

function speakJudgementP() {

    //console.log('in speakJudgementP')
    if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

        expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {
            
            buttonsListenNextSentenceWaiting();
            checkIfNewPromptArrived();

        } );

    } else {

        endTiaTalking();

    }

}
    
function updateSentenceNumberAndAudioSrc() {

    synthesisObject.sentenceNo += 1;
    //console.log( 'sentenceNo:', synthesisObject.sentenceNo );
    //console.log( 'synthesisObject.now.URLs[ synthesisObject.sentenceNo ]:', synthesisObject.now.URLs[ synthesisObject.sentenceNo ] );
    if ( synthesisObject.now.URLs[ synthesisObject.sentenceNo ] === undefined ) {

        endTiaTalking();

    } else {

        synthesisObject.newPromptArrived = false;
        synthesisObject.audio.src = prefixURL + 'media/' + synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
        buttonsListenNextSentence();

    }

}

function checkIfNewPromptArrived() {

    if ( synthesisObject.newPromptArrived ) {

        updateSentenceNumberAndAudioSrc();

    } else {

        if ( synthesisObject.awaiting_next_prompt_count < 500 ) {

            if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                if ( synthesisObject.awaiting_next_prompt_count % 100 === 0 ) {
                
                    console.log( 'awaiting_next_prompt_count in checkIfNewPromptArrived:', synthesisObject.awaiting_next_prompt_count );

                }

                synthesisObject.awaiting_next_prompt_count += 1;
                setTimeout( checkIfNewPromptArrived, 50 );

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

        if ( !conversationVariables.entranceSequence  && !conversationVariables.stage3) {

            setTimeout( function() {
            
                removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration * 3 );
                initInputReady();
                $('#prevSentsIconContainer').css('font-size', '17px');
                setTimeout( function() {

                    $('#prevSentsIconContainer').css('font-size', '15px');

                }, tiaTimings.speechBubbleFadeOutDuration * 3 )

            }, 750 );

        }
        
    });

}


function pronunciationController( expressionTo, phoneEndTime, cb ) {
    let weightedPhoneEndTime = phoneEndTime / 0.9;
    //console.log('weightedPhoneEndTime 0:', weightedPhoneEndTime)
    if(!conversationVariables.stage3){
        weightedPhoneEndTime = phoneEndTime / synthesisObject.audio.playbackRate;
    } else {
        weightedPhoneEndTime = phoneEndTime / synthesisObject.audioS3.playbackRate;
    }
    //console.log('weightedPhoneEndTime 1:',weightedPhoneEndTime)
    //console.log('in pronunciation controller')
    //console.log( 'phoneEndTime:', phoneEndTime );
    //console.log( 'phonneCount:', synthesisObject.now.phoneCount );
    expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
    expressionObject.now = getAbsoluteCoordsOfExpressionNow();
    expressionObject.movement = createRelativeExpression( expressionTo );
    expressionObject.callback = cb;
    
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






