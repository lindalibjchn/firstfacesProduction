function calcTimePassed() {

    let timeNow = new Date();
    let timePassed = timeNow - classVariables.start_time;
    let timePassedMinutes = Math.ceil( -60 + timePassed / 60000  );	
    //console.log('time passed minutes:', timePassedMinutes);

    //// this classTimeMinutes is defined in variables
    //let timeRemainingMinutes = CLASS_TIME_MINUTES - timePassedMinutes;

    //return timeRemainingMinutes;
    return timePassedMinutes;

}

function showTime() {

    let minutesPassed = calcTimePassed();
    $('#elapsedTimeSpan').text( minutesPassed.toString() );

}

// will call this with every blink, cuz nothing else goin on when blinking and relatively frequent :-)
//function showTimeRemaining() {

    ////console.log('in showTimeRemaining');

    //let timeRemainingMinutes = calcTimeRemaining();

    //if ( timeRemainingMinutes > 0 ) {

        //$('#timeLeft').text( timeRemainingMinutes.toString() + " minutes left" );

    //} else if ( timeRemainingMinutes > -5 ) {

        //$('#timeLeft').text( "last sentence" );
        //$('#timeLeft').css( "color", "red" );
        //classVariables.lastSentToBeSent = true;

    //} else {

        //classVariables.classOver = true;
        //$('#timeLeft').text( "class finished" );

        //// just delete class if no sentences when finished
        //if ( classVariables.id_of_last_sent === null ) {

            //endClassNoSentences()

        //} else {

            //if ( classVariables.endClassSequenceStarted !== true ) {

                //endClass();
                //classVariables.endClassSequenceStarted = true;

            //}

        //}

    //}

//}

function endClassNoSentences() {

    //$('#finishClassBtn').off('click');

    let sessId = classVariables.session_id;
    $.ajax({
        url: "/delete_session",
        type: "GET",
        data: {'sessId': sessId},
        success: function(json) {

            location.reload( true );

        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

}

function endClass() {

    //$('#finishClassBtn').off('click');

    let sessId = classVariables.session_id;
    $.ajax({
        url: "/store_class_over",
        type: "GET",
        data: {'sessId': sessId},
        success: function(json) {

            //classVariables.score = json.score

            if ( classVariables.first_ever_class ) {

                synthesisObject.text = "It was nice to meet you! Come back again whenever you want to talk.";

            } else {

                //if ( classVariables.score > classVariables.prev_score ) {
                
                    //let improvement = classVariables.score - classVariables.prev_score;
                    
                    //let praise = "";
                    //if ( improvement >= 5 ) {

                        //praise = " You are improving a lot! ";

                    //} else if ( improvement >= 10 ) {

                        //praise = " You have improved so much! ";
                    
                    //}

                    //synthesisObject.text = "Well done today! your score is " + ( classVariables.score ).toString() + ". That is better than last time by " + improvement.toString() + " points." + praise + "I look forward to seeing you again soon!";
                    
                //} else {

                let farewellGreetings = ["It was good to see you again", "I look forward to seeing you again soon", "Nice to talk to you again"];
                synthesisObject.text = farewellGreetings[ Math.floor(Math.random(farewellGreetings.length -1 )) ];
                
                //}

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
    //$('.option-btn').prop( "disabled", true);
    //$('.input-btn').prop( "disabled", true);
    //$('.input-btn-large').prop( "disabled", true);
    //$('#textInput').hide();

    //// fadeOut controller container on the right
    //$('#controllerContainer').fadeOut( 500 );


    let singleCalculatedExpressions = createSingleExpression( expressionsRel.happy, 0.7 )
    calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
    calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    expressionController( calculatedExpression, '1', false );
    setTimeout( goodbyeTalk, 1500 ); 

}

function goodbyeTalk() {

    // return to talking pos
    expressionController( calculatedTalkExpression, 1 );

    setTimeout( function() { 
        
        tiaSpeak( speechBubbleObject.sentence, needSendTTS=false, function() {
        
            classVariables.promptSpeaking = true;

            setTimeout( function() {
                
                location.reload( true );
                
            }, 4000 )

        });
        
    }, 1250);

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
            'tutorialStep': classVariables.tutorialStep,
            'sessionID': classVariables[ 'session_id' ],
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
    //let lastSentId = classVariables.id_of_last_sent

    //if ( lastSentId !== null && classVariables.last_sent.sentence !== null ) {

        ////skip the sentence waiting for judgement    
        //let n = 0;
        //if ( classVariables.sentences[ lastSentId ].judgement === null && Object.keys( classVariables.sentences ).length !== 1) {

            //n = 1;

        //}


        //if ( classVariables.sentences[ lastSentId - n ].judgement === "C" || classVariables.sentences[ lastSentId - n ].judgement === "B" ) {

            //if ( classVariables.sentences[ lastSentId - n ].question === false ) {
            
                //questionStreak = 1;

                //if ( classVariables.sentences[ lastSentId - 1 - n ] !== undefined ) {

                    //if ( classVariables.sentences[ lastSentId - 1 - n ].judgement === "C" || classVariables.sentences[ lastSentId - 1 - n ].judgement === "B" ) {

                        //if ( classVariables.sentences[ lastSentId - 1 - n ].question === false ) {
                
                            //questionStreak = 2;

                            //if ( classVariables.sentences[ lastSentId - 2 - n ] !== undefined ) {

                                //if ( classVariables.sentences[ lastSentId - 2 - n ].judgement === "C" || classVariables.sentences[ lastSentId - 2 - n ].judgement === "B" ) {

                                    //if ( classVariables.sentences[ lastSentId - 2 - n ].question === false ) {
                    
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






