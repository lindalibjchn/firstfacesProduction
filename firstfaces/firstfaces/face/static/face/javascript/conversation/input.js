function initInputReady( from ) {
    conversationVariables.stage2 = false;
    conversationVariables.stage3 = false;
    //$('#textInputContainer').show();
    //hideTextStuff();
    //hideVolumeBar();
    //$('#textInput').val( boxVal );
    //$('#textInput').focus();
    //$('#recordBtnsCont').show();
    
    // removes speech bubble after user has a few second to read it
    //removeSpeechBubble( tiaTimings.changeExpression * 2000 );                   
    if ( conversationVariables.tutorial === false ) {

        $('.record-btn').prop( "disabled", false );
    
    }

    //$('#controllerContainer').fadeIn( 1000 );

    if ( from === 'try again' ) {

        $( '#textInputContainer' ).fadeIn();
        $( '#sentenceShowHolder').fadeIn();
        $('.play-btn').hide();
        reset_text(conversationVariables.preSent)

    } else {

        $( '#sentenceShowHolder').hide();
        $('.play-btn').prop( "disabled", true).hide();
    
    }

    //playback buttons disabled until recording done
    $('#recordBtnsCont').fadeIn(1000)
    //hide correctTranscript
    $('#correctTranscript').hide();
    //hide back button
    $('#backErrorSelection').hide();
    // hide forward button
    $('#forwardErrorSelection').hide();
    
    $('#backCorrection').hide();
    $('#submitCorrectedErrors').hide();
    
    //openOverlay();

    //  for development
    //$('#talkBtn').prop( "disabled", false).show();
    //showOptionBtns();
    //$('#whatsWrongBtn').hide()
    //$('#showCorrectionBtn').css('display', 'flex')

    //if ( conversationVariables.tutorial === false ) {

     //$('#textInput').bind('input propertychange', function() {

            //$('#playRobot').show();
            //$('#talkBtn').prop( "disabled", false );

        //});

    //}

}

//function delayForListening( text ) {

    //// gonna use dans actual length of audio for this
    //var speechDuration;
    //if ( synthesisObject.originalVoice ) {

        //speechDuration = aud.duration;
    
    //} else {

        //if ( synthesisObject.ttsServerFault ) {
         
            //speechDuration = Infinity;

        //} else {

            //speechDuration = synthesisObject.synthAudio.duration;

        //}

    //}

    //if ( speechDuration !== Infinity ) {

        //delay = speechDuration * 1000 + tiaTimings.delayAfterStudentSpeech; // cause it's in seconds
        //console.log('real delay:', delay)

    //} else {

        //// if the above is infinity it means it hasn't read it and need to calc by length of characters
        //delay = text.length * 90 * ( 1 / synthesisObject.speaking_rate ) + tiaTimings.delayAfterStudentSpeech;
        //console.log('calc delay:', delay)

    //}

    //return delay;

//}


// after press talk button this does the logic, deciding whether to use synthesized voice or not depending on changes to the textbox

function talkToTia() {

    // check that final text box has been changed or not from recording
    // for development
    //synthesisObject.finalTextInBox = $('#textInput').val();
    synthesisObject.finalTextInBox = conversationVariables.preSent;

    ////no change from audio
    //if ( synthesisObject.finalTextInBox === synthesisObject[ 'transcript' + synthesisObject.transcriptCur ] ) {

    synthesisObject.originalVoice = true;

    //} else {

        //synthesisObject.originalVoice = false;
        //synthesisObject.pitch = 0;
        //synthesisObject.speaking_rate = 0.85;
        //synthesisObject.text = synthesisObject.finalTextInBox;
        //sendTTS( synthesisObject.finalTextInBox, false, "talk" ); 

    //}


    // fadeOut all prev sentences - this is to stop learners reading prev sents while should be looking at tia
    //$('#prevSents').fadeTo( 500, 0.1 );
    //$('#textInputContainer').hide();
    $('.record-btn').prop("disabled", true);
    $('#recordBtnsCont').fadeOut( 500 );
    
    setTimeout( tiaLeanToListen, 500 );
    
}

function tiaLeanToListen() {

    initMove( leanObject, leanObject.coords.close, tiaTimings.tiaLeanDuration );
    expressionController( expressionObject.abs.listening, 0.3) 
    
    synthesisObject.waitingForSynthCount = 0;
    setTimeout( speakWords, tiaTimings.tiaLeanDuration * 2 );

}

