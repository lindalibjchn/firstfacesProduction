function initInputReady( boxVal ) {

    $('#textInputContainer').show();
    hideTextStuff();
    hideVolumeBar();
    $('#textInput').val( boxVal );
    $('#textInput').focus();
    $('#recordBtnsContainer').show();
    $('.record-btn').prop( "disabled", false );
    $('#controllerContainer').fadeIn( 1000 );

    //playback buttons disabled until recording done
    $('.play-btn').prop( "disabled", true);
    $('#talkBtn').prop( "disabled", true);

    $('#textInput').bind('input propertychange', function() {

        $('#playRobot').show();

        if ( classVariableDict.tutorial ) {

        } else {

            $('#talkBtn').prop( "disabled", false );

        }

    });

}

function delayForListening( text ) {

    var speechDuration;
    if ( synthesisObject.originalVoice ) {

        speechDuration = aud.duration;
    
    } else {

        speechDuration = synthesisObject.synthAudio.duration;

    }

    if ( speechDuration !== Infinity ) {

        delay = speechDuration * 1000 + tiaTimings.delayAfterStudentSpeech; // cause it's in seconds
        console.log('real delay:', delay)

    } else {

        // if the above is infinity it means it hasn't read it and need to calc by length of characters
        delay = text.length * 90 + tiaTimings.delayAfterStudentSpeech;
        console.log('calc delay:', delay)

    }

    return delay;

}


// after press talk button this does the logic, deciding whether to use synthesized voice or not depending on changes to the textbox

function talkToTia() {

    // check that final text box has been changed or not from recording
    synthesisObject.finalTextInBox = $('#textInput').val();

    //no change from audio
    if ( synthesisObject.finalTextInBox === synthesisObject[ 'transcript' + synthesisObject.transcriptCur ] ) {

        synthesisObject.originalVoice = true;

    } else {

        synthesisObject.originalVoice = false;
        synthesisObject.pitch = 0;
        synthesisObject.speaking_rate = 0.85;
        synthesisObject.text = synthesisObject.finalTextInBox;
        sendTTS( synthesisObject.finalTextInBox, false, "talk" ); 

    }


    // fadeOut all prev sentences - this is to stop learners reading prev sents while should be looking at tia
    $('#prevSents').fadeTo( 500, 0.1 );
    $('#textInputContainer').hide();
    $('.record-btn').prop("disabled", true);
    $('#recordBtnsContainer').fadeOut( 500 );
    
    setTimeout( function(){
        
        initCameraMove('tia', tiaTimings.cameraMoveUpDuration);
    
        setTimeout( function() {
            
            //whenAllMovFinished( tiaLeanToListen )
            tiaLeanToListen();
                
        }, tiaTimings.cameraMoveUpDuration * 700 );//2/3 of camera move up duration

    
    }, tiaTimings.delayAfterClickPlayUntilCameraMovesUp );
    
    // get expression ready beforehand

}

function tiaLeanToListen() {

    initMove( leanObject, leanObject.coords.close, tiaTimings.tiaLeanDuration );
    expressionController( expressionObject.abs.listening, '0.3') 
    
    synthesisObject.waitingForSynthCount = 0;
    let leanAndSpeakDelay = tiaTimings.tiaLeanDuration * 1000 + tiaTimings.delayUntilSpeakWords;
    setTimeout( speakWords, leanAndSpeakDelay );

}

function speakWords() {

    if ( synthesisObject.originalVoice ) {

        synthesisObject.speechDuration = delayForListening( synthesisObject.finalTextInBox );
        aud.play();
        synthesisObject.gotNewSpeech = false;
        synthesisObject.waitingForSynthCount = 0;
        setTimeout( tiaThinkAboutSentence, synthesisObject.speechDuration );
        
    } else if ( synthesisObject.gotNewSpeech ) {

        synthesisObject.speechDuration = delayForListening( synthesisObject.finalTextInBox );
        synthesisObject.synthAudio.play();
        synthesisObject.waitingForSynthCount = 0;
        synthesisObject.gotNewSpeech = false;
        setTimeout( tiaThinkAboutSentence, synthesisObject.speechDuration );

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

        goToThinkingPos();

        setTimeout( addThoughtBubbles, 1500 );
        
    } else {

        runAfterJudgement();
        
    }
    
}

function tiaThinkAboutSentence() {
    
    // check if quick judgement has come
    if ( classVariableDict.awaitingJudgement === false ) {

        runAfterJudgement();

    } else {

        initMove( leanObject, leanObject.coords.middle, tiaTimings.tiaLeanDuration );
        setTimeout( function() {
         
            goToThinkOrChangeExp();

        }, tiaTimings.tiaLeanDuration * 1000 + tiaTimings.delayBeforeGoingToThinkingPos );

    }

}


