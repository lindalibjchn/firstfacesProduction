function bookConversation( enterTutorial ) {

    console.log('in bookConversation');
    //if ( scheduleDict.in_class_now === false ) {

        $.ajax({
            url: "/book_conversation",
            type: "POST",
            data: {
                'tutorial': enterTutorial,
            },
            success: function(json) {
                if ( json.sessionCreated ) {
                    
                    scheduleDict.session_id = json.session_id;
                    initDoorOpen('3');
                    initCameraMove('class', '3');

                } else {

                    alert("session didn't book");

                }

            },
            error: function() {
                console.log("that's wrong");
            },
        });

    } else {



    }

}
