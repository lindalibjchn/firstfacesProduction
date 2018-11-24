function runAfterJudgement() {

    // logic for different types of judgement
    
    // in return to laptop, movement will only be needed if tia not looking straight at student
    //classVariableDict.tiaLookingAtStudent = true;

    // get duration of nod or shake. Can also be 0o
    let nodShakeDur = 0;
    if ( classVariableDict.last_sent.nod !== null ) {
    
        nodShakeDur = parseFloat( getNodSpeedInString() ) * 1000;

    }

    if ( classVariableDict.last_sent.judgement === "C" ) {

        if ( classVariableDict.last_sent.nod !== null ) {
                
            nodOrShakeHead()

        } else {

            setTimeout( function() {

                returnToLaptop( '' )

            }, tiaTimings.delayBeforeReturnToLaptop );

        }
        
    } else if ( classVariableDict.last_sent.judgement === "P" ) {

        if ( classVariableDict.last_sent.nod !== null ) {

            nodOrShakeHead()
            setTimeout( prePrepareForPromptSpeech, nodShakeDur - 500 );

        } else {

            prePrepareForPromptSpeech();

        }

    } else if ( classVariableDict.last_sent.judgement === "I" ) {

        movementController( movements.confused01, tiaTimings.movementToConfused / 2, tiaTimings.movementToConfused );

        addToPrevSents(classVariableDict.last_sent);
        
        setTimeout( function() {
            
            expressionController( expressionObject.abs.confused, tiaTimings.changeExpression );

            setTimeout( showOptionBtns, 2000 );

        }, 1600 )

    } else if ( classVariableDict.last_sent.judgement === "B" || classVariableDict.last_sent.judgement === "M" || classVariableDict.last_sent.judgement === "D" || classVariableDict.last_sent.judgement === "3" ) {

        synthesisObject.speaking_rate = 0.8;
        // delay for moving back to laptop and showing sent in prevSents
        //let delay = 5000;
        var text;
        if ( classVariableDict.last_sent.judgement === "B" ) {

            prePrepareForPromptSpeech();
            
        } else if ( classVariableDict.last_sent.judgement === "M" ) {
            
            prePrepareForPromptSpeech();
        
        } else if ( classVariableDict.last_sent.judgement === "3" ) {
            
            displaySpeechBubblePrompt();
        
        } else if ( classVariableDict.last_sent.judgement === "D" ) {

            nodOrShakeHead()
            setTimeout( displaySpeechBubblePrompt, nodShakeDur - 500 );

        }


    }
    
    
}

// check if expression has finished running
//whenAllMovFinishedCount = 0;
//var whenAllMovFinished = function( funcToCall ) {

    //console.log( 'in whenAllMovFinished:', whenAllMovFinishedCount );
    //if ( expressionObject.bool || cameraObject.bool || movementObject.bool || eyelidObject.bool || eyeObject.bool || blinkObject.bool || normalBlinkObject.bool || nodObject.bool || shakeObject.bool ) {
      
        //if ( whenAllMovFinishedCount < 3000 ) {

            //whenAllMovFinishedCount += 500;

            //setTimeout( function() {
                 
                //whenAllMovFinished( funcToCall );

            //}, 500 );

            //console.log( 
                    //"movementObject.bool : ", movementObject.bool.toString() + 
                    //"\neyelidObject.bool : ", eyelidObject.bool.toString() + 
                    //"\neyeObject.bool : ", eyeObject.bool.toString()
                    //);
        
        //} else {

            //makeAllBoolsFalse();
            //whenAllMovFinishedCount = 0;
            //funcToCall();

        //}

    //} else {

        //console.log( 'in whenAllMovFinished funcToCall' );
        //whenAllMovFinishedCount = 0;
        //funcToCall();

    //}

//}


function getNodSpeedInString() {

    let nodSpeed = classVariableDict.last_sent['nodSpeed']
    
    if ( nodSpeed <= 0.33 ) {

        return '0.75'

    } else if ( nodSpeed > 0.33 && nodSpeed <= 0.66 ) {

        return '0.5'

    } else {

        return '0.25'

    }

}

function nodOrShakeHead() {

    if ( classVariableDict.last_sent.judgement === "D" ) {

        initShake( 0.5, '0.75' );

    } else {

        let nod = classVariableDict.last_sent.nod

        if ( nod !== null ) {

            let nodAmount = 0.4 + 0.5 * classVariableDict.last_sent['nodAmount'];

            let nodSpeedString = getNodSpeedInString();

            if ( nod ) {

                initNod( nodAmount, nodSpeedString );

            } else {

                initShake( nodAmount, nodSpeedString );

            }

        }

    }

}

