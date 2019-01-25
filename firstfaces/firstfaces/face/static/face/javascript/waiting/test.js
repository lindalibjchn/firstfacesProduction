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
    setupNextQBtnEvent();
    setupHintBtnEvent();
    setupSubmitBtnEvent();

}

function fillQuestionNos() {

    $('#testQuestionNo').text( "Q" + (testDict.question + 1).toString() );
    $('#testQuestionScoreThisSent').text( testDict.scoreThisSent.toString() );
    $('#testQuestionScoreTotal').text( testDict.totalScore.toString() + "/100" );

}

function setupNextQBtnEvent() {
 
    $('#nextQBtn').hide();;
    $('#nextQBtn').on( 'click', function() {

        $('#nextQBtn').hide();
        nextQuestion();

    });
    
};

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
        let learnerGuess = $('#inputAnswer').val()
        checkIfCorrect( learnerGuess );

    });
    
};

function checkIfCorrect( lG ) {

    if ( testDict.sentences[ testDict.question ].correctSentence === undefined ) {

       testDict.sentences[ testDict.question ].correctSentence = makeCorrectSentence();
    
    }

    //console.log( 'lG:', lG );
    //console.log( 'testDict.correctSentence:', testDict.correctSentence );

    if ( lG === testDict.sentences[ testDict.question ].correctSentence ) {

        $('#inputAnswer').css( 'background-color', 'green' );
        $('#testQuestionScoreThisSent' ).css( 'color', 'green' );
        setTimeout( nextQuestion, 1000 );

    } else {

        testDict.scoreThisSent -= 5;

        if ( testDict.scoreThisSent < 0 ) {

            testDict.scoreThisSent = 0;

        }

        fillQuestionNos();
        $('#inputAnswer').css( 'background-color', 'red' );
        $('#testQuestionScoreThisSent' ).css( 'color', 'red' );
        setTimeout( afterWrong, 1000 );

    }

}

function afterWrong() {

    if ( testDict.scoreThisSent <= 0 ) {

        testDict.scoreThisSent = 0;
        showCorrect();

    } else {

        $('#submitBtn').show();
        $('#inputAnswer').css( 'background-color', 'white' ).focus();
        $('#testQuestionScoreThisSent' ).css( 'color', 'black' );
        fillQuestionNos();

    }

}

function showCorrect() {

    fillQuestionNos();
    $('#correctSent').html( testDict.sentences[ testDict.question ].correctSentence );
    $('#correctSent').fadeIn( 500 );
    $('#hintBtn').hide();
    $('#nextQBtn').fadeIn( 500 );

}

function nextQuestion() {

    testDict.totalScore += testDict.scoreThisSent;
    
    if ( testDict.question === 9 ) {

        finishTest();

    } else {

        testDict.question += 1;
        testDict.scoreThisSent = 10;
        
        $('#submitBtn').show();
        $('#inputAnswer').css( 'background-color', 'white' );

        $('.test-box-contents').fadeOut( 500 );
        $('#testQuestionScoreThisSent').fadeOut( 500 );

        setTimeout( function() {
            
            fillQuestionNos();
            fillQuestion( testDict.question );
            $( '.test-box-contents' ).fadeIn( 500 );
            $('#testQuestionScoreThisSent').fadeIn( 500 );
            $('#testQuestionScoreThisSent' ).css( 'color', 'black' );

        }, 1000 );

    }

}

function finishTest() {


}

function createArrayFromCorrectionsWithHash( c ) {

    let correctionsArray = c.split( " # " );
    return correctionsArray;

}

function makeCorrectSentence() {

    // takes incorrect sentence + indexes and corrections and gives correct sentence

    // makes individual corrections
    function makeCorrection( correctSent, correction, ind ) {

        let preSplit = correctSent.substring( 0, ind[ 0 ] );
        let postSplit = correctSent.substring( ind[ 1 ] );

        let newSent = "";

        if ( correction === "x" || correction === "[delete]" ) {

            newSent = preSplit + postSplit.trim();

        // if error is a space then need to add spaces around it
        } else if ( correctSent.substring( ind[ 0 ], ind[ 1 ] ) === " " ) {

            newSent = preSplit + " " + correction + " " + postSplit;

        } else if ( correctSent.substring( ind[ 0 ] ) === " " && correctSent.substring( ind[ 1 ] - 1 ) === " " ) {

            newSent = preSplit + " " + correction + " " + postSplit;

        } else if ( correctSent.substring( ind[ 0 ] ) === " " ) {

            newSent = preSplit + " " + correction + postSplit;

        } else if ( correctSent.substring( ind[ 1 ] - 1 ) === " " ) {

            newSent = preSplit + correction + " " + postSplit;

        } else {

            newSent = preSplit + correction + postSplit;

        }

        return newSent

    }

    
    let wrongSent = testDict.sentences[ testDict.question ].sentence;
    let correctionsArray = createArrayFromCorrectionsWithHash( testDict.sentences[ testDict.question ].correction )

    let correctSent = wrongSent;
    let wrongIndexes = JSON.parse( testDict.sentences[ testDict.question ].indexes )

    for (i=0; i<wrongIndexes.length; i++ ) {

        correctSent = makeCorrection( correctSent, correctionsArray[ i ], wrongIndexes[ i ] );

    }

    return correctSent;

}

function fillQuestion( q ) {

    $('#correctSent').hide();
    let wrongSentDiv = document.getElementById('wrongSent');

    if ( testDict.sentences[ q ].sentence[ 0 ] == " " ) {

        wrongSent.innerHTML =  "&nbsp" + testDict.sentences[ q ].sentence.substring( 1 );

    } else {

        wrongSent.innerHTML =  "&nbsp" + testDict.sentences[ q ].sentence;

    }

    $('#inputAnswer').val(testDict.sentences[ q ].sentence);
    $('#inputAnswer').focus();

}

function getRandomTenWrongSentences() {

    let allWrongSents = getAllWrongSentences();
    console.log( 'allWrongSents:', allWrongSents );

    var lenAll = allWrongSents.length;

    let moreThanTenWrong = false;
    if ( lenAll >= 10 ) {

        moreThanTenWrong = true;

    }

    let tenWrong = [];

    for (i=0; i<10; i++) {

        let randomInt = Math.floor( Math.random() * lenAll );
        lenAll -= 1;

        tenWrong.push( allWrongSents[ randomInt ] );

        // don't want repeat sentences if possible
        //if ( moreThanTenWrong ) {

            //delete allWrongSents[ randomInt ];

        //}

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


