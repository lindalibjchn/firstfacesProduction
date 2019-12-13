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

function storeSinglePromptBox( awaiting ) {

    let idOfCurrentTextBoxInFocus = $('textarea:focus').attr('id');
    let promptNumber = parseInt( idOfCurrentTextBoxInFocus[ idOfCurrentTextBoxInFocus.length - 1 ] )
    let idOfNextPromptNumber = promptNumber + 1;
    let promptText = $( '#promptText' + promptNumber ).val();
    teacherVars.sentencesNeedJudgement[ 0 ].awaiting_next_prompt = awaiting,
    $( '#promptText' + promptNumber ).attr('disabled', 'disabled');
    
    if ( promptNumber === 0 ) {

        if ( promptText !== "" ) {

            $('#prompt0SetContainer').hide();
            storeSinglePrompt( promptNumber, promptText );
            $( '#promptText' + idOfNextPromptNumber ).focus();

        }

    } else if ( promptNumber === 1 ) {

        $( '#promptText' + idOfNextPromptNumber ).focus();

        if ( promptText !== "" ) {

            storeSinglePrompt( promptNumber, promptText );

        }

    } else {

        teacherVars.sentencesNeedJudgement[ 0 ].awaiting_next_prompt = false,
        storeSinglePrompt( promptNumber, promptText );
        //resetJudgement();

    }

    if ( !awaiting && promptNumber !== 2 ) {

        resetJudgement();

    }

}

function addPromptToSentenceData( promptNumber_, promptText_ ) {

    teacherVars.sentencesNeedJudgement[0].prompts[ promptNumber_ ] = {
        'text': promptText_,
    }

}