function prePrepareForPromptSpeech() {

    // return to talking pos
    expressionController( calculatedTalkExpression, tiaTimings.toTalkExpressionDuration );

    function checkIfPromptReturned() {

        if ( classVariableDict.promptNIndexesReceived ) {

            displaySpeechBubblePrompt();

        } else {

            setTimeout( checkIfPromptReturned, 1000 );

        }

    }

    setTimeout( checkIfPromptReturned, tiaTimings.toTalkExpressionDuration * 750 );

}

function displaySpeechBubblePrompt() {

    // actually delay to return to laptop
    //synthesisObject.delayToReturnToLaptop = 3000 + synthesisObject.text.length * 60 * ( 1 / synthesisObject.speaking_rate );

    if ( classVariableDict.last_sent.judgement === "P" ) {
            
        synthesisObject.text = classVariableDict.last_sent.prompt;
        sendTTS( synthesisObject.text, true, "talk" );
        speechBubbleObject.sentence = classVariableDict.last_sent.prompt;

    } else if ( classVariableDict.last_sent.judgement === "B" ) {

        let text = createBetterTextForPromptBox( classVariableDict.last_sent );
        synthesisObject.text = text;
        sendTTS( synthesisObject.text, true, "talk" );
        speechBubbleObject.sentence = text;
    
    } else if ( classVariableDict.last_sent.judgement === "M" ) {

        let text = createMeanByTextForPromptBox( classVariableDict.last_sent );
        synthesisObject.speaking_rate = 0.8;
        synthesisObject.pitch = -2;
        sendTTS( text, true, "talk");
        synthesisObject.text = text;
        speechBubbleObject.sentence = text;
        
    } else if ( classVariableDict.last_sent.judgement === "3" ) {

        let text = "There are more than 3 mistakes in your sentence. Could you simplify and try again?";
        synthesisObject.speaking_rate = 0.8;
        synthesisObject.pitch = -2;
        sendTTS( text, true, "talk");
        synthesisObject.text = text;
        speechBubbleObject.sentence = text;

    } else if ( classVariableDict.last_sent.judgement === "3" ) {

        let text = "I'm sorry but I don't understand what you said.";
        synthesisObject.speaking_rate = 0.8;
        synthesisObject.pitch = -2;
        sendTTS( text, true, "talk" );
        synthesisObject.text = text;
        speechBubbleObject.sentence = text;
    
    }

    setTimeout( function() {

        tiaSpeak( synthesisObject.text, needTTS=false )
        classVariableDict.promptSpeaking = true;
        
    }, tiaTimings.toTalkExpressionDuration * 750 );

}

//function speakSpeechBubble() {

    //if ( synthesisObject.gotNewSpeech ) {
        
        //synthesisObject.synthAudio.play();
        //synthesisObject.gotNewSpeech = false
        //initTalk();
        //setTimeout( function() {

		//returnToLaptop('');

        //}, synthesisObject.delayToReturnToLaptop )

    //} else {

        //console.log('waiting for speech synthesis to return audio')
        //setTimeout( speakSpeechBubble, 1000 );

    //}

//}
    
function returnToLaptop( sent ) {

    addToPrevSents();
    setTimeout( function() {

        initCameraMove('laptop', tiaTimings.cameraMoveUpDuration );

        setTimeout( function() {

            if ( classVariableDict.tiaLookingAtStudent === false ) {

                movementController( movements.student, 2, 1.5 );

            }

            if ( classVariableDict.classOver === false ) {

                initInputReady( sent )
                showQuestionStreak();

            }
            
            removeSpeechBubble();
                    
            setTimeout( function() { 
                
                expressionController( expressionObject.abs.neutral, tiaTimings.changeExpression );

                setTimeout( function() {

                    if ( classVariableDict.classOver ) {

                        endClass();

                    }

                }, 3500 )

            }, 1500 );

        }, 2300 )

    }, 500);

}

// show in prevSent
function addToPrevSents() {

    // create new box in prevSent
    //appendExchange( classVariableDict.last_sent );
    //scrollBottom();
    loadPrevSents( scrollBottom );
    setTimeout( function() {
        $('#prevSents').fadeTo( 500, 1 )
    }, 2200 );
    console.log('in addToPrevSents');

}

function showOptionBtns() {

    $('.option-btn').prop( "disabled", false);

    // incase not reset from previous time
    $('#showCorrectionBtn').hide();
    $('#whatsWrongBtn').show();
    $('#tryAgainBtn').show();
    $('#nextSentenceBtn').show();

    $('#optionBtns').fadeIn( 1000 )

}

function tryAgain() {

    normalBlinkObject.bool = false;
    // avoid moving for a fraction of a second if mid-blink
    if ( blinkObject.bool ) {

        setTimeout( tryAgain, 50 );

    } else {
    
        let sent = classVariableDict.sentences[ classVariableDict.id_of_last_sent ].sentence;

        classVariableDict.tiaLookingAtStudent = false;
        returnToLaptop( sent );

        $('#prevSents').fadeTo( 500, 1 );
        $('#optionBtns').fadeOut( 500 )
        $('#recordBtnsContainer').fadeIn( 1000 )

        let sentId = classVariableDict.last_sent.sent_id
        $.ajax({
            url: "/store_try_again",
            type: "GET",
            data: {'sentId': sentId},
            success: function(json) {
            },
            error: function() {
                console.log("that's wrong");
            },
            
        });

        setTimeout( function() {

            removeCorrection();
            removeSentence();

        }, 1000 )
    }

}

