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
        $('#talkBtn').prop( "disabled", false );

    });

}


// after press talk button this does the logic, deciding whether to use synthesized voice or not depending on changes to the textbox

function talkToTia() {

    // check that final text bax has been changed or not from recording
    let finalTextInBox = $('#textInput').val();
    synthesisObject.realSpeak = true;

    synthesisObject.delayToThinkAndTurn = finalTextInBox.length * 200;
    
    //no change from audio
    if ( finalTextInBox === synthesisObject.textFromSpeech ) {

        synthesisObject.synthAudio = document.getElementById('soundClip');

    } else {

        // learner has laready heard it through the listen button
        if ( synthesisObject.text === finalTextInBox ) {

            console.log('no need to create new one');

        } else {

            synthesisObject.pitch = 0;
            synthesisObject.speaking_rate = 0.85;
            synthesisObject.text = finalTextInBox;
            sendTTS( finalTextInBox, false, "talk" ); 

        }

    }

    // fadeOut all prev sentences - this is to stop learners reading prev sents while should be looking at tia
    $('#prevSents').fadeTo( 500, 0.1 );
    $('#textInputContainer').hide();
    $('.record-btn').prop("disabled", true);
    $('#recordBtnsContainer').fadeOut( 1000 );
    // normal blinking interferes with saccs
    normalBlinkObject.bool = false;
    setTimeout( function(){initCameraMove('tia', '2')}, 1000 );
    $.when(createSingleExpression( listeningExpression, 0.5 )).then(createRelativeExpression( calculatedExpression ))
    setTimeout( tiaLeanToListen, 3500 );

    // get expression ready beforehand


}

function tiaLeanToListen() {

    initMove( leanObject, leanObject.coords.close, '1.5' );
    initExpression( relativeExpression, '0.5' );
    
    setTimeout( speakWords, 2000 );

}

function speakWords() {

    // stop normal blinking

    synthesisObject.synthAudio.play();

    setTimeout( tiaThinkAboutSentence, synthesisObject.delayToThinkAndTurn );

}

function tiaThinkAboutSentence() {
    
    initMove( leanObject, leanObject.coords.middle, '3' );
    setTimeout( function() {

        initSelectBlink( '0.1', 0.05 );

        setTimeout( function() {

            initSelectBlink( '0.1', 0.05 );

            setTimeout( function() {
            
                if( classVariableDict.awaitingJudgement ) {

                    goToThinkingPos();
                    
                } else {

                    runAfterJudgement();
                    
                }
            
            }, 3000 );

        }, 1000 );

    }, 1000 );

}


function goToThinkingPos() {

    // don't want to run runAfterJudgement if Tia is turning to think
    classVariableDict.goingToThinking = true;

    console.log('in goToThinkingPos');
    $.when(createRelativeMovement( thinkMovement )).then( initMovement( relativeMovement, '0.5', '2' ));

    setTimeout( setThinkingFace, 2500 );

}

function setThinkingFace() {

    $.when($.when(createSingleExpression( thinkingExpression, 1 )).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '2' ));
    $('#thinkingLoading').show();

    //setTimeout( thinkingEyes, 2000 );

    setTimeout( function() {

        classVariableDict.goingToThinking = false;
        classVariableDict.thinking = true;

        if ( classVariableDict.awaitingJudgement === false ) {

            if ( classVariableDict.last_sent.judgement !== "I" ) {

                initReturnFromThinking();

            } else {

                normalBlinkObject.bool = false;
                classVariableDict.thinking = false;
                //return eyes to original thinking position
                $('#thinkingLoading').hide();
                setTimeout(runAfterJudgement, 600);

            }

        } else {

            normalBlinkObject.bool = true;

        }

    }, 2250)

}

//function thinkingEyes() { 

    ////init solo talk like thinking
    ////initTalk( true );
    
    //if ( tiaThinkingObject.thinkingEyes ) {

        //$('#thinkingLoading').show();

        //// get random sacc time between 1-4seconds
        //let saccInterval = Math.floor(Math.random() * 2000) + 1000;
        
        //let randomSaccX = tiaThinkingObject.startX + Math.random() * tiaThinkingObject.maxX;
        //let randomSaccY = tiaThinkingObject.startY + Math.random() * tiaThinkingObject.maxY;

        //let saccCoords = [[0,0,0],[randomSaccX, randomSaccY, 0]];

        //initMove( eyeObject, saccCoords, '0.5' );

        //setTimeout( thinkingEyes, saccInterval );

    //}

//}


function initReturnFromThinking() {

    //tiaThinkingObject.thinkingEyes = false;
    $('#thinkingLoading').hide();
     
    setTimeout( returnFromThinking, 600 );

}

function returnFromThinking() {

    //initMove( eyeObject, [[0,0,0],[tiaThinkingObject.startX, tiaThinkingObject.startY, 0]], '0.5' );
    $.when(createRelativeMovement( studentMovement )).then( initMovement( relativeMovement, '0.5', '1.5' ));
    
    normalBlinkObject.bool = false;
    setTimeout( runAfterJudgement, 1000 );


} 















