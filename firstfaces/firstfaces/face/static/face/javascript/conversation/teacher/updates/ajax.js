function checkForChange() {

    $.ajax({
        url: "/check_for_change",
        type: "GET",
        data: { 
            totalSents: sessions.totalSentences,
            sentsAwaitingMaybeUrgentUpdate: JSON.stringify( sentencesMaybeNeedUrgentCorrection ),
        }, 
        success: function(json) {

            //console.log('changed:', json.changed);
            
            if ( json.changed ) {
                
                aud.play();
                updateSessionsDictFromServer(); 
                teacherVars.checkForChangeCount = 0;

            } else {

                teacherVars.checkForChangeCount += 1;

            }

            if ( checkForChange.count === 10 ) {

                updateSessionsDictFromServer();
                teacherVars.checkForChangeCount = 0;

            }

            // hit db every 2 seconds to check for changes
        },
        error: function() {
            console.log("that's wrong");
        },

    });

    setTimeout( checkForChange, 1000 );

}

function updateSessionsDictFromServer( correction=false ) {

    //if comes from send correction to server then correction=true and update sentence for correction too.
    
    $.ajax({
        url: "/update_session_object",
        type: "POST",
        data: {}, 
        success: function(json) {

            prevSentencesNeedJudgementLength = sentencesNeedJudgement.length;

            sessions = JSON.parse(json.sessions);

            if ( Object.keys( sessions ).length !== noSessions ) {

                aud1.play();
                //noSessions = Object.keys( sessions ).length;

            }

            updateSentencesNeedJudgement();
            updateWrongSentences();
            updatePrevSentences();

            if ( correction ) {

                updateSentenceForCorrection();

            }

            if ( prevSentencesNeedJudgementLength === 0 && sentencesNeedJudgement.length > 0 ) {

                loadNextSentenceNeedingJudgement();

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}
