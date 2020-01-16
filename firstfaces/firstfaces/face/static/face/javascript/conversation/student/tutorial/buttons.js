function showSingleBtn( /* response,*/ callback ) {

    $('#tutorialBtnSingle').prop( 'disabled', false )
    $('#tutorialBtnSingleCont').fadeIn( 500 );
    //$('#tutorialBtnSingle').text( response );
    $('#tutorialBtnSingle').off( 'click' )
    $('#tutorialBtnSingle').on( 'click', callback )

}

function showDoubleBtn( /*response01, response02,*/ callback01, callback02 ) {

    $('.tut-double-btn').prop( 'disabled', false )
    $('#tutorialBtnDoubleCont').fadeIn( 500 );
    //$('#tutorialBtnDouble0').text( response01 );
    //$('#tutorialBtnDouble1').text( response02 );
    $('#tutorialBtnDouble0').off( 'click' );
    $('#tutorialBtnDouble1').off( 'click' );
    $('#tutorialBtnDouble0').on( 'click', callback01 );
    $('#tutorialBtnDouble1').on( 'click', callback02 );

}

//function showQuadBtn( response01, response02, response03, response04, callback01, callback02, callback03, callback04 ) {

    //$('.tut-quad-btn').prop( 'disabled', false )
    //$('#tutorialBtnQuadCont').fadeIn( 500 );
    //$('#tutorialBtnQuad0').text( response01 );
    //$('#tutorialBtnQuad1').text( response02 );
    //$('#tutorialBtnQuad2').text( response03 );
    //$('#tutorialBtnQuad3').text( response04 );
    //$('#tutorialBtnQuad0').on( 'click', callback01 );
    //$('#tutorialBtnQuad1').on( 'click', callback02 );
    //$('#tutorialBtnQuad2').on( 'click', callback03 );
    //$('#tutorialBtnQuad3').on( 'click', callback04 );

//}

function removeSingleBtn() {

    $('#tutorialBtnSingle').off( 'click' )
    $('#tutorialBtnSingle').prop( 'disabled', true )
    $('#tutorialBtnSingleCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

}

function removeDoubleBtn() {

    $('#tutorialBtnDouble0').off( 'click' )
    $('#tutorialBtnDouble1').off( 'click' )
    $('.tut-double-btn').prop( 'disabled', true )
    $('#tutorialBtnDoubleCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

}

/*function removeQuadBtn() {*/

    //$('#tutorialBtnQuad0').off( 'click' )
    //$('#tutorialBtnQuad1').off( 'click' )
    //$('#tutorialBtnQuad2').off( 'click' )
    //$('#tutorialBtnQuad3').off( 'click' )
    //$('#tutorialBtnQuad4').off( 'click' )
    //$('.tut-quad-btn').prop( 'disabled', true )
    //$('#tutorialBtnQuadCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

/*}*/