function speakWords() {
    recTimes.startSpeak = Date.now() / 1000;
    if(conversationVariables.usePlayAud){
        play_audio()      
        conversationVariables.usePlayAud = false;
    }
    else{
        //if ( synthesisObject.originalVoice ) {

        //synthesisObject.speechDuration = delayForListening( synthesisObject.finalTextInBox );
        aud.play();
        //synthesisObject.gotNewSpeech = false;
        //synthesisObject.waitingForSynthCount = 0;
        }
    setTimeout( tiaThinkAboutSentence, conversationVariables.totalAudioLength );
        
    //} else if ( synthesisObject.gotNewSpeech ) {

        //recTimes.startSpeak = Date.now() / 1000;
        //synthesisObject.speechDuration = delayForListening( synthesisObject.finalTextInBox );
        //synthesisObject.synthAudio.play();
        //synthesisObject.waitingForSynthCount = 0;
        ////synthesisObject.gotNewSpeech = false;
        //setTimeout( tiaThinkAboutSentence, synthesisObject.speechDuration );

    //} else {

        //console.log('waiting for speech synthesis to return audio: ' + synthesisObject.waitingForSynthCount.toString())
        //synthesisObject.waitingForSynthCount += 1;
        
        //if ( synthesisObject.waitingForSynthCount > 6 ) {

            //synthesisObject.waitingForSynthCount = 0;
            ////synthesisObject.gotNewSpeech = false
            //tiaThinkAboutSentence();

        //} else {

            //setTimeout( speakWords, 1000 );

        //}

    //}}

}

function tiaThinkAboutSentence() {
    
    recTimes.finishSpeak = Date.now() / 1000;
    // gonna make all sentences go through Tia's brain for effect
    // check if quick judgement has come
    //if ( conversationVariables.awaitingJudgement === false ) {

        ////runAfterJudgement();
        //runAfterJudgementWithoutBeingAtTurnToThink()
        //recTimes.changeExpressionImmediately = Date.now() / 1000;
    
    //} else {

    goToThinkingPos();
    //initMove( leanObject, leanObject.coords.middle, tiaTimings.tiaLeanDuration * 2 );
    //setTimeout( function() {
     
        //if ( conversationVariables.awaitingJudgement === false ) {

            //runAfterJudgementWithoutBeingAtTurnToThink();
            //recTimes.changeExpressionAfterLeanBack = Date.now() / 1000;

        //} else {

            //setTimeout( function() {

            //if ( conversationVariables.awaitingJudgement === false ) {

                //recTimes.changeExpressionBeforeTurningToThink = Date.now() / 1000;
                //runAfterJudgementWithoutBeingAtTurnToThink();

            //} else {

                //goToThinkingPos();
    setTimeout( addThoughtBubbles, tiaTimings.delayToAddThoughtBubbles );

            //}

            //}, tiaTimings.delayBeforeGoingToThinkingPos );
        

    //}, tiaTimings.toThinkDuration );

    //}

}

function goToThinkingPos() {

    // don't want to run runAfterJudgement if Tia is turning to think
    //conversationVariables.goingToThinking = true;

    movementController( movementObject.rel.think, tiaTimings.toThinkDuration / 3, tiaTimings.toThinkDuration );

}

var wordThinkingCount = 0;
function showTiaThinkingOverWords() {

    if ( wordThinkingCount % 2 === 0 ) {

        if (wordThinkingCount === 0 ) {

            $('#thinkingWords').hide();
            $('#thinkingWords1').hide();
            $('#thinkingWords').text( synthesisObject.wordList[ wordThinkingCount ] );
            $('#thinkingWords').fadeIn( tiaTimings.wordFade );

        } else {

            $('#thinkingWords').text( synthesisObject.wordList[ wordThinkingCount ] );

            $('#thinkingWords1').fadeOut( tiaTimings.wordFade );
            setTimeout( function() {

                $('#thinkingWords').fadeIn( tiaTimings.wordFade );

            }, 50 );

        }

    } else {

        $('#thinkingWords1').text( synthesisObject.wordList[ wordThinkingCount ] );

        $('#thinkingWords').fadeOut( tiaTimings.wordFade );
        setTimeout( function() {

            $('#thinkingWords1').fadeIn( tiaTimings.wordFade );

        }, 50 );

    }

    let wordLength = synthesisObject.wordList[ wordThinkingCount ].length
    let wordDelay = tiaTimings.wordFade + wordLength * tiaTimings.wordFade / 2;
    wordThinkingCount += 1;

    if ( wordThinkingCount < synthesisObject.wordList.length ) {
        
        setTimeout( showTiaThinkingOverWords, wordDelay );

    } else {

        wordThinkingCount = 0;
        setTimeout( function() {

            $('#thinkingWords').fadeOut( tiaTimings.wordFade );
            $('#thinkingWords1').fadeOut( tiaTimings.wordFade );

            if ( conversationVariables.awaitingJudgement ) {

                setTimeout( function() {
                    
                    if ( conversationVariables.awaitingJudgement ) {
                    
                        showTiaThinkingOverWords();
                        
                    } else {

                        judgementReceivedInThinkingPos();

                    }

                }, 1500 );

            } else {

                judgementReceivedInThinkingPos();

            }

        }, wordDelay * 2 )

    }

}

