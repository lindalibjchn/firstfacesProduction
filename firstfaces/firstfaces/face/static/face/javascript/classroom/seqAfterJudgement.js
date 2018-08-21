function runAfterJudgement() {

    // logic for different types of judgement

    // not practise listening buttons
    synthesisObject.realSpeak = false;
    
    if ( classVariableDict.last_sent.judgement === "C" ) {

        if ( classVariableDict.last_sent.prompt === null ) {

            setTimeout( function() {
                
                returnToLaptop( '' )
                    
            }, 4000 );

        } else {

            speechBubbleObject.sentence = " " + classVariableDict.last_sent.prompt;
            setTimeout( displaySpeechBubblePrompt, 3500 );

        }

        changeExpression();
        createRelativeExpression( calculatedExpression )
        
        setTimeout( function() {

            initExpression( relativeExpression, '1' );

            setTimeout( nodOrShakeHead, 1250 ); 

        }, 250);


    } else if ( classVariableDict.last_sent.judgement === "I" ) {

        createRelativeMovement( confused01Movement );
        initMovement( relativeMovement, '0.5', '2' );

        createSingleExpression(confusedExpression, 1)
        createRelativeExpression( calculatedExpression );

        addToPrevSents(classVariableDict.last_sent);
        
        setTimeout( function() {
            
            initExpression( relativeExpression, '1' );
        
            setTimeout( showOptionBtns, 2000 );

        }, 1000 )

    } else if ( classVariableDict.last_sent.judgement === "B" || classVariableDict.last_sent.judgement === "M" || classVariableDict.last_sent.judgement === "D" || classVariableDict.last_sent.judgement === "3" ) {

        // delay for moving back to laptop and showing sent in prevSents
        //let delay = 5000;
        if ( classVariableDict.last_sent.judgement === "B" ) {

            text = " " + createBetterTextForPromptBox( classVariableDict.last_sent );
            
            $.when($.when(changeExpression()).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '1' ));
            //no nod or shak efor better as it may interfere with speech
        
        } else if ( classVariableDict.last_sent.judgement === "M" ) {
            
            text = " " + createMeanByTextForPromptBox( classVariableDict.last_sent );
            $.when($.when(createSingleExpression(confusedExpression, 1)).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '1' ));
        
        } else if ( classVariableDict.last_sent.judgement === "3" ) {
            
            text = " There are more than 3 mistakes in your sentence. Could you simplify and try again?";
            $.when($.when(createSingleExpression(confusedExpression, 1)).then(createRelativeExpression( calculatedExpression))).then( initExpression( relativeExpression, '1' ));
        
        } else {

            text = " I'm sorry but I don't understand what you said.";
            $.when($.when(createSingleExpression(confusedExpression, 1)).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '1' ));
            setTimeout( nodOrShakeHead, 1250 ); 
        }

        speechBubbleObject.sentence = text;
        setTimeout( displaySpeechBubblePrompt, 3000 );

    }
    
    
    //run expressionChange - to be done at end
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

    if ( classVariableDict.last_sent['judgement'] === "D" ) {

        initShake( 0.5, '0.75' );

    } else {

        let nod = classVariableDict.last_sent['nod']

        if ( nod !== null ) {

            let nodAmount = 0.5 + 0.5 * classVariableDict.last_sent['nodAmount'];

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

    //return to talking pos
    $.when(createRelativeExpression( talkCalculatedExpression )).then(initExpression( relativeExpression, '1' ));

    //display speechBubble with prompt
    displaySpeechBubble();
    speechBubbleObject.bubble.material[0].opacity = 0.95; 
    speechBubbleObject.bubble.material[1].opacity = 0.95; 

    setTimeout( function() { 
        
        initTalk();
        classVariableDict.promptSpeaking = true;
        synthesisObject.toSpeak = speechBubbleObject.sentence;
        synthesisObject.speaker = "tia";
        getVoices( setVoice );

    }, 1200 );

}

function returnToLaptop( sent ) {

    normalBlinkObject.bool = false;

    if ( blinkNowObject === true ) {

        setTimeout( function() {

            returnToLaptop( sent );

        }, 50 );

    } else {

        createRelativeMovement( studentMovement );
        createRelativeExpression( neutralExpression );

        setTimeout( function() {

            initCameraMove('laptop', '2');

            setTimeout( function() {

                initMovement( relativeMovement, '2', '1.5' );
                
                removeSpeechBubble();

                setTimeout( function() { 
                    
                    initExpression( relativeExpression, '2' )
                    initInputReady( sent )
                    addToPrevSents();

                    setTimeout( function() {

                        normalBlinkObject.bool = true;
                
                    }, 2250 );

                }, 2300 );
                
            }, 500);

        }, 1000);

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
    }, 1500 );
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

    $('#tryAgainBtn').on( 'click', tryAgain );
    $('#whatsWrongBtn').on( 'click', whatsWrong );
    $('#showCorrectionBtn').on( 'click', showCorrection );
    $('#nextSentenceBtn').on( 'click', nextSentence );

}

function tryAgain() {

    let sent = classVariableDict.sentences[ classVariableDict.id_of_last_sent ].sentence;

    returnToLaptop( sent )

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

    $('#nextSentenceBtn').prop( "disabled", true).fadeOut( 500 );

    returnToLaptop( '' )

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

        initInputReady( '' );
        $('#prevSents').fadeTo( 500, 1 );
        
    }, 1000 )

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









