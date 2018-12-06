function calcTimeRemaining() {

    let timeNow = new Date();
    let timePassed = timeNow - classVariableDict.start_time;
    let timePassedMinutes = Math.ceil( -60 + timePassed / 60000  );	
    console.log('time passed minutes:', timePassedMinutes);

    // this classTimeMinutes is defined in variables
    let timeRemainingMinutes = CLASS_TIME_MINUTES - timePassedMinutes + 999999999;

    return timeRemainingMinutes;

}

// will call this with every blink, cuz nothing else goin on when blinking and relatively frequent :-)
function showTimeRemaining() {

    console.log('in showTimeRemaining');

    let timeRemainingMinutes = calcTimeRemaining();

    if ( timeRemainingMinutes > 0 ) {

        $('#timeLeft').text( timeRemainingMinutes.toString() + " minutes left" );

    } else if ( timeRemainingMinutes > -5 ) {

        $('#timeLeft').text( "last sentence" );
        classVariableDict.lastSentToBeSent = true;

    } else {

        classVariableDict.classOver = true;
        $('#timeLeft').text( "class finished" );
        endClass();

    }

}

function endClass() {

    let sessId = classVariableDict.session_id;
    $.ajax({
        url: "/store_class_over",
        type: "GET",
        data: {'sessId': sessId},
        success: function(json) {

            classVariableDict.score = json.score

	    if ( classVariableDict.first_ever_class ) {

		synthesisObject.text = "Well done today! Your first ever score is " + ( classVariableDict.score ).toString() + ". I hope to see you again for a second class!";

	    } else {

		    if ( classVariableDict.score > classVariableDict.prev_score ) {
		    
			let improvement = classVariableDict.score - classVariableDict.prev_score;
			
			let praise = "";
			if ( improvement >= 5 ) {

			    praise = " You are improving a lot! ";

			} else if ( improvement >= 10 ) {

			    praise = " You have improved so much! ";
			
			}

			synthesisObject.text = "Well done today! your score is " + ( classVariableDict.score ).toString() + ". That is better than last time by " + improvement.toString() + " points." + praise + "I look forward to seeing you again soon!";
		    
		    } else {

			synthesisObject.text = "Well done today! your score is " + ( classVariableDict.score ).toString() +  ". I look forward to seeing you again soon!";
		    
		    }

	    }

            // prepare speech 
            synthesisObject.pitch = 0;
            synthesisObject.speaking_rate = 0.85;
            sendTTS( synthesisObject.text, true, "talk" );
            speechBubbleObject.sentence = synthesisObject.text;
        
        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

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

            expressionController( calculatedExpression, '1', false );

            setTimeout( goodbyeTalk, 2000 ); 

        }, 2100 );

    }, 600 );


}

function goodbyeTalk() {

    // return to talking pos
    expressionController( calculatedTalkExpression, 1 );

    setTimeout( function() { 
        
        tiaSpeak( speechBubbleObject.sentence, needSendTTS=false, function() {
        
            classVariableDict.promptSpeaking = true;

            setTimeout( function() {
                
                location.reload( true );
                
            }, 8000 )

        });
        
    }, 1500);

}

function goodbyeSpeak() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        //synthesisObject.gotNewSpeech = false
        initTalk();

    } else {

        setTimeout( goodbyeSpeak, 1000 );

    }

}

function endTutorial() {

    $.ajax({
        url: "/store_tutorial_end",
        type: "POST",
        data: {
            'tutorialStep': classVariableDict.tutorialStep,
            'sessionID': classVariableDict[ 'session_id' ],
        },
        success: function(json) {

            location.reload( true );

        },
        error: function() {
            alert("failed tutorial end");
        },
    });

}

/////////QUESTION STREAK

//function calculateQuestionStreak() {

    //let questionStreak = 0;
    //let lastSentId = classVariableDict.id_of_last_sent

    //if ( lastSentId !== null && classVariableDict.last_sent.sentence !== null ) {

        ////skip the sentence waiting for judgement    
        //let n = 0;
        //if ( classVariableDict.sentences[ lastSentId ].judgement === null && Object.keys( classVariableDict.sentences ).length !== 1) {

            //n = 1;

        //}


        //if ( classVariableDict.sentences[ lastSentId - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - n ].judgement === "B" ) {

            //if ( classVariableDict.sentences[ lastSentId - n ].question === false ) {
            
                //questionStreak = 1;

                //if ( classVariableDict.sentences[ lastSentId - 1 - n ] !== undefined ) {

                    //if ( classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "B" ) {

                        //if ( classVariableDict.sentences[ lastSentId - 1 - n ].question === false ) {
                
                            //questionStreak = 2;

                            //if ( classVariableDict.sentences[ lastSentId - 2 - n ] !== undefined ) {

                                //if ( classVariableDict.sentences[ lastSentId - 2 - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 2 - n ].judgement === "B" ) {

                                    //if ( classVariableDict.sentences[ lastSentId - 2 - n ].question === false ) {
                    
                                        //questionStreak = 3;

                                    //}

                                //}

                            //}

                        //}

                    //}

                //}

            //}

        //}

    //} else {

        //questionStreak = 0;

    //}

    //return questionStreak;

//}

//function showQuestionStreak() {

    //let questionStreak = calculateQuestionStreak();

    //if ( questionStreak === 3 ) {

        //$('#questionStreakDiv').text( "Q" );
        //$('#questionStreakDiv').css( "background-color", "green" );

    //} else {

        //$('#questionStreakDiv').text( questionStreak );
        //$('#questionStreakDiv').css( "background-color", "red" );

    //}

//}






