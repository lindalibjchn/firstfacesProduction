function prepareJudgement( e ) {

    let btnId = e.target.id;
    highlightClick( btnId );

    if ( btnId === "promptBtn" ) {

        teacherVars.tempJudgement.judgement = "P";
        highlightAndFocusOnPromptBox();
        removeSelectable();

    } else if ( btnId === "betterBtn" ) {

        teacherVars.tempJudgement.judgement = "B";
        unHighlightAndFocusOnPromptBox();
        setSelectable();

    } else if ( btnId === "wrongBtn" ) {

        teacherVars.tempJudgement.judgement = "I";
        unHighlightAndFocusOnPromptBox();
        setSelectable();

    } else if ( btnId === "meanByBtn" ) {

        teacherVars.tempJudgement.judgement = "M";
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


    if ( teacherVars.tempJudgement.emotion === null && teacherVars.tempJudgement.surprise === null && teacherVars.tempJudgement.nodShake === null ) {
        
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

    $( '#promptText' ).focus();
    $( '#promptBoxInnerContainer' ).css( 'opacity', '1' );

}

function unHighlightAndFocusOnPromptBox() {

    $( '#promptText' ).blur();
    $( '#promptBoxInnerContainer' ).css( 'opacity', '0.7' );

}

function storePromptNConfirmTempJudgementsThenSend() {

    let promptText = $( '#promptText' ).val();
    teacherVars.sentencesNeedJudgement[ 0 ].prompt = promptText.split( '\n' );

    teacherVars.sentencesNeedJudgement[ 0 ].judgement = teacherVars.tempJudgement.judgement;
    teacherVars.sentencesNeedJudgement[ 0 ].emotion = teacherVars.tempJudgement.emotion;
    teacherVars.sentencesNeedJudgement[ 0 ].surprise = teacherVars.tempJudgement.surprise;
    teacherVars.sentencesNeedJudgement[ 0 ].nod_shake = teacherVars.tempJudgement.nodShake;
    teacherVars.sentencesNeedJudgement[ 0 ].indexes = teacherVars.tempJudgement.indexes;
    
    storeJudgement();

}



