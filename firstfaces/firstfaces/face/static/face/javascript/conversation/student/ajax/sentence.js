function sendSentToServer() {
    
    if (!conversationVariables.tutorial ) {

        if(conversationVariables.playStage2){
            if(conversationVariables.FAFailed){
                console.log("Error in forced allignment")
            }
            else{
                getRemainingAudio();
            }

            
           //i getAudioLength();
        }

        // all below for developing
        let sent = getSentence();

        //console.log('sent:', sent);
        //console.log('sent length:', sent.length);
        if ( conversationVariables.currentTranscriptionSplitWords.length < 3 ) {
            
            alert('this sentence is too short to send - the minimum is 3 words')
            
        } else if ( conversationVariables.currentTranscriptionSplitWords.length > 30 ) {

            alert('this sentence is too long to send - the mamiximum is 30 words')
            
        } else {

            if ( conversationVariables.playStage2) {

                if (conversationVariables.FAFailed) {
                    
                    aud.play();
                
                } else {
                    
                    play_audio();
                
                }

            } else {
                
                aud.play();
            }
            conversationVariables.playStage2 = false;
            
            //} else {
                 //aud.play();
            //}
            let extraDelay = 0;
            if ( appleDevice ) {
                extraDelay = 900;
            }
            if(!conversationVariables.trying_again){
                setTimeout( goToThinkingPos, conversationVariables.sentence_being_recorded_audio.totalAudioLength + extraDelay );
            }else{
                setTimeout( goToThinkingPos, conversationVariables.previous_sent_totalAudioLength + extraDelay );
            }
            conversationVariables.FAFailed = false;
            talkToTia(); 
            // set this to false until judgement comes in where it will be changed to true
            conversationVariables.awaitingJudgement = true;

            // fade out text box
            $('#textInputContainer').fadeOut( 500 );

            recTimes = {};
            recTimes.clickTalkBtn = Date.now() / 1000;


             if(!conversationVariables.trying_again){
                    sent_id = conversationVariables.sentence_being_recorded.sent_id;
                    curr_id = conversationVariables.sentence_being_recorded.conv_id;
             }else{
                     //sent_id = conversationVariables.previous_sent_sent_id;
                     //curr_id = conversationVariables.previous_sent_conv_id
                sent_id = conversationVariables.conversation_dict.completed_sentences[0].sent_id
                curr_id = conversationVariables.conversation_dict.completed_sentences[0].conv_id
            }
            conversationVariables.trying_again = false
            $.ajax({
                url: "/store_sent",
                type: "POST",
                data: { 
                    'sent': sent,
                    'sent_id':sent_id,
                    'conversation_id': curr_id
                },
                success: function(json) {
                    
                  //console.log('sentence successfully sent to server');
                    conversationVariables.sentence_awaiting_judgement = json.sentence

                },
                error: function() {
                    alert("sentence failed to send to server. Please refresh");
                },

            });

        }

    } else {

        if ( conversationVariables.tutorialStep === '071' ) {

            //tiaSpeakButtonEvent();
            tutorialOption081();

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
                synthesisObject.newPromptArrived = true;
                synthesisObject.awaiting_next_prompt_count = 0;

            }

            if ( conversationVariables.conversation_dict.completed_sentences[ 0 ].awaiting_next_prompt ) {

                if ( synthesisObject.awaiting_next_prompt_from_server_count < 10 ) {
    
                    synthesisObject.awaiting_next_prompt_from_server_count += 1;
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


