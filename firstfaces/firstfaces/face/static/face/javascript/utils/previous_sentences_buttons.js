function setUpPreviousSentsBtns( sentences ) {

    $('.titles').unbind();
    console.log('in setUpPreviousSentsBtns')
    $('#prevSentsIconContainer').on( 'click', function() {

        closeTimeOverlayCont();
        //$('#prevSentsContainer0').fadeIn();
        $('#prevSentsContainer').fadeIn();
        $('#prevSentsIconContainer').hide();
        //updateScroll( document.getElementById('prevSentsInnerContainer0') );
        addData( 'grammar', 'article', sentences );

    });

    $('#sentencesTitleContainer').on( 'click', function() {

        addData( 'sentences', sentences );

    } );

    $('#grammarTitleContainer').on( 'click', function() {

        addData( 'grammar', 'article', sentences );

    } );

    //$('#pronunciationTitleContainer').on( 'click', function() {

        //addData( 'pronunciation', 'phrase', sentences );

    //} );

    $('#articlesTabContainer').on( 'click', function() {

        addData( 'grammar', 'article', sentences );

    } );

    //$('#verbsTabContainer').on( 'click', function() {

        //addData( 'grammar', 'verb', sentences );

    //} );

    //$('#prepositionsTabContainer').on( 'click', function() {

        //addData( 'grammar', 'preposition', sentences );

    //} );

    //$('#phrasesTabContainer').on( 'click', function() {

        //addData( 'pronunciation', 'phrase', sentences );

    //} );

    //$('#wordsTabContainer').on( 'click', function() {

        //addData( 'pronunciation', 'word', sentences );

    //} );

    //$('#phonemesTabContainer').on( 'click', function() {

        //addData( 'pronunciation', 'phoneme', sentences );

    //} );

}



