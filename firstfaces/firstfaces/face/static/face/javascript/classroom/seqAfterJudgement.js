function runAfterJudgement() {

    recTimes.runAfterJudgement =  Date.now() / 1000;
    // logic for different types of judgement
    
    // in return to laptop, movement will only be needed if tia not looking straight at student
    classVariableDict.tiaLookingAtStudent = true;

    // get duration of nod or shake. Can also be 0o
    let nodShakeDur = 0;
    if ( classVariableDict.last_sent.nod !== null ) {
    
        nodShakeDur = 5 * parseFloat( getNodSpeedInString() ) * 1000;

    } else if ( classVariableDict.last_sent.judgement === "D" ) {

        nodShakeDur = 5 * 0.75 * 1000;

    }

    if ( classVariableDict.last_sent.judgement === "C" ) {

        if ( classVariableDict.last_sent.nod !== null ) {
                
            nodOrShakeHead()
            setTimeout( function(){returnToLaptop('')}, nodShakeDur + 500 );//0.5s overlap for end of nod n talking

        } else {

            setTimeout( function() {

                returnToLaptop( '' )

            }, tiaTimings.delayBeforeReturnToLaptop );

        }
        
    } else if ( classVariableDict.last_sent.judgement === "P" ) {

        if ( classVariableDict.last_sent.nod !== null ) {

            nodOrShakeHead()
            setTimeout( prePrepareForPromptSpeech, nodShakeDur + 500 );

        } else {

            setTimeout( prePrepareForPromptSpeech, tiaTimings.delyUntilToTalkPos );

        }

    } else if ( classVariableDict.last_sent.judgement === "I" ) {

        console.log('in judgement === I');
        movementController( movements.confused, tiaTimings.movementToConfused / 2, tiaTimings.movementToConfused );

        addToPrevSents(classVariableDict.last_sent);
        
        setTimeout( function() {
            
            expressionController( expressionObject.abs.confused, tiaTimings.changeExpressionConfused );

            setTimeout( showOptionBtns, tiaTimings.changeExpressionConfused * 1500 );

        }, tiaTimings.movementToConfused * 500 )

    } else if ( classVariableDict.last_sent.judgement === "B" || classVariableDict.last_sent.judgement === "M" || classVariableDict.last_sent.judgement === "D" || classVariableDict.last_sent.judgement === "3" ) {

        synthesisObject.speaking_rate = 0.8;
        // delay for moving back to laptop and showing sent in prevSents
        //let delay = 5000;
        //var text;
        if ( classVariableDict.last_sent.judgement === "B" ) {

            prePrepareForPromptSpeech();
            
        } else if ( classVariableDict.last_sent.judgement === "M" ) {
            
            prePrepareForPromptSpeech();
        
        } else if ( classVariableDict.last_sent.judgement === "3" ) {
            
            displaySpeechBubblePrompt();
        
        } else if ( classVariableDict.last_sent.judgement === "D" ) {

            nodOrShakeHead();
            setTimeout( displaySpeechBubblePrompt, nodShakeDur - 500 );

        }

    }
    
}

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
    
    recTimes.nodOrShakeHead =  Date.now() / 1000;
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

    recTimes.prePrepareForPromptSpeech =  Date.now() / 1000;
    // return to talking pos
    expressionController( calculatedTalkExpression, tiaTimings.toTalkExpressionDuration );

    //display waiting bubble
    speechBubbleObject.dotsAppear = false;

    function checkIfPromptReturned() {

        if ( classVariableDict.promptNIndexesReceived ) {

            displaySpeechBubblePrompt();

        } else {

            setTimeout( checkIfPromptReturned, 2000 );
            
            if ( speechBubbleObject.dotsAppear === false ) {

                $('.thinkingOfSpeaking').fadeIn( 2000 );
                speechBubbleObject.dotsAppear = true;

            }

        }

    }

    setTimeout( function() {

        setTimeout( checkIfPromptReturned, tiaTimings.toTalkExpressionDuration * 1000 );
        //displaySpeechBubble( "high", tiaTimings.toTalkExpressionDuration * 1000, 0.5 )
    
    }, tiaTimings.toTalkExpressionDuration * 1000 );

}

function displaySpeechBubblePrompt() {

    recTimes.displaySpeechBubblePrompt = Date.now() / 1000;
    // actually delay to return to laptop
    //synthesisObject.delayToReturnToLaptop = 3000 + synthesisObject.text.length * 60 * ( 1 / synthesisObject.speaking_rate );

    $('.thinkingOfSpeaking').fadeOut( 500 );
    speechBubbleObject.dotsAppear = false;

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

    } else if ( classVariableDict.last_sent.judgement === "D" ) {

        let text = "I'm sorry but I don't understand what you said.";
        synthesisObject.speaking_rate = 0.8;
        synthesisObject.pitch = -2;
        sendTTS( text, true, "talk" );
        synthesisObject.text = text;
        speechBubbleObject.sentence = text;
    
    }


    setTimeout( function() {

        recTimes.tiaStartTalking = Date.now() / 1000;
        tiaSpeak( synthesisObject.text, needSendTTS=false, function() {
         
            setTimeout( function() {
                
                returnToLaptop( ' ' );

            }, tiaTimings.delayBeforeReturnToLaptop );

        })

        classVariableDict.promptSpeaking = true;
        
    }, tiaTimings.toTalkExpressionDuration * 750 );

}
    
