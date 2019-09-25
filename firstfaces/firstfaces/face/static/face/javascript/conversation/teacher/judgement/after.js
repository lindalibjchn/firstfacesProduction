function afterSendingJudgement() {

    // remove sentence from array
    teacherVars.sentencesNeedJudgement.shift();

    resetTempJudgement();

    resetTia();

    putNextSentenceNeedingJudgementUpForViewing();

    setKeydownEvents();

}

function putNextSentenceNeedingJudgementUpForViewing() {

    if (teacherVars.sentencesNeedJudgement.length > 0 ) {

        // get next sentence needing judgement
        let sentNeedingJudgement = teacherVars.sentencesNeedJudgement[ 0 ].sentence;

        let lenOfSentArray = sentNeedingJudgement.length;
        for ( let wordInd = 0; wordInd < lenOfSentArray; wordInd++ ) {
            
            if ( wordInd === 0 ) {

                $('#sentenceForJudgement').append(

                    "<div class='ui-widget-content individual-words hash-spaces' id='indWord_0'>#</div>"

                )
            
            }

            $('#sentenceForJudgement').append(
            
                "<div class='ui-widget-content individual-words' id='indWord_" + ( 2 * wordInd + 1 ).toString() + "'>" + sentNeedingJudgement[ wordInd ][ 0 ] +

                "</div>" +

                "<div class='ui-widget-content individual-words hash-spaces' id='indWord_" + ( 2 * wordInd + 2 ).toString() + "'>#</div>"
            
            )

        }

    }

}

function resetTia() {

    movementController( movementObject.abs.blank, 0.5, function(){});


}