function addThoughtBubble( no ) {

    //if ( conversationVariables.awaitingJudgement === false ) {
    
        //removeThoughtBubbles();
        //judgementReceivedInThinkingPos();

    //} else {

    recTimes.thoughtBubblesAdded = Date.now() / 1000;
    if ( no === 0 ) {

        $('#thoughtBubble0').fadeIn( 250 );

    } else if ( no === 1 ) {

        $('#thoughtBubble1').fadeIn( 250 );
        $('#thoughtBubble0').fadeOut( 250 );
        
    } else if ( no === 2 ) {

        $('#thoughtBubble1').fadeOut( 250 );
        $('#thoughtBubble2').fadeIn( 250 );
        
    } else if ( no === 3 ) {

        $('#thoughtBubble2').fadeOut( 1000 );
        $('#thoughtBubble3').fadeIn( 1000 );
        $('#thinkingWords0').text( '' )
        $('#thinkingWords1').text( '' )
        $('#thinkingWordsCont').css('display', 'flex'); 
        synthesisObject.wordList = synthesisObject.finalTextInBox.split(" ");
        conversationVariables.showThoughtBubble = true;
     
        //if ( conversationVariables.awaitingJudgement ) {

        setTimeout( function() {
            
            showTiaThinkingOverWords();

        }, 1500 );

        //} else {

            //judgementReceivedInThinkingPos();

        //}

    }

    setTimeout( function() {

        if ( no < 4 ) {

            addThoughtBubble( no + 1 );

        } else {

            thinkingEyes();

        }

    }, tiaTimings.thoughtBubbleAddDelay )

    //}

}

function removeThoughtBubbles() {

    $('.thought-bubbles').fadeOut( tiaTimings.removeThoughtBubble );
    $('#thinkingWordsCont').css('display', 'none'); 

}

function addThoughtBubbles() {

    //expressionController( expressionObject.abs.thinking, '1.5', false );


    //conversationVariables.goingToThinking = false;
    //tiaThinkingObject.thinking = true;

    addThoughtBubble( 0 );

    //whenAllMovFinished( firstCheckAfterThinking );

}

function judgementReceivedInThinkingPos() {

    recTimes.judgementReceivedInThinkingPos = Date.now() / 1000;
    tiaThinkingObject.thinking = false;
    removeThoughtBubbles();
    
    setTimeout( function() {

        if ( conversationVariables.last_sent.judgement === "I" ) {

            expressionController( calculatedExpression, tiaTimings.changeExpression );
            runAfterJudgement();

        } else {

            returnFromThinking();

        }

    }, tiaTimings.removeThoughtBubble );

}

function thinkingEyes() { 

    //init solo talk like thinking
    //initTalk( true );
    
    //normalBlinkObject.bool = false;

    if ( tiaThinkingObject.thinking ) {
        
        // get random sacc time between 1-4seconds
        let saccInterval = Math.floor(Math.random() * 3000) + 1000;

        if ( blinkObject.bool === false ) {

            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let randomSaccX = tiaThinkingObject.startX + plusOrMinus * Math.random() * tiaThinkingObject.maxX;
            let randomSaccY = tiaThinkingObject.startY + Math.random() * tiaThinkingObject.maxY;

            let saccCoords = [[0,0,0],[randomSaccX, randomSaccY, 0]];

            movementNow.sacc = saccCoords;
            initSacc( saccCoords, '0.75', false );

        }

        setTimeout( function() {

            //normalBlinkObject.bool = true;
            setTimeout( function() {
                
                thinkingEyes()

            }, saccInterval );

        }, 1500 );

    }

}

//function runAfterJudgementWithoutBeingAtTurnToThink() {

    //if ( conversationVariables.last_sent.judgement === "I" ) {
    
        //runAfterJudgement();

    //} else {

        //expressionController( calculatedExpression, tiaTimings.changeExpression );
    
        //setTimeout( function() {
            
            //runAfterJudgement();

        //}, tiaTimings.changeExpression * 750 ) // want nod/move to confused to happen before expression change ends

    //}

//}

function returnFromThinking() {

    expressionController( calculatedExpression, tiaTimings.changeExpression );

    setTimeout( function() {

        movementController( movementObject.rel.blank, tiaTimings.returnFromThinking / 2, tiaTimings.returnFromThinking );

        setTimeout( runAfterJudgement, tiaTimings.returnFromThinking * 750 ); // want nod to happen before movement back ends
    
    }, tiaTimings.changeExpression * 250 );

} 