function whatsWrong() {

    // avoid moving for a fraction of a second if mid-blink
    if ( blinkObject.bool ) {

        setTimeout( whatsWrong, 50 );

    } else {
    
        let sentId = classVariableDict.last_sent.sent_id
        $.ajax({
            url: "/store_whats_wrong",
            type: "GET",
            data: {'sentId': sentId},
            success: function(json) {
            },
            error: function() {
                console.log("that's wrong");
            },
            
        });
        // dont want user to click more buttons
        $('.option-btn').prop( "disabled", true);
        $('#optionBtns').fadeOut( 500 )
        
        //whenAllMovFinished( function() {

            movementController( movements.laptop, '0.5', '1.5' );

        //});

        setTimeout( function() {
        
            backNReadALine();

        }, 3500 );

    }

}

function showCorrection() {

    $('#showCorrectionBtn').prop( "disabled", true).fadeOut( 500 );
    $('#tryAgainBtn').prop( "disabled", true).fadeOut( 500 );

    let sentId = classVariableDict.last_sent.sent_id
    $.ajax({
        url: "/store_show_correction",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
            classVariableDict.last_sent.show_correction = true;
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });
    setTimeout( function() {
        
        initArmIndicate('right', 1, 'high', '0.75');
    
        setTimeout( function() {
        
            displayCorrection();

            setTimeout( function() {

                initArmIndicate('right', 0, 'high', '1.5');
        
            }, 1000 )

        }, 1000 )

    }, 1000 );

}

function nextSentence() {

    normalBlinkObject.bool = false;
    if ( blinkObject.bool ) {

        setTimeout( nextSentence, 50 );

    } else {
    
        $('#optionBtns').fadeOut( 500 );
        $('.option-btn').prop( "disabled", true);

        if ( classVariableDict.lastSentToBeSent ) {

            classVariableDict.classOver = true;

        }

        classVariableDict.tiaLookingAtStudent = false;
        returnToLaptop( '' );

        let sentId = classVariableDict.last_sent.sent_id
        $.ajax({
            url: "/store_next_sentence",
            type: "GET",
            data: {'sentId': sentId},
            success: function(json) {
            },
            error: function() {
                console.log("that's wrong");
            },
            
        });

        setTimeout( function() {

            removeCorrection();
            removeSentence();

            $('#prevSents').fadeTo( 500, 1 );
            
        }, 1000 )

    }

}

var reading = false;
function waitForWrongSlices() {

    console.log('in waitForWrongSlices');

    let sentId = classVariableDict.last_sent.sent_id

    $.ajax({
        url: "/wait_for_correction",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {

            if ( json.indexes !== null ) {

                classVariableDict.last_sent.indexes = json.indexes;
                sentenceObject.wrongIndexes = JSON.parse( json.indexes );

                classVariableDict.last_sent.correction = json.correction;
                correctionObject.corrections = json.correction
                
                normalBlinkObject.bool = false;
                // avoid moving for a fraction of a second if mid-blink
                
                //whenAllMovFinished( turnToBoardToShowErrors );
                turnToBoardToShowErrors();

            } else {

                backNReadALine();

            }

        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

}

function turnToBoardToShowErrors() {

    setTimeout( function() {
    
        movementController( movements.board, '0.5', '2' );

        let newInd = Object.keys(classVariableDict.sentences).length - 1;
        parseText( sentenceObject, true, 0x2d2d2d );
        addCloneLettersToTextBackground( sentenceObject, lineY );
        scene.add( sentenceObject.background );

        setTimeout( function() {


            //whenAllMovFinished( function() { 
         
                initCameraMove('board', '2');

            //})

            setTimeout( function() {

                initArmIndicate('right', 1, 'high', '0.75');

                setTimeout( function() {

                    //whenAllMovFinished( function() { 
         
                        expressionController( expressionObject.abs.neutral, '1', true );
                    
                    //});
                    
                    highlightWrong(); 
                    
                    setTimeout( function() {

                        initArmIndicate('right', 0, 'high', '1.5');

                        setTimeout( function() {

                            // show buttons again

                            $('#whatsWrongBtn').hide();
                            $('#showCorrectionBtn').show();
                            $('.option-btn').prop( "disabled", false );
                            $('#optionBtns').fadeIn( 500 )

                            normalBlinkObject.bool = true;

                        }, 1000 );

                    }, 1000 );

                }, 1500 );

            }, 3000 );

        }, 1000 )

    }, 500 );

}









