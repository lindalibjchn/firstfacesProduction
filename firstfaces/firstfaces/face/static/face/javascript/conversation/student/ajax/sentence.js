function sendSentToServer() {
    
    if(conversationVariables.playStage2){
        getRemainingAudio();
        
       //i getAudioLength();
    }

    // all below for developing
    let sent = getSentence();

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
                    updateConversationVariables( json.sentence )

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
            'convId': conversationVariables.conversation_dict.id,
            'sentId': conversationVariables.sentence_awaiting_judgement.sent_id,
            'loop': thoughtBubbleObject.loop
        },
        success: function(json) {
            
            console.log('receivedJudgement:', json.receivedJudgement)
            if ( json.receivedJudgement ) {

                judgementReceived( json.sentence )
            
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

function storeNoOfThoughtBubbleLoops() {

    $.ajax({
        url: "/store_thought_bubble_loops",
        type: "POST",
        data: { 
            'loops': thoughtBubbleObject.loop,
        },
        success: function(json) {
            
            console.log( 'thoughtBubbleLoops stored successsfully' )
        },
        error: function() {
            
            console.log( 'in storeNoOfThoughtBubbleLoops error' );
        
        },

    });

}


