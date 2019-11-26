function setSelectable() {

    $("#sentenceForJudgement").selectable();
    $( '#sentenceForJudgement' ).css( {
        'opacity': '1',
        'cursor': 'pointer',
    } );

} 

function removeSelectable() {

    if ( $( '#sentenceForJudgement' ).hasClass( 'ui-selectable' ) ) {

        console.log('destroy selectable');
        $("#sentenceForJudgement").selectable( 'destroy' );
        $( '#sentenceForJudgement' ).css( {
            'opacity': '0.7',
            'cursor': 'default',
        } );

    }

} 

var appendCorrectionSection = function( copy ) {
    
    if ( teacherVars.sentencesNeedJudgement[ 0 ].indexes === null ) {

        teacherVars.sentencesNeedJudgement[ 0 ].indexes = [];
    
    }

    let numberOfCorrectionsAlreadyInIndexes = teacherVars.sentencesNeedJudgement[ 0 ].indexes.length

    highlightAndFocusOnPromptBox( numberOfCorrectionsAlreadyInIndexes );

    let idArray = []

    $('#sentenceForJudgement > .ui-selected').each( function() {
        idArray.push(parseInt(this.id.substring(8)));
    })

    idArray = removeAccidentallySelectedSpacesAtBeginningAndEndOfSelection( idArray );
    
    teacherVars.sentencesNeedJudgement[ 0 ].indexes.push( idArray );

    let sent = makeSentForPromptBox( idArray );
    
    putSelectionInPromptBox( sent, copy, numberOfCorrectionsAlreadyInIndexes )

} 

function removeAccidentallySelectedSpacesAtBeginningAndEndOfSelection( idArray_ ) {

    if ( idArray_.length > 1 ) {

        if ( idArray_[ 0 ] % 2 === 0 ) {

            idArray_.shift();

        }

        if ( idArray_[ idArray_.length - 1 ] % 2 === 0 ) {

            idArray_.pop();

        }

    }

    return idArray_

}

function makeSentForPromptBox( idArray_ ) {

    let sent_ = ''
    idArray_.forEach( function(i) {

        if ( i % 2 === 0 ) { // for spaces

            if ( idArray_.length === 1 ) {
            
                sent_ += '';
                $( '#indWord_' + i.toString() ).css( 'color', 'yellow');

            } else {

                sent_ += ' ';
                $( '#indWord_' + i.toString() ).css( 'color', 'yellow');
        
            }

        } else { // for words

            console.log('i:', i);
            console.log(teacherVars.sentencesNeedJudgement[ 0 ].sentence[ ( i - 1 ) / 2 ][ 0 ]);
            sent_ += teacherVars.sentencesNeedJudgement[ 0 ].sentence[ ( i - 1 ) / 2 ][ 0 ];

            $( '#indWord_' + i.toString() ).css( 'color', 'yellow');

        }

    });

    return sent_

}

function putSelectionInPromptBox( sent_, copy, correctionNumber ) {
    
    let curWrongText = $( '#promptText' + correctionNumber ).val()
    
    $( '#promptText' + correctionNumber ).focus()

    if ( curWrongText === '' ) {

        if ( copy ) {

            $( '#promptText' + correctionNumber ).val( sent_ );

        }

    } else {

        if ( copy ) {

            $( '#promptText' + correctionNumber ).val( curWrongText + '\n' + sent_ );

        } else {

            $( '#promptText' + correctionNumber ).val( curWrongText + '\n' );

        }

    }

}

