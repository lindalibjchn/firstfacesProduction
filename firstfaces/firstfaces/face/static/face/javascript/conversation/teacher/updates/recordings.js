function updateSentencesBeingRecorded( updatedSentencesBeingRecorded ) {

    let lengthCurSentencesBeingRecorded = teacherVars.sentencesBeingRecorded.length;
    let lengthUpdatedSentencesBeingRecorded = updatedSentencesBeingRecorded.length;

    if ( lengthUpdatedSentencesBeingRecorded > lengthCurSentencesBeingRecorded ) {

        let noNewSents = lengthUpdatedSentencesBeingRecorded - lengthCurSentencesBeingRecorded;

        for ( let i=0; i<noNewSents; i++ ) {

            teacherVars.sentencesBeingRecorded.push( updatedSentencesBeingRecorded[ lengthCurSentencesBeingRecorded + i ] );

        }

        showSentencesBeingRecordedInPhones();

    }

}

function showSentencesBeingRecordedInPhones() {

    $( '.current-attempt' ).removeClass( 'recording' );
    console.log('sentencesBeingRecorded:', teacherVars.sentencesBeingRecorded);
    teacherVars.sentencesBeingRecorded.forEach( function( r ) {

        let phoneId = teacherVars.studentIdToPhone[ r.user_id ];

        $( '#currentAttempt' + phoneId ).addClass( 'recording' );

    });

}

