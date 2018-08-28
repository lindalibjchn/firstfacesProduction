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
    
        sents = ""
        sentence.forEach( function(s) {

            console.log('s:', s);
            sents += "<div>" + s.sentence + "</div>";

        });

        let html = "<div>" + sT + "</div>" +
            "<div>" + topic + "</div>" +
            "<div>" + sents + "</div>"; 
        

        $('#sentencesInnerMain').append( html );

    }

}









