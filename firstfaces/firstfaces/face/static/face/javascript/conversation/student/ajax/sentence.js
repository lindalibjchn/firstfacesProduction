function sendSentToServer() {
    if(conversationVariables.playStage2){
        getRemainingAudio();
        
       //i getAudioLength();
    }

    // all below for developing
    let sent = conversationVariables.sentence_being_recorded_audio.alternatives[ 0 ].transcript;

    if ( sent.length >= 300 ) {

        alert( 'This sentence is too long. Please simplify and try again.')

    } else {

        // set this to false until judgement comes in where it will be changed to true
        conversationVariables.awaitingJudgement = true;

        if ( sent.length > 2 ) {
            
            // fade out text box
            $('#textInputContainer').fadeOut( 500 );

            talkToTia(); 
            recTimes = {};
            recTimes.clickTalkBtn = Date.now() / 1000;

            $.ajax({
                url: "/store_sent",
                type: "POST",
                data: { 
                    'sent': sent,
                    'sent_id': conversationVariables.sentence_being_recorded.sent_id,
                    'conversation_id': conversationVariables.sentence_being_recorded.conv_id
                },
                success: function(json) {
                    
                    console.log('sentence successfully sent to server');
                    resetLastSent( json.sent_id, json.sentence_data );

                },
                error: function() {
                    alert("sentence failed to send to server");
                },

            });

        } else {

            alert('this is not a sentence');

        }

    }

}

function checkJudgement() {

    $.ajax({
        url: "/check_judgement",
        type: "GET",
        data: { 
            'sessId': conversationVariables.session_id,
            'sentId': conversationVariables.last_sent.sent_id,
        },
        success: function(json) {
            
            console.log('receivedJudgement:', json.receivedJudgement)
            if ( json.receivedJudgement ) {

                judgementReceived( json )
            
            } else {

                startNextSentenceThoughtLoop();

            }

        },
        error: function() {
            
            console.log('in error');
            startNextSentenceThoughtLoop( errorInGettingResponse=true );
        
        },

    });

}

