function getSessionsIdList() {

    sessionsDict[ 'IDList' ] = Object.keys(sessionsDict)

    let arrayForIntIds = []
    sessionsDict[ 'IDList' ].forEach( function( e ) {

        arrayForIntIds.unshift( parseInt( e ) );

    });

    sessionsDict[ 'IDList' ] = arrayForIntIds
    // cuurent one which will be shown on the book
    sessionsDict[ 'currentPos' ] = 0

}


function hideBooks() {
    $('#testsBook').hide(); 
    $('#sentencesBook').hide(); 
}



//Called to show the tests
function showTestsBook() {
    
    hideBooks();
    $("#bookContentBackground").fadeIn( 1000 );
    $('#testsBook').fadeIn( 1000 ); 

    if ( sessionsDict.IDList.length === 0 ) {

        $('#testBtnCont').hide();

    }

};



function showSentencesBook() {
    
    hideBooks();
    $("#bookContentBackground").fadeIn( 1000 );
    $('#sentencesBook').fadeIn( 1000 ); 

    if ( sessionsDict.IDList.length !== 0 ) {

        showSession( sessionsDict.IDList[ 0 ] )

    }

};



//Called to show the schedule
function showSchedule() {
    
    hideBooks();
    $("#bookContentBackground").fadeIn( 1000 );
    $('#schedule').fadeIn( 1000 ); 

    /*if ( sessionsDict.IDList.length === 0 ) {

        $('#testBtnCont').hide();

    }*/

};


 
function showNewsBook() {
    
    $('#newsBook').fadeIn( 1000 ); 

};



function showSession( sessID ) {

    //if ( sessionsDict[ 'IDList' ].length === 0 ) {

    //} else if ( ind < 0 || ind >= sessionsDict[ 'IDList' ].length ) {

        //alert( 'index for session out of range' )

    //} else {

        //let sess = sessionsDict[ sessionsDict[ 'IDList' ][ ind ] ]
        console.log('sessID:', sessID );
        let sess = sessionsDict[ sessID ]
        let sT = new Date( sess.start_time * 1000 )
        let niceDate = sT.toLocaleDateString("en-GB"); 
        let topic = sess.topic
        let sentence = sess.sentences
        let score = sess.score
    
        let node = document.getElementById('sentencesInnerMain');
        node.innerHTML = '';

        let html = document.createElement( "div" );
        html.innerHTML = "<div id='sessDate'> Date: <span style='font-weight: bold'>" + niceDate + "</span>" + " --- Topic: <span style='font-weight: bold'>" + topic + "</span>" + " --- Score: <span style='font-weight: bold'>" + score + "</span></div>"; 
        
        node.appendChild( html );

        sentence.forEach( function(s) {

            appendRecordings( s, node )
            appendExchange( s, node );

        });

        $('.listen-btn').on( 'click', getRecording );
        $('.listen-synth-btn').on( 'click', getSynth );

    //}

}









