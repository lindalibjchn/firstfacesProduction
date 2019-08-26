function runAfterJudgement() {

    recTimes.runAfterJudgement =  Date.now() / 1000;
    // logic for different types of judgement
    
    // in return to laptop, movement will only be needed if tia not looking straight at student
    conversationVariables.tiaLookingAtStudent = true;

    // get duration of nod or shake. Can also be 0o
    let nodShakeDur = 0;
    if ( conversationVariables.last_sent.nod !== null ) {
    
        nodShakeDur = 4 * parseFloat( getNodSpeedInString() ) * 1000;

    } else if ( conversationVariables.last_sent.judgement === "D" ) {

        nodShakeDur = 3000;

    }

    if ( conversationVariables.last_sent.judgement === "C" ) {

        if ( conversationVariables.last_sent.nod !== null ) {
                
            nodOrShakeHead()
            setTimeout( function(){
            
                expressionController( calculatedTalkExpression, tiaTimings.toTalkExpressionDuration );
                
                setTimeout( returnToLaptop, tiaTimings.toTalkExpressionDuration );
            
            }, nodShakeDur );

        } else {

            setTimeout( function() {

                setTimeout( function(){
                
                    expressionController( calculatedTalkExpression, tiaTimings.toTalkExpressionDuration );
                    
                    setTimeout( returnToLaptop, tiaTimings.toTalkExpressionDuration );
                
                }, nodShakeDur );

            }, tiaTimings.delayBeforeReturnToLaptop );

        }
        
    } else if ( conversationVariables.last_sent.judgement === "P" ) {

        if ( conversationVariables.last_sent.nod !== null ) {

            nodOrShakeHead()
            setTimeout( prePrepareForPromptSpeech, nodShakeDur );

        } else {

            setTimeout( prePrepareForPromptSpeech, tiaTimings.delayUntilToTalkPos );

        }

    } else if ( conversationVariables.last_sent.judgement === "I" ) {

        movementController( movementObject.abs.confused, tiaTimings.movementToConfusedDuration / 2, tiaTimings.movementToConfusedDuration );

        addToPrevSents(conversationVariables.last_sent);
        
        setTimeout( function() {
            
            expressionController( expressionObject.abs.confused, tiaTimings.changeExpressionDuration );

            setTimeout( showOptionBtns, tiaTimings.changeExpressionDuration * 1000 );

        }, tiaTimings.movementToConfusedDuration * 500 )

    } else if ( conversationVariables.last_sent.judgement === "B" || conversationVariables.last_sent.judgement === "M" || conversationVariables.last_sent.judgement === "D" || conversationVariables.last_sent.judgement === "3" ) {

        synthesisObject.speaking_rate = 0.7;
        // delay for moving back to laptop and showing sent in prevSents
        //let delay = 5000;
        //var text;
        if ( conversationVariables.last_sent.judgement === "B" ) {

            prePrepareForPromptSpeech();
            
        } else if ( conversationVariables.last_sent.judgement === "M" ) {
            
            prePrepareForPromptSpeech();
        
        } else if ( conversationVariables.last_sent.judgement === "3" ) {
            
            displaySpeechBubblePrompt();
        
        } else if ( conversationVariables.last_sent.judgement === "D" ) {

            nodOrShakeHead();
            setTimeout( displaySpeechBubblePrompt, nodShakeDur - 500 );

        }

    }
    
}

