function prepareJudgement( e ) {

    let btnId = e.target.id;
    highlightClick( btnId );

    if ( btnId === "promptBtn" ) {

        teacherVars.sentencesNeedJudgement[ 0 ].judgement = "P";
        highlightAndFocusOnPromptBox();
        removeSelectable();

    } else if ( btnId === "betterBtn" ) {

        teacherVars.sentencesNeedJudgement[ 0 ].judgement = "B";
        unHighlightAndFocusOnPromptBox();
        setSelectable();

    } else if ( btnId === "wrongBtn" ) {

        teacherVars.sentencesNeedJudgement[ 0 ].judgement = "I";
        unHighlightAndFocusOnPromptBox();
        setSelectable();

    } else if ( btnId === "meanByBtn" ) {

        teacherVars.sentencesNeedJudgement[ 0 ].judgement = "M";
        unHighlightAndFocusOnPromptBox();
        setSelectable();

    } else if ( btnId === "moreThanThree" ) {

        teacherVars.sentencesNeedJudgement[ 0 ].judgement = "3";
        storeJudgement();

    } else if ( btnId === "dunnoBtn" ) {

        teacherVars.sentencesNeedJudgement[ 0 ].judgement = "D";
        storeJudgement();

    }

}

function highlightClick( id ) {

    $('.judgement-btns').css("opacity",  "0.7");
    $( '.judgement-btns' ).hover( function(e) {

        $(this).css("opacity",e.type==="mouseenter"?"1":"0.7");
          
    });


    if ( teacherVars.sentencesNeedJudgement[ 0 ].emotion === null && teacherVars.sentencesNeedJudgement[ 0 ].surprise === null && teacherVars.sentencesNeedJudgement[ 0 ].nodShake === null ) {
        
        $('.correct-btn').css("opacity",  "0.3");

    }

    //$('.dunno-btn').css("opacity",  "0.7");

    $( '#' + id ).css("opacity",  "1");
    $( '#' + id ).hover( function(e) {

        $(this).unbind("mouseenter mouseleave");
        $(this).css("opacity", "1");
          
    });

}

function highlightAndFocusOnPromptBox() {

    enablePromptBox();
    $( '#promptText' ).focus();
    $( '#promptBoxInnerContainer' ).css( 'opacity', '1' );

}

function unHighlightAndFocusOnPromptBox() {

    $( '#promptText' ).blur();
    disablePromptBox();
    $( '#promptBoxInnerContainer' ).css( 'opacity', '0.7' );

}

function storePromptThenSend() {

    let promptText = $( '#promptText' ).val();
    disablePromptBox();
    if ( promptText !== '' ) {

        teacherVars.sentencesNeedJudgement[ 0 ].prompt = promptText.split( '\n' );

    }

    storeJudgement();

}

function wipeAllCorrections() {

    let noCorrections = teacherVars.sentencesNeedJudgement[ 0 ].indexes.length
    for( let i=0; i<noCorrections; i++ ) {

        clearCorrection();

    } 
    
    unHighlightAndFocusOnPromptBox();

}

function clearCorrection() {

    if ( teacherVars.sentencesNeedJudgement[ 0 ].indexes.length > 0 ) {

        let promptText = $( '#promptText' ).val();
        let promptTextArray = promptText.split( '\n' );
        promptTextArray.pop();
        $( '#promptText' ).val( promptTextArray.join( '\n' ) );

        let indexesToBeUnHighlighted = teacherVars.sentencesNeedJudgement[ 0 ].indexes.pop();
        indexesToBeUnHighlighted.forEach( function( i ) {

            if ( $( '#indWord_' + i.toString() ).text() === '#' ) {

                $( '#indWord_' + i.toString() ).css( 'color', '#102858');

            } else {

                $( '#indWord_' + i.toString() ).css( 'color', 'white');
            
            }
                
            $( '#indWord_' + i.toString() ).removeClass( 'ui-selected');

        } )

    } 

}


