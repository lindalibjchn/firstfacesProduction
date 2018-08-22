function runAfterJudgement() {

    // logic for different types of judgement

    // not practise listening buttons
    synthesisObject.realSpeak = false;
    
    if ( classVariableDict.last_sent.judgement === "C" ) {

        //this delay is for nod and shake changing speed
        var delay = 3000 + parseFloat( getNodSpeedInString() ) * 6500;
        if ( classVariableDict.last_sent.prompt === null ) {

            if ( classVariableDict.last_sent.nod !== null ) {

                //this changes with the speed of nod and shake

                setTimeout( function() {

                    console.log('in nod return');
                
                    returnToLaptop( '' )

                }, delay );

            } else {

                setTimeout( function() {

                    console.log('in no nod return');
                
                    returnToLaptop( '' )

                }, 2000);

            }
                    
        } else {

            synthesisObject.text = classVariableDict.last_sent.prompt;
            sendTTS( classVariableDict.last_sent.prompt, true );

            speechBubbleObject.sentence = " " + classVariableDict.last_sent.prompt;

            if ( classVariableDict.last_sent.nod !== null ) {

                setTimeout( displaySpeechBubblePrompt, delay );

            } else {

                setTimeout( displaySpeechBubblePrompt, 2000 );

            }

        }

        createRelativeExpression( calculatedExpression )
        
        setTimeout( function() {

            initExpression( relativeExpression, '1' );

            setTimeout( nodOrShakeHead, 1250 ); 

        }, 250);


    } else if ( classVariableDict.last_sent.judgement === "I" ) {

        createRelativeMovement( confused01Movement );
        initMovement( relativeMovement, '0.5', '2' );

        createSingleExpression(confusedExpression, 1);
        createRelativeExpression( calculatedExpression );

        addToPrevSents(classVariableDict.last_sent);
        
        setTimeout( function() {
            
            initExpression( relativeExpression, '1' );
        
            setTimeout( showOptionBtns, 2000 );

        }, 1000 )

    } else if ( classVariableDict.last_sent.judgement === "B" || classVariableDict.last_sent.judgement === "M" || classVariableDict.last_sent.judgement === "D" || classVariableDict.last_sent.judgement === "3" ) {

        // delay for moving back to laptop and showing sent in prevSents
        //let delay = 5000;
        var text;
        if ( classVariableDict.last_sent.judgement === "B" ) {

            text = " " + createBetterTextForPromptBox( classVariableDict.last_sent );
            sendTTS( text, true );
            
            $.when(createRelativeExpression( calculatedExpression )).then( initExpression( relativeExpression, '1' ));
            //no nod or shak efor better as it may interfere with speech
            setTimeout( displaySpeechBubblePrompt, 2000 );
        
        } else if ( classVariableDict.last_sent.judgement === "M" ) {
            
            text = " " + createMeanByTextForPromptBox( classVariableDict.last_sent );
            sendTTS( text, true );
            $.when($.when(createSingleExpression(confusedExpression, 1)).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '1' ));
            setTimeout( displaySpeechBubblePrompt, 1500 );
        
        } else if ( classVariableDict.last_sent.judgement === "3" ) {
            
            text = " There are more than 3 mistakes in your sentence. Could you simplify and try again?";
            sendTTS( text, true );
            $.when($.when(createSingleExpression(confusedExpression, 1)).then(createRelativeExpression( calculatedExpression))).then( initExpression( relativeExpression, '1' ));
            setTimeout( displaySpeechBubblePrompt, 1500 );
        
        } else {

            text = " I'm sorry but I don't understand what you said.";
            sendTTS( text, true );
            $.when($.when(createSingleExpression(confusedExpression, 1)).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '1' ));
            setTimeout( function() {
                
                nodOrShakeHead(); 
                setTimeout( displaySpeechBubblePrompt, 5000 );

            }, 1250 );

        }

        synthesisObject.text = text;
        speechBubbleObject.sentence = text;

    }
    
    
}

