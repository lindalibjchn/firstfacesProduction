function resetJudgement() {

    addJudgedSentenceToPrevSentences();
    clearJudgement();
    removeJudgedSentence();
    putNextSentenceNeedingJudgementUpForViewing();
    setKeydownEvents();
    resetPhoneColoursNeedJudgement();
    resetTempEmotionStates();

}

function clearJudgement() {

    //wipeAllCorrections();
    resetButtonOpacities();
    resetEmotionSurpriseNodShakeEvents();
    removeSelectable();

}

function removeJudgedSentence() {

    $('#sentenceForJudgement').empty() 
    $('#sentenceForJudgement').css( 'opacity', '0.7' ); 
    $( '.prompt-text' ).val('');

}

function addJudgedSentenceToPrevSentences() {

    let judgedSentence = teacherVars.sentencesNeedJudgement.shift();
    teacherVars.conversations[ judgedSentence.user_id ].conversations[ 0 ].completed_sentences.unshift( judgedSentence )

    let phoneId = teacherVars.studentIdToPhone[ judgedSentence.user_id ];
    let divForPuttingInPrevSentences = document.getElementById( 'prevSentsContainer' + phoneId );
    addPreviousSentences( teacherVars.conversations[ judgedSentence.user_id ].conversations[ 0 ], phoneId );

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

        $( '#judgementCol' ).css( 'opacity', '0.8' );
        $( '#judgementBtnsCover' ).css( 'z-index', '3' );

    }

}

function resetButtonOpacities() {

    $( '.dunno-btn' ).css( 'opacity', '0.7' );
    $( '.wrong-btn' ).css( 'opacity', '0.7' );
    $( '.correct-btn' ).css( 'opacity', '0.3' );

}

function resetPhoneColoursNeedJudgement() {

    $('.phone-outer').removeClass('phone-needs-correction-now phone-needs-correction-next');
    for( let i=0; i<teacherVars.sentencesNeedJudgement.length; i++ ) {

        let phoneId = teacherVars.studentIdToPhone[ teacherVars.sentencesNeedJudgement[ i ].user_id ];
        
        if ( i === 0 ) {

            $('#phone' + phoneId).addClass( 'phone-needs-correction-now' );
        
        } else {

            $('#phone' + phoneId).addClass( 'phone-needs-correction-next' );
        
        }

    };

}


