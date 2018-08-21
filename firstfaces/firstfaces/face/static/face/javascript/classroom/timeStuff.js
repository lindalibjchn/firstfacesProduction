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

    } else {

        $('#timeDiv').text( "reload" );

    }

}

/////////QUESTION STREAK

function calculateQuestionStreak() {

    let questionStreak = 0;
    let lastSentId = classVariableDict.id_of_last_sent

    if ( lastSentId !== null ) {

        //skip the sentence waiting for judgement    
        let n = 0;
        if ( classVariableDict.sentences[ lastSentId ].judgement === null ) {

            n = 1;

        }

        console.log('lastSentId:', lastSentId);
        console.log('n:', n);

        if ( classVariableDict.sentences[ lastSentId - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "B" ) {

            if ( classVariableDict.sentences[ lastSentId - n ].question === false ) {
            
                questionStreak = 1;

                if ( classVariableDict.sentences[ lastSentId - 1 - n ] !== undefined ) {

                    if ( classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 1 - n ].judgement === "B" ) {

                        if ( classVariableDict.sentences[ lastSentId - 1 - n ].question === false ) {
                
                            questionStreak = 2;

                            if ( classVariableDict.sentences[ lastSentId - 2 - n ] !== undefined ) {

                                if ( classVariableDict.sentences[ lastSentId - 2 - n ].judgement === "C" || classVariableDict.sentences[ lastSentId - 3 - n ].judgement === "B" ) {

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






