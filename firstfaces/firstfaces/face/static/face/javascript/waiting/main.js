$(window).on( 'load', function() {

    addAvailablesToTimetable( waitingVariables.availables )

});

function enterConversation() {

    window.location.href = "/conversation_student/" + waitingVariables.conversation_id.toString()

}







