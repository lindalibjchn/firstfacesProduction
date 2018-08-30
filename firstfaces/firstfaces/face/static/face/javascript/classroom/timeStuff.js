function calcTimeRemaining() {

    let timeNow = new Date();
    let timePassed = timeNow - classVariableDict.start_time;
    let timePassedMinutes = Math.ceil( timePassed / 60000 );

    // this classTimeMinutes is defined in variables
    let timeRemainingMinutes = classTimeMinutes - timePassedMinutes;

    return timeRemainingMinutes

}

// will call this with every blink, cuz nothing else goin on when blinking and relatively frequent :-)
function showTimeRemaining() {

    let timeRemainingMinutes = calcTimeRemaining();

    if ( timeRemainingMinutes > 0 ) {

        $('#timeDiv').text( timeRemainingMinutes.toString() + " mins" );

    } else if ( timeRemainingMinutes > -5 ) {

        $('#timeDiv').text( "last sentence" );
        classVariableDict.lastSentToBeSent = true;

    } else {

        classVariableDict.classOver = true;
        $('#timeDiv').text( "class finished" );
        endClass();

    }

}

function endClass() {

    let sessId = classVariableDict.session_id;
    $.ajax({
        url: "/face/store_class_over",
        type: "GET",
        data: {'sessId': sessId},
        success: function(json) {

            classVariableDict.score = json.score
            synthesisObject.text = "Well done today! your score is " + ( classVariableDict.score ).toString() + ". I hope to see you again soon!";
            // prepare speech 
            synthesisObject.pitch = 0;
            synthesisObject.speaking_rate = 0.85;
            sendTTS( synthesisObject.text, true );
            speechBubbleObject.sentence = " " + synthesisObject.text;
        
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

    normalBlinkObject.bool = false;
    // disable all buttons
    $('.option-btn').prop( "disabled", true);
    $('.input-btn').prop( "disabled", true);
    $('.input-btn-large').prop( "disabled", true);
    $('#textInput').hide();

    // fadeOut controller container on the right
    $('#controllerContainer').fadeOut( 500 );


    let singleCalculatedExpressions = createSingleExpression( expressionsRel.happy, 0.7 )
    calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
    calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    setTimeout( function() {

        initCameraMove( 'tia', '2' );

        setTimeout( function() {

            whenAllMovFinished( function() {

                expressionController( calculatedExpression, '1', false );

                setTimeout( goodbyeTalk, 2000 ); 

            })

        }, 2100 );

    }, 600 );


}

function goodbyeTalk() {

    // actually delay to return to laptop
    synthesisObject.delayToThinkAndTurn = 4000 + synthesisObject.text.length * 70;

    // return to talking pos
    expressionController( calculatedTalkExpression, '1', false );

    //display speechBubble with prompt
    speechBubbleObject.bubble.material[0].opacity = 0.95; 
    speechBubbleObject.bubble.material[1].opacity = 0.95; 

    setTimeout( function() { 
        
        goodbyeSpeak();
        displaySpeechBubble();
        classVariableDict.promptSpeaking = true;
        synthesisObject.realSpeak = true;
        
    }, 1500);

}

function goodbyeSpeak() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();

        setTimeout( function() {
            
            location.reload( true );
            
        }, synthesisObject.delayToThinkAndTurn )

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( goodbyeSpeak, 1000 );

    }

}
    
/////////QUESTION STREAK

function calculateQuestionStreak() {

    let questionStreak = 0;
    let lastSentId = classVariableDict.id_of_last_sent

    if ( lastSentId !== null && classVariableDict.last_sent.sentence !== null ) {

        //skip the sentence waiting for judgement    
        let n = 0;
        if ( classVariableDict.sentences[ lastSentId ].judgement === null ) {

            n = 1;

        }

        console.log('lastSentId:', lastSentId);
        console.log('n:', n);

        if ( classVariableDict.sentences[ lastSentId - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - n ].judgement === "B" ) {

            if ( classVariableDict.sentences[ lastSentId - n ].question === false ) {
            
                questionStreak = 1;

                if ( classVariableDict.sentences[ lastSentId - 1 - n ] !== undefined ) {

                    if ( classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "B" ) {

                        if ( classVariableDict.sentences[ lastSentId - 1 - n ].question === false ) {
                
                            questionStreak = 2;

                            if ( classVariableDict.sentences[ lastSentId - 2 - n ] !== undefined ) {

                                if ( classVariableDict.sentences[ lastSentId - 2 - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 2 - n ].judgement === "B" ) {

                                    if ( classVariableDict.sentences[ lastSentId - 2 - n ].question === false ) {
                    
                                        questionStreak = 3;

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

    } else {

        questionStreak = 0;

    }

    return questionStreak;

}

function showQuestionStreak() {

    let questionStreak = calculateQuestionStreak();

    if ( questionStreak === 3 ) {

        $('#questionStreakDiv').text( "Q" );
        $('#questionStreakDiv').css( "background-color", "green" );

    } else {

        $('#questionStreakDiv').text( questionStreak );
        $('#questionStreakDiv').css( "background-color", "red" );

    }

}






