function storeEmotion() {

    console.log( 'storeEmotion' );
    let emotion = $(this).attr('id').substring( 5 );
    $(this).css( {
        
        '-webkit-filter': 'brightness(55%)',
        'filter': 'brightness(55%)',
    
    } );


    $('.emojis').unbind();

    $.ajax({
        url: "/store_emotion",
        type: "POST",
        data: {
            'emotion': emotion,
            'conversationId': conversationVariables.conversation_dict.id,
        },
        success: function(json) {

            //add emotion to first topic button
            //document.getElementById("myEmotion").innerHTML = "Why I'm " + emotion;

            $('#emotionQuestionsCont').fadeOut( 500 );

            //setTimeout( function() {
                    
            goToAskTopic( emotion )
                    
            //}, 600 );

        },
        error: function() {
            alert("unsuccessful POST to store_emotion");
        },
    });

}

function storeTopic( topicChoice ) {

    $.ajax({
        url: "/store_topic",
        type: "POST",
        data: {
            'topic': topicChoice,
            'sessionID': conversationVariables[ 'session_id' ],
        },
        success: function(json) {

            $('#topicChoicesCont').fadeOut( 500 );
            removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

            //initNod( 0.4, '0.5' )
            
            let startTalkSent = " Ok, please begin when you are ready.";
            speechBubbleObject.sentence = startTalkSent;
            synthesisObject.text = speechBubbleObject.sentence
            sendTTS( startTalkSent, true );

            setTimeout( beginTalking, 1000 );
            
        },
        error: function() {
            alert("unsuccessful POST to store_topic");
        },
    });

}


