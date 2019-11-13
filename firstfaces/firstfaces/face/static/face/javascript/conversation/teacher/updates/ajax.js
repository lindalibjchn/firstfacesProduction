function checkForChange() {

    $.ajax({
        url: "/check_for_change",
        type: "GET",
        success: function(json) {

            if ( json.change ) {

                console.log('sentences_being_recorded:', json.sentences_being_recorded); 
                console.log('sentences_not_judged:', json.sentences_not_judged);
                updateSentencesNeedJudgement( json.sentences_not_judged );
                updateSentencesBeingRecorded( json.sentences_being_recorded );
                teacherVars.aud.play();

            }

            checkForChange();
            console.log('checking again');

        },
        error: function() {
            console.log("check_for_change gone wrong");
            checkForChange();
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
            'conversationIds': JSON.stringify(conversationIds),
        }, 
        success: function(json) {

            console.log('same_students:', json.same_students)
            if ( !json.same_students ) {

                teacherVars.conversations = json.updated_student_conversations

                $('#studentContainerCol').empty();
                insertPhones();
                loadStudents(); 
                teacherVars.aud1.play();
            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

    setTimeout( updateConversationsDictFromServer, 10000 );

}
