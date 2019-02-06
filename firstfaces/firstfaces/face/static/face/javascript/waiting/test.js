function startTest() {

    $('#startTestBtn').prop( 'disable', true );
    $('#testsEntrance').fadeOut(); 
    
    setTimeout( function(){ $('#testQuestionsOuterCont').fadeIn( 1000 ) }, 500 );

    sendStartTestToServer()
    loadTest();

}

function sendStartTestToServer() {

    $.ajax({
        url: "/store_test_begin",
        type: "GET",
        success: function(json) {
            
            console.log( 'stored test start' );

        },
        error: function() {
            alert("error adding test begin");
        },

    });

}

function loadTest() {

    testDict.sentences = getRandomTenWrongSentences();
    fillQuestion( 0 );
    testDict.question = 9;
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
    $('#testQuestionScoreThisSent').css( {
        'font-size': '3vw',
        'font-weight': 'normal'
    });
    $('#testQuestionScoreTotal').text( testDict.totalScore.toString() + "/" + ( testDict.question * 10 ).toString() );

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

    console.log( 'lG:', lG );
    console.log( 'testDict.correctSentence:', testDict.correctSentence );

    if ( lG === testDict.sentences[ testDict.question ].correctSentence ) {

        $('#inputAnswer').css( 'background-color', 'lime' );
        $('#testQuestionScoreThisSent' ).css( { 
            'color': 'green', 
            'font-weight': 'bold',
            'font-size': '4vw',
        });
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
        
        $('.test-box-contents').fadeOut( 500 );
        $('#testQuestionScoreThisSent').fadeOut( 500 );

        setTimeout( function() {
            
            $('#submitBtn').show();
            $('#hintBtn').show();
            $('#inputAnswer').css( 'background-color', 'white' );
            setTimeout( function(){ $('#inputAnswer').focus() }, 600 );

            fillQuestionNos();
            fillQuestion( testDict.question );
            $( '.test-box-contents' ).fadeIn( 500 );
            $('#testQuestionScoreThisSent').fadeIn( 500 );
            $('#testQuestionScoreThisSent' ).css( 'color', 'black' );

        }, 1000 );

    }

}

function finishTest() {

    sendFinishTestDataToServer();

    $('#hintBtn').off( 'click' );
    $('#submitBtn').off( 'click' );
    $('#nextBtn').off( 'click' );

    $('#testQuestionOuter').fadeOut( 500 );
    
    setTimeout( function() {

        $('#finalScore').text( "Final Score: " + testDict.totalScore.toString() + "/100" );
        $('#finalScore').fadeIn( 500 );

        setTimeout( function() {

            $('#testQuestionsOuterCont').fadeOut( 500 );

            setTimeout( function(){ 
                
                $('#finalScore').hide();
                $('#testQuestionOuter').show();
                $('#testsEntrance').fadeIn( 1000 ); 
            
                $('#submitBtn').show();
                $('#hintBtn').show();
                $('#inputAnswer').css( 'background-color', 'white' );

                $( '.test-box-contents' ).fadeIn( 500 );
                $('#testQuestionScoreThisSent').fadeIn( 500 );
                $('#testQuestionScoreThisSent' ).css( 'color', 'black' );

            }, 600 );

        }, 3000 );

    }, 500 );

}

function sendFinishTestDataToServer() {

    $.ajax({
        url: "/store_test_score",
        type: "GET",
        data: { 
            'test_score': testDict.totalScore,
        },
        success: function(json) {
            
            //let date = new Date( startTimeUnix ).toLocaleDateString("en-GB");
            //let dateFormatted = date.substring(0, date.length - 5)
            prevTestScores.push( [ json.finishTime, testDict.totalScore ] );
            insertTestChart( 0 );

        },
        error: function() {
            alert("error adding test score");
        },

    });

}

function createArrayFromCorrectionsWithHash( c ) {

    let correctionsArray = c.split( " # " );
    return correctionsArray;

}

