function sendSentToServer() {
    if(conversationVariables.playStage2){
        getRemainingAudio();
        
       //i getAudioLength();
    }
    // reset to false
    //conversationVariables.promptNIndexesReceived = false;
    // reset the number of recordings for the sentence to 0.
    conversationVariables.blobs = 0;

    // all below for developing
    let sent = conversationVariables.preSent;

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
                    'blob_no_text': conversationVariables.blob_no_text,
                    'blob_no_text_sent_id': conversationVariables.blob_no_text_sent_id,
                    'sessionID': conversationVariables.session_id
                },
                success: function(json) {
                    
                    console.log('sentence successfully sent to server');
                    resetLastSent( json.sent_id, json.sentenceData );

                },
                error: function() {
                    alert("sentence failed to send to server");
                },

            });

        } else {

            alert('this is not a sentence');

        }

        //} else {

            //alert("you can only ask a 'Wh-' or 'How' question after 3 correct non-question sentences. The small red circle with the number in it will turn green when you can ask these questions.");

        //}

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

