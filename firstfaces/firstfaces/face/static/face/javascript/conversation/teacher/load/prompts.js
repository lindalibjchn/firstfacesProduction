function loadPreMadePrompt0s() {

    teacherVars.prompt0s.forEach( function( p ) {

        //console.log(p);
        $('#prompt0SetInnerContainer').append(

            '<div class="prompt-0-btn">' +

                p +

            '</div>'

        )

    })
    $('.prompt-0-btn').click( addPrompt0 );

}

function addPrompt0() {

    $('#promptText0').val(this.innerHTML);
    highlightAndFocusOnPromptBox( 0 );

}

function storeSinglePromptBoxAndMoveToNextBox() {

    let idOfCurrentTextBoxInFocus = $('textarea:focus').attr('id');
    let promptNumber = parseInt( idOfCurrentTextBoxInFocus[ idOfCurrentTextBoxInFocus.length - 1 ] )
    let idOfNextPromptNumber = promptNumber + 1;
    let promptText = $( '#promptText' + promptNumber ).val();
    $( '#promptText' + promptNumber ).attr('disabled', 'disabled');
    
    if ( promptNumber === 0 ) {

        if ( promptText !== "" ) {

            teacherVars.sentencesNeedJudgement[0].prompts[ promptNumber ] = promptText
            $('#prompt0SetContainer').hide();
            storeJudgement()
            $( '#promptText' + idOfNextPromptNumber ).focus();

        }

    } else if ( promptNumber === 1 ) {

        teacherVars.sentencesNeedJudgement[0].prompts[ promptNumber ] = promptText
        $( '#promptText' + idOfNextPromptNumber ).focus();

        if ( promptText !== "" ) {

            storeSinglePrompt( promptNumber, promptText, true );

        }

    } else {

        teacherVars.sentencesNeedJudgement[0].prompts[ promptNumber ] = promptText

        if ( promptText !== "" ) {

            storeSinglePrompt( promptNumber, promptText, true );

        }

    }

}

