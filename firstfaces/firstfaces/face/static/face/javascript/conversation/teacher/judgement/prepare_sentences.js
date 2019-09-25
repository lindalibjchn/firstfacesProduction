function updateSentencesNeedJudgement() {

    //var timeNow = new Date();
    teacherVars.sentencesNeedJudgement = [];

    for ( var key in teacherVars.sessions ) {

        //check that there is a sentence in a session - if not it is anew session
        if ( sessions[ key ].sentences[ 0 ] !== undefined ) {

            // push all unjudged sentences to their own array
            if ( sessions[ key ].sentences[ 0 ].judgement === null && sessions[ key ].sentences[ 0 ].sentence.length !== 0) {

                teacherVars.sentencesNeedJudgement.push( sessions[ key ].sentences[0] );

            }


        }

    }

    // sor these sentences so oldest sent is at position 0
    teacherVars.sentencesNeedJudgement.sort(function (a, b) {
          return a.sentence_timestamp - b.sentence_timestamp;
    });

}

function loadNextSentenceNeedingJudgement() {

    // put next sentence needing judgement up for viewing
    putNextSentenceNeedingJudgementUpForViewing();    

}


