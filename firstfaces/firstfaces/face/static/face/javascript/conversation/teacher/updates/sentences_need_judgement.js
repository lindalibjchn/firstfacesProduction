function updateSentencesNeedJudgement( updatedSentencesNeedJudgement ) {

    let lengthCurSentencesNeedJudgement = teacherVars.sentencesNeedJudgement.length;
    
    for ( let i=0; i<updatedSentencesNeedJudgement.length; i++ ) {

        teacherVars.sentencesNeedJudgement.push( updatedSentencesNeedJudgement[ i ] );

        teacherVars.sentencesBeingRecorded = teacherVars.sentencesBeingRecorded.filter( function ( s ) {

            return !( s.sent_id ===  updatedSentencesNeedJudgement[ i ].sent_id );

        })

    }

    //}

    if ( lengthCurSentencesNeedJudgement === 0 ) {

        putNextSentenceNeedingJudgementUpForViewing();

    }

    showSentencesBeingRecordedInPhones();

}