function makeCorrectSentence() {

    // takes incorrect sentence + indexes and corrections and gives correct sentence

    // makes individual corrections
    function cleanCorrection( wrongSection, correction ) {

        var newCorrection;
        console.log('wrongSection:', wrongSection);

        if ( correction === "x" || correction === "[delete]" ) {

            newCorrection = "x";

        // if error is a space then need to add spaces around it
        } else if ( wrongSection === " " ) {

            console.log('gap');
            newCorrection = " " + correction + " ";

        } else if ( wrongSection[ 0 ]  === " " && wrongSection[ wrongSection.length - 1 ] === " " ) {

            console.log('both');
            newCorrection = " " + correction + " ";

        } else if ( wrongSection[ 0 ] === " " ) {

            console.log('left');
            newCorrection = " " + correction;

        } else if ( wrongSection[ wrongSection.length - 1 ] === " " ) {

            console.log('right');
            newCorrection = correction + " ";

        } else {

            console.log('nowt');
            newCorrection = correction;

        }

        console.log('new correction:', newCorrection );
        return newCorrection

    }

    
    let wrongSent = testDict.sentences[ testDict.question ].sentence;
    let correctionsArray = createArrayFromCorrectionsWithHash( testDict.sentences[ testDict.question ].correction )

    let wrongIndexes = JSON.parse( testDict.sentences[ testDict.question ].indexes )

    let correctSent = "";

    let correctSections = [];
    let wrongSections = [];

    for ( i=0; i<wrongIndexes.length + 1; i++ ) {

        var correctSection = "";
        var wrongSection = "";
        var cleanedCorrection = "";

        if ( i < wrongIndexes.length ) {

            wrongSection = wrongSent.substring( wrongIndexes[ i ][ 0 ], wrongIndexes[ i ][ 1 ] )
            cleanedCorrection = cleanCorrection( wrongSection, correctionsArray[ i ] );

            if ( i === 0 ) {

                console.log( 'i===0' );
                if ( cleanedCorrection === "x" ) {

                    console.log( 'cleanedCorrection====x' );
                    if ( wrongIndexes[ i ][ 0 ] === 0 ) {

                        correctSent += cleanedCorrection;

                    } else {

                        correctSection = wrongSent.substring( 0, wrongIndexes[ i ][ 0 ] );
                        console.log( 'correctSection:', correctSection );
                       
                        if ( correctSection[ correctSection.length - 1 ] === " " ) {

                            correctSent = correctSection.substring( 0, correctSection.length - 1 );
                            console.log( 'with trailing whitespace' );

                        } else {

                            correctSent += correctSection;
                            console.log( 'without trailing whitespace' );
                    
                        }

                    }

                } else {

                    correctSection = wrongSent.substring( 0, wrongIndexes[ i ][ 0 ] )
                    console.log( 'correctSection:', correctSection );
                    correctSent += correctSection + cleanedCorrection;
                    console.log( 'correctSent:', correctSent );
               
                }

            } else {

                correctSection = wrongSent.substring( wrongIndexes[ i - 1 ][ 1 ], wrongIndexes[ i ][ 0 ] )

                if ( cleanedCorrection === "x" ) {

                    if ( correctSection[ correctSection.len - 1 ] === " " ) {

                        correctSent += correctSection.substring( 0, correctSection.length - 1 );

                    }
                    
                } else {

                    correctSent += correctSection + cleanedCorrection;

                }

            }

        } else {

            if ( wrongIndexes[ i - 1 ] !== wrongSent.length ) {

                correctSection = wrongSent.substring( wrongIndexes[ i - 1 ][ 1 ] )
                correctSent += correctSection;

            }

        }

    }

    console.log( 'correctSentFinal:', correctSent );
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
    setTimeout( function() { $('#inputAnswer').focus() }, 600 );

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

        if ( moreThanTenWrong ) {

            // don't repeat sentences 
            tenWrong.push( allWrongSents.splice( Math.floor( Math.random() * allWrongSents.length ), 1 )[ 0 ] );

        } else {

            // repeating is possible
            let randomInt = Math.floor( Math.random() * lenAll );

            tenWrong.push( allWrongSents[ randomInt ] );

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


