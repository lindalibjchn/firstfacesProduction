function sendSentToServer() {
    
    if(conversationVariables.playStage2){
        getRemainingAudio();
        
       //i getAudioLength();
    }

    // all below for developing
    let sent = getSentence();

    //console.log('sent:', sent);
    //console.log('sent length:', sent.length);
    if ( sent.length > 2 || sent.length < 300 ) {
            
        if(conversationVariables.usePlayAud){
            
            // temporary fix
            if ( !conversationVariables.FAFailed ) {
            
                play_audio();

            }
            conversationVariables.usePlayAud = false;
        
        } else {
            
            if ( !conversationVariables.FAFailed ) {
            
                aud.play();
            
            }

        }
        setTimeout( goToThinkingPos, conversationVariables.sentence_being_recorded_audio.totalAudioLength );
        conversationVariables.FAFailed = false;
        talkToTia(); 
        // set this to false until judgement comes in where it will be changed to true
        conversationVariables.awaitingJudgement = true;

        // fade out text box
        $('#textInputContainer').fadeOut( 500 );

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
                
              //console.log('sentence successfully sent to server');
                conversationVariables.sentence_awaiting_judgement = json.sentence

            },
            error: function() {
                alert("sentence failed to send to server. Please refresh");
            },

        });

    } else {

        alert( 'This sentence is too long. Please simplify and try again.')

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
            
          //console.log('receivedJudgement:', json.receivedJudgement)
            if ( json.receivedJudgement ) {

                judgementReceived( json.sentence )
            
            } else {

                startNextSentenceThoughtLoop();

            }

        },
        error: function() {
            
          //console.log('in error');
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
            
            console.log('json.new_prompt:', json.new_prompt );
            conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt = json.awaiting_more;
            if ( json.new_prompt ) {

                console.log('in new prompt');
                conversationVariables.conversation_dict.completed_sentences[ 0 ].prompts = json.prompts;
                createPromptFromServerPrompts();
                synthesisObject.newPromptArrived = json.new_prompt;
                synthesisObject.awaiting_next_prompt_count = 0;

            }

            if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                if ( synthesisObject.awaiting_next_prompt_count < 500 ) {
    
                    setTimeout( getNextPrompt, 2000 );

                }

            } else {

                console.log('not awaiting next prompt' );

            }

        },
        error: function() {
            
          console.log('in error for getNextPrompt');
        
        },

    });


}

function checkForCorrections() {

    //console.log('in check for corrections')
    $.ajax({
        url: "/check_for_corrections",
        type: "GET",
        data: { 
            'sentId': conversationVariables.conversation_dict.completed_sentences[ 0 ].sent_id,
        },
        success: function(json) {
            
            if ( json.received_corrections ) {
                
              //console.log('receivedCorrections:')
                conversationVariables.conversation_dict.completed_sentences[ 0 ].indexes = json.indexes
                conversationVariables.conversation_dict.completed_sentences[ 0 ].correction = json.correction
                showWrong();

            } else {

                checkForCorrections();
              //console.log('checkForCorrections() again')

            }

        },
        error: function() {
            
          //console.log('in error');
        
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
            
          //console.log( 'thoughtBubbleLoops stored successsfully' )
        },
        error: function() {
            
          //console.log( 'in storeNoOfThoughtBubbleLoops error' );
        
        },

    });

}


