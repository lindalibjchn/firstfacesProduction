function bookConversation( enterTutorial=false ) {

    //$(this).css({

        //'background-color': 'white',
        //'color': '#102858',

    //}).unbind('click');
    
    console.log('in bookConversation');
    if ( waitingVariables.currently_in_class === false ) {

        $.ajax({
            url: "/book_conversation",
            type: "POST",
            data: {
                'tutorial': enterTutorial,
            },
            success: function(json) {
                if ( json.conversationCreated ) {
                    
                    console.log('in conversation created:', json)
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

    } else {

        enterConversation();

    }

}
