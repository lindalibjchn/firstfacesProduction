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

function showTestsBook() {

    $('#testsBook').fadeIn( 1000 ); 


};

function showSentencesBook() {
    
    $('#sentencesBook').fadeIn( 1000 ); 
    showSession( 0 )

};
        
function showNewsBook() {
    
    $('#newsBook').fadeIn( 1000 ); 

};

function showSession( ind ) {

    if ( ind < 0 || ind >= sessionsDict[ 'IDList' ].length ) {

        alert( 'index for session out of range' )

    } else {

        let sess = sessionsDict[ sessionsDict[ 'IDList' ][ ind ] ]
        let sT = new Date( sess.start_time * 1000 )
        let niceDate = sT.getDate(); 
        let topic = sess.topic
        let sentence = sess.sentences
        let score = sess.score
    
        let node = document.getElementById('sentencesInnerMain');
        node.innerHTML = '';

        let html = document.createElement( "div" );
        html.innerHTML = "<div id='sessDate'>" + sT + "</div>" +
            "<div id='sessTopic'>" + "Topic: <span style='font-weight: bold'>" + topic + "</div>" +
            "<div id='sessScore'>" + "Score: <span style='font-weight: bold'>" + score + "</span></div>"; 
        
        node.appendChild( html );

        sentence.forEach( function(s) {

            appendRecordings( s, node )
            appendExchange( s, node );

        });

        $('.listen-btn').on( 'click', getRecording );
        $('.listen-synth-btn').on( 'click', getSynth );

    }

}









