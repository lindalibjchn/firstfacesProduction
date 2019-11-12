function tiaSpeak( tiaSays, cont=true, speakCb=function(){} ) {

    // tiaSays is an identifier in the synthesisObject object which contains the string, phones and URL for the wav file
    // cont=true if tia speaks multiple sentences one after the other. If false (usually prompt) a button will apppear for the user to click before continuing

    $('#recordBtnsCont').hide();
    synthesisObject.sentenceNo = 0; // this iterates when multiple sentences need to be spoken
    synthesisObject.continuous = cont;

    // put this on page load somewhere so not calling it every time
    synthesisObject.now = synthesisObject.data[ tiaSays ];
    synthesisObject.callback = speakCb;

    headXRandomTiltObject.startCount = mainCount;
    headYRandomTiltObject.startCount = mainCount;
    synthesisObject.talking = true; 
    //getIntoSpeakingPosition();
    tiaSpeakIndividualSentences();

}

//function getIntoSpeakingPosition() {

    //// move from whatever expression into the half of it
    //expressionController( expressionObject.half, tiaTimings.getIntoSpeakingPositionDuration, tiaSpeakIndividualSentences );

//}

function tiaSpeakIndividualSentences() {

    synthesisObject.talking = true;
    if(conversationVariables.stage3){
        var new_duration = synthesisObject.now.duration / ((parseInt(document.getElementById("myRange").value)+20)/100);
        console.log(new_duration);
        synthesisObject.audioS3.src = synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
        synthesisObject.audioS3.playbackRate = conversationVariables.playspeed;
        synthesisObject.now.newDuration = new_duration;
        synthesisObject.now.noOfPhones = synthesisObject.now.phones[ synthesisObject.sentenceNo ].length;
        synthesisObject.now.noOfFrames = Math.floor( (new_duration/1000) * 60 )
        synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );
        synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;
        synthesisObject.gotNewDuration = true;
        breatheObject.singleBreath.outCount = new_duration
        animateFirstPhoneSlowly();
    }
    else{
        synthesisObject.audio.src = synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
        holdOnUntilNewAudioDurationIsAvailable()
    }

    synthesisObject.now.phoneCount = 1;

}

function holdOnUntilNewAudioDurationIsAvailable() {

    // this should upload automatically from 'ondurationchange' in <load_scene/main.js>, but it sometimes takes a while... so need to do this before carrying on with next step
    if ( synthesisObject.gotNewDuration ) {

        synthesisObject.gotNewDuration = false;

        animateFirstPhoneSlowly();


    } else {

        setTimeout( holdOnUntilNewAudioDurationIsAvailable, 50 );

    }

}


function animateFirstPhoneSlowly() {

    // no breathing on short words or 3 words
    if ( !conversationVariables.stage3 ) {
    
        initSingleBreath( 1, breatheObject.speakingBreathMult, tiaTimings.durationOfFirstSpeakingPhones );
    
    }
       
    expressionController( expressionObject.abs[ synthesisObject.now.phones[ synthesisObject.sentenceNo ][ 0 ] ], tiaTimings.durationOfFirstSpeakingPhones, slightlyDelayAudioPlay )

}

function slightlyDelayAudioPlay() {

    if ( synthesisObject.sentenceNo === 0 ) { // only fade in bubble firt time

        showSpeechBubble( synthesisObject.now.texts[ 0 ], tiaTimings.speechBubbleFadeInDuration )
    
    } else {

        showSpeechText( synthesisObject.now.texts[ synthesisObject.sentenceNo ], tiaTimings.speechTextFadeInDuration )

    }

    setTimeout( function() {

            if(conversationVariables.stage3){
                synthesisObject.audioS3.play();
                console.log(synthesisObject.now.newDuration);
                //initSingleBreath( -1, breatheObject.speakingBreathMult, synthesisObject.now.newDuration );
            }
            else{
                synthesisObject.audio.play();
                console.log(synthesisObject.now.newDuration)
                initSingleBreath( -1, breatheObject.speakingBreathMult, synthesisObject.audio.duration );
             }

    }, tiaTimings.delayAudioPlay );

    animatePhonesInOrder();
        
}

function animatePhonesInOrder() {

    if ( synthesisObject.now.phoneCount < synthesisObject.now.noOfPhones ) {

        pronunciationController( expressionObject.abs[ synthesisObject.now.phones[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ] ], animatePhonesInOrder )
        synthesisObject.now.phoneCount += 1;

    // check for last phone to also be run slowly
    } else if ( synthesisObject.now.phoneCount === synthesisObject.now.noOfPhones ) { 
        
        //if last sentence then just show mic, but if more sentences to come then show 'next' button
        if ( synthesisObject.sentenceNo === synthesisObject.now.texts.length - 1 ) {
    
            synthesisObject.talking = false;
            expressionController( expressionObject.half, tiaTimings.durationOfReturnToExpressionAfterVeryLastSpeakingPhone );
            movementController( movementObject.abs.blank, 1, 1, function() {

                synthesisObject.callback();
                if ( !conversationVariables.entranceSequence ) {

                    buttonsMicrophoneOnly();

                }
                
            });

        } else {

            if ( synthesisObject.continuous ) {

                setTimeout( listenToNextSentence, tiaTimings.speechTextFadeOutDuration );

            } else {

                expressionController( expressionObject.quarter, tiaTimings.durationOfLastSpeakingPhones, function() {

                    buttonsListenNextSentence();
               
                });    

            }

        }

    }

}

function listenToNextSentence() {

    $('#listenNextSentenceBtnCont').hide();
    synthesisObject.sentenceNo += 1;
    removeSpeechText( tiaTimings.speechTextFadeOutDuration, function() {
        
        tiaSpeakIndividualSentences();

    })

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
    if ( [ 'i', 'e', 'u' ].includes( synthesisObject.now.phones[ synthesisObject.sentenceNo ][ synthesisObject.now.phoneCount ][ 0 ] ) ) {

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






