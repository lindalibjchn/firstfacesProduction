function updateSentencesBeingRecorded( updatedSentencesBeingRecorded ) {

    teacherVars.sentencesBeingRecorded = updatedSentencesBeingRecorded;
    

    //let lengthCurSentencesBeingRecorded = teacherVars.sentencesBeingRecorded.length;
    //let lengthUpdatedSentencesBeingRecorded = updatedSentencesBeingRecorded.length;


    //if ( lengthUpdatedSentencesBeingRecorded > lengthCurSentencesBeingRecorded ) {

        //let noNewSents = lengthUpdatedSentencesBeingRecorded - lengthCurSentencesBeingRecorded;

        //for ( let i=0; i<noNewSents; i++ ) {

            //teacherVars.sentencesBeingRecorded.push( updatedSentencesBeingRecorded[ lengthCurSentencesBeingRecorded + i ] );

        //}

        showSentencesBeingRecordedInPhones();

    //}

}

function showSentencesBeingRecordedInPhones() {

    $( '.current-attempt' ).removeClass( 'recording' );
    //console.log('sentencesBeingRecorded:', teacherVars.sentencesBeingRecorded);
    teacherVars.sentencesBeingRecorded.forEach( function( r ) {

        let phoneId = teacherVars.studentIdToPhone[ r.user_id ];

        $( '#currentAttempt' + phoneId ).addClass( 'recording' );

        $( '#currentAttempt' + phoneId ).empty();

        r.audiofile_data.forEach( function( audiofile ) {

            $( '#currentAttempt' + phoneId ).append( 
            
                '<div class="audio-attempt" id="audioAttemptBtnDiv' + audiofile[ 0 ] + '">' + 

                    '<i class="fa fa-play play-symbol"></i>' +
                    
                    '<audio id="audioTag' + audiofile[ 0 ] + '" src="' + prefixURL + mediaLocation + audiofile[ 2 ] + '">' +
                    
                    '</audio>' + 

                '</div>'

            );

        } );

    });
        
    setEventHandlerForPlayAudioButtons();

}

function setEventHandlerForPlayAudioButtons() {

    $('.audio-attempt').click( playTranscription );

}

function playTranscription() {

    let ind = this.id.substring(18);
    console.log('index:', ind );
    let attemptAud = document.getElementById( 'audioTag' + ind );

    attemptAud.play();

}
