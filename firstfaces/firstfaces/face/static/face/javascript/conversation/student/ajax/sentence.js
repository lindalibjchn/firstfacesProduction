function sendSentToServer() {
    
    if(conversationVariables.playStage2){
        getRemainingAudio();
        
       //i getAudioLength();
    }

    // all below for developing
    let sent = getSentence();

    //console.log('sent:', sent);
    //console.log('sent length:', sent.length);
    if ( sent.length >= 300 ) {
        alert( 'This sentence is too long. Please simplify and try again.')

    } else {

        // set this to false until judgement comes in where it will be changed to true
        conversationVariables.awaitingJudgement = true;

        if ( sent.length > 2 || sent.length < 300 ) {
            
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
                    conversationVariables.sentence_awaiting_judgement = json.sentence

                },
                error: function() {
                    alert("sentence failed to send to server. Please refresh");
                },

            });

        } else {

            alert('this sentence is too short or too long. Try again');

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

function getNextPrompt() {

    $.ajax({
        url: "/get_next_prompt",
        type: "GET",
        data: { 
            'sentId': conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id,

        },
        success: function(json) {
            
            conversationVariables.conversation_dict.completed_sentences[ 0 ].prompts = json.prompts;
            conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt = json.awaiting_more;
            
            createPromptFromServerPrompts();
            synthesisObject.now = synthesisObject.data.prompt;

            if ( json.awaiting_more ) {

                console.log('getting next prompt')
                setTimeout( getNextPrompt, 2000 );

            }

        },
        error: function() {
            
            console.log('in error');
        
        },

    });


}

function checkForCorrections() {

    console.log('in check for corrections')
    $.ajax({
        url: "/check_for_corrections",
        type: "GET",
        data: { 
            'sentId': conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id,
        },
        success: function(json) {
            
            if ( json.received_corrections ) {
                
                console.log('receivedCorrections:')
                conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes = json.indexes
                conversationVariables.conversation_dict.completed_sentences[ 0 ].correction = json.correction
                showWrong();

            } else {

                checkForCorrections();
                console.log('checkForCorrections() again')

            }

        },
        error: function() {
            
            console.log('in error');
        
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


