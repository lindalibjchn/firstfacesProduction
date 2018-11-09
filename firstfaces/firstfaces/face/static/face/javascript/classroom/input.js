function initInputReady( boxVal ) {

    $('#textInputContainer').show();
    $('#textInput').val( boxVal );
    $('#textInput').focus();
    $('#recordBtnsContainer').show();
    $('.record-btn').prop( "disabled", false );
    $('#controllerContainer').fadeIn( 1000 );

    //playback buttons disabled until recording done
    $('.play-btn').prop( "disabled", true);
    $('#talkBtn').prop( "disabled", true);

    $('#textInput').bind('input propertychange', function() {

        $('#listenSynthesisBtn').prop( "disabled", false );

        if ( classVariableDict.tutorial ) {

        } else {

            $('#talkBtn').prop( "disabled", false );

        }

    });

}


// after press talk button this does the logic, deciding whether to use synthesized voice or not depending on changes to the textbox

function talkToTia() {

    // stop blinking
    normalBlinkObject.bool = false;
    // check that final text box has been changed or not from recording
    let finalTextInBox = $('#textInput').val();

    synthesisObject.delayToThinkAndTurn = 1500 + finalTextInBox.length * 65;
    
    //no change from audio
    if ( finalTextInBox === synthesisObject.textFromSpeech ) {

        synthesisObject.synthAudio = document.getElementById('soundClip');
        synthesisObject.originalVoice = true;

    } else {

        synthesisObject.originalVoice = false;
        
        synthesisObject.pitch = 0;
        synthesisObject.speaking_rate = 0.85;
        synthesisObject.text = finalTextInBox;
        sendTTS( finalTextInBox, false, "talk" ); 

    }

    // fadeOut all prev sentences - this is to stop learners reading prev sents while should be looking at tia
    $('#prevSents').fadeTo( 500, 0.1 );
    $('#textInputContainer').hide();
    $('.record-btn').prop("disabled", true);
    $('#recordBtnsContainer').fadeOut( 1000 );
    
    setTimeout( function(){
        
        initCameraMove('tia', '2');
    
        setTimeout( function() {
            
            whenAllMovFinished( tiaLeanToListen )
                
        }, 3000 );

    
    }, 1500 );
    
    // get expression ready beforehand

}

function tiaLeanToListen() {

    initMove( leanObject, leanObject.coords.close, '1.5' );
    expressionController( expressionObject.abs.listening, '0.5', false ) 
    
    synthesisObject.waitingForSynthCount = 0;
    setTimeout( speakWords, 2000 );

}

function speakWords() {

    // stop normal blinking

    if ( synthesisObject.gotNewSpeech || synthesisObject.originalVoice ) {
        
        synthesisObject.waitingForSynthCount = 0;
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        setTimeout( tiaThinkAboutSentence, synthesisObject.delayToThinkAndTurn );

    } else {

        console.log('waiting for speech synthesis to return audio: ' + synthesisObject.waitingForSynthCount.toString())
        synthesisObject.waitingForSynthCount += 1;
        
        if ( synthesisObject.waitingForSynthCount > 6 ) {

            synthesisObject.waitingForSynthCount = 0;
            synthesisObject.gotNewSpeech = false
            tiaThinkAboutSentence();

        } else {

            setTimeout( speakWords, 1000 );

        }

    }

}

function goToThinkOrChangeExp() {

    if( classVariableDict.awaitingJudgement ) {

        whenAllMovFinished( goToThinkingPos );
        
    } else {

        whenAllMovFinished( runAfterJudgement );
        
    }
    
}

function tiaThinkAboutSentence() {
    
    initMove( leanObject, leanObject.coords.middle, '3' );
    setTimeout( function() {

        initSelectBlink( '0.1', 0.05 );

        setTimeout( function() {

            initSelectBlink( '0.1', 0.05 );

            setTimeout( function() {

                whenAllMovFinished( function() { 
     
                    expressionController( expressionObject.abs.neutral, '1', eyelids=false );
                    setTimeout( goToThinkOrChangeExp, 2000 );
                
                })

            }, 1000)

        }, 1000 );

    }, 1000 );

}


function goToThinkingPos() {

    // don't want to run runAfterJudgement if Tia is turning to think
    classVariableDict.goingToThinking = true;

    movementController( movements.think, '0.5', '2' );

    setTimeout( function() {
        
       whenAllMovFinished( setThinkingFace );
       
    }, 2100 );

}

function setThinkingFace() {

    expressionController( expressionObject.abs.thinking, '1.5', false );

    $('#thinkingLoading').show();

    setTimeout( function() {

        whenAllMovFinished( firstCheckAfterThinking );

    }, 2500)

}

function firstCheckAfterThinking() {

    classVariableDict.goingToThinking = false;

    if ( classVariableDict.awaitingJudgement === false ) {

        tiaThinkingObject.thinking = false;
        
        if ( classVariableDict.last_sent.judgement === "I" ) {

            $('#thinkingLoading').hide();
            setTimeout(runAfterJudgement, 600);

        } else {

            initReturnFromThinking();

        }

    } else {

        tiaThinkingObject.thinking = true;
        //normalBlinkObject.bool = true;
        setTimeout( thinkingEyes, 1000 );

    }

}

function thinkingEyes() { 

    //init solo talk like thinking
    //initTalk( true );
    
    normalBlinkObject.bool = false;

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

            normalBlinkObject.bool = true;
            setTimeout( function() {
                
                thinkingEyes()

            }, saccInterval );

        }, 1500 );

    }

}


function initReturnFromThinking() {

    //tiaThinkingObject.thinkingEyes = false;
    $('#thinkingLoading').hide();
     
    whenAllMovFinished( returnFromThinking );

}

function returnFromThinking() {

    //initMove( eyeObject, [[0,0,0],[tiaThinkingObject.startX, tiaThinkingObject.startY, 0]], '0.5' );
    movementController( movements.student, '0.5', '1.5' );
    
    normalBlinkObject.bool = false;
    setTimeout( function () {
        
        whenAllMovFinished( runAfterJudgement ); 
        
    }, 1600 );

} 















