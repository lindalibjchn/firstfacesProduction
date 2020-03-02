function storeEmotion() {

  //console.log(' in store emotion' );
    // last emotion click is handled by the endConversation function
    if ( conversationVariables.ratings === undefined ) {

        let emotion = $(this).attr('id').substring( 5 );
        $(this).css( {
            
            'background-color': '#102858',
        
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

}

function storeTopic( topicChoice ) {

    $('#topicChoicesCont').fadeOut( 500 );
    $.ajax({
        url: "/store_topic",
        type: "POST",
        data: {
            'topic': topicChoice,
            'conversationId': conversationVariables.conversation_dict.id,
        },
        success: function(json) {

            afterStoreTopic();

        },
        error: function() {
            alert("unsuccessful POST to store_topic");
        },
    });

}

function sendSlowFPSReportToServer() {

    $.ajax({
        url: "/store_slow_FPS",
        type: "POST",
        data: {
            'device': navigator.userAgent,
            'conversationId': conversationVariables.conversation_dict.id,
        },
        success: function(json) {

        },
        error: function() {
            console.log("didn't store device");
        },
    });

}

function storeTutorialStep() {

    $.ajax({
        url: "/store_tutorial_step",
        type: "POST",
        data: {
            'tutorial_step': conversationVariables.tutorialStep,
            'conversationId': conversationVariables.conversation_dict.id,
        },
        success: function(json) {

        },
        error: function() {
            console.log( 'unsuccessful store tutorial step' );
        },
    });

}


