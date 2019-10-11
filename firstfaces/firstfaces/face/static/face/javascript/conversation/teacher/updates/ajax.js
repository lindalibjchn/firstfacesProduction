function checkForChange() {

    $.ajax({
        url: "/check_for_change",
        type: "GET",
        success: function(json) {

            if ( json.change ) {

                console.log('sentences_being_recorded:', json.sentences_being_recorded); 
                console.log('sentences_not_judged:', json.sentences_not_judged);
                updateSentencesNeedJudgement( json.sentences_not_judged );
                updateSentencesBeingRecorded( json.sentences_being_recorded );

            }

            checkForChange()
            console.log('checking again');

        },
        error: function() {
            console.log("check_for_change gone wrong");
        },

    });

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
                //noConversations = Object.keys( sessions ).length;

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
