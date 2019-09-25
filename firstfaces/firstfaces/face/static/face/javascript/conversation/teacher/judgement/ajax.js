function storeJudgement() {

    $(document).off( 'keydown' );

    $.ajax({
        url: "/store_judgement",
        type: "POST",
        data: { sentMeta: JSON.stringify( teacherVars.sentencesNeedJudgement[ 0 ] ) }, 
        success: function(json) {
           
            // add timestamp to sent
            teacherVars.sessions[ json.sess_id ].sentences[ 0 ].judgement_timestamp = json.judgement_timestamp;
            console.log('judgement successfully sent to server')

        },
        error: function() {
            console.log("that's wrong");
        },

    });

    afterSendingJudgement();

}