function getNodSpeedInString() {

    let nodSpeed = classVariableDict.last_sent['nodSpeed']
    
    if ( nodSpeed <= 0.25 ) {

        return '1'

    } else if ( nodSpeed > 0.25 && nodSpeed <= 0.5 ) {

        return '0.75'

    } else if ( nodSpeed > 0.5 && nodSpeed <= 0.75 ) {

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

function displaySpeechBubblePrompt() {

    // actually delay to return to laptop
    synthesisObject.delayToThinkAndTurn = synthesisObject.text.length * 200;

    // return to talking pos
    $.when(createRelativeExpression( talkCalculatedExpression )).then(initExpression( relativeExpression, '1' ));

    //display speechBubble with prompt
    speechBubbleObject.bubble.material[0].opacity = 0.95; 
    speechBubbleObject.bubble.material[1].opacity = 0.95; 

    setTimeout( function() { 
        
        displaySpeechBubble();
        classVariableDict.promptSpeaking = true;
        synthesisObject.realSpeak = true;
        
        synthesisObject.synthAudio.play();
        initTalk();

        setTimeout( returnToLaptop, synthesisObject.delayToThinkAndTurn )
    
    }, 1500);

}

function returnToLaptop( sent ) {

    normalBlinkObject.bool = false;

    if ( blinkNowObject === true ) {

        setTimeout( function() {

            returnToLaptop( sent );

        }, 50 );

    } else {

        addToPrevSents();
        setTimeout( function() {

            initCameraMove('laptop', '2');

            setTimeout( function() {

                resetExpression();
                removeSpeechBubble();
                initInputReady( sent )
                showQuestionStreak();
                
                setTimeout( function() { 
                    
                    resetMovement();

                    setTimeout( function() {

                        normalBlinkObject.bool = true;
                
                    }, 1800 );

                }, 1500 );

            }, 2300 )

        }, 500);

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

    normalBlinkObject.bool = true;

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
    if ( blinkNowObject.bool ) {

        setTimeout( tryAgain, 50 );

    } else {
    
        let sent = classVariableDict.sentences[ classVariableDict.id_of_last_sent ].sentence;

        returnToLaptop( sent );

        $('#prevSents').fadeTo( 500, 1 );
        $('#optionBtns').fadeOut( 500 )
        $('#recordBtnsContainer').fadeIn( 1000 )

        let sentId = classVariableDict.last_sent.sent_id
        $.ajax({
            url: "/face/store_try_again",
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

    normalBlinkObject.bool = false;
    // avoid moving for a fraction of a second if mid-blink
    if ( blinkNowObject.bool ) {

        setTimeout( whatsWrong, 50 );

    } else {
    
        let sentId = classVariableDict.last_sent.sent_id
        $.ajax({
            url: "/face/store_whats_wrong",
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
        
        createRelativeMovement( laptopMovement );
        initMovement( relativeMovement, '0.5', '1.5' );

        setTimeout( function() {
        
            backNReadALine();

        }, 2000 );

    }

}

function showCorrection() {

    $('#showCorrectionBtn').prop( "disabled", true).fadeOut( 500 );
    $('#tryAgainBtn').prop( "disabled", true).fadeOut( 500 );

    let sentId = classVariableDict.last_sent.sent_id
    $.ajax({
        url: "/face/store_show_correction",
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
    if ( blinkNowObject.bool ) {

        setTimeout( nextSentence, 50 );

    } else {
    
        $('#optionBtns').fadeOut( 500 );
        $('.option-btn').prop( "disabled", true);

        returnToLaptop( '' );

        //setTimeout( function() {
            
            //$.when(createRelativeExpression( neutralExpression )).then(initExpression( relativeExpression, '1' ));

            //setTimeout( function() {

                //$.when(createRelativeMovement( studentMovement )).then(initMovement( relativeMovement, '0.5', '1.5' ));

            //}, 1250 );

        //}, 2800 );

        let sentId = classVariableDict.last_sent.sent_id
        $.ajax({
            url: "/face/store_next_sentence",
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
        url: "/face/wait_for_correction",
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
                if ( blinkNowObject.bool ) {

                    setTimeout( turnToBoardToShowErrors, 50 );

                } else {
    
                    turnToBoardToShowErrors();

                }

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

    createRelativeMovement( boardMovement )
    createSingleExpression( contentExpression, 0.2 );
    createRelativeExpression( calculatedExpression );
    
    setTimeout( function() {
    
        initMovement( relativeMovement, '0.5', '2' );

        let newInd = Object.keys(classVariableDict.sentences).length - 1;
        parseText( sentenceObject, true, 0x2d2d2d );
        addCloneLettersToTextBackground( sentenceObject, lineY );
        scene.add( sentenceObject.background );

        setTimeout( function() {

            initCameraMove('board', '2');

            setTimeout( function() {

                initArmIndicate('right', 1, 'high', '0.75');

                setTimeout( function() {

                    initExpression( relativeExpression, '1' );
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

            }, 2000 );

        }, 1000 )

    }, 500 );

}









