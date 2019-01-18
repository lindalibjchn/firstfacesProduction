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
    setupSubmitBtnEvent();

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
        $('#wrongSent').html( highlightedSent );

        // reduce score for this sentence
        testDict.scoreThisSent -= 3;
        fillQuestionNos();
    
    });
    
};

function setupSubmitBtnEvent() {
 
    $('#submitBtn').on( 'click', function() {

        $('#submitBtn').hide();
        checkIfCorrect();
    
    });
    
};

function checkIfCorrect() {

    let correctSentence = makeCorrectSentence();

}

function createArrayFromCorrectionsWithHash( c ) {

    let correctionsArray = c.split( " # " );
    return correctionsArray;

}

function makeCorrection( correctSent, correction, ind ) {

    let preSplit = correctSent.substring( 0, ind[ 0 ] );
    let postSplit = correctSent.substring( ind[ 1 ] );

    let newSent = "";

    // if error is a space then need to add spaces around it
    if ( correctSent.substring( ind[ 0 ], ind[ 1 ] ) === " " ) {

        newSent = preSplit + " " + correction + " " + postSplit;

    } else if ( correctSent.substring( ind[ 0 ] === " " ) {



    }


    console.log( 'correctSent:', correctSent );
    console.log( 'correction:', correction );
    console.log( 'ind:', ind );

}

function makeCorrectSentence() {

    // takes incorrect sentence + indexes and corrections and gives correct sentence
    
    let wrongSent = testDict.sentences[ testDict.question ].sentence;
    let correctionsArray = createArrayFromCorrectionsWithHash( testDict.sentences[ testDict.question ].correction )

    let correctSent = wrongSent;
    let wrongIndexes = JSON.parse( testDict.sentences[ testDict.question ].indexes )

    for (i=0; i<wrongIndexes.length; i++ ) {

        makeCorrection( correctSent, correctionsArray[ i ], wrongIndexes[ i ] );

    }

}

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


