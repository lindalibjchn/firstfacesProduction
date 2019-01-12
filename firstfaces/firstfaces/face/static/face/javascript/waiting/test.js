function startTest() {

    $('#startTestBtn').prop( 'disable', true );
    $('#testsEntrance').fadeOut( function(){ $('#testQuestionsCont').fadeIn() } );
    
    loadTest();

}

function loadTest() {

    testDict.sentences = getRandomTenWrongSentences();
    fillQuestion( 0 );
    testDict.question = 0;
    testDict.totalScore = 0;
    testDict.scoreThisSent = 10;
    fillQuestionNos();
    setupHintBtnEvent();

}

function fillQuestionNos() {

    $('#testQuestionNo').text( (testDict.question + 1).toString() );
    $('#testQuestionScoreThisSent').text( testDict.scoreThisSent.toString() + "/10" );
    $('#testQuestionScoreTotal').text( testDict.totalScore.toString() + "/100" );

}

function setupHintBtnEvent() {
 
    $('#hintBtn').show();
    $('#hintBtn').on( 'click', function() {

        $('#hintBtn').hide();
        let highlightedSent = makeHighlightedSent( testDict.sentences[ testDict.question ] );
        
        console.log( 'highlightedSent:', highlightedSent );

        $('#wrongSent').html( highlightedSent );
    
    });
    
};

function fillQuestion( q ) {


    let wrongSentDiv = document.getElementById('wrongSent');
    wrongSent.innerHTML = testDict.sentences[ q ].sentence;
    $('#inputAnswer').text(testDict.sentences[ q ].sentence);
    $('#inputAnswer').focus();

}

function getRandomTenWrongSentences() {

    let allWrongSents = getAllWrongSentences();

    let lenAll = allWrongSents.length;

    let moreThanTenWrong = false;
    if ( lenAll >= 10 ) {

        moreThanTenWrong = true;

    }

    let tenWrong = [];

    for (i=0; i<10; i++) {

        let randomInt = Math.floor( Math.random() * lenAll );

        tenWrong.push( allWrongSents[ randomInt ] );

        // don't want repeat sentences if possible
        if ( moreThanTenWrong ) {

            delete allWrongSents[ randomInt ];

        }

    };

    return tenWrong;

}

function getAllWrongSentences() {

    let allWrongSents = []

    sessionsDict.IDList.forEach( function( e ) {

        let allSents = sessionsDict[ e ].sentences;

        allSents.forEach( function( s ) {

            if ( s.judgement === "I" && s.try_again === null ) {

                allWrongSents.push( s );

            }

        })

    })

    return allWrongSents;

}


