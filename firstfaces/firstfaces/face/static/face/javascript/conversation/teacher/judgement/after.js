function resetJudgement() {

    clearJudgement();
    removeJudgedSetence();
    putNextSentenceNeedingJudgementUpForViewing();
    setKeydownEvents();

}

function removeJudgedSetence() {

    $('#sentenceForJudgement').empty() 
    $('#sentenceForJudgement').css( 'opacity', '0.7' ); 
    $( '#promptText' ).val() = '';

}

function putNextSentenceNeedingJudgementUpForViewing() {

    if (teacherVars.sentencesNeedJudgement.length > 0 ) {

        $( '#judgementBtnsCover' ).css( 'z-index', '1' );
        $( '#judgementCol' ).css( 'opacity', '1' );
        $( '.dunno-btn' ).attr( 'disabled', false );
        $( '.wrong-btn' ).attr( 'disabled', false );

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

    } else {

        $( '#judgementCol' ).css( 'opacity', '0.7' );
        $( '#judgementBtnsCover' ).css( 'z-index', '3' );

    }

}

function resetButtonOpacities() {

    $( '.dunno-btn' ).css( 'opacity', '0.7' );
    $( '.wrong-btn' ).css( 'opacity', '0.7' );
    $( '.correct-btn' ).css( 'opacity', '0.3' );

}

