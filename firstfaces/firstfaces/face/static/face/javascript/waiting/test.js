function startTest() {

    $('#startTestBtn').prop( 'disable', true );
    $('#testsEntrance').fadeOut( function(){ $('#testQuestionsCont').fadeIn() } );
    
    loadTest();

}

function loadTest() {

    let wrongSents = getRandomTenWrongSentences();

    let wrongSentDiv = document.getElementById('wrongSent');

    wrongSent.innerHTML = wrongSents[ 0 ].sentence;
    $('#inputAnswer').prop('placeholder', wrongSents[0].sentence);
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

            if ( s.judgement === "I" ) {

                allWrongSents.push( s );

            }

        })

    })

    return allWrongSents;

}