function returnToLaptop( sent ) {

    recTimes.returnToLaptop = Date.now() / 1000;
    console.log( 'in return to laptop');
    addToPrevSents();

    if ( classVariableDict.tiaLookingAtStudent ) {

        expressionController( expressionObject.abs.neutral, tiaTimings.changeExpression * 6 );

        setTimeout( function() {

            initCameraMove('laptop', tiaTimings.cameraMoveUpDuration );

            setTimeout( function () {

                if ( classVariableDict.classOver && classVariableDict.endClassSequenceStarted !== true ) {

                    console.log('\n\n\nend class return to laptop tia looking at student\n\n\n');
                    endClass();
                    classVariableDict.endClassSequenceStarted = true;

                } else {

                    initInputReady( sent )
                    //showQuestionStreak();
                    recTimes.initInputReady = Date.now() / 1000;
                    sendTimesToServer();

                }
        
            }, tiaTimings.cameraMoveUpDuration * 1000 )

        }, tiaTimings.changeExpression * 2000 );

    } else {

        initCameraMove('laptop', tiaTimings.cameraMoveUpDuration );

        setTimeout( function() { 
            
            movementController( movements.blank, tiaTimings.movementToConfused / 2, tiaTimings.movementToConfused );
            
            setTimeout( function() {

                expressionController( expressionObject.abs.neutral, tiaTimings.changeExpression * 2 );
                
                setTimeout( function() {

                    if ( classVariableDict.classOver && classVariableDict.endClassSequenceStarted !== true ) {

                        console.log('\n\n\nend class tia not looking at student\n\n\n');
                        endClass();
                        classVariableDict.endClassSequenceStarted = true;

                    } else {

                        initInputReady( sent )
                        //showQuestionStreak();

                    }
       
                }, tiaTimings.changeExpression * 1500 )

            }, tiaTimings.movementToConfused * 500 );

        }, tiaTimings.cameraMoveUpDuration * 500 );

    }

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

    recTimes.showOptionBtns = Date.now() / 1000;
    $('.option-btn').prop( "disabled", false);
    //console.log('in showOptionBtns');

    // incase not reset from previous time
    $('#showCorrectionBtn').hide();
    $('#whatsWrongBtnBtn').css('display', 'flex')
    $('#tryAgainBtn').show();
    $('#nextSentenceBtn').show();

    $('#optionBtns').fadeIn( 1000 )

}

function tryAgain() {

    recTimes.clickOptionBtn = Date.now() / 1000;
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

function whatsWrong() {

    recTimes.clickOptionBtn = Date.now() / 1000;
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

function showCorrection() {

    recTimes.clickShowCorrectionBtn = Date.now() / 1000;
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
        
        //initArmIndicate('right', 1, 'high', '0.75');
        classVariableDict.tapKeyForCorrection = true;
        tapKeyFull();
    
        setTimeout( function() {
        
            displayCorrection();

            setTimeout( function() {

                initArmIndicate('right', 0, 'high', '1.5');
        
            }, tiaTimings.armIndicate * 1000 )

        }, tiaTimings.armIndicate * 1000 )

    }, tiaTimings.armIndicate * 1000 );

}

function nextSentence() {

    recTimes.clickNextSentenceBtn = Date.now() / 1000;
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
                
                // no longer turning to board in mobile so comment out
                // turnToBoardToShowErrors();
                // tap key instead
                tapKeyToShowErrors();

            } else {

                backNReadALine();

            }

        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

}

function tapKeyToShowErrors() {

    classVariableDict.tapKeyForErrors = true;
    tapKeyFull();

}

function turnToBoardToShowErrors() {

    recTimes.turnToBoardToShowErrors = Date.now() / 1000;
    movementController( movements.board, tiaTimings.turnToBoard / 2, tiaTimings.turnToBoard );

    let newInd = Object.keys(classVariableDict.sentences).length - 1;
    parseText( sentenceObject, true, 0x2d2d2d );
    addCloneLettersToTextBackground( sentenceObject, lineY );
    scene.add( sentenceObject.background );

    setTimeout( function() {

        initCameraMove('board', tiaTimings.cameraTurnToBoard);

        setTimeout( function() {

            initArmIndicate('right', 1, 'high', tiaTimings.armIndicate);

            expressionController( expressionObject.abs.neutral, tiaTimings.changeExpression * 2000 );
            
            setTimeout( function() {

                highlightWrong(); 

                setTimeout( function() {

                    initArmIndicate('right', 0, 'high', tiaTimings.armIndicate * 2);

                    setTimeout( function() {

                        // show buttons again
                        $('#whatsWrongBtn').hide();
                        $('#showCorrectionBtn').show();
                        $('.option-btn').prop( "disabled", false );
                        $('#optionBtns').fadeIn( 500 )

                    }, tiaTimings.armIndicate * 1000 );

                }, tiaTimings.armIndicate * 1000 );

            }, tiaTimings.armIndicate * 1000 );

        }, tiaTimings.cameraTurnToBoard * 1000 );

    }, tiaTimings.turnToBoard * 500 )

}