function getNodSpeedInString() {

    let nodSpeed = conversationVariables.last_sent['nodSpeed']
    
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
    if ( conversationVariables.last_sent.judgement === "D" ) {

        initShake( 0.5, '0.75' );

    } else {

        let nod = conversationVariables.last_sent.nod

        if ( nod !== null ) {

            let nodAmount = 0.4 + 0.5 * conversationVariables.last_sent['nodAmount'];

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
    console.log('in prePrepareForPromptSpeech');
    expressionController( calculatedTalkExpression, tiaTimings.toTalkExpressionDuration );

    displaySpeechBubblePrompt();
    
    ////display waiting bubble
    //speechBubbleObject.dotsAppear = false;

    //function checkIfPromptReturned() {

        //if ( conversationVariables.promptNIndexesReceived ) {

            //displaySpeechBubblePrompt();

        //} else {

            //setTimeout( checkIfPromptReturned, 2000 );
            
            //if ( speechBubbleObject.dotsAppear === false ) {

                //$('#speechBubbleCont').fadeIn();

                //$('.thinkingOfSpeaking').fadeIn( 2000 );
                //speechBubbleObject.dotsAppear = true;

            //}

        //}

    //}

    //setTimeout( function() {

        //setTimeout( checkIfPromptReturned, tiaTimings.toTalkExpressionDuration * 1000 );
        ////displaySpeechBubble( "high", tiaTimings.toTalkExpressionDuration * 1000, 0.5 )
    
    //}, tiaTimings.toTalkExpressionDuration * 1000 );

}

function displaySpeechBubblePrompt() {

    recTimes.displaySpeechBubblePrompt = Date.now() / 1000;
    //want to fade in the text a bit later
    //$('#speakingWords').hide()
    //$('#speechBubbleCont').fadeIn( tiaTimings.speechBubbleFadeInDuration );

    $('#speakingWordsInside').text( conversationVariables.tiaToSay );
    
    //if ( conversationVariables.last_sent.judgement === "P" ) {
            
        //$('#speakingWordsInside').text( conversationVariables.last_sent.prompt );

    //} else if ( conversationVariables.last_sent.judgement === "B" ) {

        //let text = createBetterTextForPromptBox( conversationVariables.last_sent );
        //$('#speakingWordsInside').text( text );
    
    //} else if ( conversationVariables.last_sent.judgement === "M" ) {

        //let text = createMeanByTextForPromptBox( conversationVariables.last_sent );
        //$('#speakingWordsInside').text( text );
        
    //} else if ( conversationVariables.last_sent.judgement === "3" ) {

        //let text = "There are more than 3 mistakes in your sentence. Could you simplify and try again?";
        //$('#speakingWordsInside').text( text );

    //} else if ( conversationVariables.last_sent.judgement === "D" ) {

        //let text = "I'm sorry but I don't understand what you said.";
        //$('#speakingWordsInside').text( text );
    
    //}

    setTimeout( function() {

        $('#speakingWords').fadeIn( tiaTimings.speechBubbleFadeInDuration );

        recTimes.tiaStartTalking = Date.now() / 1000;
        //synthesisObject.endCount = synthesisObject.synthAudio.duration * 60* 0.75;
        
        //tiaSpeakCount = 0;
        //initTalk();

        //synthesisObject.synthAudio.play()
        //synthesisObject.synthAudio.onended = returnToLaptop;
        
        tiaSpeak( conversationVariables.tiaToSay, function() {

            if ( conversationVariables.last_sent.judgement === "D" || conversationVariables.last_sent.judgement === "3" || conversationVariables.last_sent.judgement === "M" ) {

                returnToLaptop( 'try again' );

            }

        });

        conversationVariables.promptSpeaking = true;
            
    }, tiaTimings.toTalkExpressionDuration * 1000 );

}
    
function returnToLaptop( from ) {

    recTimes.returnToLaptop = Date.now() / 1000;
    //console.log( 'in return to laptop');
    //movementController( movementObject.abs.blank, 0.5, 1 );
    addToPrevSents();
    initInputReady( from )

    //expressionController( expressionObject.abs.neutral, tiaTimings.changeExpressionDuration * 2 );

    //if ( conversationVariables.classOver && conversationVariables.endClassSequenceStarted !== true ) {

        //console.log('\n\n\nend class return to laptop tia looking at student\n\n\n');
        //endClas
        //conversationVariables.endClassSequenceStarted = true;

    //} else {

        //initInputReady()
        ////showQuestionStreak();
        //recTimes.initInputReady = Date.now() / 1000;
        //sendTimesToServer();

    //}
    
}

// show in prevSent
function addToPrevSents() {

    // create new box in prevSent
    //appendExchange( conversationVariables.last_sent );
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
    let sent = conversationVariables.sentences[ conversationVariables.id_of_last_sent ].sentence;

    conversationVariables.tiaLookingAtStudent = false;
    returnToLaptop('try again');

    $('#prevSents').fadeTo( 500, 1 );
    $('#optionBtns').fadeOut( 500 )
    $('#recordBtnsCont').fadeIn( 1000 )

    let sentId = conversationVariables.last_sent.sent_id
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

}

function whatsWrong() {

    recTimes.clickOptionBtn = Date.now() / 1000;
    let sentId = conversationVariables.last_sent.sent_id

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

        movementController( movementObject.abs.laptop, '0.5', '1.5' );

    //});

    setTimeout( function() {
    
        backNReadALine();

    }, 3500 );

}

function showCorrection() {

    recTimes.clickShowCorrectionBtn = Date.now() / 1000;
    $('#showCorrectionBtn').prop( "disabled", true).fadeOut( 500 );
    $('#tryAgainBtn').prop( "disabled", true).fadeOut( 500 );
    $('#nextSentenceBtn').prop( "disabled", true).fadeOut( 500 );

    let sentId = conversationVariables.last_sent.sent_id
    $.ajax({
        url: "/store_show_correction",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {
            conversationVariables.last_sent.show_correction = true;
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });
    setTimeout( function() {
        
        //initArmIndicate('right', 1, 'high', '0.75');
        conversationVariables.tapKeyForCorrection = true;
        tapKeyFull();
    
        setTimeout( function() {
        
            //showWrongSentence();

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
    $('#sentenceShowHolder').hide;

    if ( conversationVariables.lastSentToBeSent ) {

        conversationVariables.classOver = true;

    }

    conversationVariables.tiaLookingAtStudent = false;
    returnToLaptop();

    let sentId = conversationVariables.last_sent.sent_id
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

    $('#submittedNCorrectedSentenceCont').fadeOut( 500 )

}

var reading = false;
function waitForWrongSlices() {

    let sentId = conversationVariables.last_sent.sent_id

    $.ajax({
        url: "/wait_for_correction",
        type: "GET",
        data: {'sentId': sentId},
        success: function(json) {

            if ( json.indexes !== null ) {

                conversationVariables.last_sent.indexes = JSON.parse( json.indexes );

                conversationVariables.last_sent.correction = JSON.parse( json.correction );
                
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

    conversationVariables.tapKeyForErrors = true;
    tapKeyFull();

}

function showWrongSentence() {

    $('#textInputContainer').fadeIn();

    $('#submittedNCorrectedSentenceCont').show()

    for ( w=0; w < conversationVariables.last_sent.sentence.length; w++ ) {

        if ( conversationVariables.last_sent.sentence[ w ] === ' ' ) {


            $('#submittedSentence').append(

                "<div class='wrong-words wrong-words-spaces' id='wrongWord_" + w.toString() + "'>" + "*</div>"

            );

        
        } else {

            $('#submittedSentence').append(

                "<div class='wrong-words wrong-words-words' id='wrongWord_" + w.toString() + "'>" + conversationVariables.last_sent.sentence[ w ] + "</div>"

            );

        }

    };


    setTimeout(highlightWrong, 1500);
        
}


function showErrorBtns() {

    recTimes.showErrors = Date.now() / 1000;
    
    // show buttons again
    showOptionBtns();
    $('#whatsWrongBtn').hide();
    $('#showCorrectionBtn').css('display', 'flex')
    $('.option-btn').prop( "disabled", false );
    $('#optionBtns').fadeIn( 500 );

}


function highlightWrong() {

    conversationVariables.last_sent.indexes.forEach( function(ind, i) {

        setTimeout( function() {

            // for spaces
            if ( ind.length === 1 && conversationVariables.last_sent.sentence[ ind ] === " " ) {

                $('#wrongWord_' + ind[0].toString()).css( {
                    //'color': 'red' ,
                    //'font-weight': 'bold'
                    'background-image': 'linear-gradient(rgba(0,0,0,0), red, rgba(0,0,0,0))',
                });
                setTimeout( function() { 
                    $('#wrongWord_' + ind[0].toString()).css( {
                        'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, rgba(0,0,0,0), rgba(0,0,0,0))',
                    });
                }, 1500);

            } else {

                ind.forEach( function(i, ind) {

                    $('#wrongWord__' + i.toString()).css( {
                            'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, red, rgba(0,0,0,0), rgba(0,0,0,0))',
                            'color': 'white',
                    });


                    if ( conversationVariables.last_sent.sentence[ i ] === " " ) {
                    
                        $('#wrongWord_' + i.toString()).css( {
                            'color': 'rgba(0,0,0,0)',
                            'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, red, rgba(0,0,0,0), rgba(0,0,0,0))',
                        });
                        setTimeout( function() { 
                            $('#wrongWord_' + i.toString()).css( {
                                'background-image': 'none',
                           
                            });

                            if ( ind === conversationVariables.last_sent.indexes.length - 1 ) {

                                showErrorBtns();

                            }

                        }, 1500);

                    } else {
                        
                        $('#wrongWord_' + i.toString()).css( {
                            'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), red, red, rgba(0,0,0,0), rgba(0,0,0,0))',
                            'color': 'white',
                            'font-weight': 'bold',
                        });
                        setTimeout( function() { 
                            $('#wrongWord_' + i.toString()).css( {
                                'color': 'red',
                                'background-image': 'none',
                            });

                            if ( ind === conversationVariables.last_sent.indexes.length - 1 ) {

                                showErrorBtns();

                            }

                        }, 1500);

                    }

                } );

            }

        }, i * 2250 );

    } );

}

function showCorrectionUnderWrongSent() {

    $( '#correctedSentence' ).fadeIn()

    //get correct parts
    let correctParts = [];
    let lenCorrectParts = [];
    let startSlice = 0;
    for (let i=0; i<conversationVariables.last_sent.indexes.length + 1; i++ ) {

        var slice;
        if ( i < conversationVariables.last_sent.indexes.length ) {

            slice = conversationVariables.last_sent.sentence.slice( startSlice, conversationVariables.last_sent.indexes[ i ][ 0 ])
            correctParts.push( slice )

            startSlice = conversationVariables.last_sent.indexes[ i ][ conversationVariables.last_sent.indexes[ i ].length - 1] + 1

        } else {

            slice = conversationVariables.last_sent.sentence.slice( startSlice )
            correctParts.push( slice )

        }

        let lenSlice = 0;
        slice.forEach( function( w ) {

            lenSlice += w.length;

        } );
        lenCorrectParts.push( lenSlice );

    }

    let wrongParts = [];
    let lenWrongParts = [];
    conversationVariables.last_sent.indexes.forEach( function(ind) {

        lenWrongPart = 0;
        wrongPart = []
        ind.forEach( function( wo ) {

            wrongPart.push( conversationVariables.last_sent.sentence[ wo ] );
            lenWrongPart += conversationVariables.last_sent.sentence[ wo ].length;

        } );

        wrongParts.push( wrongPart );
        lenWrongParts.push( lenWrongPart );

    } );

    let corrections = conversationVariables.last_sent.correction
    let lenCorrections = [];
    corrections.forEach( function( wp ) {

        let lenCorrection = 0
        wp.forEach( function( wpp ) {

            lenCorrection += wpp.length;

        } );

        lenCorrections.push( lenCorrection );

    } );

    correct = true;
    count = 0;
    for ( j=0; j<conversationVariables.last_sent.indexes.length * 2; j++ ) {

        if ( correct ) {

            correctParts[ count ].forEach( function( p ) {

                if ( p  === ' ' ) {

                    $('#correctedSentence').append(

                        "<div class='correct-words correct-parts correct-words-spaces'>*</div>"

                    );

                } else {

                    $('#correctedSentence').append(

                        "<div class='correct-words correct-parts correct-words-words'>" + p + "</div>"

                    );

                };

            } )

            correct = false;

        } else {

            conversationVariables.last_sent.correction[ count ].forEach( function( q ) {

                if ( q  === ' ' ) {

                    $('#correctedSentence').append(

                        "<div class='correct-words wrong-parts wrong-parts-spaces correct_words_" + count.toString() + "'>*</div>"

                    );

                } else {

                    $('#correctedSentence').append(

                        "<div class='correct-words wrong-parts wrong-parts-words correct_words_" + count.toString() + "'>" + q + "</div>"

                    );

                };

            } );

            let lenWrong = lenWrongParts[ count ];
            let lenCorrection = lenCorrections[ count ];
            let lenNextCorrect = lenCorrectParts[ count + 1 ];

            let needsAdded = lenWrong - lenCorrection;
            let nextCorrectStarString = correctParts[ count + 1  ];
            if ( needsAdded > 0 ) {

                for (let i = wrongParts[ count ].length - 1; i>=0; i--) {
                    
                    let lenWord = wrongParts[ count ][ i ].length;

                    if ( lenWord > needsAdded ) {

                        nextCorrectStarString.unshift( '*'.repeat( needsAdded ));
                        break;

                    } else {

                        nextCorrectStarString.unshift( '*'.repeat( lenWord ));
                        needsAdded -= lenWord; 

                    }

                }

            } else if ( needsAdded < 0 ) {

                let noIters = correctParts[ count + 1 ].length - 1;
                for (let i=0; i<noIters; i++) {

                    let lenWord = correctParts[ count + 1 ][ 0 ].length;
                    if ( lenWord > Math.abs(needsAdded) ) {

                        nextCorrectStarString.shift();
                        nextCorrectStarString.unshift( '*'.repeat( lenWord - Math.abs(needsAdded) ));
                        break;

                    } else {

                        nextCorrectStarString.shift();
                        needsAdded += lenWord; 

                    }

                }

            }

            correct = true;
            count += 1;



        }

    }
    setTimeout( function() {

        for (let i=0; i<conversationVariables.last_sent.indexes.length; i++ ) {

            setTimeout( function() {

                $('.correct_words_' + i.toString()).css({

                    'color': 'white',
                    'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0), green, green, rgba(0,0,0,0), rgba(0,0,0,0))',

                });
                $('.correct_words_' + i.toString()).each( function() {
                    if ( $(this).text() === '*' ) {
                        $(this).css({
                            'color': 'green',
                        })

                    }
                });

                setTimeout( function() {

                    $('.correct_words_' + i.toString()).css({
                        'color': 'green',
                        'background-image': 'none',
                    });

                    $('.correct_words_' + i.toString()).each( function() {
                        if ( $(this).text() === '*' ) {
                            $(this).css({
                                'color': 'rgba(0,0,0,0)',
                            })

                        }
                    });

                    if ( i === conversationVariables.last_sent.indexes.length - 1 ) {

                        $('#nextSentenceBtn').css('display', 'flex');
                        $('#nextSentenceBtn').prop( "disabled", false ).fadeIn( 500 );

                    }

                }, 1500 )

            }, i*2250 );

        }

    }, 1000 );

};

