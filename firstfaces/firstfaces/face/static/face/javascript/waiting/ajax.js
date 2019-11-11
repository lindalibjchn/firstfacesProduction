function bookConversation( enterTutorial ) {

    $(this).css({

        'background-color': 'white',
        'color': '#102858',

    }).unbind('click');
    
    console.log('in bookConversation');
    //if ( scheduleDict.in_class_now === false ) {

        $.ajax({
            url: "/book_conversation",
            type: "POST",
            data: {
                //'tutorial': enterTutorial,
            },
            success: function(json) {
                if ( json.conversationCreated ) {
                    
                    waitingVariables.conversation_id = json.conversation_id;
                    enterConversation();

                } else {

                    alert("session didn't book");

                }

            },
            error: function() {
                console.log("that's wrong");
            },
        });

    //} else {



    //}

}
