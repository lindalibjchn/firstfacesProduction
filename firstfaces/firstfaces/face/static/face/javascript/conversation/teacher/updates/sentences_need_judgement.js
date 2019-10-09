function updateSentencesNeedJudgement( updatedSentencesNeedJudgement ) {

    let lengthCurSentencesNeedJudgement = teacherVars.sentencesNeedJudgement.length;
    let lengthUpdatedSentencesNeedJudgement = updatedSentencesNeedJudgement.length;

    if ( lengthUpdatedSentencesNeedJudgement > lengthCurSentencesNeedJudgement ) {

        let noNewSents = lengthUpdatedSentencesNeedJudgement - lengthCurSentencesNeedJudgement;

        for ( let i=0; i<noNewSents; i++ ) {

            teacherVars.sentencesNeedJudgement.push( updatedSentencesNeedJudgement[ lengthCurSentencesNeedJudgement + i ] );

        }

    }

}