function goToThinkingPos() {

    // don't want to run runAfterJudgement if Tia is turning to think
    classVariableDict.goingToThinking = true;

    movementController( movements.think, tiaTimings.toThinkDuration / 3, tiaTimings.toThinkDuration );

}

var wordThinkingCount = 0;
function showTiaThinkingOverWords() {

    let delay = 1000;
    let fade = 300;

    if ( wordThinkingCount % 2 === 0 ) {

        if (wordThinkingCount === 0 ) {

            $('#thinkingWords').hide();
            $('#thinkingWords1').hide();
            $('#thinkingWords').text( synthesisObject.wordList[ wordThinkingCount ] );
            $('#thinkingWords').fadeIn( fade );

        } else {

            $('#thinkingWords').text( synthesisObject.wordList[ wordThinkingCount ] );

            $('#thinkingWords1').fadeOut( fade );
            setTimeout( function() {

                $('#thinkingWords').fadeIn( fade );

            }, 50 );

        }

    } else {

        $('#thinkingWords1').text( synthesisObject.wordList[ wordThinkingCount ] );

        $('#thinkingWords').fadeOut( fade );
        setTimeout( function() {

            $('#thinkingWords1').fadeIn( fade );

        }, 50 );

    }

    let wordLength = synthesisObject.wordList[ wordThinkingCount ].length
    let wordDelay = fade + wordLength * 150;
    wordThinkingCount += 1;

    if ( wordThinkingCount < synthesisObject.wordList.length ) {
        
        setTimeout( showTiaThinkingOverWords, wordDelay );

    } else {

        wordThinkingCount = 0;
        setTimeout( function() {

            $('#thinkingWords').fadeOut( fade );
            $('#thinkingWords1').fadeOut( fade );

            setTimeout( showTiaThinkingOverWords, 2500 );

        }, wordDelay )

    }

}

function addThoughtBubble( no ) {

    if ( classVariableDict.awaitingJudgement === false ) {
    
        removeThoughtBubbles();
        judgementReceivedInThinkingPos();

    } else {

        if ( no === 0 ) {

            $('#thoughtBubble00').fadeIn( 250 );

        } else if ( no === 1 ) {

            $('#thoughtBubble01').fadeIn( 250 );
            
        } else if ( no === 2 ) {

            $('#thoughtBubble00').hide();
            $('#thoughtBubble02').fadeIn( 250 );
            
        } else if ( no === 3 ) {

            $('#thoughtBubble01').hide();
            $('#thoughtBubble03').fadeIn( 1000 );
            $('#thinkingWords').text( '' )
            $('#thinkingWords1').text( '' )
            $('#thinkingLoading').css('display', 'flex'); 
            synthesisObject.wordList = synthesisObject.finalTextInBox.split(" ");
            classVariableDict.showThoughtBubble = true;
            
            setTimeout( function() {
                
                showTiaThinkingOverWords();

            }, 1500 );

        } else {

            $('#thoughtBubble02').hide();
            //keep checking move eyes

        }

        setTimeout( function() {

            if ( no < 4 ) {

                addThoughtBubble( no + 1 );

            } else {

                thinkingEyes();

            }

        }, tiaTimings.thoughtBubbleAddDelay )

    }

}

function removeThoughtBubbles() {

    $('.thought-bubbles').fadeOut( 500 );
    $('#thinkingLoading').css('display', 'none'); 

}

function addThoughtBubbles() {

    //expressionController( expressionObject.abs.thinking, '1.5', false );
    //$('#thinkingLoading').show();


    classVariableDict.goingToThinking = false;
    tiaThinkingObject.thinking = true;

    addThoughtBubble( 0 );

    //whenAllMovFinished( firstCheckAfterThinking );

}

function judgementReceivedInThinkingPos() {

    tiaThinkingObject.thinking = false;
    
    if ( classVariableDict.last_sent.judgement === "I" ) {

        $('#thinkingLoading').hide();
        setTimeout(runAfterJudgement, 600);

    } else {

        initReturnFromThinking();

    }

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


function initReturnFromThinking() {

    //tiaThinkingObject.thinkingEyes = false;
    $('#thinkingLoading').hide();
     
    //whenAllMovFinished( returnFromThinking );
    returnFromThinking();

}

function returnFromThinking() {

    //initMove( eyeObject, [[0,0,0],[tiaThinkingObject.startX, tiaThinkingObject.startY, 0]], '0.5' );
    movementController( movements.student, '0.5', '1.5' );
    
    //normalBlinkObject.bool = false;
    setTimeout( function () {
        
        //whenAllMovFinished( runAfterJudgement ); 
        runAfterJudgement(); 
        
    }, 1600 );

} 















