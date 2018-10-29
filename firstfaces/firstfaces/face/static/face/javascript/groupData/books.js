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

function showSentencesBook() {
    
    $('#sentencesBook').fadeIn( 1000 ); 
    showSession( 0 )

};

function showSession( ind ) {

    if ( sessionsDict[ 'IDList' ].length === 0 ) {

    } else if ( ind < 0 || ind >= sessionsDict[ 'IDList' ].length ) {

        alert( 'index for session out of range' )

    } else {

        let sess = sessionsDict[ sessionsDict[ 'IDList' ][ ind ] ]
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

    }

}

function getRecording() {

    let audio_url = this.id

    let aud = document.getElementById('listen_audio');
    aud.src = "http://127.0.0.1:8000/media/" + audio_url;
    //aud.src = "https://erle.ucd.ie/media/" + audio_url;
    aud.play();

}

function getSynth() {

    let sent = this.id;
    let sess_id = this.sessID;

    $.ajax({
        url: "/tts",
        type: "GET",
        data: {
            'sentence': sent,
            'tiaSpeaker': false,
            'sessionID': sess_id,
            'pitch': 0,
            'speaking_rate': 0.85,
            'caller': 'talk',
            'blob_no_text': false,
            'blob_no_text_sent_id': null,
        },
        success: function(json) {

            let aud = document.getElementById('listen_audio');
            aud.src = "http://127.0.0.1:8000/" + json.synthURL;
            //aud.src = "https://erle.ucd.ie/" + json.synthURL;

            setTimeout( function() {

                aud.play();

            }, 1500 );

        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

}









