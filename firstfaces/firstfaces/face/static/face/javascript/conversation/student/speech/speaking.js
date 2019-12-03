function tiaPrepareToSpeak( tiaSays, speakCb=function(){} ) {

    synthesisObject.sentenceNo = 0;
    synthesisObject.now = synthesisObject.data[ tiaSays ];
    synthesisObject.audio.src = prefixURL + synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
    synthesisObject.callback = speakCb;
    buttonsListenNextSentence();

}

function tiaSpeakButtonEvent() {

    buttonsHideAllContainers();
    if ( synthesisObject.sentenceNo === 0 ) {

        prepareHeadBobAndTalkingBoolOnFirstSentence()

    }

    $('#listenNextSentenceBtnCont').hide();
    tiaSpeakIndividualSentences();
    synthesisObject.audio.play();

}

function prepareHeadBobAndTalkingBoolOnFirstSentence() {

    headXRandomTiltObject.startCount = mainCount;
    headYRandomTiltObject.startCount = mainCount;
    synthesisObject.talking = true; 

}

function tiaSpeakIndividualSentences() {
    
    console.log( 'now in tiaSpeakIndividualSentences:', synthesisObject.now );

    synthesisObject.now.phoneCount = 1;

    if(conversationVariables.stage3){
        var new_duration = synthesisObject.now.duration / ((parseInt(document.getElementById("myRange").value)+20)/100);
        console.log(new_duration);
        synthesisObject.audioS3.src = synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
        synthesisObject.audioS3.playbackRate = conversationVariables.playspeed;
        synthesisObject.now.newDuration = new_duration;
        synthesisObject.now.noOfPhones = synthesisObject.now.visemes[ synthesisObject.sentenceNo ].length;
        synthesisObject.now.noOfFrames = Math.floor( (new_duration/1000) * 60 )
        synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );
        synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;
        synthesisObject.gotNewDuration = true;
        breatheObject.singleBreath.outCount = new_duration
        animateFirstPhoneSlowly();
    }
    else{
        animateFirstPhoneSlowly();
    }

}

function animateFirstPhoneSlowly() {

    // no breathing on short words or 3 words
    if ( !conversationVariables.stage3 ) {
    
        initSingleBreath( 1, breatheObject.speakingBreathMult, tiaTimings.durationOfFirstSpeakingPhones );
    
    }
       
    expressionController( expressionObject.abs[ synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ 0 ] ], tiaTimings.durationOfFirstSpeakingPhones, slightlyDelayAudioPlay )

    console.log( 'now in animateFirstPhoneSlowly:', synthesisObject.now );
}

function slightlyDelayAudioPlay() {

    if ( synthesisObject.sentenceNo === 0 ) { // only fade in bubble firt time

        showSpeechBubble( synthesisObject.now.texts[ 0 ], tiaTimings.speechBubbleFadeInDuration )
    
    } else {

        showSpeechText( synthesisObject.now.texts[ synthesisObject.sentenceNo ], tiaTimings.speechTextFadeInDuration )

    }

    if(conversationVariables.stage3){
        synthesisObject.audioS3.play();
        //console.log(synthesisObject.now.newDuration);
        //initSingleBreath( -1, breatheObject.speakingBreathMult, synthesisObject.now.newDuration );
    }
    else{
        //synthesisObject.audio.play();
        //console.log(synthesisObject.now.newDuration)
        initSingleBreath( -1, breatheObject.speakingBreathMult, synthesisObject.audio.duration );
     }

    animatePhonesInOrder();
        
}

function animatePhonesInOrder() {

    console.log( 'in animatePhonesInOrder:', synthesisObject.now );
    if ( synthesisObject.now.phoneCount < synthesisObject.now.noOfPhones ) {

        pronunciationController( expressionObject.abs[ synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ] ], animatePhonesInOrder )
        synthesisObject.now.phoneCount += 1;

    // check for last phone to also be run slowly
    } else if ( synthesisObject.now.phoneCount === synthesisObject.now.noOfPhones ) { 
        
        //if last sentence then just show mic, but if more sentences to come then show 'next' button
        if ( synthesisObject.sentenceNo === synthesisObject.data.prompt.texts.length - 1 ) {
    
            if ( conversationVariables.promptSpeaking && conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {
                    
                    buttonsListenNextSentenceWaiting();

                } );

                synthesisObject.currentPromptCount = synthesisObject.now.texts.length;
                checkForNewPrompt();

            } else if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].judgement === "M" ) { 
            
                if ( synthesisObject.sentenceNo === 0 ) {

                    expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {
                        
                        buttonsListenNextSentenceWaiting();

                    } );
            
                } else {

                    endTiaTalking();

                }

            } else {

                endTiaTalking();

            }
            
        } else {

            expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {

                setTimeout( updateSentenceNumberAndAudioSrc, 1000 );
           
            });    

        }

    }

}

function updateSentenceNumberAndAudioSrc() {

    synthesisObject.sentenceNo += 1;
    synthesisObject.audio.src = prefixURL + synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
    buttonsListenNextSentence();

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

            }, 2000 );

        }
        
    });

}

function checkForNewPrompt() {
    
    if ( synthesisObject.currentPromptCount < synthesisObject.data.prompt.texts.length ) {

        updateSentenceNumberAndAudioSrc();
        buttonsListenNextSentence();

    } else {

        setTimeout( checkForNewPrompt, 2000 );

    }

}


function pronunciationController( expressionTo, cb ) {

    expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
    expressionObject.now = getAbsoluteCoordsOfExpressionNow();
    expressionObject.movement = createRelativeExpression( expressionTo );
    expressionObject.callback = cb;
    initPronunciation();

}

//// general all-purpose method for all expressions
function initPronunciation() {

    // incase of really long phones bugginf out 
    //synthesisObject.now.noOfFramesPerPhone = Math.min( synthesisObject.now.noOfFramesPerPhone, 60 );
    if ( [ 'i', 'e', 'u' ].includes( synthesisObject.now.visemes[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ][ 0 ] ) ) {

        // -1 cause the frames run over
        expressionObject.sinLength = synthesisObject.now.noOfFramesPerPhone - 2;
        expressionObject.sin = sineArrays[ expressionObject.sinLength ];
    
    } else {

        // same her, but these can be tweeked to make vowels/consonants shorter/longer
        expressionObject.sinLength = synthesisObject.now.noOfFramesPerPhone - 1;
        expressionObject.sin = sineArrays[ expressionObject.sinLength ];

    }
    //console.log(synthesisObject.now.noOfFramesPerPhone)
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






