function checkForChange() {

    $.ajax({
        url: "/check_for_change",
        type: "GET",
        success: function(json) {

            if ( json.change ) {

                console.log( 'change in Sentence detected' );
                updateSentencesNeedJudgement( json.sentences_not_judged );
                updateSentencesBeingRecorded( json.sentences_being_recorded );
                teacherVars.aud1.play();

            } else {

                console.log( 'no change in Sentence detected' );

            }
            //console.log('checking again');
            checkForChange();
          

        },
        error: function() {
            console.log("check_for_change gone wrong");
            setTimeout( function(){ location.reload() }, 2000 );
        },

    });

}

function updateConversationsDictFromServer() {

    //if comes from send correction to server then correction=true and update sentence for correction too.
    let conversationIds = Object.keys( teacherVars.conversations );
    //console.log('conversationIds:', conversationIds);

    $.ajax({
        url: "/update_conversation_objects",
        type: "GET",
        traditional: true,
        data: {
            'conversationIds': JSON.stringify( conversationIds ),
        }, 
        success: function(json) {

          //console.log('same_students:', json.same_students)
            if ( !json.same_students ) {

                teacherVars.conversations = json.updated_student_conversations

                $('#studentContainerCol').empty();
                insertPhones();
                loadStudents(); 
                teacherVars.aud.play();
            }

        },
        error: function() {
            console.log("updateConversationsDictFromServer gone wrong");
            setTimeout( function(){ location.reload() }, 2000 );
        },

    });

    setTimeout( updateConversationsDictFromServer, 10000 );

}
